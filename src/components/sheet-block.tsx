import { sheets } from '@/content/sheets';
import { cn } from '@/lib/utils';

/**
 * The title block in a sheet's bottom-right corner, where a drawing keeps it:
 * sheet number, title, and position in the set.
 */
export function SheetBlock({ id, className }: { id: string; className?: string }) {
	const i = sheets.findIndex((s) => s.id === id);
	const sheet = sheets[i];
	return (
		<dl
			aria-label="Sheet"
			className={cn(
				'annot ml-auto mt-20 grid w-max grid-cols-[auto_auto_auto] border border-line md:mt-24',
				className,
			)}
		>
			{[
				['Sheet', sheet.no],
				['Title', sheet.title],
				['Of', `${i + 1} / ${sheets.length}`],
			].map(([k, v]) => (
				<div
					key={k}
					className="border-r border-line px-3 py-2 last:border-r-0"
				>
					<dt className="sr-only">{k}</dt>
					<dd className={k === 'Sheet' ? 'text-accent' : 'text-ink/80'}>
						{v}
					</dd>
				</div>
			))}
		</dl>
	);
}
