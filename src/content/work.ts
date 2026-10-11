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
	credits?: string;
	/** Large entry on the home page (investabl has its own section). */
	featured: boolean;
	hasPage: boolean;
	layers?: Layer[];
};

const DESIGN_CREDIT = 'Product design: Chaitanya Hegde';

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
			'Prop firms are opaque: rules hide in fine print and payouts take weeks. investabl publishes every rule and settles payouts onchain, so a trader can see exactly what they signed up for and get paid in seconds. It is live, serving traders in 32+ countries, and earning revenue.',
		owned: [
			'The design system, from Figma to a "trading cockpit" component library',
			'Every product surface: onboarding, evaluation, trading terminal, payouts, referrals',
			'The API, data model and real-time layer',
			'Trading venue integrations and the payout pipeline',
			'Cloud infrastructure and CI/CD',
		],
		deepdives: [
			{
				title: 'One person, every layer',
				body: 'As founding engineer there is no hand-off: the same person who draws the component in Figma ships its API and the VM it runs on. That keeps the system small and consistent, with one set of tokens, one type layer shared across the monorepo, and one deploy path.',
			},
			{
				title: 'A cockpit, not a dashboard',
				body: 'Traders live in the terminal for hours. The interface is built around resizable panels, a vendored TradingView chart and dense tables, with server state in TanStack Query and live updates over WebSockets so the screen never lies about a position.',
			},
			{
				title: 'Payouts in seconds',
				body: 'Withdrawals settle onchain with a median of about ten seconds. Every payout is publicly verifiable, which turns the most stressful moment of using a prop firm into its best marketing.',
			},
		],
		outcome: 'Live and earning revenue, with traders in 32+ countries.',
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
				items: ['React 19', 'Vite', 'TanStack Query', 'Zustand', 'TradingView', 'wagmi / viem', 'PWA'],
			},
			{
				name: 'Services',
				note: 'Real-time core',
				items: ['Fastify', 'PostgreSQL', 'Redis', 'WebSockets', 'Zod', 'Hyperliquid', 'MT4 / MT5', 'Gemini'],
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
			'Bots and Sybil attacks drain every Web3 protocol, from airdrops to governance. Proof of Humanity is a layered verification system that confirms genuine users from selective data and zero-knowledge proofs, preserves privacy, and works across chains.',
		owned: [
			'All frontend engineering, as the only developer on the product',
			'The conversational onboarding flow and its motion',
			'Humanity score dashboard and verification cards',
			'The NFT mint flow',
			'The v2 rebuild',
		],
		deepdives: [
			{
				title: '80% faster in v2',
				body: 'v1 proved the idea; v2 had to feel instant. The rebuild treated performance as a feature, auditing everything on the first-load path and deferring what the first screen does not need, and landed an 80% improvement in web performance.',
			},
			{
				title: 'Onboarding as a conversation',
				body: 'Identity checks feel like paperwork. The flow turns them into a short conversation, one question and one verification at a time, with motion pacing each step so the user always knows what is happening and why.',
			},
		],
		outcome: 'Launched as Intract’s identity layer, then rebuilt as a much faster v2.',
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
		context:
			'Newcomers bounced at “connect wallet”, veterans yawned at retweet tasks, and protocols burned through incentives. Quests answers with RPG-style streaks, badge evolutions and campaign arcs that pull users from initiate to legend.',
		owned: [
			'The Admin Panel and CMS, built single-handedly',
			'Credits infrastructure frontend for quest creation and data export',
			'Quest, campaign and achievement surfaces',
			'Landing pages for intract.io and its products',
		],
		deepdives: [
			{
				title: 'The CMS behind the game',
				body: 'Every quest, campaign and reward users see is authored somewhere. The admin panel and CMS let the team ship new campaigns without engineering, which is what let the quest catalogue scale.',
			},
			{
				title: 'Gamified, not noisy',
				body: 'Streaks, chests and evolving badges only work when they feel earned. The UI keeps progress legible first and celebrates second, so motion rewards completion instead of competing with the task.',
			},
		],
		outcome: 'Shipped campaigns for major ecosystem launches, authored by the team through the CMS.',
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
			'Spyne’s customers, from single dealers to enterprises, worked in a dashboard that had outgrown itself. The rebuild had to support teams, roles and self-serve billing without slowing anyone down.',
		owned: [
			'Dashboard modernization on React and Redux with atomic design',
			'A credits microservice for financial data',
			'User invitations, guest login and enterprise onboarding',
			'RBAC across the console and centralized login',
			'The PLG flow: coach marks, credits and Stripe payments',
		],
		deepdives: [
			{
				title: 'Atomic, from scratch',
				body: 'The new dashboard was built from atoms up, so every new screen reused the same primitives. It made the rebuild faster to ship and kept the product consistent as teams added features.',
			},
			{
				title: 'Roles and money',
				body: 'RBAC and a credits service sit under everything a customer does. Getting permissions and balances right was the difference between a dashboard and a product enterprises could trust.',
			},
		],
		outcome: 'A modern console with self-serve billing and enterprise-ready access control.',
		featured: true,
		hasPage: true,
	},
	{
		slug: 'mints',
		title: 'Intract Mints',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2024 to 2025',
		oneLiner: 'Creator-first NFT minting with an 80% revenue share. Since sunset.',
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
