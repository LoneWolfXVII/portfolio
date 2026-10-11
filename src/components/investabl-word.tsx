'use client';

import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

const UP = '#62e99f';
const DOWN = '#f2645a';
const FLAT = 'currentColor';

type Shape = { high: number; top: number; bottom: number; low: number };

/**
 * "investabl" with its i drawn as a live candle. Like a price, it ticks
 * every second or so: the body eases to its new open/close and the colour
 * glides to green (up), red (down) or white when it barely moved. It only
 * runs while on screen; reduced motion keeps a still green candle.
 */
export function InvestablWord({ suffix = '' }: { suffix?: string }) {
	const ref = useRef<HTMLSpanElement>(null);

	useGSAP(
		() => {
			const body = ref.current!.querySelector<SVGRectElement>('[data-body]')!;
			const wickTop =
				ref.current!.querySelector<SVGRectElement>('[data-wick-top]')!;
			const wickBottom =
				ref.current!.querySelector<SVGRectElement>('[data-wick-bottom]')!;
			const candle = ref.current!.querySelector<SVGGElement>('[data-candle]')!;

			// Candle geometry in viewBox units. Each tick reshapes the whole candle:
			// wick tips, and the body's open and close, the way a live bar trades.
			const draw = (c: Shape) => {
				gsap.set(wickTop, {
					attr: { y: c.high, height: c.top - c.high + 2 },
				});
				gsap.set(body, { attr: { y: c.top, height: c.bottom - c.top } });
				gsap.set(wickBottom, {
					attr: { y: c.bottom - 2, height: c.low - c.bottom + 2 },
				});
			};

			gsap.matchMedia().add(MOTION_OK, () => {
				const state: Shape = { high: 22, top: 27, bottom: 51, low: 61 };
				let close = 0;
				let timer: gsap.core.Tween | undefined;
				let live = false;

				const tick = () => {
					// A mean-reverting random walk: it wanders, never runs away.
					const last = close;
					close = gsap.utils.clamp(
						-1,
						1,
						close * 0.5 + gsap.utils.random(-0.9, 0.9),
					);
					const move = close - last;
					// The fill transition (CSS) makes the colour change glide.
					candle.style.fill =
						move > 0.15 ? UP : move < -0.15 ? DOWN : FLAT;
					const r = gsap.utils.random;
					gsap.to(state, {
						// Body: a tall bar on a big move, a short one when it barely trades.
						top: 34 - Math.abs(move) * 7 - close * 3 + r(-1.5, 1.5),
						bottom: 44 + Math.abs(move) * 7 - close * 3 + r(-1.5, 1.5),
						high: r(19, 25),
						low: r(56, 62),
						duration: 0.55,
						ease: 'back.out(1.4)',
						overwrite: true,
						onUpdate: () => draw(state),
					});
					if (live) timer = gsap.delayedCall(r(0.8, 1.6), tick);
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
