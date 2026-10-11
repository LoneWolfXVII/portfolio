'use client';

import type { Media } from '@/content/work';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import { useRef } from 'react';

const SHOWN = 'inset(0% 0% 0% 0%)';
// Each screen arrives from a different side, like cuts in a reel.
const SIDES = [
	{ clip: 'inset(100% 0% 0% 0%)', edge: 'y', from: 100 },
	{ clip: 'inset(0% 100% 0% 0%)', edge: 'x', from: 0 },
	{ clip: 'inset(0% 0% 0% 100%)', edge: 'x', from: 100 },
	{ clip: 'inset(0% 0% 100% 0%)', edge: 'y', from: 0 },
] as const;

/**
 * Hovering a project plays its screens as a short reel: each one wipes in
 * from a new side with an accent line riding the edge, settling from a slight
 * push-in. It ends on the cover so the loop is seamless; leaving retracts it.
 * Touch screens play while the card is in view; reduced motion keeps the cover.
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
				const edge = ref.current!.querySelector<HTMLElement>('[data-edge]')!;
				const hide = () =>
					layers.forEach((el, i) =>
						gsap.set(el, { clipPath: SIDES[i % SIDES.length].clip }),
					);
				hide();

				const reel = gsap.timeline({
					paused: true,
					repeat: -1,
					onRepeat: hide,
				});
				layers.forEach((el, i) => {
					const side = SIDES[i % SIDES.length];
					const at = i * 1.5;
					const axis = side.edge === 'x' ? 'left' : 'top';
					reel.set(
						edge,
						{
							autoAlpha: 1,
							width: side.edge === 'x' ? 2 : '100%',
							height: side.edge === 'x' ? '100%' : 2,
							left: side.edge === 'x' ? `${side.from}%` : 0,
							top: side.edge === 'y' ? `${side.from}%` : 0,
						},
						at,
					)
						.to(
							el,
							{ clipPath: SHOWN, duration: 0.9, ease: 'expo.inOut' },
							at,
						)
						.to(
							edge,
							{
								[axis]: `${100 - side.from}%`,
								duration: 0.9,
								ease: 'expo.inOut',
							},
							at,
						)
						.set(edge, { autoAlpha: 0 }, at + 0.9)
						.fromTo(
							el.firstElementChild,
							{ scale: 1.14 },
							{ scale: 1, duration: 1.5, ease: 'power3.out' },
							at,
						);
				});
				reel.set({}, {}, layers.length * 1.5);

				let retract: gsap.core.Tween | undefined;
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
					gsap.set(edge, { autoAlpha: 0 });
					// Retract whatever is showing, then rewind to the cover.
					retract = gsap.to(layers, {
						clipPath: (i) => SIDES[i % SIDES.length].clip,
						duration: 0.45,
						ease: 'power3.in',
						onComplete: () => {
							retract = undefined;
							reel.pause(0);
						},
					});
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
			{overlays.map((f, i) => (
				<div
					key={`${f.src}-${i}`}
					data-layer
					aria-hidden
					className="absolute inset-0 [clip-path:inset(100%_0%_0%_0%)]"
				>
					<div className="absolute inset-0">
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
			<span
				data-edge
				aria-hidden
				className="invisible absolute z-10 bg-accent"
			/>
		</div>
	);
}
