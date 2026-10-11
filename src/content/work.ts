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
	/** Shown in a type-led frame when there is no cover yet. */
	schematic?: string[];
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
			'A prop trading firm where traders pass one evaluation, trade firm capital and withdraw onchain in about ten seconds.',
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
				src: '/work/investabl/pricing.jpg',
				alt: 'investabl pricing with three account sizes and published rules',
				width: 1440,
				height: 740,
			},
		],
		context:
			'Prop firms hide rules and pay out in weeks. investabl publishes every rule and pays out onchain in seconds.',
		owned: [
			'Design system',
			'Product UI, end to end',
			'API and real-time layer',
			'Cloud and CI/CD',
		],
		deepdives: [
			{
				title: 'One engineer, every layer',
				body: 'Figma to component to API to VM, with no hand-offs.',
			},
			{
				title: 'A trading cockpit',
				body: 'Resizable panels, live charts and WebSocket updates.',
			},
			{
				title: 'Payouts in ~10s',
				body: 'Every withdrawal settles onchain and is publicly verifiable.',
			},
		],
		outcome: 'Live, earning revenue, traders in 32+ countries.',
		featured: false,
		hasPage: true,
		layers: [
			{
				name: 'Design system',
				note: 'Figma to code',
				items: ['Figma', 'Claude Design', 'Radix / shadcn', 'Tailwind'],
			},
			{
				name: 'Interface',
				note: 'The trading cockpit',
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
				note: 'Real-time core',
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
				note: 'Ship and run',
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
		oneLiner: 'An identity layer that proves a wallet belongs to a real person.',
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
				src: '/work/persona/statue-poster.jpg',
				video: '/work/persona/statue.mp4',
				alt: 'Cinematic brand film of a marble statue on a mountain',
				width: 1280,
				height: 720,
			},
		],
		context:
			'A privacy-first identity layer that keeps bots and Sybil attacks out of Web3.',
		owned: [
			'All frontend, as the only developer',
			'Conversational onboarding',
			'Score dashboard and NFT mint',
			'The v2 rebuild',
		],
		deepdives: [
			{
				title: '80% faster in v2',
				body: 'Rebuilt with performance as a feature.',
			},
			{
				title: 'Onboarding as a conversation',
				body: 'One question, one verification at a time.',
			},
		],
		outcome: 'Shipped as Intract’s identity layer, then made much faster.',
		credits: DESIGN_CREDIT,
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
			'A quest engine that turns Web3 onboarding into a game, plus the admin and CMS that run it.',
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
		context: 'A quest engine that makes Web3 onboarding feel like a game.',
		owned: [
			'Admin panel and CMS, solo',
			'Credits infrastructure UI',
			'Quest and achievement surfaces',
			'intract.io landing pages',
		],
		deepdives: [
			{
				title: 'The CMS behind the game',
				body: 'The team ships campaigns without engineering.',
			},
			{
				title: 'Gamified, not noisy',
				body: 'Progress first, celebration second.',
			},
		],
		outcome: 'Campaigns for major launches, authored through the CMS.',
		credits: DESIGN_CREDIT,
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
			'The rebuilt dashboard for an AI car-photography platform, from RBAC to self-serve billing.',
		stack: ['React', 'Redux', 'Node.js', 'Stripe', 'MongoDB'],
		schematic: ['RBAC', 'Credits service', 'Stripe PLG', 'Atomic UI'],
		gallery: [],
		context:
			'A rebuilt console for an AI car-photography platform, from single dealers to enterprises.',
		owned: [
			'Dashboard rebuild, atomic design',
			'Credits microservice',
			'RBAC and centralized login',
			'Stripe self-serve billing',
		],
		deepdives: [
			{
				title: 'Atomic, from scratch',
				body: 'Every screen built from the same primitives.',
			},
			{
				title: 'Roles and money',
				body: 'Permissions and balances enterprises can trust.',
			},
		],
		outcome:
			'A modern console with self-serve billing and enterprise access control.',
		featured: true,
		hasPage: true,
	},
	{
		slug: 'mints',
		title: 'Intract Mints',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2024 to 2025',
		oneLiner:
			'Creator-first NFT minting with an 80% revenue share. Since sunset.',
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
		oneLiner: 'A personal AI assistant for work, money and identity online.',
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
];

export const caseStudies = work.filter((w) => w.hasPage);

export function getWork(slug: string) {
	return work.find((w) => w.slug === slug);
}

export function nextWork(slug: string) {
	const i = caseStudies.findIndex((w) => w.slug === slug);
	return caseStudies[(i + 1) % caseStudies.length];
}
