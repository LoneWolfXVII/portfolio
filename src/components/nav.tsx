'use client';

import { profile } from '@/content/profile';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useLenis } from 'lenis/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

const links = [
	{ label: 'Work', href: '/#work' },
	{ label: 'Experience', href: '/#experience' },
	{ label: 'Contact', href: '/#contact' },
];

export function Nav() {
	const [open, setOpen] = useState(false);
	const [current, setCurrent] = useState<string | null>(null);
	const pathname = usePathname();
	const lenis = useLenis();
	const toggleRef = useRef<HTMLButtonElement>(null);
	const panelRef = useRef<HTMLDivElement>(null);

	const close = useCallback(() => {
		setOpen(false);
		toggleRef.current?.focus();
	}, []);

	// Lock scroll for both Lenis and native (reduced-motion users have no Lenis).
	// Scroll-spy: mark the section currently crossing the middle of the viewport.
	useEffect(() => {
		if (pathname !== '/') return setCurrent(null);
		const sections = links
			.map((l) => document.getElementById(l.href.slice(2)))
			.filter((el): el is HTMLElement => !!el);
		const io = new IntersectionObserver(
			(entries) => {
				// Clear leavers first so the hero (unobserved) shows no active link.
				for (const e of entries)
					if (!e.isIntersecting)
						setCurrent((c) => (c === e.target.id ? null : c));
				for (const e of entries)
					if (e.isIntersecting) setCurrent(e.target.id);
			},
			{ rootMargin: '-45% 0px -50% 0px' },
		);
		sections.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, [pathname]);

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
			<header className="fixed inset-x-0 top-4 z-50 flex items-center justify-center gap-2 px-4">
				<nav
					aria-label="Primary"
					className="flex w-full max-w-max items-center gap-1 rounded-full bg-bg/75 p-1.5 ring-1 ring-white/10 backdrop-blur-xl"
				>
					<Link
						href="/"
						aria-label="Nischal Gupta, home"
						className="grid size-11 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-105"
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
									aria-current={
										current === l.href.slice(2)
											? 'location'
											: undefined
									}
									className="flex min-h-11 items-center rounded-full px-4 text-sm text-ink/70 transition-colors duration-300 hover:bg-white/[0.06] hover:text-ink aria-[current=location]:bg-white/[0.08] aria-[current=location]:text-ink"
								>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
					<button
						ref={toggleRef}
						type="button"
						aria-expanded={open}
						aria-controls="mobile-menu"
						aria-label={open ? 'Close menu' : 'Open menu'}
						onClick={() => setOpen((o) => !o)}
						className="relative ml-auto grid size-11 place-items-center rounded-full sm:hidden"
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
				{/* Detached from the nav: the one action that leaves the site. */}
				<a
					href={profile.resume}
					target="_blank"
					rel="noopener noreferrer"
					className="hidden min-h-14 items-center rounded-full bg-bg/75 px-6 text-sm font-medium text-ink ring-1 ring-white/10 backdrop-blur-xl transition-[background-color,color,box-shadow,transform] duration-500 ease-[var(--ease-spring)] hover:bg-ink hover:text-bg hover:ring-ink active:scale-[0.98] sm:flex"
				>
					Résumé
				</a>
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
						{links.map((l) => (
							<li key={l.href} className="overflow-hidden">
								<Link
									data-menu-link
									href={l.href}
									onClick={() => setOpen(false)}
									className="block py-1 text-5xl font-medium tracking-[-0.04em]"
								>
									{l.label}
								</Link>
							</li>
						))}
					</ul>
					<div className="mt-10 flex flex-wrap gap-3 border-t border-line pt-6">
						<a
							href={profile.resume}
							target="_blank"
							rel="noopener noreferrer"
							className="flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-medium text-bg"
						>
							Résumé
						</a>
						<a
							href={`mailto:${profile.email}`}
							className="flex min-h-11 items-center rounded-full px-5 text-sm ring-1 ring-white/15"
						>
							Email
						</a>
					</div>
				</div>
			)}
		</>
	);
}
