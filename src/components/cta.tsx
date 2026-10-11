import { ArrowUpRight } from '@/components/icons';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type CtaProps = {
	href: string;
	children: React.ReactNode;
	variant?: 'primary' | 'ghost';
	icon?: React.ReactNode;
	external?: boolean;
	download?: boolean;
	className?: string;
};

/** Pill button with the arrow nested in its own circle. */
export function Cta({
	href,
	children,
	variant = 'primary',
	icon = <ArrowUpRight />,
	external,
	download,
	className,
}: CtaProps) {
	const classes = cn(
		'group inline-flex items-center gap-3 rounded-full py-1.5 pl-5 pr-1.5 text-sm font-medium transition-transform duration-500 ease-[var(--ease-spring)] active:scale-[0.98]',
		variant === 'primary'
			? 'bg-accent text-bg'
			: 'text-ink ring-1 ring-white/15 hover:ring-white/30',
		className,
	);
	const inner = (
		<>
			{children}
			<span
				className={cn(
					'grid size-8 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-px group-hover:translate-x-0.5 group-hover:scale-105',
					variant === 'primary' ? 'bg-bg/15' : 'bg-white/[0.07]',
				)}
			>
				{icon}
			</span>
		</>
	);

	if (external || download) {
		return (
			<a
				href={href}
				className={classes}
				{...(download ? { download: true } : { target: '_blank', rel: 'noopener noreferrer' })}
			>
				{inner}
			</a>
		);
	}
	return (
		<Link href={href} className={classes}>
			{inner}
		</Link>
	);
}
