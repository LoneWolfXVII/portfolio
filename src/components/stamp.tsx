'use client';

import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import { useRef } from 'react';

/** A rubber stamp that lands once, the first time its sheet comes into view. */
export function Stamp({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) {
	const ref = useRef<HTMLParagraphElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(MOTION_OK, () => {
				gsap.from(ref.current, {
					scale: 1.6,
					rotate: -18,
					autoAlpha: 0,
					duration: 0.5,
					ease: 'back.out(2.2)',
					scrollTrigger: {
						trigger: ref.current,
						start: 'top 80%',
						once: true,
					},
				});
			});
		},
		{ scope: ref },
	);

	return (
		<p
			ref={ref}
			className={cn(
				'annot pointer-events-none w-max -rotate-6 rounded-[4px] border-2 border-accent px-3 py-1.5 text-sm text-accent',
				className,
			)}
		>
			{children}
		</p>
	);
}
