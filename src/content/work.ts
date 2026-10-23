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
export type Credit = { role: string; name: string; href: string };
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
	credits?: Credit[];
	/** Shown in the Live row when there is no link, e.g. 'Retired'. */
	status?: string;
	/** Large entry on the home page (investabl has its own section). */
	featured: boolean;
	hasPage: boolean;
	layers?: Layer[];
	/** Headline proof, set in our own type rather than left inside a screenshot. */
	figures?: { value: string; label: string }[];
};

const CHAITANYA: Credit = {
	role: 'Product design',
	name: 'Chaitanya Hegde',
	href: 'https://cherrydesign.framer.website',
};
const MAYANK: Credit = {
	role: 'Product design',
	name: 'Mayank',
	href: 'https://mayank.design',
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
			src: '/work/investabl/hero.webp',
			alt: 'investabl landing page with a live onchain payouts feed and a payout certificate',
			width: 2880,
			height: 1800,
		},
		gallery: [
			{
				src: '/work/investabl/trade-dark.webp',
				alt: 'investabl trading screen in the dark theme: watchlist, live gold candles, the order ticket and the account’s trading goals',
				width: 3024,
				height: 1608,
			},
			{
				src: '/work/investabl/trade-light.webp',
				alt: 'The same trading screen in the light theme',
				width: 3024,
				height: 1608,
			},
			{
				src: '/work/investabl/dashboard.webp',
				alt: 'investabl account dashboard: equity, the profit target, and a live chart of how much can still be lost today',
				width: 3024,
				height: 1608,
			},
		],
		context:
			'Most prop firms keep their rules vague and take weeks to pay. investabl publishes every rule, and payouts settle onchain in seconds.',
		owned: [
			'Design system',
			'Trading interface',
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
				body: 'Resizable panels and TradingView charts, with prices streamed over WebSockets.',
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
		role: 'Frontend Engineer',
		years: '2024 to 2025',
		oneLiner:
			'Shows that a wallet belongs to a real person, without revealing who they are.',
		link: 'https://persona.intract.io',
		stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
		cover: {
			src: '/work/persona/cover.webp',
			alt: 'Proof of Humanity dashboard showing a humanity score and identity card',
			width: 1920,
			height: 1080,
		},
		gallery: [
			{
				src: '/work/persona/dashboard-poster.webp',
				video: '/work/persona/dashboard.mp4',
				alt: 'Scrolling through the Proof of Humanity dashboard',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/persona/onboarding-poster.webp',
				video: '/work/persona/onboarding.mp4',
				alt: 'Onboarding as a conversation: what Proof of Humanity is, and how human you are',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/persona/verification-poster.webp',
				video: '/work/persona/verification.mp4',
				alt: 'Verifying accounts one at a time to build the humanity score',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/persona/identity-poster.webp',
				video: '/work/persona/identity.mp4',
				alt: 'Building your identity: the onboarding loading state',
				width: 1576,
				height: 1080,
			},
			{
				src: '/work/persona/mint.webp',
				alt: 'Minting the Proof of Humanity NFT',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/persona/card-anatomy.webp',
				alt: 'Anatomy of the Proof of Humanity card: humanity points, fingerprint and the 3D David',
				width: 2552,
				height: 1180,
			},
			{
				src: '/work/persona/socials.webp',
				alt: 'Connected identities: every account that adds to the humanity score',
				width: 1920,
				height: 1080,
			},
		],
		context:
			'Bots and fake wallets drain Web3 rewards meant for real users. Proof of Humanity gives each wallet a humanity score while keeping the person’s data private.',
		owned: [
			'The entire frontend, as sole developer',
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
		credits: [CHAITANYA],
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
			'Quests that walk people through Web3 products, and the B2B dashboard customers use to build them.',
		link: 'https://quest.intract.io',
		stack: ['React', 'Next.js', 'TypeScript', 'Tailwind', 'TanStack Query'],
		cover: {
			src: '/work/intract-quests/cover.webp',
			alt: 'SuperTown campaign: profiles on a stage, ranked by the community',
			width: 1920,
			height: 1080,
		},
		gallery: [
			{
				src: '/work/intract-quests/quest-blast-poster.webp',
				video: '/work/intract-quests/quest-blast.mp4',
				alt: 'Quests home with a featured D’CENT × Intract campaign',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/blast-poster.webp',
				video: '/work/intract-quests/blast.mp4',
				alt: 'An Intract × Blast quest with tasks, a countdown and a USDC reward',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/claim-poster.webp',
				video: '/work/intract-quests/claim.mp4',
				alt: 'A quest’s tasks, ending in an onchain HEX mint',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/hex-mint-poster.webp',
				video: '/work/intract-quests/hex-mint.mp4',
				alt: 'Minting the HEX: the quest’s completion moment',
				width: 1576,
				height: 1080,
			},
			{
				src: '/work/intract-quests/gems-poster.webp',
				video: '/work/intract-quests/gems.mp4',
				alt: 'Quest complete: claiming the USDC reward',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/wheel-poster.webp',
				video: '/work/intract-quests/wheel.mp4',
				alt: 'The Gem store, where gems buy token rewards',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/achievements-poster.webp',
				video: '/work/intract-quests/achievements.mp4',
				alt: 'Achievements with evolving badges',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/supertown-poster.webp',
				video: '/work/intract-quests/supertown.mp4',
				alt: 'SuperTown: a Superchain campaign landing',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/profiles-poster.webp',
				video: '/work/intract-quests/profiles.mp4',
				alt: 'SuperTown profiles, ranked by the community',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/intract-quests/collectibles-poster.webp',
				video: '/work/intract-quests/collectibles.mp4',
				alt: 'Superchain collectibles from the SuperTown campaign',
				width: 1920,
				height: 1080,
			},
		],
		context:
			'Projects use Intract to onboard users through quests: short tasks with a reward at the end. Self-serve and enterprise customers build those quests and campaigns themselves, in a B2B dashboard that feeds the consumer app.',
		owned: [
			'The B2B dashboard, built on my own',
			'Frontend for the credits system',
			'Quest and achievement pages',
			'intract.io landing pages',
		],
		deepdives: [
			{
				title: 'A dashboard for customers',
				body: 'Self-serve and enterprise customers create quests and launch campaigns without waiting on Intract’s team.',
			},
			{
				title: 'Progress up front',
				body: 'Quest pages show what is done and what is left. Badges and rewards stay out of the way of the tasks.',
			},
		],
		outcome: 'Campaigns for major launches were built in the B2B dashboard.',
		credits: [CHAITANYA],
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
			'Led the rebuild of the B2B console behind Spyne’s Virtual Studio, and built the access, billing and onboarding systems around it.',
		link: 'https://www.spyne.ai/virtual-car-photography-studio',
		stack: ['React', 'Redux', 'Node.js', 'Stripe', 'MongoDB'],
		cover: {
			src: '/work/spyne/console-before.webp',
			alt: 'Spyne Console with a dealer’s lot photos of a Mercedes-Benz EQB loaded, before Virtual Studio processing',
			width: 2880,
			height: 1800,
		},
		schematic: [
			{ label: 'Console', note: 'React, Redux, atomic UI' },
			{ label: 'Login and roles', note: 'Central auth, RBAC' },
			{ label: 'Credits service', note: 'Node microservice' },
			{ label: 'Billing', note: 'Stripe, self-serve' },
		],
		gallery: [
			{
				src: '/work/spyne/console.webp',
				alt: 'The same lot photo beside its virtual-studio version in Spyne Console, as the console ships today',
				width: 2880,
				height: 1800,
			},
		],
		context:
			'Spyne’s Virtual Studio turns photos taken on a dealership lot into studio-quality listings. The Console is where dealers, from single rooftops to enterprise groups, upload, process and publish them. It needed a modern foundation: consistent UI, role-based access, self-serve purchasing and faster enterprise onboarding.',
		owned: [
			'Console rebuild in React and Redux',
			'Role-based access and centralized login',
			'User invitations and guest access',
			'Enterprise onboarding tool',
			'Self-serve signup with credits and Stripe',
			'Credits microservice, with the platform team',
		],
		deepdives: [
			{
				title: 'A component system from scratch',
				body: 'Every screen is assembled from shared atomic components, so new features stay consistent as the console grows.',
			},
			{
				title: 'Access for teams',
				body: 'Role-based access across the console and a centralized login, with invitations and guest access for collaborators.',
			},
			{
				title: 'Enterprise setup, without engineering',
				body: 'An internal onboarding tool lets sales and customer success configure each new client themselves.',
			},
			{
				title: 'Self-serve revenue',
				body: 'A product-led signup flow with guided coach marks, credits and Stripe checkout.',
			},
		],
		outcome:
			'Dealers can sign up, buy credits and manage their teams on their own, and enterprise clients are configured without engineering time.',
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
			'A creator-first NFT minting platform that paid creators 80% of revenue. Now retired.',
		status: 'Retired',
		stack: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
		cover: {
			src: '/work/mints/cover.webp',
			alt: 'Intract Mints creator view: my creatives, with mint stats',
			width: 1920,
			height: 1080,
		},
		gallery: [
			{
				src: '/work/mints/landing-poster.webp',
				video: '/work/mints/landing.mp4',
				alt: 'Mints landing: create, submit, earn 80% of revenue',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/mints/create-steps.webp',
				alt: 'From blank canvas to configured card to a listed, tradable NFT',
				width: 2552,
				height: 1132,
			},
			{
				src: '/work/mints/create-poster.webp',
				video: '/work/mints/create.mp4',
				alt: 'Uploading artwork in the create flow',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/mints/explore-poster.webp',
				video: '/work/mints/explore.mp4',
				alt: 'Exploring minted creations from the community',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/mints/nft-anatomy.webp',
				alt: 'Anatomy of a Mints card: creator, chain, a gradient drawn from the art, cost and supply',
				width: 2552,
				height: 1188,
			},
			{
				src: '/work/mints/drops-poster.webp',
				video: '/work/mints/drops.mp4',
				alt: 'Daily Drops with NFT, gem and USDC prizes',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/mints/creator-profile.webp',
				alt: 'A creator profile with NFTs, mints and earnings',
				width: 2552,
				height: 940,
			},
			{
				src: '/work/mints/intro.webp',
				alt: 'How to become a Mints creator: mint, create, earn',
				width: 1576,
				height: 1080,
			},
		],
		context:
			'Most creators were priced out before their first mint: confusing wallets, high fees and crowded marketplaces that buried new work. Intract Mints set out to make minting feel like posting, with one interface, cross-chain by default, and 80% of revenue going back to the creator.',
		owned: [
			'The entire frontend',
			'Create flow, from upload to a listed NFT',
			'Explore feed and creator profiles',
			'Daily Drops',
		],
		deepdives: [
			{
				title: 'Three steps to a live NFT',
				body: 'A blank canvas becomes a configured card, then a listed, tradable NFT, without leaving the flow.',
			},
			{
				title: 'Cards that frame their own art',
				body: 'Each NFT card takes its gradient from the artwork’s dominant colour, so every piece is presented in its own palette.',
			},
			{
				title: 'Rewards that flow back',
				body: 'Creator profiles show NFTs, mints and earnings at a glance, and Daily Drops add platform-funded prizes on top.',
			},
		],
		outcome:
			'Shipped and run until Intract retired it, once the product no longer fit the wider roadmap.',
		credits: [CHAITANYA],
		featured: false,
		hasPage: true,
	},
	{
		slug: 'ball-e',
		title: 'Ball-E',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2025',
		oneLiner:
			'An AI assistant that helps people manage their work, money and identity online.',
		stack: ['React', 'Next.js', 'TypeScript'],
		cover: {
			src: '/work/ball-e/cover.webp',
			alt: 'Ball-E landing page: your AI personal assistant',
			width: 1920,
			height: 1080,
		},
		gallery: [
			{
				src: '/work/ball-e/orb-poster.webp',
				video: '/work/ball-e/orb.mp4',
				alt: 'Ball-E’s orb answering “What did I learn recently?”',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/ball-e/invest-poster.webp',
				video: '/work/ball-e/invest.mp4',
				alt: 'An investment plan built inside the chat, with live tickers',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/ball-e/calendar-poster.webp',
				video: '/work/ball-e/calendar.mp4',
				alt: 'Ball-E flags a meeting that clashes with a birthday and offers to cancel it',
				width: 1920,
				height: 1316,
			},
			{
				src: '/work/ball-e/jobs.webp',
				alt: 'Ball-E writing a cover letter beside a job listing on LinkedIn',
				width: 1920,
				height: 1080,
			},
			{
				src: '/work/ball-e/intern.webp',
				alt: 'Ball-E as an AI-powered Web3 intern, on desktop and mobile',
				width: 1440,
				height: 986,
			},
			{
				src: '/work/ball-e/streaks.webp',
				alt: 'Daily streaks with a check-in calendar',
				width: 1440,
				height: 904,
			},
			{
				src: '/work/ball-e/invited.webp',
				alt: 'An invite accepted, with the ways to earn more points',
				width: 1440,
				height: 907,
			},
			{
				src: '/work/ball-e/leaderboard.webp',
				alt: 'Ball-E leaderboard with streaks, points and a podium',
				width: 1440,
				height: 958,
			},
			{
				src: '/work/ball-e/logo.webp',
				alt: 'The Ball-E mark',
				width: 1920,
				height: 1080,
			},
		],
		context:
			'Ball-E is an AI assistant that helps people manage their work, money and identity online. It had to feel like a conversation rather than a set of forms, so its answers arrive as working interface inside the chat: schedules, job tools and investment plans.',
		owned: [
			'The chat interface, built from scratch',
			'Rich responses rendered inside the conversation',
			'Motion and micro-interactions across the thread',
		],
		deepdives: [
			{
				title: 'A chat interface from first principles',
				body: 'There was no component library to start from, so the conversation layer was built from the ground up: message flow, input, scrolling and the orb that marks Ball-E’s turn.',
			},
			{
				title: 'Answers that are interfaces',
				body: 'Replies render as live UI in the thread: a schedule that resolves a clash, a cover letter beside a job listing, an investment plan with live tickers.',
			},
		],
		outcome:
			'Every Ball-E flow, from scheduling to investing, runs through the chat interface.',
		credits: [CHAITANYA, MAYANK],
		featured: false,
		hasPage: true,
	},
	{
		slug: 'bantr',
		title: 'Bantr',
		company: 'Intract',
		role: 'Frontend Engineer',
		years: '2025',
		oneLiner:
			'Rewards creators whose posts on X drive real product usage. I built the frontend and, on the backend, the sentiment scoring and post verification that determine reward eligibility.',
		link: 'https://bantr.fun',
		stack: ['React', 'Next.js', 'TypeScript', 'X API'],
		credits: [MAYANK],
		cover: {
			src: '/work/bantr/noise.webp',
			alt: 'Bantr’s launch hero: remove the noise, with posts from Crypto Twitter scattered around it',
			width: 1456,
			height: 818,
		},
		gallery: [
			{
				src: '/work/bantr/cover.webp',
				alt: 'Bantr landing page: time to go beyond mindshare to real product usage, over a stream of onchain actions',
				width: 1456,
				height: 819,
			},
			{
				src: '/work/bantr/analytics.webp',
				alt: 'Creator analytics: mindshare, Rizz over time and multipliers',
				width: 1440,
				height: 907,
			},
			{
				src: '/work/bantr/sentiment.webp',
				alt: 'Community sentiment, bullish against bearish',
				width: 1440,
				height: 571,
			},
			{
				src: '/work/bantr/onboarding.webp',
				alt: 'Onboarding: social and onchain influence combined into one Rizz score',
				width: 1440,
				height: 970,
			},
			{
				src: '/work/bantr/profile.webp',
				alt: 'A creator profile with Rizz, mindshare and campaign history',
				width: 1440,
				height: 1466,
			},
			{
				src: '/work/bantr/impact.webp',
				alt: 'Impact leaderboard for a campaign, with the top creators on a podium',
				width: 1440,
				height: 1098,
			},
			{
				src: '/work/bantr/global-leaderboard.webp',
				alt: 'Global community leaderboard',
				width: 1440,
				height: 960,
			},
			{
				src: '/work/bantr/rewards.webp',
				alt: 'Campaign widget: month 1 winners, claiming rewards and sharing the card on X',
				width: 1150,
				height: 703,
			},
			{
				src: '/work/bantr/pledge.webp',
				alt: 'A creator’s reward pledge confirmed for their community',
				width: 1440,
				height: 858,
			},
			{
				src: '/work/bantr/morph-rewards.webp',
				alt: 'Monthly campaign rewards going live',
				width: 1440,
				height: 858,
			},
			{
				src: '/work/bantr/referrals.webp',
				alt: 'Earning Rizz through referrals',
				width: 1440,
				height: 769,
			},
			{
				src: '/work/bantr/mobile.webp',
				alt: 'Bantr on mobile: profile and wallets, reward pledging, campaigns, the Rizz card and a campaign leaderboard',
				width: 1296,
				height: 903,
			},
		],
		context:
			'Crypto Twitter is loud, and most of the mindshare projects pay for never turns into anyone using the product. Bantr measures which creators actually drive onchain activity, ranks them on public leaderboards and rewards them for it.',
		owned: [
			'Landing page and its scroll-driven hero',
			'App homepage, stats and leaderboards',
			'X data ingestion and transformation',
			'Sentiment analysis and creator scoring',
		],
		deepdives: [
			{
				title: 'Remove the noise',
				body: 'The launch hero opens buried under posts from Crypto Twitter. Scrolling clears them away until only the product’s message is left.',
			},
			{
				title: 'From raw posts to a score',
				body: 'Posts arrive raw from the X API. I reshaped them into the data our scoring needed, analysed their sentiment and calculated each creator’s score from it.',
			},
			{
				title: 'Verified before rewarded',
				body: 'Posts are checked for eligibility before they count toward rewards, so payouts follow genuine contributions rather than spam.',
			},
			{
				title: 'Dense data, still readable',
				body: 'Stats, leaderboards and tables built to stay scannable across campaigns, creators and time ranges.',
			},
		],
		outcome:
			'Bantr ran live reward campaigns with Web3 projects, ranking creators and paying out against the scores this pipeline produced.',
		featured: false,
		hasPage: true,
	},
	{
		slug: 'irame',
		title: 'irame.ai',
		company: 'irame.ai',
		role: 'Frontend Engineer, part-time',
		years: '2024',
		oneLiner:
			'An AI platform for audit and compliance teams. I built the frontend of its chat-driven app and its marketing site.',
		link: 'https://app.irame.ai',
		cover: {
			src: '/work/irame/cover.webp',
			alt: 'irame.ai: IRA’s workspace, with the step-by-step planner beside the generated analysis code',
			width: 2860,
			height: 2086,
		},
		stack: [],
		gallery: [
			{
				src: '/work/irame/audits.webp',
				alt: 'irame.ai business processes, each with its audit workflows',
				width: 2860,
				height: 2086,
			},
			{
				src: '/work/irame/insights.webp',
				alt: 'irame.ai Q1 sales analysis dashboard with an AI insights panel',
				width: 2860,
				height: 2086,
			},
		],
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
