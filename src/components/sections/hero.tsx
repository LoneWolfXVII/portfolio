'use client';

import { Crosshair } from '@/components/crosshair';
import { Cta } from '@/components/cta';
import { ArrowDown } from '@/components/icons';
import { LocalTime } from '@/components/local-time';
import { profile } from '@/content/profile';
import { REVISION } from '@/content/sheets';
import { gsap, MOTION_OK, SplitText, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

const SCRAMBLE_CHARS = 'abcdefghijklmnopqrstuvwxyz0123456789/_+';
const SCRAMBLE = 0.9;
// Module state: reset by every full page load, kept across in-site navigation.
let introPlayed = false;

/** Same markup renders twice: an outline "spec" layer and the filled "build" layer. */
function Headline() {
	return (
		<>
			I build web products{' '}
			<span className="whitespace-nowrap text-accent">end to end</span>, from
			Figma to production.
		</>
	);
}

export function Hero() {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(MOTION_OK, () => {
				// The intro plays on every page load. Coming back from a case
				// study without reloading, the hero is simply there.
				const seen = introPlayed;
				introPlayed = true;
				if (seen) {
					gsap.set('[data-hero-text]', { visibility: 'visible' });
					return;
				}

				// 1. The skeleton compiles in, word by word. Scrambling each word in
				// its own slot keeps line breaks stable while the text resolves.
				const words = SplitText.create('[data-outline]', {
					type: 'words',
					aria: 'none',
				}).words;
				// Lock each word to its final width so scrambling never nudges its neighbours.
				gsap.set(words, { width: (_, el: HTMLElement) => el.offsetWidth });
				gsap.set('[data-hero-text]', { visibility: 'visible' });
				const step = (SCRAMBLE - 0.45) / words.length;
				words.forEach((word, i) => {
					gsap.timeline({ delay: 0.1 + i * step })
						.from(word, { autoAlpha: 0, duration: 0.05 })
						.to(word, {
							duration: 0.45,
							ease: 'none',
							scrambleText: {
								text: word.textContent ?? '',
								chars: SCRAMBLE_CHARS,
								speed: 0.8,
							},
						})
						// Release the lock so the skeleton reflows with the fill on resize.
						.set(word, { clearProps: 'width' });
				});

				// 2. The build fills in over it, line by line.
				const split = SplitText.create('[data-fill]', {
					type: 'lines',
					aria: 'none',
					autoSplit: true,
					// Negative top/bottom insets keep ascenders and descenders unclipped.
					onSplit: (self) =>
						gsap.fromTo(
							self.lines,
							{ clipPath: 'inset(-20% 100% -30% 0%)' },
							{
								clipPath: 'inset(-20% 0% -30% 0%)',
								duration: 1.3,
								stagger: 0.18,
								delay: SCRAMBLE + 0.15,
								ease: 'expo.inOut',
								clearProps: 'clipPath',
							},
						),
				});

				// 3. Everything actionable lands immediately, not after the show.
				const tl = gsap.timeline({ defaults: { duration: 1 } });
				tl.from(
					'[data-rule]',
					{ scaleX: 0, transformOrigin: 'left', duration: 1.2 },
					0.1,
				).from('[data-rise]', { y: 16, autoAlpha: 0, stagger: 0.06 }, 0.2);

				return () => split.revert();
			});
		},
		{ scope: ref },
	);

	return (
		<section
			id="intro"
			ref={ref}
			aria-labelledby="hero-title"
			className="relative flex flex-col justify-end overflow-hidden px-4 pb-16 pt-36 md:min-h-[100dvh] md:px-8 md:pb-14 md:pt-28"
		>
			<Crosshair />

			<dl
				data-rise
				aria-label="Title block"
				className="annot absolute right-8 top-28 hidden w-72 border border-line lg:block"
			>
				{[
					['Drawing', 'NG-001'],
					['Author', profile.name],
					['Revision', REVISION],
					['Status', 'Issued for build'],
				].map(([k, v]) => (
					<div
						key={k}
						className="grid grid-cols-[6rem_1fr] border-b border-line last:border-b-0"
					>
						<dt className="border-r border-line px-3 py-2">{k}</dt>
						<dd className="px-3 py-2 text-ink/80">{v}</dd>
					</div>
				))}
			</dl>

			<div className="relative mx-auto w-full max-w-[1400px]">
				<div className="relative max-w-6xl text-[clamp(2.25rem,6.4vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.045em]">
					<div
						data-hero-text
						data-outline
						aria-hidden
						className="text-outline absolute inset-0 select-none [&_span]:text-transparent"
					>
						<Headline />
					</div>
					<h1
						id="hero-title"
						data-hero-text
						data-fill
						className="relative"
					>
						<Headline />
					</h1>
				</div>

				<div data-rule className="mt-12 h-px w-full bg-line" aria-hidden />
				{/* The title block, compressed to one line where the full one doesn't fit. */}
				<p data-rise className="annot mt-4 flex flex-wrap gap-x-3 lg:hidden">
					<span className="text-accent">NG-001</span>
					<span>Rev {REVISION}</span>
					<span>Issued for build</span>
				</p>

				<div className="mt-8 grid gap-8 md:grid-cols-12 md:items-end">
					<div data-rise className="md:col-span-6">
						<p className="max-w-md text-base text-muted md:text-lg">
							<span className="text-ink">{profile.name}</span>,
							founding engineer at investabl.ai. Before that, four
							years building product at Intract and Spyne.
						</p>
						<p className="annot mt-4 flex items-center gap-2.5 text-ink/80">
							<span className="relative flex size-2" aria-hidden>
								<span className="absolute inset-0 animate-ping rounded-full bg-accent/60 motion-reduce:hidden" />
								<span className="relative size-2 rounded-full bg-accent" />
							</span>
							Open to founding and senior roles
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Cta href="/#work" icon={<ArrowDown />}>
								See the work
							</Cta>
							<Cta href="/#contact" variant="ghost">
								Get in touch
							</Cta>
						</div>
					</div>
					<div
						data-rise
						className="annot hidden flex-col items-end gap-1 text-right md:col-span-3 md:col-start-10 md:flex"
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
