export type Role = {
	company: string;
	role: string;
	start: string;
	end: string;
	startYear: number;
	location: string;
	points: string[];
};

// Newest first. The build log counter tweens to each startYear.
export const experience: Role[] = [
	{
		company: 'investabl.ai',
		role: 'Founding Engineer',
		start: '04/2026',
		end: 'Present',
		startYear: 2026,
		location: 'Remote',
		points: [
			'Own the product end to end: design system, UI/UX, backend, architecture and cloud',
			'Shipped a live, revenue-generating prop trading platform with onchain payouts in about 10 seconds',
			'Built real-time trading integrations across Hyperliquid and MT4/MT5',
		],
	},
	{
		company: 'Intract.io',
		role: 'Frontend Engineer',
		start: '03/2024',
		end: '04/2026',
		startYear: 2024,
		location: 'Gurgaon, IN',
		points: [
			'Launched Proof of Humanity (persona.intract.io) as its sole developer, with 80% faster web performance in v2',
			'Single-handedly built the Admin Panel and CMS behind quest.intract.io',
			'Revamped the B2B dashboard UX and built the credits infrastructure frontend',
			'Built every landing page for intract.io and its products',
		],
	},
	{
		company: 'Spyne.ai',
		role: 'Full Stack Software Engineer',
		start: '06/2022',
		end: '03/2024',
		startYear: 2022,
		location: 'Gurgaon, IN',
		points: [
			'Led the dashboard rebuild on React and Redux with atomic design',
			'Built a credits microservice and the PLG flow with Stripe payments',
			'Integrated RBAC across the console and centralized login',
		],
	},
	{
		company: 'Napier Healthcare',
		role: 'Software Development Intern',
		start: '08/2021',
		end: '03/2022',
		startYear: 2021,
		location: 'India',
		points: ['Built a drag-and-drop renderer for dynamic forms', 'Wrote unit tests'],
	},
];
