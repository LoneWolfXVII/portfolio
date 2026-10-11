import { Cta } from '@/components/cta';
import { ArrowLeft, ArrowRight } from '@/components/icons';
import { caseStudies } from '@/content/work';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Page not found' };

export default function NotFound() {
	return (
		<section className="flex min-h-[100dvh] flex-col justify-center px-4 md:px-8">
			<div className="mx-auto w-full max-w-[1400px]">
				<p
					aria-hidden
					className="text-outline text-[clamp(6rem,22vw,18rem)] font-medium leading-none tracking-[-0.05em]"
				>
					404
				</p>
				<h1 className="mt-6 text-[clamp(2rem,4vw,3.5rem)] font-medium leading-tight tracking-[-0.04em]">
					This page doesn’t exist.
				</h1>
				<p className="mt-4 max-w-md text-muted">
					It may have moved. Try one of the case studies below.
				</p>
				<Cta href="/" icon={<ArrowLeft />} className="mt-10">
					Back to the work
				</Cta>

				<nav
					aria-label="Case studies"
					className="mt-16 max-w-xl border-t border-line"
				>
					<p className="annot py-4">Or open a case study</p>
					<ul>
						{caseStudies.map((w) => (
							<li key={w.slug} className="border-t border-line">
								<Link
									href={`/work/${w.slug}`}
									className="group flex min-h-14 items-center justify-between gap-4 text-lg tracking-[-0.02em] transition-colors duration-300 hover:text-accent"
								>
									{w.title}
									<ArrowRight className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1" />
								</Link>
							</li>
						))}
					</ul>
				</nav>
			</div>
		</section>
	);
}
