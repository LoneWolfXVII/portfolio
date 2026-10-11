'use client';

import { Cta } from '@/components/cta';
import { getWork } from '@/content/work';
import { DESKTOP, gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import { useRef } from 'react';

const inv = getWork('investabl')!;
const layers = inv.layers!;

/**
 * The layer stack. Desktop + motion: a tall track with a sticky stage; the four
 * layers start exploded in isometric space, light up one by one, then collapse
 * flat under the live product. Everyone else gets the final, flat state.
 */
export function FeaturedInvestabl() {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(`${MOTION_OK} and ${DESKTOP}`, () => {
				const items = gsap.utils.toArray<HTMLElement>('[data-layer-item]');
				const cards = gsap.utils.toArray<HTMLElement>('[data-card]');
				let active = -1;

				const setActive = (i: number) => {
					if (i === active) return;
					active = i;
					items.forEach((el, j) =>
						el.toggleAttribute('data-active', j === i),
					);
					cards.forEach((el) =>
						el.toggleAttribute(
							'data-active',
							el.dataset.i === String(i),
						),
					);
				};

				const tl = gsap.timeline({
					defaults: { ease: 'none' },
					scrollTrigger: {
						trigger: '[data-track]',
						start: 'top top',
						end: 'bottom bottom',
						scrub: 0.8,
						onUpdate: (st) => {
							const p = st.progress;
							setActive(
								p < 0.05
									? -1
									: p > 0.62
										? 4
										: Math.min(
												3,
												Math.floor((p - 0.05) / 0.1425),
											),
							);
						},
					},
				});

				// 0 → 0.5: exploded, each layer lights up. 0.5 → 0.68: collapse.
				// 0.66 → 0.8: flatten. 0.74+: the live product lands on top.
				const iso = { rotateX: 50, rotateZ: -34, scale: 0.6, yPercent: 22 };
				// The product sits 2px proud of the stack so the planes never z-fight.
				gsap.set('[data-product]', { z: 2 });
				tl.fromTo('[data-stack]', iso, { ...iso, duration: 0.66 }, 0)
					.from(cards, { z: (i) => i * 125, duration: 0.18 }, 0.5)
					.to(
						'[data-stack]',
						{
							rotateX: 0,
							rotateZ: 0,
							scale: 1,
							yPercent: 0,
							duration: 0.14,
						},
						0.66,
					)
					.from(
						'[data-product]',
						{ autoAlpha: 0, z: 260, duration: 0.12 },
						0.74,
					)
					.fromTo(
						'[data-progress]',
						{ scaleX: 0 },
						{ scaleX: 1, duration: 1 },
						0,
					)
					.set({}, {}, 1);

				return () => {
					items.forEach((el) => el.removeAttribute('data-active'));
					cards.forEach((el) => el.removeAttribute('data-active'));
				};
			});
		},
		{ scope: ref },
	);

	return (
		<section
			id="work"
			ref={ref}
			aria-labelledby="investabl-title"
			className="relative"
		>
			<div data-track className="relative motion-safe:md:h-[180vh]">
				<div className="mx-auto grid max-w-[1400px] px-4 py-24 md:grid-cols-12 md:gap-12 md:items-center md:px-8 motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-[100dvh] motion-safe:md:py-0">
					{/* On phones this column dissolves so the live screenshot can sit
					    between the summary and the layer list. */}
					<div className="max-md:contents md:col-span-5">
						<h2
							id="investabl-title"
							className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em]"
						>
							{inv.title}
						</h2>
						<p className="annot mt-4">
							{inv.role} · {inv.years}
						</p>
						<p className="mt-5 max-w-md text-muted">{inv.oneLiner}</p>

						<dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-5">
							{inv.figures!.map((f) => (
								<div key={f.label} className="flex flex-col-reverse">
									<dt className="annot mt-1">{f.label}</dt>
									<dd className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
										{f.value}
									</dd>
								</div>
							))}
						</dl>

						<ol className="mt-10 border-t border-line max-md:order-2">
							{layers.map((l) => (
								<li
									key={l.name}
									data-layer-item
									className="group grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5 text-muted transition-colors duration-500 data-[active]:text-ink"
								>
									<span className="annot transition-colors duration-500 group-data-[active]:text-accent">
										{l.name}
									</span>
									{/* With the 3D stage the tools live on the cards; elsewhere, here. */}
									<span className="text-sm motion-safe:md:hidden motion-safe:md:group-data-[active]:inline">
										{l.items.join(' · ')}
									</span>
									<span className="hidden text-sm motion-safe:md:inline motion-safe:md:group-data-[active]:hidden">
										{l.note}
									</span>
								</li>
							))}
						</ol>

						<div className="mt-10 flex flex-wrap items-center gap-3 max-md:order-3">
							<Cta href={`/work/${inv.slug}`}>Read case study</Cta>
							<Cta href={inv.link!} variant="ghost" external>
								Live product
							</Cta>
						</div>
					</div>

					<div className="relative max-md:order-1 max-md:mt-10 md:col-span-7 [perspective:1800px]">
						<div
							data-stack
							className="relative mx-auto aspect-[16/10] w-full [transform-style:preserve-3d]"
						>
							{[...layers].reverse().map((l, i) => {
								const order = layers.length - 1 - i;
								return (
									<div
										key={l.name}
										data-card
										data-i={order}
										style={{ zIndex: i }}
										className="absolute inset-0 flex flex-col justify-between rounded-[6px] bg-raised/80 bg-[linear-gradient(rgb(255_255_255/0.03)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.03)_1px,transparent_1px)] bg-[size:24px_24px] p-5 ring-1 ring-white/10 transition-[box-shadow,background-color] duration-500 data-[active]:bg-[#17120f] data-[active]:ring-accent/70 md:p-7"
									>
										<p className="text-3xl font-medium tracking-[-0.03em] md:text-6xl">
											{l.name}
										</p>
										<ul className="flex flex-wrap gap-1.5">
											{l.items.map((it) => (
												<li
													key={it}
													className="rounded-full px-3.5 py-1.5 text-base text-ink/80 ring-1 ring-white/15 md:text-lg"
												>
													{it}
												</li>
											))}
										</ul>
									</div>
								);
							})}

							<div
								data-product
								className="absolute inset-0 z-10 overflow-hidden rounded-[6px] ring-1 ring-white/15"
							>
								<Image
									src={inv.cover!.src}
									alt={inv.cover!.alt}
									fill
									sizes="(min-width: 768px) 55vw, 100vw"
									className="object-cover object-left-top"
								/>
							</div>
						</div>
						<p className="annot mt-5">app.investabl.ai · live site</p>
						<div
							aria-hidden
							className="mt-4 hidden h-px bg-line motion-safe:md:block"
						>
							<div
								data-progress
								className="h-px origin-left bg-accent"
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
