'use client';

import { gsap, ScrollTrigger } from '@/lib/gsap';
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react';
import { useEffect, useRef } from 'react';

/** Lives inside ReactLenis so it can subscribe once the instance exists. */
function ScrollTriggerSync() {
	const lenis = useLenis(ScrollTrigger.update);

	// Hash links (incl. the /experience → /#experience redirect) land before
	// sticky stages have measured; re-aim once layout settles.
	useEffect(() => {
		const settle = () => {
			ScrollTrigger.refresh();
			const { hash } = window.location;
			if (!hash || !document.querySelector(hash)) return;
			if (lenis) lenis.scrollTo(hash, { immediate: true });
			else document.querySelector(hash)?.scrollIntoView();
		};
		if (document.readyState === 'complete') settle();
		else window.addEventListener('load', settle, { once: true });
		return () => window.removeEventListener('load', settle);
	}, [lenis]);

	// ScrollTrigger only re-measures on load and resize. When the page grows
	// or shrinks later (late images, fonts, a route change), re-measure, or
	// reveals further down fire at stale positions and stay hidden.
	useEffect(() => {
		let height = document.body.scrollHeight;
		let timer: ReturnType<typeof setTimeout>;
		const ro = new ResizeObserver(() => {
			if (document.body.scrollHeight === height) return;
			clearTimeout(timer);
			timer = setTimeout(() => {
				ScrollTrigger.refresh();
				height = document.body.scrollHeight;
			}, 150);
		});
		ro.observe(document.body);
		return () => {
			ro.disconnect();
			clearTimeout(timer);
		};
	}, []);

	return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
	const lenisRef = useRef<LenisRef>(null);

	useEffect(() => {
		// Look the instance up every tick: ReactLenis creates it after this
		// effect runs, so capturing it once here would leave scroll frozen.
		const raf = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
		gsap.ticker.add(raf);
		gsap.ticker.lagSmoothing(0);
		return () => gsap.ticker.remove(raf);
	}, []);

	return (
		<ReactLenis
			root
			ref={lenisRef}
			options={{ autoRaf: false, anchors: { immediate: true }, lerp: 0.1 }}
		>
			<ScrollTriggerSync />
			{children}
		</ReactLenis>
	);
}
