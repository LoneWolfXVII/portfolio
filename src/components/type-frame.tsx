export type SchematicNode = { label: string; note?: string };

/**
 * Drawn architecture schematic for case studies without screenshots. Reads as a
 * request path, left to right on desktop and as a 2×2 grid on phones.
 */
export function TypeFrame({
	title,
	nodes,
}: {
	title: string;
	nodes: SchematicNode[];
}) {
	return (
		<div className="absolute inset-0 grid grid-rows-[auto_1fr_auto] items-center bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:32px_32px] p-5 md:p-10">
			<p className="annot">Schematic · {title}</p>

			<ol className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-10">
				{nodes.map((n, i) => (
					<li key={n.label} className="relative">
						<div className="bg-bg/90 p-3 ring-1 ring-white/20 md:p-5">
							<p className="text-sm font-medium tracking-[-0.01em] md:text-lg">
								{n.label}
							</p>
							{n.note && (
								<p className="mt-1 text-xs text-muted md:text-sm">
									{n.note}
								</p>
							)}
						</div>
						{i < nodes.length - 1 && (
							<span
								aria-hidden
								className="absolute left-full top-1/2 hidden w-10 -translate-y-1/2 items-center md:flex"
							>
								<span className="relative h-px flex-1 bg-accent/70">
									{/* A request travels the path, one hop after another. */}
									<span
										className="signal absolute -top-[2.5px] left-0 size-1.5 rounded-full bg-accent motion-reduce:hidden"
										style={{ animationDelay: `${i * 0.6}s` }}
									/>
								</span>
								<span className="size-0 border-y-4 border-l-[6px] border-y-transparent border-l-accent/70" />
							</span>
						)}
					</li>
				))}
			</ol>

			<p className="annot flex items-center gap-3">
				<span aria-hidden className="h-px w-8 bg-accent/70" />
				Request path
			</p>
		</div>
	);
}
