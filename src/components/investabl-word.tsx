'use client';

import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

const UP = '#62e99f';
const DOWN = '#f2645a';
const FORMING = 'currentColor';

/**
 * "investabl" with its i drawn as a live candle: every few seconds it trades,
 * forming in white while the body and wicks move, then closing green or red.
 * It only ticks while on screen; reduced motion keeps a closed green candle.
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
				let timer: gsap.core.Tween | undefined;
				let live = false;

				const tick = () => {
					const move = gsap.utils.random(-1, 1);
					gsap.set(candle, { fill: FORMING });
					gsap.to(state, {
						top: 27 - move * 4,
						bottom: 51 + move * 3,
						duration: 1.1,
						ease: 'power2.inOut',
						onUpdate: () => draw(state.top, state.bottom),
						onComplete: () => {
							gsap.to(candle, {
								fill: move >= 0 ? UP : DOWN,
								duration: 0.25,
							});
							if (live)
								timer = gsap.delayedCall(
									gsap.utils.random(1.6, 4.5),
									tick,
								);
						},
					});
				};

				const io = new IntersectionObserver(([e]) => {
					live = e.isIntersecting;
					timer?.kill();
					if (live) timer = gsap.delayedCall(0.8, tick);
				});
				io.observe(ref.current!);
				return () => {
					io.disconnect();
					timer?.kill();
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
					<g data-candle fill={UP}>
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
