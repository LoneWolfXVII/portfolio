'use client';

import { BlueprintFrame } from '@/components/blueprint-frame';
import type { Media } from '@/content/work';
import { gsap, MOTION_OK, ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useRef, useState } from 'react';

// The cover holds until the frame's draw-in reveal is nearly done.
const HOLD = 0.4;

/**
 * A project's screens in one frame. While the frame crosses the upper half of
 * the viewport the cover steps through the gallery; once the frame heads off
 * screen it stops changing. A thumbnail click takes over from the scroll.
 */
export function RevisionFrame({
	frames,
	label,
}: {
	frames: Media[];
	label: string;
}) {
	const ref = useRef<HTMLDivElement>(null);
	const picked = useRef(false);
	const [active, setActive] = useState(0);
	const first = frames[0];

	useGSAP(
		() => {
			gsap.matchMedia().add(MOTION_OK, () => {
				ScrollTrigger.create({
					trigger: ref.current,
					start: 'top 60%',
					end: 'top 10%',
					onUpdate: ({ progress: p }) => {
						if (picked.current) return;
						const rest = frames.length - 1;
						setActive(
							p < HOLD
								? 0
								: Math.min(
										rest,
										1 +
											Math.floor(
												((p - HOLD) / (1 - HOLD)) * rest,
											),
									),
						);
					},
				});
			});
		},
		{ scope: ref },
	);

	const pick = (i: number) => {
		picked.current = true;
		setActive(i);
	};

	return (
		<div ref={ref}>
			<BlueprintFrame
				label={label}
				ratio={`${first.width} / ${first.height}`}
				size={first}
			>
				{frames.map((f, i) => (
					<Image
						key={f.src}
						src={f.src}
						alt={i === active ? f.alt : ''}
						fill
						sizes="(min-width: 768px) 58vw, 100vw"
						className={cn(
							'object-cover object-top transition-opacity duration-700',
							i === active ? 'opacity-100' : 'opacity-0',
						)}
					/>
				))}
			</BlueprintFrame>
			<ul className="mt-5 flex gap-2" aria-label="Screens">
				{frames.map((f, i) => (
					<li key={f.src}>
						<button
							type="button"
							onClick={() => pick(i)}
							aria-label={`Show ${f.alt}`}
							aria-pressed={i === active}
							className={cn(
								'relative block aspect-video w-20 overflow-hidden ring-1 transition-[box-shadow,opacity] duration-300 md:w-24',
								i === active
									? 'opacity-100 ring-accent'
									: 'opacity-50 ring-white/15 hover:opacity-80',
							)}
						>
							<Image
								src={f.src}
								alt=""
								fill
								sizes="96px"
								className="object-cover object-top"
							/>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}
