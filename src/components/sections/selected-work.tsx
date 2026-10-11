import { BlueprintFrame } from '@/components/blueprint-frame';
import { ArrowRight } from '@/components/icons';
import { RevisionFrame } from '@/components/revision-frame';
import { TypeFrame } from '@/components/type-frame';
import { work, type Work } from '@/content/work';
import Image from 'next/image';
import Link from 'next/link';

const featured = work.filter((w) => w.featured);
const archive = work.filter((w) => !w.featured && !w.hasPage);
const credit = archive.find((w) => w.credits)?.credits;

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
		return <RevisionFrame frames={[w.cover, ...w.gallery]} label={label} />;
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
			aria-labelledby="work-title"
			className="px-4 pb-28 pt-16 md:px-8 md:pb-36 md:pt-24"
		>
			<div className="mx-auto max-w-[1400px]">
				<header className="mb-20 border-b border-line pb-8 md:mb-28">
					<h2
						id="work-title"
						className="text-[clamp(2.5rem,6vw,5.5rem)] font-medium leading-none tracking-[-0.045em]"
					>
						Selected work
					</h2>
				</header>

				<ul className="flex flex-col gap-28 md:gap-36">
					{featured.map((w, i) => {
						const row = rows[i % rows.length];
						return (
							<li
								key={w.slug}
								className="grid gap-10 md:grid-cols-12 md:items-center md:gap-8"
							>
								<div className={row.frame}>
									<Frame w={w} />
								</div>
								<div className={row.text}>
									<h3 className="text-3xl font-medium tracking-[-0.035em] md:text-4xl">
										{w.title}
									</h3>
									<p className="annot mt-3">
										{w.role} · {w.company} · {w.years}
									</p>
									<p className="mt-5 text-muted">{w.oneLiner}</p>

									{w.figures && (
										<dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-6">
											{w.figures.map((f) => (
												<div
													key={f.label}
													className="flex flex-col-reverse"
												>
													<dt className="annot mt-2">
														{f.label}
													</dt>
													<dd className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em]">
														{f.value}
													</dd>
												</div>
											))}
										</dl>
									)}

									<Link
										href={`/work/${w.slug}`}
										className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-accent/60 text-sm transition-colors duration-300 hover:border-accent"
									>
										Read case study
										<ArrowRight className="transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1" />
									</Link>
								</div>
							</li>
						);
					})}
				</ul>

				<div className="mt-32">
					<p className="annot mb-8 border-b border-line pb-4">
						Also shipped at Intract
					</p>
					<ul className="grid gap-10 lg:grid-cols-2 lg:gap-8">
						{archive.map((w) => (
							<li
								key={w.slug}
								className="flex flex-col gap-5 sm:flex-row sm:items-center sm:gap-6"
							>
								<div className="relative aspect-video w-full shrink-0 overflow-hidden bg-raised ring-1 ring-line sm:w-72 xl:w-80">
									{w.cover && (
										<Image
											src={w.cover.src}
											alt={w.cover.alt}
											fill
											sizes="(min-width: 640px) 320px, 100vw"
											className="object-cover opacity-80 grayscale-[0.3]"
										/>
									)}
								</div>
								<div className="min-w-0">
									<h3 className="text-xl font-medium tracking-[-0.02em]">
										{w.title}
									</h3>
									<p className="annot mt-2">{w.years}</p>
									<p className="mt-3 text-sm text-muted">
										{w.oneLiner}
									</p>
								</div>
							</li>
						))}
					</ul>
					{credit && (
						<p className="annot mt-8">
							{credit.role} by{' '}
							<a
								href={credit.href}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex min-h-11 items-center underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent"
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
