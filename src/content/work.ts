export type LayerName = 'Design system' | 'Interface' | 'Services' | 'Cloud';
export type Layer = { name: LayerName; note: string; items: string[] };
export type Media = {
	src: string;
	alt: string;
	width: number;
	height: number;
	/** Optional looping clip; `src` is then its poster. */
	video?: string;
};
export type Deepdive = { title: string; body: string };
export type Work = {
	slug: string;
	title: string;
	company: string;
	role: string;
	years: string;
	oneLiner: string;
	link?: string;
	stack: string[];
	cover?: Media;
	/** Drawn architecture schematic, shown when there is no cover yet. */
	schematic?: { label: string; note?: string }[];
	gallery: Media[];
	context: string;
	owned: string[];
	deepdives: Deepdive[];
	outcome: string;
	credits?: { role: string; name: string; href: string };
	/** Large entry on the home page (investabl has its own section). */
	featured: boolean;
	hasPage: boolean;
	layers?: Layer[];
	/** Headline proof, set in our own type rather than left inside a screenshot. */
	figures?: { value: string; label: string }[];
};

const DESIGN_CREDIT = {
	role: 'Product design',
	name: 'Chaitanya Hegde',
	href: 'https://cherrydesign.framer.website',
};

export const work: Work[] = [
	{
		slug: 'investabl',
		title: 'investabl.ai',
		company: 'investabl.ai',
		role: 'Founding Engineer',
		years: '2026 to now',
		oneLiner:
			'A prop trading platform. Traders pass an evaluation, trade the firm’s capital and get paid out onchain in about ten seconds.',
		link: 'https://app.investabl.ai',
		stack: ['React 19', 'Vite', 'Fastify', 'PostgreSQL', 'Redis', 'GCP'],
		cover: {
			src: '/work/investabl/hero.jpg',
			alt: 'investabl landing page with a live onchain payouts feed and a payout certificate',
			width: 1440,
			height: 900,
		},
		gallery: [
			{
				src: '/work/investabl/trade.jpg',
				alt: 'investabl trading screen: watchlist, live BTC/USD candles, the order ticket and the account’s trading goals',
				width: 1512,
				height: 688,
			},
			{
				src: '/work/investabl/pricing.jpg',
				alt: 'investabl pricing with three account sizes and published rules',
				width: 1440,
				height: 740,
			},
		],
		context:
			'Most prop firms keep their rules vague and take weeks to pay. investabl publishes every rule, and payouts settle onchain in seconds.',
		owned: [
			'Design system',
			'The trading app',
			'API and real-time layer',
			'Cloud and CI/CD',
		],
		deepdives: [
			{
				title: 'No hand-offs',
				body: 'I design the screens in Figma, build the components, write the API and deploy it myself.',
			},
			{
				title: 'The trading screen',
				body: 'Resizable panels, TradingView charts and prices pushed over WebSockets.',
			},
			{
				title: 'Payouts in about 10 seconds',
				body: 'Withdrawals settle onchain, so anyone can check them.',
			},
		],
		outcome:
			'Live and earning revenue. I designed it, built it and keep it running.',
		featured: false,
		hasPage: true,
		figures: [
			{ value: '~10s', label: 'Median payout' },
			{ value: '32+', label: 'Countries' },
			{ value: 'Live', label: 'Earning revenue' },
		],
		layers: [
			{
				name: 'Design system',
				note: 'Figma to components',
				items: ['Figma', 'Claude Design', 'Radix / shadcn', 'Tailwind'],
			},
			{
				name: 'Interface',
				note: 'The trading app',
				items: [
					'React 19',
					'Vite',
					'TanStack Query',
					'Zustand',
					'TradingView',
					'wagmi / viem',
					'PWA',
				],
			},
			{
				name: 'Services',
				note: 'APIs and live data',
				items: [
					'Fastify',
					'PostgreSQL',
					'Redis',
					'WebSockets',
					'Zod',
					'Hyperliquid',
					'MT4 / MT5',
					'Gemini',
				],
			},
			{
				name: 'Cloud',
				note: 'Deploys and hosting',
				items: ['GCP VMs', 'GitHub Actions CI/CD'],
			},
		],
	},
	{
		slug: 'persona',
		title: 'Proof of Humanity',
		company: 'Intract',
		role: 'Sole developer',
		years: '2024 to 2025',
		oneLiner:
			'Shows that a wallet belongs to a real person, without revealing who they are.',
		link: 'https://persona.intract.io',
		stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
		cover: {
			src: '/work/persona/cover.jpg',
			alt: 'Proof of Humanity dashboard showing a humanity score and identity card',
			width: 1920,
			height: 1080,
		},
		gallery: [
			{
				src: '/work/persona/dashboard-poster.jpg',
				video: '/work/persona/dashboard.mp4',
				alt: 'Scrolling through the Proof of Humanity dashboard',
				width: 1280,
				height: 720,
			},
			{
				src: '/work/persona/mint.jpg',
				alt: 'Minting the Proof of Humanity NFT',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/persona/identity.jpg',
				alt: 'Building your identity: the onboarding loading state',
				width: 1920,
				height: 1080,
			},
		],
		context:
			'Bots and fake wallets drain Web3 rewards meant for real users. Proof of Humanity gives each wallet a humanity score while keeping the person’s data private.',
		owned: [
			'The whole frontend, as sole developer',
			'Conversational onboarding',
			'Score dashboard and NFT mint',
			'The v2 rebuild',
		],
		deepdives: [
			{
				title: '80% faster in v2',
				body: 'I rebuilt the app for v2 with speed as the main goal.',
			},
			{
				title: 'Chat-style onboarding',
				body: 'Users verify one thing at a time instead of filling in a long form.',
			},
		],
		outcome:
			'Launched as Intract’s identity product, then rebuilt as a faster v2.',
		credits: DESIGN_CREDIT,
		figures: [
			{ value: '80%', label: 'Faster in v2' },
			{ value: 'Solo', label: 'Developer' },
		],
		featured: true,
		hasPage: true,
	},
	{
		slug: 'intract-quests',
		title: 'Intract Quests',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2024 to 2026',
		oneLiner:
			'Quests that walk people through Web3 products, plus the admin panel and CMS the team runs them from.',
		link: 'https://quest.intract.io',
		stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'TanStack Query'],
		cover: {
			src: '/work/intract-quests/cover.jpg',
			alt: 'Supertown campaign page with collectible cards on a stage',
			width: 1920,
			height: 1316,
		},
		gallery: [
			{
				src: '/work/intract-quests/quests-poster.jpg',
				video: '/work/intract-quests/quests.mp4',
				alt: 'A quest page with tasks and a reward chest',
				width: 1280,
				height: 720,
			},
			{
				src: '/work/intract-quests/achievements-poster.jpg',
				video: '/work/intract-quests/achievements.mp4',
				alt: 'Achievements with evolving badges',
				width: 1280,
				height: 720,
			},
			{
				src: '/work/intract-quests/home-poster.jpg',
				video: '/work/intract-quests/home.mp4',
				alt: 'Quests home with featured campaigns',
				width: 1280,
				height: 720,
			},
		],
		context:
			'Projects use Intract to onboard users through quests: short tasks with a reward at the end. Every campaign needs its own tasks, pages and rewards, set up quickly.',
		owned: [
			'Admin panel and CMS, built solo',
			'Credits infrastructure UI',
			'Quest and achievement surfaces',
			'intract.io landing pages',
		],
		deepdives: [
			{
				title: 'A CMS for campaigns',
				body: 'The ops team builds and launches campaigns without waiting on an engineer.',
			},
			{
				title: 'Progress up front',
				body: 'Quest pages show what is done and what is left. Badges and rewards stay out of the way of the tasks.',
			},
		],
		outcome: 'Campaigns for major launches were set up in the CMS I built.',
		credits: DESIGN_CREDIT,
		figures: [{ value: 'Solo', label: 'Admin and CMS' }],
		featured: true,
		hasPage: true,
	},
	{
		slug: 'spyne',
		title: 'Spyne Console',
		company: 'Spyne.ai',
		role: 'Full Stack Software Engineer',
		years: '2022 to 2024',
		oneLiner:
			'The B2B console behind Spyne’s Virtual Studio, where dealers turn lot photos into studio shots. Frontend and backend.',
		link: 'https://www.spyne.ai/virtual-car-photography-studio',
		stack: ['React', 'Redux', 'Node.js', 'Stripe', 'MongoDB'],
		cover: {
			src: '/work/spyne/console-before.jpg',
			alt: 'Spyne Console with a dealer’s lot photos of a Mercedes-Benz EQB loaded, before Virtual Studio processing',
			width: 1440,
			height: 900,
		},
		schematic: [
			{ label: 'Console', note: 'React, Redux, atomic UI' },
			{ label: 'Login and roles', note: 'Central auth, RBAC' },
			{ label: 'Credits service', note: 'Node microservice' },
			{ label: 'Billing', note: 'Stripe, self-serve' },
		],
		gallery: [
			{
				src: '/work/spyne/console.jpg',
				alt: 'The same lot photo beside its virtual-studio version in Spyne Console, as the console ships today',
				width: 1440,
				height: 900,
			},
		],
		context:
			'Spyne’s Virtual Studio turns photos shot on a dealer’s lot into studio-quality listings. The Console is the SaaS where dealerships, from single rooftops to large groups, upload, process and publish them. It needed team permissions and a way for customers to buy credits on their own.',
		owned: [
			'Dashboard rebuild, atomic design',
			'Credits microservice',
			'RBAC and centralized login',
			'Stripe self-serve billing',
		],
		deepdives: [
			{
				title: 'Rebuilt on atomic design',
				body: 'Every screen is put together from one shared set of components.',
			},
			{
				title: 'Roles and credits',
				body: 'One central login, role-based access, and a service that tracks each account’s credit balance.',
			},
		],
		outcome:
			'Customers could sign up, pay with Stripe and manage their team on their own.',
		figures: [{ value: '0 → 1', label: 'Self-serve billing' }],
		featured: true,
		hasPage: true,
	},
	{
		slug: 'mints',
		title: 'Intract Mints',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2024 to 2025',
		oneLiner: 'NFT minting where creators kept 80% of revenue. Since shut down.',
		stack: ['React', 'Next.js'],
		cover: {
			src: '/work/mints/cover.jpg',
			alt: 'Intract Mints create, submit and earn screen',
			width: 1920,
			height: 1080,
		},
		gallery: [],
		context: '',
		owned: [],
		deepdives: [],
		outcome: '',
		credits: DESIGN_CREDIT,
		featured: false,
		hasPage: false,
	},
	{
		slug: 'ball-e',
		title: 'Ball-E',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2025',
		oneLiner: 'An AI personal assistant for everyday online tasks.',
		stack: ['React', 'Next.js'],
		cover: {
			src: '/work/ball-e/cover.jpg',
			alt: 'Ball-E landing page: your AI personal assistant',
			width: 1920,
			height: 1080,
		},
		gallery: [],
		context: '',
		owned: [],
		deepdives: [],
		outcome: '',
		credits: DESIGN_CREDIT,
		featured: false,
		hasPage: false,
	},
	{
		slug: 'irame',
		title: 'irame.ai',
		company: 'irame.ai',
		role: 'Frontend Engineer, part-time',
		years: '2024',
		oneLiner:
			'An AI audit platform. I built the chat-driven app and the landing page.',
		link: 'https://app.irame.ai',
		cover: {
			src: '/work/irame/cover.jpg',
			alt: 'irame.ai: IRA’s workspace, with the step-by-step planner beside the generated analysis code',
			width: 1430,
			height: 1043,
		},
		stack: [],
		gallery: [],
		context: '',
		owned: [],
		deepdives: [],
		outcome: '',
		featured: false,
		hasPage: false,
	},
];

export const caseStudies = work.filter((w) => w.hasPage);

export function getWork(slug: string) {
	return work.find((w) => w.slug === slug);
}

export function nextWork(slug: string) {
	const i = caseStudies.findIndex((w) => w.slug === slug);
	return caseStudies[(i + 1) % caseStudies.length];
}
