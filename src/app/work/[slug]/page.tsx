import { BlueprintFrame } from '@/components/blueprint-frame';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/icons';
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

// Detail sheets hang off the home sheet they expand: investabl from NG-002, the rest from NG-003.
function detailNo(slug: string) {
	if (slug === 'investabl') return 'NG-002.1';
	const rest = caseStudies.filter((c) => c.slug !== 'investabl');
	return `NG-003.${rest.findIndex((c) => c.slug === slug) + 1}`;
}

function Block({ label, children }: { label: string; children: React.ReactNode }) {
	return (
		<section className="grid gap-6 border-t border-line py-12 md:grid-cols-12 md:gap-8 md:py-16">
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
					className="annot inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-ink"
				>
					<ArrowLeft /> All work
				</Link>

				<header className="mt-12">
					<h1 className="text-[clamp(3rem,9vw,8.5rem)] font-medium leading-[0.92] tracking-[-0.055em]">
						{w.title}
					</h1>
					<p className="mt-8 max-w-3xl text-[clamp(1.25rem,2.2vw,1.75rem)] leading-snug tracking-[-0.02em] text-muted">
						{w.oneLiner}
					</p>

					<div className="mt-12 md:mt-16">
						<BlueprintFrame
							media={w.cover}
							label={`${w.company} / ${w.title}`}
							priority
							sizes="(min-width: 1400px) 1340px, 100vw"
						>
							<TypeFrame
								title={w.title}
								nodes={
									w.schematic ??
									w.stack.map((label) => ({ label }))
								}
							/>
						</BlueprintFrame>
					</div>

					<dl className="mt-20 grid grid-cols-2 border-t border-line md:grid-cols-4">
						{[
							['Company', w.company],
							['Role', w.role],
							['Years', w.years],
						].map(([k, v]) => (
							<div
								key={k}
								className="border-b border-line py-5 pr-4 md:border-b-0"
							>
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
									<span className="text-muted">
										Internal product
									</span>
								)}
							</dd>
						</div>
						{/* With layers, the full stack gets its own block below. */}
						{!w.layers && (
							<div className="col-span-2 py-5 md:col-span-4 md:border-t md:border-line">
								<dt className="annot mb-2">Stack</dt>
								<dd className="text-sm text-ink/85">
									{w.stack.join(', ')}
								</dd>
							</div>
						)}
					</dl>
				</header>
				<div className="mt-16 md:mt-24" />

				<Block label="Context">
					<p className="text-[clamp(1.25rem,2vw,1.6rem)] leading-snug tracking-[-0.02em]">
						{w.context}
					</p>
				</Block>

				<Block label="What I owned">
					<ul className="grid gap-4 sm:grid-cols-2">
						{w.owned.map((o) => (
							<li
								key={o}
								className="grid grid-cols-[1.5rem_1fr] text-lg text-ink/85"
							>
								<span
									aria-hidden
									className="mt-[0.7em] h-px w-3 bg-accent"
								/>
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
									<dd className="text-ink/85">
										{l.items.join(' · ')}
									</dd>
								</div>
							))}
						</dl>
					</Block>
				)}

				<Block label="Engineering notes">
					<ol className="grid gap-12 md:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] md:gap-8">
						{w.deepdives.map((d) => (
							<li
								key={d.title}
								className="grid content-start gap-3 border-t border-accent/60 pt-5"
							>
								<h3 className="text-2xl font-medium tracking-[-0.03em]">
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
							<BlueprintFrame
								key={m.src}
								media={m}
								label={m.alt}
								sizes="100vw"
							/>
						))}
					</div>
				)}

				<Block label="Outcome">
					{w.figures && (
						<dl className="mb-10 flex flex-wrap gap-x-16 gap-y-8">
							{w.figures.map((f) => (
								<div key={f.label} className="flex flex-col-reverse">
									<dt className="annot mt-2">{f.label}</dt>
									<dd className="text-[clamp(3rem,7vw,6rem)] font-medium leading-none tracking-[-0.05em]">
										{f.value}
									</dd>
								</div>
							))}
						</dl>
					)}
					<p className="max-w-2xl text-xl leading-snug tracking-[-0.02em] text-ink/85">
						{w.outcome}
					</p>
					{w.credits && (
						<p className="annot mt-10">
							{w.credits.role} by{' '}
							<a
								href={w.credits.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-11 items-center underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent"
							>
								{w.credits.name}
							</a>
						</p>
					)}
				</Block>

				<nav
					aria-label="Detail sheets"
					className="mt-16 border-t border-line pt-8"
				>
					<p className="annot mb-4">Detail sheets</p>
					<ol className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4">
						{caseStudies.map((c) => (
							<li key={c.slug}>
								<Link
									href={`/work/${c.slug}`}
									aria-current={
										c.slug === w.slug ? 'page' : undefined
									}
									className="annot grid min-h-11 grid-cols-[4.5rem_1fr] items-center border-b border-line transition-colors duration-300 hover:text-ink aria-[current]:text-ink"
								>
									<span className="text-accent">
										{detailNo(c.slug)}
									</span>
									{c.title}
								</Link>
							</li>
						))}
					</ol>
				</nav>

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
						<ArrowRight className="size-10 shrink-0 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1.5 md:size-16" />
					</span>
				</Link>
			</div>
		</article>
	);
}
