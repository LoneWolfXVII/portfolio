export const profile = {
	name: 'Nischal Gupta',
	role: 'Founding Engineer',
	email: 'nischal.ng11@gmail.com',
	site: 'https://nischalgupta.dev',
	location: 'Gurgaon, IN',
	coords: '28.45°N 77.03°E',
	tz: 'Asia/Kolkata',
	resume: '/files/nischal_gupta.pdf',
	socials: [
		{ label: 'GitHub', href: 'https://github.com/LoneWolfXVII' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/nischal1998/' },
		{ label: 'X', href: 'https://x.com/LoneWolfXVII' },
	],
};

export const stack: { group: string; items: string[] }[] = [
	{
		group: 'Interface',
		items: [
			'React',
			'Next.js',
			'TypeScript',
			'Tailwind',
			'GSAP',
			'TanStack',
			'Zustand',
		],
	},
	{
		group: 'Systems',
		items: [
			'Node.js',
			'Fastify',
			'PostgreSQL',
			'Redis',
			'WebSockets',
			'MongoDB',
		],
	},
	{ group: 'Cloud', items: ['GCP', 'GitHub Actions', 'Vercel'] },
	{
		group: 'Design',
		items: ['Figma', 'Claude Design', 'Design systems', 'Motion'],
	},
];
