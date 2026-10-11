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
					aria: 'none',
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
									end: 'bottom 60%',
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
					className="max-w-5xl text-[clamp(2rem,4.6vw,4.25rem)] font-medium leading-[1.05] tracking-[-0.04em]"
				>
					Frontend at heart.
					<br />
					Full stack by ownership.
				</p>
				<p className="mt-8 max-w-md text-muted">
					Fast screens, motion with a purpose, and systems small enough to
					hold in your head.
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
