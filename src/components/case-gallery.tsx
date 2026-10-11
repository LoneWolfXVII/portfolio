'use client';

import { BlueprintFrame } from '@/components/blueprint-frame';
import type { Media } from '@/content/work';
import { ScrollTrigger, useGSAP } from '@/lib/gsap';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SIZES = '(min-width: 1400px) 1340px, 100vw';
// Widest 16:9 frame that still leaves room for the nav, caption and counter.
const FIT = { maxWidth: 'min(100%, calc((100dvh - 15rem) * 16 / 9))' };

/**
 * A case study's screens in one fixed frame. On desktop the frame pins while
 * scrolling steps through the screens, with the caption and counter changing
 * alongside; then the page moves on. Phones and reduced motion get the plain
 * stack of frames.
 */
export function CaseGallery({ media }: { media: Media[] }) {
	return (
		<>
			<Pinned media={media} />
			<div className="grid gap-24 motion-safe:md:hidden">
				{media.map((m) => (
					<BlueprintFrame
						key={m.src}
						media={m}
						label={m.alt}
						sizes={SIZES}
					/>
				))}
			</div>
		</>
	);
}

function Pinned({ media }: { media: Media[] }) {
	const ref = useRef<HTMLDivElement>(null);
	const videos = useRef<(HTMLVideoElement | null)[]>([]);
	const [active, setActive] = useState(0);
	// Screens mount as they come due (the next one prefetches) and stay mounted.
	const [reach, setReach] = useState(1);
	if (active + 1 > reach) setReach(active + 1);
	const current = media[active];

	useGSAP(
		() => {
			ScrollTrigger.create({
				trigger: ref.current,
				start: 'top top',
				end: 'bottom bottom',
				onUpdate: ({ progress }) =>
					setActive(
						Math.min(
							media.length - 1,
							Math.floor(progress * media.length),
						),
					),
			});
		},
		{ scope: ref },
	);

	// Only the screen on show plays.
	useEffect(() => {
		videos.current.forEach((v, i) => {
			if (!v) return;
			if (i === active) v.play().catch(() => {});
			else v.pause();
		});
	}, [active, reach]);

	return (
		<div
			ref={ref}
			className="relative hidden motion-safe:md:block"
			style={{ height: `calc(100dvh + ${media.length * 55}vh)` }}
		>
			<div className="sticky top-0 flex h-[100dvh] flex-col justify-center pt-20">
				<div className="mx-auto w-full" style={FIT}>
					<BlueprintFrame
						label={current.alt}
						// A fixed 16:9 frame: screens of any shape sit inside it, so it never resizes.
						ratio="16 / 9"
					>
						<div className="absolute inset-0 bg-[#0a0a0b]">
							{media.map((m, i) =>
								i > reach ? null : (
									<div
										key={m.src}
										aria-hidden={i !== active}
										className={cn(
											'absolute inset-0 transition-[opacity,transform] duration-700 ease-[var(--ease-spring)]',
											i === active
												? 'scale-100 opacity-100'
												: 'scale-[1.02] opacity-0',
										)}
									>
										<Image
											quality={90}
											src={m.src}
											alt={m.video ? '' : m.alt}
											fill
											sizes={SIZES}
											className="object-contain"
										/>
										{m.video && (
											<video
												ref={(el) => {
													videos.current[i] = el;
												}}
												className="relative size-full object-contain"
												src={m.video}
												aria-label={m.alt}
												muted
												loop
												playsInline
												preload="none"
											/>
										)}
									</div>
								),
							)}
						</div>
					</BlueprintFrame>
				</div>

				<div
					className="mx-auto mt-4 flex w-full items-center gap-4"
					style={FIT}
				>
					<p className="annot shrink-0 tabular-nums text-ink">
						{String(active + 1).padStart(2, '0')} /{' '}
						{String(media.length).padStart(2, '0')}
					</p>
					<div aria-hidden className="flex flex-1 gap-1">
						{media.map((m, i) => (
							<span
								key={m.src}
								className={cn(
									'h-px flex-1 transition-colors duration-500',
									i <= active ? 'bg-accent' : 'bg-white/15',
								)}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
