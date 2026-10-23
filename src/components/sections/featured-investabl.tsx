'use client';

import { Cta } from '@/components/cta';
import { Play } from '@/components/icons';
import { InvestablWord } from '@/components/investabl-word';
import { SheetBlock } from '@/components/sheet-block';
import { getWork } from '@/content/work';
import { DESKTOP, gsap, MOTION_OK, useGSAP } from '@/lib/gsap';
import Image from 'next/image';
import { useRef } from 'react';

const inv = getWork('investabl')!;
const layers = inv.layers!;
const cover = inv.cover!;
const screens = inv.gallery;

// Timeline units: the build runs 0 to 0.88, then each screen gets SCREEN_GAP.
const SCREEN_GAP = 0.3;
const TOTAL = 0.96 + screens.length * SCREEN_GAP;

// `end`: the label hangs from the box's right edge so it stays inside the frame.
type Box = {
	below?: boolean;
	x: number;
	y: number;
	w: number;
	h: number;
	label: string;
	end?: boolean;
};

// Regions of the landing screenshot, in % of the 1440×900 frame.
// Step 1 marks them as components; step 3 marks what feeds them.
const parts: Box[] = [
	{ x: 1, y: 0.6, w: 98, h: 5.6, label: 'Nav' },
	{ x: 5, y: 22, w: 46, h: 15, label: 'Display / H1' },
	{ x: 5, y: 44.5, w: 38, h: 8, label: 'Stat' },
	{ x: 5, y: 57.5, w: 15, h: 6.3, label: 'Button' },
	{ x: 56.8, y: 13.6, w: 31.2, h: 30, label: 'Feed' },
	{ x: 76, y: 37.6, w: 19, h: 38.4, label: 'Card' },
];
const services: Box[] = [
	{
		x: 56.8,
		y: 13.6,
		w: 31.2,
		h: 30,
		label: 'Live payouts · WebSockets',
		end: true,
	},
	{
		x: 5,
		y: 44.5,
		w: 38,
		h: 8,
		label: 'Stats · Fastify + PostgreSQL',
		below: true,
	},
	{
		x: 76,
		y: 37.6,
		w: 19,
		h: 38.4,
		label: 'Settled onchain',
		end: true,
		below: true,
	},
];

const at = (b: Box) => ({
	left: `${b.x}%`,
	top: `${b.y}%`,
	width: `${b.w}%`,
	height: `${b.h}%`,
});

/**
 * Blueprint → build, on the real product. The screenshot starts as a drawing
 * with its components marked, fills in as the interface, gains the services
 * that feed it, then goes live. Desktop scrubs it on a sticky stage; phones
 * play it once in view; reduced motion gets the finished build.
 */
