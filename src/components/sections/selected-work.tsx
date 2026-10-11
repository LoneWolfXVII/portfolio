import { BlueprintFrame } from '@/components/blueprint-frame';
import { ArrowUpRight } from '@/components/icons';
import { TypeFrame } from '@/components/type-frame';
import { work } from '@/content/work';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';

const featured = work.filter((w) => w.featured);
const archive = work.filter((w) => !w.featured && !w.hasPage);
const credit = archive.find((w) => w.credits)?.credits;

export function SelectedWork() {
	return (
		<section aria-labelledby="work-title" className="px-4 py-32 md:px-8 md:py-48">
			<div className="mx-auto max-w-[1400px]">
				<header className="mb-24 flex flex-col justify-between gap-6 border-b border-line pb-8 md:mb-32 md:flex-row md:items-end">
					<h2
						id="work-title"
						className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.045em]"
					>
						Selected work
					</h2>
					<p className="annot">Intract · Spyne · 2022 to 2026</p>
				</header>

				<ul className="flex flex-col gap-32 md:gap-48">
					{featured.map((w, i) => {
						const flip = i % 2 === 1;
						return (
							<li key={w.slug} className="grid gap-10 md:grid-cols-12 md:items-end md:gap-8">
								<div className={cn('md:col-span-7', flip && 'md:order-2 md:col-start-6')}>
									<Link
										href={`/work/${w.slug}`}
										// Duplicate of the text link below: keep it out of the tab order.
										tabIndex={-1}
										aria-hidden
										className="block"
									>
										<BlueprintFrame
											media={w.cover}
											label={`${w.company} / ${w.title}`}
											sizes="(min-width: 768px) 58vw, 100vw"
										>
											<TypeFrame title={w.title} modules={w.schematic ?? w.stack} />
										</BlueprintFrame>
									</Link>
								</div>
								<div
									className={cn(
										'md:col-span-4',
										flip ? 'md:order-1 md:col-start-1' : 'md:col-start-9',
									)}
								>
									<p className="annot mb-4">
										{w.company} · {w.role} · {w.years}
									</p>
									<h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
										{w.title}
									</h3>
									<p className="mt-4 text-muted">{w.oneLiner}</p>
									<p className="annot mt-6 normal-case tracking-normal">
										{w.stack.join(' / ')}
									</p>
									<Link
										href={`/work/${w.slug}`}
										className="group mt-8 inline-flex items-center gap-2 border-b border-white/20 pb-1 text-sm transition-colors duration-300 hover:border-accent"
									>
										Read case study
										<ArrowUpRight className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
									</Link>
								</div>
							</li>
						);
					})}
				</ul>

				<div className="mt-40">
					<p className="annot mb-8 border-b border-line pb-4">Also shipped at Intract</p>
					<ul className="grid gap-8 md:grid-cols-2">
						{archive.map((w) => (
							<li key={w.slug} className="group">
								<div className="relative aspect-[16/9] overflow-hidden bg-raised ring-1 ring-line">
									{w.cover && (
										<Image
											src={w.cover.src}
											alt={w.cover.alt}
											fill
											sizes="(min-width: 768px) 45vw, 100vw"
											className="object-cover opacity-80 grayscale-[0.3] transition-[transform,opacity] duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.03] group-hover:opacity-100"
										/>
									)}
								</div>
								<div className="mt-5 flex items-baseline justify-between gap-4">
									<h3 className="text-xl font-medium tracking-[-0.02em]">{w.title}</h3>
									<span className="annot shrink-0">{w.years}</span>
								</div>
								<p className="mt-2 text-sm text-muted">{w.oneLiner}</p>
							</li>
						))}
					</ul>
					{credit && (
						<p className="annot mt-10">
							{credit.role} by{' '}
							<a
								href={credit.href}
								target="_blank"
								rel="noopener noreferrer"
								className="underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent"
							>
								{credit.name}
							</a>
						</p>
					)}
				</div>
			</div>
		</section>
	);
}
