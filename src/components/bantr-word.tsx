/**
 * "bäntr" as Bantr writes it: the a's umlaut is three dots that bounce like a
 * typing indicator. CSS only; reduced motion keeps the dots still.
 */
export function BantrWord() {
	return (
		<span className="whitespace-nowrap">
			<span className="sr-only">Bantr</span>
			<span aria-hidden>
				b
				<span className="relative inline-block">
					a
					<span className="absolute left-1/2 top-[0.06em] flex -translate-x-1/2 gap-[0.06em]">
						{[0, 1, 2].map((i) => (
							<span
								key={i}
								className="typing-dot size-[0.11em] rounded-full bg-[#f26b3a]"
								style={{ animationDelay: `${i * 0.16}s` }}
							/>
						))}
					</span>
				</span>
				ntr
			</span>
		</span>
	);
}
