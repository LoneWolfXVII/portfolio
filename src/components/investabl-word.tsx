'use client';

import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

const UP = '#62e99f';
const DOWN = '#f2645a';
const FLAT = 'currentColor';

/**
 * "investabl" with its i drawn as a live candle. Like a price, it ticks
 * every second or so: the body eases to its new open/close and the colour
 * glides to green (up), red (down) or white when it barely moved. It only
 * runs while on screen; reduced motion keeps a still green candle.
 */
export function InvestablWord({ suffix = '.ai' }: { suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const body = ref.current!.querySelector<SVGRectElement>('[data-body]')!;
			const wickTop =
				ref.current!.querySelector<SVGRectElement>('[data-wick-top]')!;
			const wickBottom =
				ref.current!.querySelector<SVGRectElement>('[data-wick-bottom]')!;
			const candle = ref.current!.querySelector<SVGGElement>('[data-candle]')!;

			// Candle geometry in viewBox units: wicks reach 22 and 61, body sits between.
			const draw = (top: number, bottom: number) => {
				gsap.set(body, { attr: { y: top, height: bottom - top } });
				gsap.set(wickTop, { attr: { y: 22, height: top - 22 + 2 } });
				gsap.set(wickBottom, {
					attr: { y: bottom - 2, height: 61 - bottom + 2 },
				});
			};

			gsap.matchMedia().add(MOTION_OK, () => {
				const state = { top: 27, bottom: 51 };
				let price = 0.4;
				let timer: gsap.core.Tween | undefined;
				let live = false;

				const tick = () => {
					// A mean-reverting random walk, so it wanders but never runs away.
					const last = price;
					price = gsap.utils.clamp(
						-1,
						1,
						price * 0.6 + gsap.utils.random(-0.7, 0.7),
					);
					const move = price - last;
					// The fill transition (CSS) makes the colour change glide.
					candle.style.fill =
						move > 0.12 ? UP : move < -0.12 ? DOWN : FLAT;
					gsap.to(state, {
						top: 27 - price * 4,
						bottom: 51 + price * 3,
						duration: 0.5,
						ease: 'expo.out',
						overwrite: true,
						onUpdate: () => draw(state.top, state.bottom),
					});
					if (live)
						timer = gsap.delayedCall(gsap.utils.random(0.7, 1.5), tick);
				};

				const io = new IntersectionObserver(([e]) => {
					live = e.isIntersecting;
					timer?.kill();
					if (live) timer = gsap.delayedCall(0.6, tick);
				});
				io.observe(ref.current!);
				return () => {
					io.disconnect();
					timer?.kill();
					candle.style.fill = '';
				};
			});
		},
		{ scope: ref },
	);

	return (
		<span ref={ref} className="whitespace-nowrap">
			<span className="sr-only">investabl{suffix}</span>
			<span aria-hidden>
				<svg
					viewBox="26 0 12 64"
					className="inline-block h-[1em] w-[0.19em] overflow-visible"
					style={{ verticalAlign: '-0.1em', marginRight: '0.05em' }}
				>
					<rect
						x="27"
						y="9"
						width="10"
						height="10"
						rx="2.5"
						fill="#f5ac52"
					/>
					<g
						data-candle
						fill={UP}
						className="[transition:fill_0.3s_cubic-bezier(0.23,1,0.32,1)] motion-reduce:[transition:none]"
					>
						<rect
							data-wick-top
							x="30.5"
							y="22"
							width="3"
							height="7"
							rx="1.5"
						/>
						<rect
							data-body
							x="27"
							y="27"
							width="10"
							height="24"
							rx="2.5"
						/>
						<rect
							data-wick-bottom
							x="30.5"
							y="49"
							width="3"
							height="12"
							rx="1.5"
						/>
					</g>
				</svg>
				nvestabl{suffix}
			</span>
		</span>
	);
}
