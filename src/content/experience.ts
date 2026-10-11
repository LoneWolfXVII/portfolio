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
			'Shipped a live prop trading platform that earns revenue and pays out onchain in about 10 seconds',
			'Built real-time trading integrations with Hyperliquid and MT4/MT5',
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
			'Built the admin panel and CMS behind quest.intract.io on my own',
			'Redesigned the B2B dashboard and built the frontend for the credits system',
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
			'Led the dashboard rebuild in React and Redux, using atomic design',
			'Built a credits microservice and the self-serve signup and Stripe payment flow',
			'Added role-based access and a central login across the console',
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
