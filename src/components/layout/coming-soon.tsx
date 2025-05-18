'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FullScreen } from '../full-screen';
import { AnimatedSpan, Terminal, TypingAnimation } from '../magicui/terminal';
import { HoverBorderGradient } from '../ui/hover-border-gradient';
export const ComingSoonPage = ({ pageName }: { pageName?: string }) => {
	const [mounted, setMounted] = useState(false);

	const router = useRouter();

	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;
	return (
		<FullScreen className="flex-col">
			<Terminal>
				<TypingAnimation>
					&gt; pnpm dlx nischal@portfolio init
				</TypingAnimation>

				<AnimatedSpan delay={1500} className="text-green-500">
					<span>✔ Design checks.</span>
				</AnimatedSpan>

				<AnimatedSpan delay={2000} className="text-green-500">
					<span>✔ Setting up portfolio framework. Using Next.js.</span>
				</AnimatedSpan>

				<AnimatedSpan delay={2500} className="text-green-500">
					<span>✔ Implementing responsive design with Tailwind CSS.</span>
				</AnimatedSpan>

				<AnimatedSpan delay={3000} className="text-green-500">
					<span>✔ Creating component architecture.</span>
				</AnimatedSpan>

				<AnimatedSpan delay={4000} className="text-green-500">
					<span>✔ Adding skills and expertise section.</span>
				</AnimatedSpan>

				{/* <AnimatedSpan delay={4500} className="text-green-500">
					<span>✔ Implementing contact form functionality.</span>
				</AnimatedSpan> */}

				<AnimatedSpan delay={5000} className="text-green-500">
					<span>✔ Optimizing images and assets.</span>
				</AnimatedSpan>

				<AnimatedSpan delay={5500} className="text-green-500">
					<span>✔ Setting up animations and transitions.</span>
				</AnimatedSpan>

				<AnimatedSpan delay={6000} className="text-blue-500">
					{pageName === 'projects' ? (
						<>
							<span>ℹ {pageName}:</span>
							<span className="pl-2">
								- Project showcase launching soon!
							</span>
						</>
					) : (
						<>
							<span>ℹ {pageName}:</span>
							<span className="pl-2">- Coming Soon</span>
						</>
					)}
				</AnimatedSpan>

				<TypingAnimation delay={6500} className="text-muted-foreground">
					Success! Portfolio initialization completed.
				</TypingAnimation>

				<TypingAnimation delay={7000} className="text-muted-foreground">
					{`Launching soon at nischalgupta.dev/${pageName?.toLowerCase()}`}
				</TypingAnimation>
			</Terminal>

			<div className="flex mt-10 justify-center text-center ">
				<HoverBorderGradient
					containerClassName="rounded-full"
					as="button"
					className="dark:bg-black bg-white text-black dark:text-white flex items-center space-x-2 cursor-pointer"
					onClick={() => router.push('/')}
				>
					<Image
						src="/images/logo.png"
						alt="Logo"
						width={24}
						height={24}
						className="rounded-full border border-white/10"
					/>
					<span>Back to home</span>
				</HoverBorderGradient>
			</div>
		</FullScreen>
	);
};
