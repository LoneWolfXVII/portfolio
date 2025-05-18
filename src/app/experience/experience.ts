export const experience: IExperience[] = [
	{
		company: 'Intract.io',
		role: 'Frontend Engineer',
		duration: '03/2024 - Present',
		location: 'Gurgaon, India',
		achievements: [
			'Revamped B2B dashboard {dashboard.intract.io} UX and added new features using React & modern stack',
			'Single Handedly created Admin Panel, Content Management System for our B2C product {quest.intract.io}',
			'Built Credits Infra frontend for quest creation and data export',
			'Developed all landing pages for {intract.io} and its products (Next.js, TailwindCSS, Framer Motion)',
			'Launched Intract Persona: Proof of Humanity product {persona.intract.io} (React, Next.js, TailwindCSS, Framer Motion).',
			'Improved web performance by 80% in persona v2',
		],
	},
	{
		company: 'Spyne.ai',
		role: 'Full Stack Software Engineer',
		duration: '06/2022 - 03/2024',
		location: 'Gurgaon, India',
		achievements: [
			'Led dashboard modernization with React, Redux, and component-based architecture',
			'Built credit micro-service for robust financial data handling',
			'Developed modern dashboard from scratch using atomic design principles',
			'Orchestrated user invitation and guest login flow for onboarding',
			'Integrated RBAC for Console and Centralized Login',
			'Developed enterprise onboarding tool for client configuration',
			'Implemented PLG flow with CoachMarks, Credits, and Stripe Payments',
		],
	},
	{
		company: 'Napier Healthcare Solutions (India) Private Limited',
		role: 'Software Development Intern',
		duration: '08/2021 - 03/2022',
		location: 'India',
		achievements: [
			'Built drag-and-drop component renderer for dynamic forms',
			'Wrote and maintained unit tests for application components',
		],
	},
];

interface IExperience {
	company: string;
	role: string;
	duration: string;
	location: string;
	achievements: string[];
}
