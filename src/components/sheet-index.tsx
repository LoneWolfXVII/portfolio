'use client';

import { sheets } from '@/content/sheets';
import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';

/** Corner index of the drawing set: shows the sheet in view, opens to jump between them. */
export function SheetIndex() {
	const [current, setCurrent] = useState(0);
	const [clear, setClear] = useState(true);
	const ref = useRef<HTMLDetailsElement>(null);

	useEffect(() => {
		const els = sheets
			.map((s) => document.getElementById(s.id))
			.filter((el): el is HTMLElement => !!el);
		const io = new IntersectionObserver(
			(entries) =>
				entries.forEach((e) => {
					if (e.isIntersecting)
						setCurrent(sheets.findIndex((s) => s.id === e.target.id));
				}),
			{ rootMargin: '-45% 0px -50% 0px' },
		);
		els.forEach((el) => io.observe(el));

		// The pill steps aside whenever something it would cover reaches the
		// bottom band it lives in: the hero, a sheet's own title block, or a
		// gallery's thumbnails.
		const inBand = new Set<Element>();
		const band = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) =>
					e.isIntersecting
						? inBand.add(e.target)
						: inBand.delete(e.target),
				);
				setClear(inBand.size === 0);
				if (inBand.size) ref.current?.removeAttribute('open');
			},
			{ rootMargin: '-80% 0px 0px 0px' },
		);
		document
			.querySelectorAll(
				'#intro, dl[aria-label="Sheet"], [aria-label="Screens"]',
			)
			.forEach((el) => band.observe(el));

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') ref.current?.removeAttribute('open');
		};
		const onClick = (e: MouseEvent) => {
			if (!ref.current?.contains(e.target as Node))
				ref.current?.removeAttribute('open');
		};
		document.addEventListener('keydown', onKey);
		document.addEventListener('click', onClick);
		return () => {
			io.disconnect();
			band.disconnect();
			document.removeEventListener('keydown', onKey);
			document.removeEventListener('click', onClick);
		};
	}, []);

	const sheet = sheets[current];

	return (
		<details
			ref={ref}
			inert={!clear}
			className={cn(
				'group fixed bottom-6 left-8 z-40 hidden transition-[opacity,translate] duration-500 ease-[var(--ease-spring)] md:block',
				!clear && 'pointer-events-none translate-y-3 opacity-0',
			)}
		>
			<summary className="annot flex min-h-11 cursor-pointer list-none items-center gap-3 rounded-full bg-bg/80 px-4 ring-1 ring-white/10 backdrop-blur transition-[box-shadow] duration-300 hover:ring-white/25 [&::-webkit-details-marker]:hidden">
				<span className="text-accent">{sheet.no}</span>
				<span className="text-ink/80">{sheet.title}</span>
				<span aria-hidden className="text-muted">
					{current + 1}/{sheets.length}
				</span>
				<span className="sr-only">Open sheet index</span>
			</summary>
			<nav
				aria-label="Sheet index"
				className="absolute bottom-full left-0 mb-2 w-72 border border-line bg-bg/95 backdrop-blur"
			>
				<p className="annot border-b border-line px-4 py-3">
					Drawing set · Index
				</p>
				<ol>
					{sheets.map((s, i) => (
						<li key={s.id}>
							<a
								href={`/#${s.id}`}
								onClick={() => ref.current?.removeAttribute('open')}
								aria-current={i === current ? 'location' : undefined}
								className={cn(
									'annot grid min-h-11 grid-cols-[4.5rem_1fr] items-center px-4 transition-colors duration-300 hover:bg-white/[0.04] hover:text-ink',
									i === current && 'text-ink',
								)}
							>
								<span className={i === current ? 'text-accent' : ''}>
									{s.no}
								</span>
								{s.title}
							</a>
						</li>
					))}
				</ol>
			</nav>
		</details>
	);
}
