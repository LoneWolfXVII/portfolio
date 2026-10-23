'use client';

import type { Media } from '@/content/work';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import { useRef } from 'react';

// Each screen arrives from a different side, like cuts in a reel.
const SIDES = [
	{ x: 0, y: 100 },
	{ x: -100, y: 0 },
	{ x: 100, y: 0 },
	{ x: 0, y: -100 },
] as const;
const side = (i: number) => SIDES[i % SIDES.length];

/**
 * Hovering a project plays its screens as a short reel: each one wipes in
 * from a new side, settling from a slight push-in. The wipe is a pair of
 * opposing translates (the window slides in, the picture counter-slides), so
 * it runs on the compositor with no repaints. It ends on the cover so the
 * loop is seamless; leaving retracts it. Touch screens play while the card is
 * in view; reduced motion keeps the cover.
 */
export function HoverCarousel({
	frames,
	sizes,
}: {
	frames: Media[];
	sizes: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const play = useRef<() => void>(undefined);
	const stop = useRef<() => void>(undefined);
	// The last overlay repeats the cover, so wrapping around never jumps.
	const overlays = frames.length > 1 ? [...frames.slice(1), frames[0]] : [];

	useGSAP(
		() => {
			if (!overlays.length) return;
			gsap.matchMedia().add(MOTION_OK, () => {
				const layers = gsap.utils.toArray<HTMLElement>('[data-layer]');
				const pics = layers.map((el) => el.firstElementChild as HTMLElement);
				const hide = () =>
					layers.forEach((el, i) => {
						const s = side(i);
						// x/y: 0 clears the parked inline offset GSAP reads in as pixels.
						gsap.set(el, { x: 0, y: 0, xPercent: s.x, yPercent: s.y });
						gsap.set(pics[i], { xPercent: -s.x, yPercent: -s.y });
					});
				hide();

				const reel = gsap.timeline({
					paused: true,
					repeat: -1,
					onRepeat: hide,
				});
				layers.forEach((el, i) => {
					const at = i * 1.5;
					const wipe = {
						xPercent: 0,
						yPercent: 0,
						duration: 0.9,
						ease: 'expo.inOut',
					};
					reel.to(el, wipe, at)
						.to(pics[i], wipe, at)
						.fromTo(
							pics[i],
							{ scale: 1.14 },
							{ scale: 1, duration: 1.5, ease: 'power3.out' },
							at,
						);
				});
				reel.set({}, {}, layers.length * 1.5);

				let retract: gsap.core.Timeline | undefined;
				play.current = () => {
					// Back in mid-retract: start the reel over from the cover.
					if (retract) {
						retract.kill();
						retract = undefined;
						reel.pause(0);
					}
					reel.play();
				};
				stop.current = () => {
					reel.pause();
					// Retract whatever is showing, then rewind to the cover.
					const out = { duration: 0.45, ease: 'power3.in' };
					retract = gsap
						.timeline({
							onComplete: () => {
								retract = undefined;
								reel.pause(0);
							},
						})
						.to(
							layers,
							{
								...out,
								xPercent: (i) => side(i).x,
								yPercent: (i) => side(i).y,
							},
							0,
						)
						.to(
							pics,
							{
								...out,
								xPercent: (i) => -side(i).x,
								yPercent: (i) => -side(i).y,
							},
							0,
						);
				};

				// No hover on touch screens: play while the card is mostly in view.
				let io: IntersectionObserver | undefined;
				if (matchMedia('(hover: none)').matches) {
					io = new IntersectionObserver(
						([e]) =>
							e.isIntersecting ? play.current?.() : stop.current?.(),
						{ threshold: 0.6 },
					);
					io.observe(ref.current!);
				}
				return () => {
					io?.disconnect();
					play.current = stop.current = undefined;
				};
			});
		},
		{ scope: ref },
	);

	const cover = frames[0];

	return (
		<div
			ref={ref}
			onPointerEnter={(e) => e.pointerType === 'mouse' && play.current?.()}
			onPointerLeave={(e) => e.pointerType === 'mouse' && stop.current?.()}
			className="group relative aspect-video overflow-hidden bg-raised ring-1 ring-line"
		>
			<Image
				quality={90}
				src={cover.src}
				alt={cover.alt}
				fill
				sizes={sizes}
				className="object-cover grayscale-[0.3] transition-[filter,transform] duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.03] group-hover:grayscale-0"
			/>
			{/* Parked below the card until the reel runs. They load lazily with
			    the card, so a hover never waits on the network mid-wipe. */}
			{overlays.map((f, i) => (
				<div
					key={`${f.src}-${i}`}
					data-layer
					aria-hidden
					// A transform, not Tailwind's `translate`, so GSAP owns it.
					style={{ transform: 'translateY(100%)' }}
					className="absolute inset-0 overflow-hidden will-change-transform"
				>
					<div className="absolute inset-0 will-change-transform">
						<Image
							quality={90}
							src={f.src}
							alt=""
							fill
							sizes={sizes}
							className="object-cover"
						/>
					</div>
				</div>
			))}
		</div>
	);
}
