'use client';

import type { Media } from '@/content/work';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const STEP = 1400;

/**
 * A project's screens, stepped through while it's hovered (or, on touch
 * screens, while it's in view). A segmented bar fills like a progress track.
 * Reduced motion keeps the cover.
 */
export function HoverCarousel({
	frames,
	sizes,
}: {
	frames: Media[];
	sizes: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const [active, setActive] = useState(0);
	const [playing, setPlaying] = useState(false);
	const many = frames.length > 1;

	// Touch screens have no hover: play while the card is mostly on screen.
	useEffect(() => {
		if (!many || !matchMedia('(hover: none)').matches) return;
		const io = new IntersectionObserver(([e]) => setPlaying(e.isIntersecting), {
			threshold: 0.6,
		});
		io.observe(ref.current!);
		return () => io.disconnect();
	}, [many]);

	useEffect(() => {
		if (!playing || !many) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		const t = setInterval(() => setActive((i) => (i + 1) % frames.length), STEP);
		return () => clearInterval(t);
	}, [playing, many, frames.length]);

	const stop = () => {
		setPlaying(false);
		setActive(0);
	};

	return (
		<div
			ref={ref}
			onPointerEnter={(e) => e.pointerType === 'mouse' && setPlaying(true)}
			onPointerLeave={(e) => e.pointerType === 'mouse' && stop()}
			className="group relative aspect-video overflow-hidden bg-raised ring-1 ring-line"
		>
			{frames.map((f, i) => (
				<Image
					key={f.src}
					src={f.src}
					alt={i === 0 ? f.alt : ''}
					fill
					sizes={sizes}
					className={cn(
						'object-cover grayscale-[0.3] transition-[opacity,filter] duration-500 group-hover:grayscale-0',
						i === active ? 'opacity-100' : 'opacity-0',
					)}
				/>
			))}
			{many && (
				<div aria-hidden className="absolute inset-x-3 bottom-3 flex gap-1">
					{frames.map((f, i) => (
						<span
							key={f.src}
							className="h-0.5 flex-1 overflow-hidden bg-white/25"
						>
							<span
								className={cn(
									'block h-full origin-left bg-accent',
									i < active && 'scale-x-100',
									i > active && 'scale-x-0',
									i === active &&
										(playing
											? 'animate-[segment_1.4s_linear_forwards]'
											: 'scale-x-0'),
								)}
							/>
						</span>
					))}
				</div>
			)}
		</div>
	);
}
