'use client';

import { SheetBlock } from '@/components/sheet-block';
import { experience } from '@/content/experience';
import { stack } from '@/content/profile';
import { DESKTOP, gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

// Newest first: the current role is what a reader needs first. The counter
// rewinds through the years as the log scrolls back in time.
const log = experience;
const first = log[0].startYear;

export function BuildLog() {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(`${MOTION_OK} and ${DESKTOP}`, () => {
				const counter =
					ref.current!.querySelector<HTMLElement>('[data-year]')!;
				const proxy = { year: first };
				const goTo = (year: number) =>
					gsap.to(proxy, {
						year,
						duration: 0.9,
						ease: 'power3.out',
						overwrite: true,
						onUpdate: () => {
							counter.textContent = String(Math.round(proxy.year));
						},
					});

				gsap.utils.toArray<HTMLElement>('[data-role]').forEach((el, i) => {
					ScrollTrigger.create({
						trigger: el,
						start: 'top 55%',
						end: 'bottom 55%',
						onToggle: (st) => {
							el.toggleAttribute('data-active', st.isActive);
							if (st.isActive) goTo(log[i].startYear);
						},
					});
					gsap.from(el, {
						autoAlpha: 0,
						y: 48,
						duration: 1,
						scrollTrigger: { trigger: el, start: 'top 85%' },
					});
				});
			});

			// The ruler draws down as you read, on every screen size.
			gsap.matchMedia().add(MOTION_OK, () => {
				gsap.from('[data-ruler]', {
					scaleY: 0,
					transformOrigin: 'top',
					ease: 'none',
					scrollTrigger: {
						trigger: '[data-list]',
						start: 'top 60%',
						end: 'bottom 60%',
						scrub: true,
					},
				});
				// Each role's marker lights as the ruler reaches it.
				gsap.utils.toArray<HTMLElement>('[data-role]').forEach((el) =>
					ScrollTrigger.create({
						trigger: el,
						start: 'top 60%',
						end: 'bottom 60%',
						onToggle: (st) =>
							el.toggleAttribute('data-active', st.isActive),
					}),
				);
			});
		},
		{ scope: ref },
	);

	return (
		<section
			id="experience"
			ref={ref}
			aria-labelledby="experience-title"
			className="px-4 py-28 md:px-8 md:py-36"
		>
			<div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-12">
				<div className="md:col-span-5">
					<div className="md:sticky md:top-32">
						<h2
							id="experience-title"
							className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.045em]"
						>
							Experience
						</h2>
						<p className="mt-6 max-w-sm text-xl leading-snug tracking-[-0.02em]">
							I started on the frontend. Now I run the whole stack.
						</p>
						<p className="mt-3 max-w-sm text-muted">
							From an internship in 2021 to founding engineer today.
						</p>
						<p
							aria-hidden
							data-year
							className="mt-16 hidden font-mono text-[clamp(5rem,11vw,10rem)] leading-none tracking-[-0.06em] text-ink/90 md:block motion-reduce:md:hidden"
						>
							{first}
						</p>
					</div>
				</div>

				<ol data-list className="relative md:col-span-7">
					<div
						aria-hidden
						className="absolute bottom-0 left-0 top-0 w-px bg-line"
					>
						<div data-ruler className="h-full w-px bg-accent" />
					</div>
					{log.map((r) => (
						<li
							key={r.company}
							data-role
							className="group relative grid gap-3 py-14 pl-8 md:pl-12"
						>
							<span
								aria-hidden
								className="absolute -left-[4px] top-[3.85rem] size-[9px] rounded-full border border-white/30 bg-bg transition-colors duration-500 group-data-[active]:border-accent group-data-[active]:bg-accent"
							/>
							<p className="annot">
								{r.start} to {r.end} · {r.location}
							</p>
							<h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
								{r.company}
							</h3>
							<p className="text-ink/70">{r.role}</p>
							<ul className="mt-4 grid gap-2.5 text-sm text-muted">
								{r.points.map((p) => (
									<li
										key={p}
										className="grid grid-cols-[1rem_1fr]"
									>
										<span
											aria-hidden
											className="mt-[0.7em] h-px w-2.5 bg-white/25"
										/>
										{p}
									</li>
								))}
							</ul>
						</li>
					))}
				</ol>
			</div>

			<div className="mx-auto max-w-[1400px]">
				<dl
					aria-label="Stack"
					className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4"
				>
					{stack.map((g) => (
						<div
							key={g.group}
							className="border-b border-line py-6 sm:pr-6 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0"
						>
							<dt className="annot mb-4 text-accent">{g.group}</dt>
							<dd className="flex flex-wrap gap-x-3 gap-y-1.5 text-ink/80">
								{g.items.map((it) => (
									<span key={it}>{it}</span>
								))}
							</dd>
						</div>
					))}
				</dl>
				<SheetBlock id="experience" />
			</div>
		</section>
	);
}
