'use client';

import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

// Worn rubber: fractal noise as a mask, so the ink drops out unevenly like a
// real impression instead of reading as a flat CSS border.
const INK =
	"url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' seed='7'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.5 1.6'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

/**
 * The sheet's sign-off: a double-ruled rubber stamp that lands once, the first
 * time Contact scrolls into view, with a small overshoot like it was pressed.
 */
export function Stamp({
	children,
	note,
	className,
}: {
	children: React.ReactNode;
	note: [string, string];
	className?: string;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(MOTION_OK, () => {
				gsap.timeline({
					scrollTrigger: {
						trigger: ref.current,
						start: 'top 85%',
						once: true,
					},
				})
					.from(ref.current, {
						scale: 1.8,
						rotate: -16,
						autoAlpha: 0,
						duration: 0.32,
						ease: 'power4.in',
					})
					.to(ref.current, {
						scale: 0.97,
						duration: 0.07,
						ease: 'power1.out',
					})
					.to(ref.current, {
						scale: 1,
						duration: 0.22,
						ease: 'back.out(3)',
					});
			});
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			style={{ maskImage: INK, WebkitMaskImage: INK, maskSize: '220px 120px' }}
			className={cn(
				'pointer-events-none w-max -rotate-[7deg] rounded-[6px] border-2 border-accent p-[3px] text-accent',
				className,
			)}
		>
			<div className="rounded-[3px] border border-accent/80 px-4 py-2 text-center font-mono uppercase">
				<p aria-hidden className="text-[9px] tracking-[0.28em]">
					{note[0]}
				</p>
				<p className="my-1 border-y border-accent/80 py-1 text-[17px] font-semibold leading-none tracking-[0.12em]">
					{children}
				</p>
				<p aria-hidden className="text-[9px] tracking-[0.28em]">
					{note[1]}
				</p>
			</div>
		</div>
	);
}
