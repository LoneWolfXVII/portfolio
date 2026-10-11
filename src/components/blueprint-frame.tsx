'use client';

import type { Media } from '@/content/work';
import { DESKTOP, gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Pause, Play } from '@/components/icons';
import { useRef, useState } from 'react';

type Props = {
	media?: Media;
	/** Rendered inside the frame when there is no media (type-led variant). */
	children?: React.ReactNode;
	label: string;
	priority?: boolean;
	sizes?: string;
	className?: string;
	/** Aspect ratio when there is no media. */
	ratio?: string;
	/** Pixel size for the dimension labels when children supply the image. */
	size?: { width: number; height: number };
};

/**
 * Wireframe → screen. A drawn frame with dimension lines resolves into the real
 * image as it scrolls into view. Reduced motion skips straight to the image.
 */
export function BlueprintFrame({
	media,
	children,
	label,
	priority,
	sizes = '(min-width: 768px) 60vw, 100vw',
	className,
	ratio = '16 / 10',
	size,
}: Props) {
	const ref = useRef<HTMLElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	// A viewer's explicit pause wins over scroll-driven autoplay (WCAG 2.2.2).
	const userPaused = useRef(false);
	const [playing, setPlaying] = useState(false);

	const toggleVideo = () => {
		const video = videoRef.current;
		if (!video) return;
		if (video.paused) {
			userPaused.current = false;
			video.play().catch(() => {});
		} else {
			userPaused.current = true;
			video.pause();
		}
	};

	useGSAP(
		() => {
			const mm = gsap.matchMedia();
			mm.add({ motion: MOTION_OK, desktop: DESKTOP }, (ctx) => {
				const { motion, desktop } = ctx.conditions as {
					motion: boolean;
					desktop: boolean;
				};
				const video = videoRef.current;

				if (video) {
					const play = () => video.play().catch(() => {});
					// Reduced motion: poster only, never autoplay.
					if (motion) {
						ScrollTrigger.create({
							trigger: ref.current,
							start: 'top bottom',
							end: 'bottom top',
							onToggle: (st) =>
								st.isActive && !userPaused.current
									? play()
									: video.pause(),
						});
					}
				}

				// Above-the-fold frames are already in view: no draw-in to wait on.
				if (!motion || priority) return;

				const tl = gsap.timeline({
					defaults: { ease: desktop ? 'none' : 'power2.out' },
					scrollTrigger: desktop
						? {
								trigger: ref.current,
								start: 'top 90%',
								end: 'top 30%',
								scrub: 0.6,
							}
						: { trigger: ref.current, start: 'top 85%', once: true },
				});

				tl.fromTo(
					'[data-frame]',
					{ strokeDashoffset: 1 },
					{ strokeDashoffset: 0, duration: 0.4 },
				)
					.from('[data-dim-x]', { scaleX: 0, duration: 0.3 }, 0.1)
					.from('[data-dim-y]', { scaleY: 0, duration: 0.3 }, 0.1)
					.fromTo(
						'[data-media]',
						{ clipPath: 'inset(0% 0% 100% 0%)' },
						{ clipPath: 'inset(0% 0% 0% 0%)', duration: 0.5 },
						0.35,
					)
					.from('[data-media-inner]', { scale: 1.15, duration: 0.6 }, 0.35)
					.to('[data-frame]', { opacity: 0.3, duration: 0.2 }, 0.8);
			});
		},
		{ scope: ref },
	);

	const w = media?.width ?? size?.width;
	const h = media?.height ?? size?.height;

	return (
		<figure ref={ref} className={cn('relative', className)}>
			{/* Dimension lines */}
			<div
				aria-hidden
				className="pointer-events-none absolute -top-6 left-0 right-0 hidden sm:block"
			>
				<div data-dim-x className="relative h-3 origin-left">
					<div className="absolute inset-x-0 top-1/2 h-px bg-white/15" />
					<div className="absolute left-0 top-0 h-3 w-px bg-white/30" />
					<div className="absolute right-0 top-0 h-3 w-px bg-white/30" />
					<span className="annot absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-bg px-2 text-[10px]">
						{w ? `${w}px` : '16 : 10'}
					</span>
				</div>
			</div>
			<div
				aria-hidden
				className="pointer-events-none absolute -left-6 bottom-0 top-0 hidden sm:block"
			>
				<div data-dim-y className="relative h-full w-3 origin-top">
					<div className="absolute inset-y-0 left-1/2 w-px bg-white/15" />
					<div className="absolute left-0 top-0 h-px w-3 bg-white/30" />
					<div className="absolute bottom-0 left-0 h-px w-3 bg-white/30" />
				</div>
			</div>

			<div
				className="relative"
				style={{ aspectRatio: w && h ? `${w} / ${h}` : ratio }}
			>
				<div
					data-media
					className="absolute inset-0 overflow-hidden bg-raised"
				>
					<div data-media-inner className="absolute inset-0">
						{media?.video ? (
							<video
								ref={videoRef}
								className="size-full object-cover"
								src={media.video}
								poster={media.src}
								muted
								loop
								playsInline
								preload="none"
								aria-label={media.alt}
								onPlay={() => setPlaying(true)}
								onPause={() => setPlaying(false)}
							/>
						) : media ? (
							<Image
								quality={90}
								src={media.src}
								alt={media.alt}
								fill
								sizes={sizes}
								priority={priority}
								className="object-cover object-top"
							/>
						) : (
							children
						)}
					</div>
				</div>

				<svg
					aria-hidden
					className="pointer-events-none absolute inset-0 size-full overflow-visible"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
				>
					<rect
						data-frame
						x="0"
						y="0"
						width="100"
						height="100"
						fill="none"
						stroke="rgb(255 255 255 / 0.5)"
						strokeWidth="1"
						vectorEffect="non-scaling-stroke"
						pathLength={1}
						strokeDasharray="1"
					/>
				</svg>

				{media?.video && (
					<button
						type="button"
						onClick={toggleVideo}
						aria-label={playing ? 'Pause video' : 'Play video'}
						className="absolute bottom-3 right-3 grid size-11 place-items-center rounded-full bg-bg/75 text-ink ring-1 ring-white/15 backdrop-blur transition-colors duration-300 hover:ring-white/35"
					>
						{playing ? <Pause /> : <Play />}
					</button>
				)}

				{/* Corner registration marks */}
				{[
					'-left-2 -top-2',
					'-right-2 -top-2',
					'-left-2 -bottom-2',
					'-right-2 -bottom-2',
				].map((pos) => (
					<span
						key={pos}
						aria-hidden
						className={cn('absolute size-4', pos)}
					>
						<span className="absolute left-1/2 top-0 h-full w-px bg-accent/70" />
						<span className="absolute left-0 top-1/2 h-px w-full bg-accent/70" />
					</span>
				))}
			</div>

			<figcaption className="annot mt-4 flex justify-between gap-4">
				{/* The caption is prose (a title or a stack); only the measurement stays mono. */}
				<span className="font-sans text-sm normal-case tracking-normal">
					{label}
				</span>
				{w && h && (
					<span aria-hidden className="hidden shrink-0 sm:inline">
						{w} × {h}
					</span>
				)}
			</figcaption>
		</figure>
	);
}
