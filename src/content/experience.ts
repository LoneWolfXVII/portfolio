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
			'Own the whole product: design system, UI, backend and cloud',
			'Shipped it live: it earns revenue, pays out onchain in about 10 seconds and trades in real time on Hyperliquid and MT4/MT5',
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
			'Sole developer on Proof of Humanity (persona.intract.io); made v2 80% faster',
			'Built the B2B quest dashboard for self-serve and enterprise customers on my own, plus every intract.io landing page',
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
			'Led the dashboard rebuild in React and Redux, using atomic design',
			'Built the credits microservice, Stripe self-serve billing and role-based access',
		],
	},
	{
		company: 'Napier Healthcare',
		role: 'Software Development Intern',
		start: '08/2021',
		end: '03/2022',
		startYear: 2021,
		location: 'India',
		points: [
			'Built a drag-and-drop renderer for dynamic forms',
			'Wrote unit tests',
		],
	},
];
