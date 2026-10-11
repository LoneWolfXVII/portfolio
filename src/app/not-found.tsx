import { Cta } from '@/components/cta';
import { ArrowLeft } from '@/components/icons';

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
					This drawing was never built.
				</h1>
				<p className="mt-4 max-w-md text-muted">
					The page you were looking for does not exist or has moved.
				</p>
				<Cta href="/" icon={<ArrowLeft />} className="mt-10">
					Back to the work
				</Cta>
			</div>
		</section>
	);
}
