import { BlueprintFrame } from '@/components/blueprint-frame';
import { ArrowUpRight } from '@/components/icons';
import { TypeFrame } from '@/components/type-frame';
import { caseStudies, getWork, nextWork } from '@/content/work';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
	return caseStudies.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const w = getWork((await params).slug);
	if (!w) return {};
	return {
		title: w.title,
		description: w.oneLiner,
		alternates: { canonical: `/work/${w.slug}` },
		openGraph: {
			title: `${w.title} — Nischal Gupta`,
			description: w.oneLiner,
			url: `/work/${w.slug}`,
			...(w.cover && { images: [w.cover.src] }),
		},
	};
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<section className="grid gap-6 border-t border-line py-16 md:grid-cols-12 md:gap-8 md:py-24">
			<h2 className="annot md:col-span-3">{label}</h2>
			<div className="md:col-span-8 md:col-start-5">{children}</div>
		</section>
	);
}

export default async function CaseStudy({ params }: Props) {
	const w = getWork((await params).slug);
	if (!w || !w.hasPage) notFound();
	const next = nextWork(w.slug);

	return (
		<article className="px-4 pb-10 pt-36 md:px-8 md:pt-44">
			<div className="mx-auto max-w-[1400px]">
				<Link
					href="/#work"
					className="annot inline-flex items-center gap-2 transition-colors duration-300 hover:text-ink"
				>
					<span aria-hidden>←</span> All work
				</Link>

				<header className="mt-12">
					<p className="annot mb-6">{w.company}</p>
					<h1 className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.055em]">
						{w.title}
					</h1>
					<p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug tracking-[-0.02em] text-muted">
						{w.oneLiner}
					</p>

					<dl className="mt-16 grid grid-cols-2 border-t border-line md:grid-cols-4">
						{[
							['Role', w.role],
							['Years', w.years],
							['Stack', w.stack.join(', ')],
						].map(([k, v]) => (
							<div key={k} className="border-b border-line py-5 pr-4 md:border-b-0">
								<dt className="annot mb-2">{k}</dt>
								<dd className="text-sm text-ink/85">{v}</dd>
							</div>
						))}
						<div className="border-b border-line py-5 md:border-b-0">
							<dt className="annot mb-2">Live</dt>
							<dd className="text-sm">
								{w.link ? (
									<a
										href={w.link}
										target="_blank"
										rel="noopener noreferrer"
										className="inline-flex items-center gap-1.5 border-b border-white/20 transition-colors duration-300 hover:border-accent"
									>
										{w.link.replace('https://', '')}
										<ArrowUpRight />
									</a>
								) : (
									<span className="text-muted">Internal product</span>
								)}
							</dd>
						</div>
					</dl>
				</header>

				<div className="my-24 md:my-32">
					<BlueprintFrame
						media={w.cover}
						label={`${w.company} / ${w.title}`}
						priority
						sizes="(min-width: 1400px) 1340px, 100vw"
					>
						<TypeFrame title={w.title} modules={w.schematic ?? w.stack} />
					</BlueprintFrame>
				</div>

				<Block label="Context">
					<p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug tracking-[-0.02em]">
						{w.context}
					</p>
				</Block>

				<Block label="What I owned">
					<ul className="grid gap-4">
						{w.owned.map((o) => (
							<li key={o} className="grid grid-cols-[1.5rem_1fr] text-lg text-ink/85">
								<span aria-hidden className="text-accent">
									+
								</span>
								{o}
							</li>
						))}
					</ul>
				</Block>

				{w.layers && (
					<Block label="Stack by layer">
						<dl className="border-t border-line">
							{w.layers.map((l) => (
								<div
									key={l.name}
									className="grid gap-2 border-b border-line py-4 sm:grid-cols-[10rem_1fr]"
								>
									<dt className="annot">{l.name}</dt>
									<dd className="text-ink/85">{l.items.join(' · ')}</dd>
								</div>
							))}
						</dl>
					</Block>
				)}

				<Block label="Engineering notes">
					<ol className="grid gap-14">
						{w.deepdives.map((d, i) => (
							<li key={d.title} className="grid gap-3">
								<span className="annot text-accent">
									{String(i + 1).padStart(2, '0')}
								</span>
								<h3 className="text-2xl font-medium tracking-[-0.03em] md:text-3xl">
									{d.title}
								</h3>
								<p className="max-w-2xl text-muted">{d.body}</p>
							</li>
						))}
					</ol>
				</Block>

				{w.gallery.length > 0 && (
					<div className="grid gap-24 border-t border-line py-24 md:gap-32 md:py-32">
						{w.gallery.map((m) => (
							<BlueprintFrame key={m.src} media={m} label={m.alt} sizes="100vw" />
						))}
					</div>
				)}

				<Block label="Outcome">
					<p className="text-[clamp(1.5rem,3vw,2.5rem)] font-medium leading-tight tracking-[-0.035em]">
						{w.outcome}
					</p>
					{w.credits && <p className="annot mt-10">{w.credits}</p>}
				</Block>

				<Link
					href={`/work/${next.slug}`}
					className="group mt-16 block border-t border-line pt-10"
				>
					<span className="annot">Next case study</span>
					<span className="mt-4 flex items-center justify-between gap-6">
						<span className="relative text-[clamp(2.5rem,7vw,6.5rem)] font-medium leading-none tracking-[-0.05em]">
							{next.title}
							<span
								aria-hidden
								className="absolute -bottom-2 left-0 h-[2px] w-full origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-x-100"
							/>
						</span>
						<ArrowUpRight className="size-10 shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-1 group-hover:translate-x-1 md:size-16" />
					</span>
				</Link>
			</div>
		</article>
	);
}
