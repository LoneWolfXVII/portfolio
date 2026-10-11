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
			'Launched to paying users, with onchain payouts in about 10 seconds and real-time trading on Hyperliquid and MT4/MT5',
		],
	},
	{
		company: 'Intract',
		role: 'Frontend Engineer',
		start: '03/2024',
		end: '04/2026',
		startYear: 2024,
		location: 'Gurgaon, IN',
		points: [
			'Sole developer of Proof of Humanity (persona.intract.io), including a v2 rebuild that made it 80% faster',
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
			'Led the console rebuild in React and Redux on an atomic component system',
			'Built role-based access with centralized login, the enterprise onboarding tool and the self-serve flow with Stripe',
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
			'Built the component renderer for a drag-and-drop builder, generating dynamic forms and HTML components from JSON',
			'Built a self-directed project on core React concepts and patterns',
		],
	},
];
