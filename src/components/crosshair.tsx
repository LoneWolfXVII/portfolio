'use client';

import { gsap, useGSAP } from '@/lib/gsap';
import { useRef } from 'react';

/** Blueprint crosshair that tracks the pointer inside its parent. Fine pointers only. */
export function Crosshair() {
	const ref = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			const root = ref.current;
			const area = root?.parentElement;
			if (!root || !area) return;

			gsap.matchMedia().add(
				'(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
				() => {
					const opts = { duration: 0.5, ease: 'power3' };
					const xs = [gsap.quickTo('[data-x]', 'x', opts), gsap.quickTo('[data-readout]', 'x', opts)];
					const ys = [gsap.quickTo('[data-y]', 'y', opts), gsap.quickTo('[data-readout]', 'y', opts)];
					const readout = root.querySelector<HTMLElement>('[data-readout]');

					const move = (e: PointerEvent) => {
						const r = area.getBoundingClientRect();
						const px = e.clientX - r.left;
						const py = e.clientY - r.top;
						xs.forEach((to) => to(px));
						ys.forEach((to) => to(py));
						if (readout) {
							readout.textContent = `x ${String(Math.round(px)).padStart(4, '0')}  y ${String(Math.round(py)).padStart(4, '0')}`;
						}
					};
					const show = () => gsap.to(root, { autoAlpha: 1, duration: 0.4 });
					const hide = () => gsap.to(root, { autoAlpha: 0, duration: 0.4 });

					area.addEventListener('pointermove', move);
					area.addEventListener('pointerenter', show);
					area.addEventListener('pointerleave', hide);
					return () => {
						area.removeEventListener('pointermove', move);
						area.removeEventListener('pointerenter', show);
						area.removeEventListener('pointerleave', hide);
					};
				},
			);
		},
		{ scope: ref },
	);

	return (
		<div
			ref={ref}
			aria-hidden
			className="pointer-events-none invisible absolute inset-0 overflow-hidden opacity-0"
		>
			<div data-x className="absolute inset-y-0 left-0 w-px bg-white/10" />
			<div data-y className="absolute inset-x-0 top-0 h-px bg-white/10" />
			<span
				data-readout
				className="annot absolute left-3 top-2 whitespace-pre text-[10px] text-accent"
			/>
		</div>
	);
}
