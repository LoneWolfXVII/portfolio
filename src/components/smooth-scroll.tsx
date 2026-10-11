'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ReactLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		const lenis = lenisRef.current?.lenis;
		const raf = (time: number) => lenis?.raf(time * 1000);
		lenis?.on('scroll', ScrollTrigger.update);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);

		// Hash links (incl. the /experience → /#experience redirect) land before
		// sticky stages have measured; re-aim once layout settles.
		const settle = () => {
			ScrollTrigger.refresh();
			const { hash } = window.location;
			if (hash && document.querySelector(hash)) {
				if (lenis) lenis.scrollTo(hash, { immediate: true });
				else document.querySelector(hash)?.scrollIntoView();
			}
		};
		if (document.readyState === 'complete') settle();
		else window.addEventListener('load', settle, { once: true });

		return () => {
			gsap.ticker.remove(raf);
			window.removeEventListener('load', settle);
		};
	}, []);

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{ autoRaf: false, anchors: true, lerp: 0.1 }}
		>
			{children}
		</ReactLenis>
	);
}
