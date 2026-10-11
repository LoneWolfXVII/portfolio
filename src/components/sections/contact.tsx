import { CopyEmail } from '@/components/copy-email';
import { Cta } from '@/components/cta';
import { Mail } from '@/components/icons';
import { profile } from '@/content/profile';

const linkedin = profile.socials.find((s) => s.label === 'LinkedIn')!;

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
					Let&apos;s build
					<br />
					something<span className="text-accent">.</span>
				</h2>

				<div className="mt-24 grid gap-16 md:grid-cols-2 md:gap-8">
					<div>
						<p className="annot mb-6">Hiring</p>
						<p className="max-w-sm text-muted">
							Founding, staff or senior roles where one engineer can
							own a product from design system to production.
						</p>
						<div className="mt-8 flex flex-wrap gap-3">
							<Cta href={profile.resume} external>
								Resume
							</Cta>
							<Cta href={linkedin.href} variant="ghost" external>
								LinkedIn
							</Cta>
						</div>
					</div>
					<div>
						<p className="annot mb-6">Projects</p>
						<p className="max-w-sm text-muted">
							Have a product that needs designing, building or
							rescuing? Send a line about it.
						</p>
						<div className="mt-8 grid gap-6">
							<CopyEmail />
							<Cta
								href={`mailto:${profile.email}`}
								variant="ghost"
								icon={<Mail />}
								className="w-max"
							>
								Write an email
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
					<p>Built from scratch with Next.js and GSAP</p>
				</footer>
			</div>
		</section>
	);
}
