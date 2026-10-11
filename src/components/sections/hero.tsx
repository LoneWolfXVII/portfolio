'use client';

import { Crosshair } from '@/components/crosshair';
import { Cta } from '@/components/cta';
import { ArrowDown } from '@/components/icons';
import { LocalTime } from '@/components/local-time';
import { profile } from '@/content/profile';
import { gsap, MOTION_OK, SplitText, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

/** Same markup renders twice: an outline "spec" layer and the filled "build" layer. */
function Headline() {
	return (
		<>
			I design it, build it, and <span className="text-accent">ship it</span> to
			production.
		</>
	);
}

export function Hero() {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(MOTION_OK, () => {
				const split = SplitText.create('[data-fill]', {
					type: 'lines',
					autoSplit: true,
					// Negative top/bottom insets keep ascenders and descenders unclipped.
					onSplit: (self) =>
						gsap.fromTo(
							self.lines,
							{ clipPath: 'inset(-20% 100% -30% 0%)' },
							{
								clipPath: 'inset(-20% 0% -30% 0%)',
								duration: 1.4,
								stagger: 0.18,
								delay: 0.5,
								ease: 'expo.inOut',
								clearProps: 'clipPath',
							},
						),
				});

				const tl = gsap.timeline({ defaults: { duration: 1 } });
				tl.from('[data-outline]', { autoAlpha: 0, duration: 0.6 })
					.from('[data-rule]', { scaleX: 0, transformOrigin: 'left', duration: 1.2 }, 0.2)
					.from('[data-rise]', { y: 24, autoAlpha: 0, stagger: 0.08 }, 1.2);

				return () => split.revert();
			});
		},
		{ scope: ref },
	);

	return (
		<section
			ref={ref}
			aria-labelledby="hero-title"
			className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-4 pb-10 pt-32 md:px-8 md:pb-14"
		>
			<Crosshair />

			<dl
				data-rise
				aria-label="Title block"
				className="annot absolute right-8 top-28 hidden w-72 border border-line lg:block"
			>
				{[
					['Drawing', 'NG-001'],
					['Scale', '1 : 1'],
					['Revision', '2026.10'],
					['Status', 'Open to roles + projects'],
				].map(([k, v]) => (
					<div key={k} className="grid grid-cols-[6rem_1fr] border-b border-line last:border-b-0">
						<dt className="border-r border-line px-3 py-2">{k}</dt>
						<dd className="px-3 py-2 text-ink/80">{v}</dd>
					</div>
				))}
			</dl>

			<div className="relative mx-auto w-full max-w-[1400px]">
				<p data-rise className="annot mb-8 flex items-center gap-3">
					<span className="size-1.5 rounded-full bg-accent" aria-hidden />
					{profile.role} at investabl.ai
				</p>

				<h1
					id="hero-title"
					className="relative max-w-6xl text-[clamp(2.25rem,6.4vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.045em]"
				>
					<span data-outline aria-hidden className="text-outline absolute inset-0 select-none [&_span]:text-transparent">
						<Headline />
					</span>
					<span data-fill className="relative block">
						<Headline />
					</span>
				</h1>

				<div data-rule className="mt-12 h-px w-full bg-line" aria-hidden />

				<div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
					<p data-rise className="max-w-md text-base text-muted md:col-span-5 md:text-lg">
						Founding engineer taking products from design system to interface,
						services and cloud. Previously Intract and Spyne.
					</p>
					<div data-rise className="flex flex-wrap gap-3 md:col-span-4">
						<Cta href="/#work" icon={<ArrowDown />}>
							See the work
						</Cta>
						<Cta href="/#contact" variant="ghost">
							Get in touch
						</Cta>
					</div>
					<div
						data-rise
						className="annot hidden flex-col items-end gap-1 text-right md:col-span-3 md:flex"
					>
						<span>{profile.location}</span>
						<span>{profile.coords}</span>
						<LocalTime />
					</div>
				</div>
			</div>
		</section>
	);
}
