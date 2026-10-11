'use client';

import { stack } from '@/content/profile';
import { gsap, MOTION_OK, SplitText, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

export function About() {
	const ref = useRef<HTMLElement>(null);

	useGSAP(
		() => {
			gsap.matchMedia().add(MOTION_OK, () => {
				const split = SplitText.create('[data-scrub]', {
					type: 'words',
					autoSplit: true,
					onSplit: (self) =>
						gsap.fromTo(
							self.words,
							{ opacity: 0.15 },
							{
								opacity: 1,
								stagger: 0.1,
								ease: 'none',
								scrollTrigger: {
									trigger: '[data-scrub]',
									start: 'top 80%',
									end: 'bottom 45%',
									scrub: true,
								},
							},
						),
				});
				return () => split.revert();
			});
		},
		{ scope: ref },
	);

	return (
		<section
			id="about"
			ref={ref}
			aria-labelledby="about-title"
			className="px-4 py-32 md:px-8 md:py-48"
		>
			<div className="mx-auto max-w-[1400px]">
				<h2 id="about-title" className="annot mb-10">
					How I work
				</h2>
				<p
					data-scrub
					className="max-w-6xl text-[clamp(1.75rem,3.6vw,3.25rem)] font-medium leading-[1.12] tracking-[-0.03em]"
				>
					I started in frontend and kept following the product down the stack. Today I
					draw the component, write the API behind it and deploy the machine it runs
					on. I care about the details people feel but rarely name: how fast a screen
					answers, how motion explains a state, how a system stays small enough for
					one person to hold in their head.
				</p>

				<dl className="mt-24 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
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
			</div>
		</section>
	);
}
