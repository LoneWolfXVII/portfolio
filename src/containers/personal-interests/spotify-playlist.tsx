'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export const SpotifyPlaylist = () => {
	const { theme, systemTheme } = useTheme();
	const [mounted, setMounted] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setMounted(true);
	}, []);

	const currentTheme = theme === 'system' ? systemTheme : theme;

	useEffect(() => {
		setIsLoading(true);
	}, [currentTheme]);

	// Handle iframe load event
	const handleIframeLoad = () => {
		setIsLoading(false);
	};

	if (!mounted) {
		// Return a placeholder with the same dimensions to prevent layout shift
		return (
			<div className="w-full h-[352px] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
		);
	}

	return (
		<div className="relative w-full h-full">
			{isLoading && (
				<div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse">
					<Image
						src="/images/logo.png"
						alt="logo"
						width={100}
						height={100}
					/>
				</div>
			)}

			<AnimatePresence mode="wait">
				<motion.div
					key={currentTheme}
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: -10 }}
					transition={{
						duration: 0.4,
						ease: [0.22, 1, 0.36, 1], // Custom easing for smoother animation
					}}
				>
					<iframe
						style={{ borderRadius: '12px', borderColor: 'transparent' }}
						src={
							currentTheme === 'dark'
								? 'https://open.spotify.com/embed/playlist/0lnvfqE0TwteLeQNrcsApk?utm_source=generator&theme=0'
								: 'https://open.spotify.com/embed/playlist/0lnvfqE0TwteLeQNrcsApk?utm_source=generator&theme=1'
						}
						width="100%"
						height="500px"
						allowFullScreen
						allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
						loading="lazy"
						onLoad={handleIframeLoad}
						onLoadStart={() => console.log('1')}
					></iframe>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
