import { BlueprintFrame } from '@/components/blueprint-frame';
import { Credits } from '@/components/credits';
import { HoverCarousel } from '@/components/hover-carousel';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import { ProjectDetail } from '@/components/project-detail';
import { RevisionFrame } from '@/components/revision-frame';
import { SheetBlock } from '@/components/sheet-block';
import { TypeFrame } from '@/components/type-frame';
import { work, type Work } from '@/content/work';
import Link from 'next/link';

const featured = work.filter((w) => w.featured);
const archive = work.filter((w) => !w.featured && !w.hasPage);

// Each row gets its own scale so the alternation stops reading as a template.
const rows = [
	{ frame: 'md:col-span-8', text: 'md:col-span-3 md:col-start-10' },
	{
		frame: 'md:order-2 md:col-span-6 md:col-start-7',
		text: 'md:order-1 md:col-span-4 md:col-start-2',
	},
	{ frame: 'md:col-span-7', text: 'md:col-span-4 md:col-start-9' },
];

/** Gallery projects step through their screens; the rest keep a single frame. */
function Frame({ w }: { w: Work }) {
	const label = w.stack.join(' / ');
	if (w.cover && w.gallery.length > 0) {
		// The home row previews a few screens; the case study has the rest.
		return (
			<RevisionFrame
				frames={[w.cover, ...w.gallery].slice(0, 4)}
				label={label}
			/>
		);
	}
	return (
		<Link
			href={`/work/${w.slug}`}
			// Duplicate of the text link: keep it out of the tab order.
			tabIndex={-1}
			aria-hidden
			className="block"
		>
			<BlueprintFrame
				media={w.cover}
				label={label}
				sizes="(min-width: 768px) 58vw, 100vw"
			>
				<TypeFrame
					title={w.title}
					nodes={w.schematic ?? w.stack.map((label) => ({ label }))}
				/>
			</BlueprintFrame>
		</Link>
	);
}

export function SelectedWork() {
	return (
		<section
			id="selected-work"
			aria-labelledby="work-title"
			className="px-4 pb-28 pt-16 md:px-8 md:pb-36 md:pt-24"
		>
			<div className="mx-auto max-w-[1400px]">
				<header className="mb-16 border-b border-line pb-8 md:mb-20">
					<h2
						id="work-title"
						className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.045em]"
					>
						Selected work
					</h2>
				</header>

				<ul className="flex flex-col gap-20 md:gap-24 motion-safe:md:gap-0">
					{featured.map((w, i) => {
						const row = rows[i % rows.length];
						// Desktop: the row pins while its screens change, then scrolls on.
						const frames = Math.min(4, 1 + w.gallery.length);
						return (
							<li
								key={w.slug}
								data-pin-track
								style={{ '--frames': frames } as React.CSSProperties}
								className="motion-safe:md:h-[calc(100dvh+var(--frames)*50vh)]"
							>
								<div className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8 motion-safe:md:sticky motion-safe:md:top-0 motion-safe:md:h-[100dvh] motion-safe:md:content-center">
									<div className={row.frame}>
										<Frame w={w} />
									</div>
									<div className={row.text}>
										<h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
											{w.title}
										</h3>
										<p className="mt-3 text-sm text-ink/70">
											{w.role} · {w.company} · {w.years}
										</p>
										<p className="mt-5 text-muted">
											{w.oneLiner}
										</p>

										<ProjectDetail w={w} />

										<Link
											href={`/work/${w.slug}`}
											className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-accent/60 text-sm transition-colors duration-300 hover:border-accent"
										>
											Read case study
											<ArrowRight className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1" />
										</Link>
									</div>
								</div>
							</li>
						);
					})}
				</ul>

				<div className="mt-24 md:mt-28">
					<p className="annot mb-8 border-b border-line pb-4">
						Also shipped
					</p>
					<ul className="grid gap-12 sm:grid-cols-2 sm:gap-8">
						{archive.map((w) => (
							<li key={w.slug}>
								{w.cover && (
									<HoverCarousel
										frames={[w.cover, ...w.gallery].slice(0, 5)}
										sizes="(min-width: 640px) 45vw, 100vw"
									/>
								)}
								<h3 className="mt-5 text-xl font-medium tracking-[-0.02em]">
									{w.hasPage ? (
										<Link
											href={`/work/${w.slug}`}
											className="-my-3 inline-flex items-center gap-1.5 py-3 transition-colors duration-300 hover:text-accent"
										>
											{w.title}
											<ArrowRight />
										</Link>
									) : w.link ? (
										<a
											href={w.link}
											target="_blank"
											rel="noopener noreferrer"
											className="-my-3 inline-flex items-center gap-1.5 py-3 transition-colors duration-300 hover:text-accent"
										>
											{w.title}
											<ArrowUpRight />
										</a>
									) : (
										w.title
									)}
								</h3>
								<p className="mt-2 text-sm text-ink/70">
									{[w.role, w.company, w.years]
										.filter(Boolean)
										.join(' · ')}
								</p>
								<p className="mt-3 text-sm text-muted">
									{w.oneLiner}
								</p>
								{/* Designers differ across these, so each card names its own. */}
								{w.credits && (
									<Credits credits={w.credits} className="mt-1" />
								)}
							</li>
						))}
					</ul>
				</div>
				<SheetBlock id="selected-work" />
			</div>
		</section>
	);
}
