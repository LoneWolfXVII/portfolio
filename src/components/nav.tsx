'use client';

import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const links = [
	{ label: 'Work', href: '/#work' },
	{ label: 'Experience', href: '/#experience' },
	{ label: 'About', href: '/#about' },
	{ label: 'Contact', href: '/#contact' },
];

export function Nav() {
	const [open, setOpen] = useState(false);
	const lenis = useLenis();
	const toggleRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		setOpen(false);
		toggleRef.current?.focus();
	}, []);

	// Lock scroll for both Lenis and native (reduced-motion users have no Lenis).
	useEffect(() => {
		if (open) lenis?.stop();
		else lenis?.start();
		document.documentElement.style.overflow = open ? 'hidden' : '';
	}, [open, lenis]);

	// Esc closes, Tab stays inside the overlay.
	useEffect(() => {
		if (!open) return;
		const panel = panelRef.current;
		panel?.querySelector<HTMLElement>('a')?.focus();
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') return close();
			if (e.key !== 'Tab' || !panel) return;
			const items = [toggleRef.current, ...panel.querySelectorAll('a')].filter(
				Boolean,
			) as HTMLElement[];
			const first = items[0];
			const last = items[items.length - 1];
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault();
				last.focus();
			} else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault();
				first.focus();
			}
		};
		document.addEventListener('keydown', onKey);
		return () => document.removeEventListener('keydown', onKey);
	}, [open, close]);

	useGSAP(
		() => {
			if (!open) return;
			gsap.matchMedia().add(MOTION_OK, () => {
				gsap.from('[data-menu-link]', {
					yPercent: 110,
					duration: 0.9,
					stagger: 0.06,
					delay: 0.1,
				});
			});
		},
		{ dependencies: [open], scope: panelRef },
	);

	return (
		<>
			<header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
				<nav
					aria-label="Primary"
					className="flex w-full max-w-max items-center gap-1 rounded-full bg-black/45 p-1.5 ring-1 ring-white/10 backdrop-blur-xl"
				>
					<Link
						href="/"
						aria-label="Nischal Gupta, home"
						className="rounded-full p-1 transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-105"
					>
						<Image
							src="/logo/android-chrome-512x512.png"
							alt=""
							width={32}
							height={32}
							className="size-8 rounded-full"
							priority
						/>
					</Link>
					<ul className="hidden items-center sm:flex">
						{links.map((l) => (
							<li key={l.href}>
								<Link
									href={l.href}
									className="block rounded-full px-4 py-2 text-sm text-ink/70 transition-colors duration-300 hover:bg-white/[0.06] hover:text-ink"
								>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
					<Link
						href="/#contact"
						className="ml-1 hidden rounded-full bg-ink px-4 py-2 text-sm font-medium text-bg transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-[1.03] active:scale-[0.98] sm:block"
					>
						Hire me
					</Link>
					<button
						ref={toggleRef}
						type="button"
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? 'Close menu' : 'Open menu'}
						onClick={() => setOpen((o) => !o)}
						className="relative ml-auto grid size-10 place-items-center rounded-full sm:hidden"
					>
						<span
							className={cn(
								'absolute h-px w-4 bg-ink transition-transform duration-500 ease-[var(--ease-spring)]',
								open ? 'rotate-45' : '-translate-y-[3px]',
							)}
						/>
						<span
							className={cn(
								'absolute h-px w-4 bg-ink transition-transform duration-500 ease-[var(--ease-spring)]',
								open ? '-rotate-45' : 'translate-y-[3px]',
							)}
						/>
					</button>
				</nav>
			</header>

			{open && (
				<div
					id="mobile-menu"
					ref={panelRef}
					role="dialog"
					aria-modal="true"
					aria-label="Menu"
					className="fixed inset-0 z-40 flex flex-col justify-end bg-bg/90 px-6 pb-16 backdrop-blur-2xl sm:hidden"
				>
					<ul className="flex flex-col gap-2">
						{links.map((l, i) => (
							<li key={l.href} className="overflow-hidden">
								<Link
									data-menu-link
									href={l.href}
									onClick={() => setOpen(false)}
									className="flex items-baseline gap-4 text-5xl font-medium tracking-[-0.04em]"
								>
									<span className="annot">0{i + 1}</span>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
				</div>
			)}
		</>
	);
}
