import { ArrowRight } from '@/components/icons';
import type { Work } from '@/content/work';

/**
 * One drawn detail per project, so each row proves something different:
 * the v2 speed-up, who runs a campaign, or the plain figures.
 */
export function ProjectDetail({ w }: { w: Work }) {
	const lead = w.figures?.[0];

	if (w.slug === 'persona' && lead) {
		return (
			<figure className="mt-8 border-t border-line pt-6">
				<p className="flex items-baseline gap-3">
					<span className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em]">
						{lead.value}
					</span>
					<span className="annot">{lead.label}</span>
				</p>
				<div
					aria-hidden
					className="mt-6 grid grid-cols-[1.75rem_1fr] items-center gap-x-3 gap-y-2.5"
				>
					<span className="annot">v1</span>
					<span className="h-1.5 w-full bg-white/20" />
					<span className="annot text-ink">v2</span>
					<span className="h-1.5 w-1/5 bg-accent" />
				</div>
				<figcaption className="annot mt-3">
					Relative load time, v1 to v2
				</figcaption>
			</figure>
		);
	}

	if (w.slug === 'intract-quests') {
		return (
			<figure className="mt-8 border-t border-line pt-6">
				<ol className="flex flex-wrap items-center gap-2 text-sm">
					<li className="px-3 py-2 ring-1 ring-white/15">
						Self-serve + enterprise
					</li>
					<li aria-hidden className="text-accent">
						<ArrowRight />
					</li>
					<li className="px-3 py-2 ring-1 ring-accent">B2B dashboard</li>
					<li aria-hidden className="text-accent">
						<ArrowRight />
					</li>
					<li className="px-3 py-2 ring-1 ring-white/15">Live quest</li>
				</ol>
				<figcaption className="annot mt-3">
					Customers build their own quests
				</figcaption>
			</figure>
		);
	}

	if (w.slug === 'spyne') {
		return (
			<figure className="mt-8 border-t border-line pt-6">
				<ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm text-ink/85">
					{[
						'Console rebuild',
						'Role-based access',
						'Enterprise onboarding',
						'Self-serve billing',
					].map((item) => (
						<li key={item} className="flex items-center gap-2.5">
							<span aria-hidden className="h-px w-3 bg-accent" />
							{item}
						</li>
					))}
				</ul>
				<figcaption className="annot mt-4">Shipped 2022 to 2024</figcaption>
			</figure>
		);
	}

	if (!w.figures) return null;
	return (
		<dl className="mt-8 flex flex-wrap gap-x-10 gap-y-6 border-t border-line pt-6">
			{w.figures.map((f) => (
				<div key={f.label} className="flex flex-col-reverse">
					<dt className="annot mt-2">{f.label}</dt>
					<dd className="text-[clamp(2.5rem,4vw,3.5rem)] font-medium leading-none tracking-[-0.04em]">
						{f.value}
					</dd>
				</div>
			))}
		</dl>
	);
}
