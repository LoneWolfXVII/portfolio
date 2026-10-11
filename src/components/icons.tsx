type IconProps = React.SVGProps<SVGSVGElement>;

const base = {
	width: 16,
	height: 16,
	viewBox: '0 0 24 24',
	fill: 'none',
	stroke: 'currentColor',
	strokeWidth: 1.25,
	strokeLinecap: 'round' as const,
	strokeLinejoin: 'round' as const,
	'aria-hidden': true,
};

export const ArrowUpRight = (p: IconProps) => (
	<svg {...base} {...p}>
		<path d="M7 17 17 7M8 7h9v9" />
	</svg>
);

export const ArrowDown = (p: IconProps) => (
	<svg {...base} {...p}>
		<path d="M12 5v14M6 13l6 6 6-6" />
	</svg>
);

export const Copy = (p: IconProps) => (
	<svg {...base} {...p}>
		<rect x="8" y="8" width="12" height="12" rx="2" />
		<path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
	</svg>
);

export const Check = (p: IconProps) => (
	<svg {...base} {...p}>
		<path d="m5 12 5 5 9-10" />
	</svg>
);

export const Download = (p: IconProps) => (
	<svg {...base} {...p}>
		<path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
	</svg>
);

export const Mail = (p: IconProps) => (
	<svg {...base} {...p}>
		<rect x="3" y="5" width="18" height="14" rx="2" />
		<path d="m4 7 8 6 8-6" />
	</svg>
);
