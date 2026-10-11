import type { Credit } from '@/content/work';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';

/** "Product design by A and B", each name linking to its portfolio. */
export function Credits({
	credits,
	className,
}: {
	credits: Credit[];
	className?: string;
}) {
	return (
		<p className={cn('annot', className)}>
			{credits[0].role} by{' '}
			{credits.map((c, i) => (
				<Fragment key={c.href}>
					{i > 0 && (i === credits.length - 1 ? ' and ' : ', ')}
					<a
						href={c.href}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex min-h-11 items-center underline decoration-white/20 underline-offset-4 transition-colors duration-300 hover:text-ink hover:decoration-accent"
					>
						{c.name}
					</a>
				</Fragment>
			))}
		</p>
	);
}
