'use client';

import {
	type AnimationVariant,
	TextAnimate,
} from '@/components/magicui/text-animate';
import { Compare } from '@/components/ui/compare';
import { Cover } from '@/components/ui/cover';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';

const texts = [
	'Front-End Developer',
	'UI/UX Enthusiast',
	'TypeScript Developer',
	'React.js Developer',
	'Next.js Developer',
	'Animation Developer',
	'Smooth Transition',
];

const animationTypes: AnimationVariant[] = [
	'fadeIn',
	'blurIn',
	'blurInUp',
	'blurInDown',
	'slideUp',
	'slideDown',
	'slideLeft',
	'slideRight',
	'scaleUp',
	'scaleDown',
];

export const MyUniverse = () => {
	const [currentText, setCurrentText] = useState(texts[0]);
	const [currentAnimation, setCurrentAnimation] = useState(animationTypes[0]);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentText((prev) => {
				const textIndex = texts.indexOf(prev);
				if (textIndex === texts.length - 1) {
					return texts[0];
				}

				return texts[textIndex + 1];
			});
			setCurrentAnimation(
				animationTypes[Math.floor(Math.random() * animationTypes.length)],
			);
		}, 3000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="w-full flex flex-col-reverse lg:flex-row justify-between items-center gap-20 px-2 md:px-6">
			<div className="flex-1 relative w-full lg:w-auto">
				<div className="flex flex-row gap-4 items-center my-4 lg:my-0 lg:block">
					<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight my-4 md:my-8 dark:text-zinc-300 text-zinc-700">
						Hello<span className="lg:hidden">,</span>
					</h1>

					<Title />
				</div>

				{/* Responsive positioning for floating elements */}
				<div className="px-3 py-2 hidden sm:block absolute -top-4 left-42 bg-purple-500/20 rounded-[6px] w-max font-medium dark:text-purple-300 text-purple-500 border border-purple-500/20 animate-wiggle duration-1000">
					Crafting Seamless Experiences
				</div>

				<div className="px-3 py-2 hidden sm:block absolute top-30 left-30 sm:right-10 bg-blue-500/20 rounded-[6px] w-max font-medium dark:text-blue-300 text-blue-500 border border-blue-500/20 animate-wiggle duration-1000">
					Clean Code
				</div>

				<div className="px-3 py-2 hidden sm:block absolute top-16 right-0 bg-yellow-500/20 rounded-[6px] w-max font-medium dark:text-yellow-300 text-yellow-500 border border-yellow-500/20 animate-wiggle duration-1000">
					Driven by Curiosity
				</div>

				<div className="flex items-center justify-center md:justify-start">
					<motion.div
						layout
						className={cn(
							'md:w-fit w-full py-2 px-4 sm:px-8 text-base sm:text-lg md:text-xl font-bold my-5 rounded-lg pt-2 pb-3 text-center text-black dark:text-white',
							'[background:linear-gradient(to_bottom,var(--color-gray-100),var(--color-gray-200))]',
							'shadow-[inset_0_-1px_var(--color-gray-300),inset_0_0_0_1px_var(--color-gray-300),_0_4px_8px_var(--color-gray-300)]',
							'dark:[background:linear-gradient(to_bottom,var(--color-neutral-700),var(--color-neutral-800))]',
							'dark:shadow-[inset_0_-1px_#10171e,inset_0_0_0_1px_hsla(205,89%,46%,.24),_0_4px_8px_#00000052]',
						)}
					>
						<TextAnimate
							duration={1}
							animation={currentAnimation}
							by="character"
							startOnView={false}
							className="break-words"
						>
							{currentText}
						</TextAnimate>
					</motion.div>
				</div>
				<div className="text-lg text-zinc-600 dark:text-zinc-400 my-6 md:my-10 font-bold">
					React Enthusiast ⚛️ | Next.js Developer 🚀
					<br />{' '}
					<span className="font-normal italic mt-2">
						Leading scalable UI development & shaping modern web
						experiences with clean, efficient code 💻✨
					</span>
				</div>
			</div>
			<div className="flex-1 flex justify-center lg:justify-end w-full mt-8 lg:mt-0">
				<CompareDemo />
			</div>
		</div>
	);
};

export function CompareDemo() {
	return (
		<div className="w-full border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800">
			<Compare
				firstImage="/images/profile.jpeg"
				secondImage="/images/experience.jpeg"
				firstImageClassName="object-cover object-left-top"
				secondImageClassname="object-cover object-left-top rounded-3xl"
				className="h-[200px] sm:h-[250px] md:h-[450px] lg:h-[500px] w-full"
				slideMode="hover"
			/>
		</div>
	);
}

export const Title = memo(() => {
	return (
		<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight sm:my-6 dark:text-zinc-300 text-zinc-700">
			I&apos;m <Cover>Nischal Gupta</Cover>
		</h1>
	);
});

Title.displayName = 'Title';
