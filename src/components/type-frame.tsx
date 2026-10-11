/** Type-led stand-in for a case study without screenshots (yet). */
export function TypeFrame({ title, modules }: { title: string; modules: string[] }) {
	return (
		<div className="absolute inset-0 flex flex-col justify-between bg-[linear-gradient(rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:32px_32px] p-6 md:p-10">
			<span className="annot">Schematic · {title}</span>
			<ul className="grid grid-cols-2 gap-px bg-line ring-1 ring-line">
				{modules.map((m) => (
					<li
						key={m}
						className="bg-bg/90 px-4 py-5 font-mono text-sm tracking-tight text-ink/85 md:text-lg"
					>
						{m}
					</li>
				))}
			</ul>
		</div>
	);
}
