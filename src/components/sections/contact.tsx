import { CopyEmail } from '@/components/copy-email';
import { Cta } from '@/components/cta';
import { Mail } from '@/components/icons';
import { LocalTime } from '@/components/local-time';
import { profile } from '@/content/profile';
import { REVISION, sheets } from '@/content/sheets';
import { Stamp } from '@/components/stamp';

const last = sheets.length;

/** The final sheet of the set: what I'm after, how to reach me, and the index. */
export function Contact() {
	const block: [string, React.ReactNode][] = [
		[
			'Sheet',
			<span key="s" className="text-accent">
				{sheets[last - 1].no} · {last} / {last}
			</span>,
		],
		['Seeking', 'Founding or senior roles'],
		['Based', profile.location],
		['Local time', <LocalTime key="t" />],
		[
			'Elsewhere',
			<span key="e" className="flex flex-wrap gap-x-4">
				{profile.socials.map((s) => (
					<a
						key={s.href}
						href={s.href}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 min-w-11 items-center underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent"
					>
						{s.label}
					</a>
				))}
			</span>,
		],
	];

	return (
		<section
			id="contact"
			aria-labelledby="contact-title"
			className="relative px-4 pb-6 pt-28 md:px-8 md:pb-24 md:pt-36"
		>
			<div className="mx-auto max-w-[1400px]">
				<h2
					id="contact-title"
					className="text-[clamp(3rem,10vw,9rem)] font-medium leading-[0.9] tracking-[-0.055em]"
				>
					Next sheet: yours<span className="text-accent">.</span>
				</h2>

				<div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-8">
					<div className="md:col-span-7">
						<p className="max-w-xl text-[clamp(1.25rem,2vw,1.6rem)] leading-snug tracking-[-0.02em]">
							I’m looking for founding or senior engineering roles with
							real ownership of the product.
						</p>
						<div className="mt-10 flex flex-wrap gap-3">
							<Cta href={profile.resume} external>
								Résumé
							</Cta>
							<Cta
								// Gmail in a new tab: a bare mailto does nothing when no mail app is set up.
								href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
								variant="ghost"
								external
								icon={<Mail />}
							>
								Email me
							</Cta>
						</div>
						<div className="mt-8">
							<CopyEmail />
						</div>
						<p className="mt-10 max-w-xl text-sm text-muted">
							I also take on select freelance projects. Email is the
							best way to reach me.
						</p>
					</div>

					<div className="relative flex h-max flex-col md:block md:col-span-5 lg:col-span-4 lg:col-start-9">
						{/* The sheet's sign-off, pressed over the short rows so it never hides a link. */}
						<Stamp
							note={['Status', `Rev ${REVISION}`]}
							className="z-10 max-md:order-last max-md:mx-auto max-md:mt-8 md:absolute md:right-2 md:top-[5.25rem]"
						>
							Open for work
						</Stamp>
						<dl
							aria-label="Title block"
							className="annot border border-line"
						>
							{block.map(([k, v]) => (
								<div
									key={k}
									className="grid grid-cols-[7rem_1fr] border-b border-line last:border-b-0"
								>
									<dt className="border-r border-line px-3 py-3">
										{k}
									</dt>
									<dd className="flex items-center px-3 py-3 text-ink/80 has-[a]:py-0">
										{v}
									</dd>
								</div>
							))}
						</dl>
					</div>
				</div>

				<footer className="mt-32 border-t border-line pt-6">
					<nav aria-label="Drawing set">
						<ol className="annot flex flex-wrap gap-x-6">
							{sheets.map((s) => (
								<li key={s.id}>
									<a
										href={`/#${s.id}`}
										className="inline-flex min-h-11 items-center gap-2 transition-colors duration-300 hover:text-ink"
									>
										<span className="text-accent">{s.no}</span>
										{s.title}
									</a>
								</li>
							))}
						</ol>
					</nav>
					<p className="annot mt-4 flex flex-wrap gap-x-4 text-ink/60">
						<span>© 2026 {profile.name}</span>
						<span>Rev {REVISION}</span>
						<span>Issued for build</span>
					</p>
				</footer>
			</div>
		</section>
	);
}