export function FeaturedInvestabl() {
	const ref = useRef<HTMLElement>(null);
	const replay = useRef<() => void>(undefined);

	useGSAP(
		() => {
			const items = gsap.utils.toArray<HTMLElement>('[data-step]');
			const label =
				ref.current!.querySelector<HTMLElement>('[data-steplabel]')!;
			const setActive = (i: number) => {
				items.forEach((el, j) => el.toggleAttribute('data-active', j === i));
				if (i >= 0)
					label.textContent = `${i + 1} / ${layers.length} · ${layers[i].name}`;
			};

			// The build as one timeline: 0 drawing, 1 interface, 2 services, 3 live.
			const build = (tl: gsap.core.Timeline) =>
				tl
					.set('[data-ui]', { clipPath: 'inset(0% 100% 0% 0%)' }, 0)
					.fromTo(
						'[data-part]',
						{ autoAlpha: 0, scale: 0.96 },
						{ autoAlpha: 1, scale: 1, stagger: 0.03, duration: 0.12 },
						0.02,
					)
					.to(
						'[data-ui]',
						{
							clipPath: 'inset(0% 0% 0% 0%)',
							duration: 0.22,
							ease: 'power2.inOut',
						},
						0.24,
					)
					.to('[data-part]', { autoAlpha: 0, duration: 0.1 }, 0.36)
					.from(
						'[data-service]',
						{ autoAlpha: 0, y: 8, stagger: 0.04, duration: 0.08 },
						0.46,
					)
					.from(
						'[data-live]',
						{ yPercent: 100, autoAlpha: 0, duration: 0.12 },
						0.76,
					)
					// Built and live: now the rest of the product, one screen at a time.
					// A wipe as two opposing translates (the window rises, the picture
					// counter-sinks), so it stays on the compositor while scrubbing.
					.fromTo(
						'[data-screen]',
						// y: 0 clears the parked inline offset GSAP reads in as pixels.
						{ y: 0, yPercent: 100 },
						{
							yPercent: 0,
							duration: 0.24,
							ease: 'expo.inOut',
							stagger: SCREEN_GAP,
						},
						0.96,
					)
					.fromTo(
						'[data-screen] > div',
						{ yPercent: -100 },
						{
							yPercent: 0,
							duration: 0.24,
							ease: 'expo.inOut',
							stagger: SCREEN_GAP,
						},
						0.96,
					)
					.from(
						'[data-screen] > div',
						{
							scale: 1.08,
							duration: 0.4,
							ease: 'power3.out',
							stagger: SCREEN_GAP,
						},
						0.96,
					);

			const mm = gsap.matchMedia();

			mm.add(`${MOTION_OK} and ${DESKTOP}`, () => {
				const tl = gsap.timeline({
					defaults: { ease: 'none' },
					scrollTrigger: {
						trigger: '[data-track]',
						start: 'top top',
						end: 'bottom bottom',
						scrub: 0.8,
						onUpdate: ({ progress }) => {
							const t = progress * TOTAL;
							setActive(
								t < 0.22 ? 0 : t < 0.48 ? 1 : t < 0.72 ? 2 : 3,
							);
						},
					},
				});
				build(tl)
					.fromTo(
						'[data-progress]',
						{ scaleX: 0 },
						{ scaleX: 1, duration: TOTAL },
						0,
					)
					.set({}, {}, TOTAL);
				return () => setActive(-1);
			});

			mm.add(`${MOTION_OK} and (max-width: 767px)`, () => {
				const tl = gsap.timeline({
					defaults: { ease: 'power2.out' },
					scrollTrigger: {
						trigger: '[data-stage]',
						start: 'top 60%',
						once: true,
					},
				});
				// Same build, played in time: about two seconds a step, replayable.
				replay.current = () => tl.restart();
				build(tl)
					.call(() => setActive(0), [], 0)
					.call(() => setActive(1), [], 0.24)
					.call(() => setActive(2), [], 0.5)
					.call(() => setActive(3), [], 0.76)
					.timeScale(0.12);
				return () => {
					replay.current = undefined;
					setActive(-1);
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
			<div data-track className="relative motion-safe:md:h-[340vh]">
				<div className="mx-auto grid max-w-[1400px] px-4 pb-10 pt-24 md:grid-cols-12 md:items-center md:gap-12 md:px-8 motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-[100dvh] motion-safe:md:py-0">
					<div className="max-md:contents md:col-span-4">
						<h2
							id="investabl-title"
							className="text-[clamp(2.5rem,5vw,4.5rem)] font-medium leading-none tracking-[-0.04em]"
						>
							<InvestablWord />
						</h2>
						<p className="mt-4 text-sm text-ink/70">
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

						<ol className="mt-10 border-t border-line max-md:order-2 max-md:mt-8">
							{layers.map((l) => (
								<li
									key={l.name}
									data-step
									className="group grid grid-cols-[7.5rem_1fr] gap-4 border-b border-line py-3.5 text-muted transition-colors duration-500 data-[active]:text-ink"
								>
									<span className="annot transition-colors duration-500 group-data-[active]:text-accent">
										{l.name}
									</span>
									<span className="text-sm">
										{l.items.join(' · ')}
									</span>
								</li>
							))}
						</ol>

						<div className="mt-10 flex flex-wrap items-center gap-3 max-md:order-3">
							<Cta href={`/work/${inv.slug}`}>Read case study</Cta>
							<Cta href={inv.link!} variant="ghost" external>
								Open the app
							</Cta>
						</div>
					</div>

					<div className="relative max-md:order-1 max-md:mt-10 md:col-span-8">
						<div
							data-stage
							className="relative aspect-[16/10] w-full overflow-hidden rounded-[6px] bg-raised ring-1 ring-white/15"
						>
							{/* The drawing: the same screen, reduced to line. */}
							<div aria-hidden className="absolute inset-0">
								<Image
									quality={90}
									src={cover.src}
									alt=""
									fill
									sizes="(min-width: 768px) 62vw, 100vw"
									className="object-cover object-left-top opacity-50 [filter:grayscale(1)_contrast(1.8)_brightness(1.1)]"
								/>
								<div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] bg-[size:24px_24px]" />
							</div>

							{/* The build. Without JS or with reduced motion this is the finished state. */}
							<div data-ui className="absolute inset-0">
								<Image
									quality={90}
									src={cover.src}
									alt={cover.alt}
									fill
									sizes="(min-width: 768px) 62vw, 100vw"
									className="object-cover object-left-top"
								/>
							</div>

							<div aria-hidden className="absolute inset-0">
								{parts.map((b) => (
									<span
										key={b.label}
										data-part
										style={at(b)}
										className="invisible absolute border border-dashed border-white/50"
									>
										<span className="annot absolute -top-px left-0 -translate-y-full bg-bg px-1.5 py-0.5 text-[10px] text-ink/80">
											{b.label}
										</span>
									</span>
								))}
								{services.map((b) => (
									<span
										key={b.label}
										data-service
										style={at(b)}
										className="absolute rounded-[3px] ring-1 ring-accent"
									>
										<span
											className={`annot absolute whitespace-nowrap ${b.below ? 'top-full mt-1 max-md:hidden' : 'bottom-full mb-1'} rounded-full bg-accent px-2 py-0.5 text-[10px] text-bg ${b.end ? 'right-0' : 'left-0'}`}
										>
											{b.label}
										</span>
									</span>
								))}
							</div>

							{/* The rest of the product. Hidden until the build lands; reduced
							    motion and no-JS keep the finished landing screen. */}
							{screens.map((m) => (
								<div
									key={m.src}
									data-screen
									style={{ transform: 'translateY(100%)' }}
									className="absolute inset-0 overflow-hidden bg-[#0a0a0b] will-change-transform"
								>
									<div className="absolute inset-0 will-change-transform">
										<Image
											quality={90}
											src={m.src}
											alt={m.alt}
											fill
											sizes="(min-width: 768px) 62vw, 100vw"
											className={
												m.width / m.height > 1.7
													? 'object-contain object-top pt-[3%]'
													: 'object-cover object-left-top'
											}
										/>
									</div>
								</div>
							))}

							<div
								data-live
								className="annot absolute inset-x-0 bottom-0 flex h-[16%] min-h-9 flex-wrap content-center items-center gap-x-4 gap-y-1 border-t border-white/10 bg-bg/90 px-4 text-ink/80 backdrop-blur"
							>
								<span className="flex items-center gap-2 text-ink">
									<span
										className="relative flex size-2"
										aria-hidden
									>
										<span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
										<span className="relative size-2 rounded-full bg-accent" />
									</span>
									Live
								</span>
								<span>app.investabl.ai</span>
								<span className="max-sm:hidden">
									{layers[3].items.join(' · ')}
								</span>
							</div>
						</div>
						{/* Phones: which step is showing, large, plus a way to watch it again. */}
						<div className="mt-3 flex items-center justify-between gap-4 md:hidden">
							<p data-steplabel className="annot text-ink">
								{layers.length} / {layers.length} ·{' '}
								{layers[layers.length - 1].name}
							</p>
							<button
								type="button"
								onClick={() => replay.current?.()}
								className="annot hidden min-h-11 items-center gap-2 transition-colors duration-300 hover:text-ink [html.motion_&]:inline-flex"
							>
								<Play aria-hidden />
								Replay
							</button>
						</div>
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
			<div className="mx-auto max-w-[1400px] px-4 md:px-8">
				<SheetBlock id="work" className="mt-6 md:mt-6" />
			</div>
		</section>
	);
}
