import { CopyEmail } from '@/components/copy-email';
import { Cta } from '@/components/cta';
import { Mail } from '@/components/icons';
import { profile } from '@/content/profile';

const linkedin = profile.socials.find((s) => s.label === 'LinkedIn')!;
const github = profile.socials.find((s) => s.label === 'GitHub')!;

export function Contact() {
	return (
		<section
			id="contact"
			aria-labelledby="contact-title"
			className="relative px-4 pb-6 pt-28 md:px-8 md:pt-36"
		>
			<div className="mx-auto max-w-[1400px]">
				<h2
					id="contact-title"
					className="text-[clamp(3rem,10.5vw,10rem)] font-medium leading-[0.9] tracking-[-0.055em]"
				>
					Get in
					<br />
					touch<span className="text-accent">.</span>
				</h2>

				<div className="mt-24 grid gap-16 md:grid-cols-2 md:gap-8">
					<div>
						<p className="annot mb-6">Hiring</p>
						<p className="max-w-sm text-muted">
							I’m looking for founding or senior engineering roles with
							real ownership of the product.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Cta href={profile.resume} external>
								Resume
							</Cta>
							<Cta href={linkedin.href} variant="ghost" external>
								LinkedIn
							</Cta>
							<Cta href={github.href} variant="ghost" external>
								GitHub
							</Cta>
						</div>
					</div>
					<div>
						<p className="annot mb-6">Projects</p>
						<p className="max-w-sm text-muted">
							I also take freelance work, from new builds to fixing an
							existing app. Email me a few lines about the project.
						</p>
						<div className="mt-8 grid gap-6">
							<CopyEmail />
							<Cta
								// Gmail in a new tab: a bare mailto does nothing when no mail app is set up.
								href={`https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`}
								variant="ghost"
								external
								icon={<Mail />}
								className="w-max"
							>
								Write in Gmail
							</Cta>
						</div>
					</div>
				</div>

				<footer className="annot mt-32 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
					<p className="text-ink/80">© 2026 {profile.name}</p>
					<ul className="flex gap-6">
						{profile.socials.map((s) => (
							<li key={s.href}>
								<a
									href={s.href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex min-h-11 min-w-11 items-center justify-center transition-colors duration-300 hover:text-ink"
								>
									{s.label}
								</a>
							</li>
						))}
					</ul>
					<p>Built with Next.js and GSAP</p>
				</footer>
			</div>
		</section>
	);
}
