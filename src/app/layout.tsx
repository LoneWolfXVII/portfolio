import { Nav } from '@/components/nav';
import { SmoothScroll } from '@/components/smooth-scroll';
import { profile } from '@/content/profile';
import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

const sans = Geist({ subsets: ['latin'], variable: '--font-geist-sans' });
const mono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono' });

const title = 'Nischal Gupta, Senior Software Engineer';
const description =
	'Founding engineer at investabl.ai, building web products end to end. Previously at Intract and Spyne.';

export const metadata: Metadata = {
	metadataBase: new URL(profile.site),
	title: { default: title, template: '%s | Nischal Gupta' },
	description,
	alternates: { canonical: '/' },
	openGraph: {
		title,
		description,
		url: '/',
		siteName: 'Nischal Gupta',
		type: 'website',
	},
	twitter: { card: 'summary_large_image', title, description },
	icons: {
		icon: [
			{ url: '/favicon.ico' },
			{ url: '/logo/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
		],
		apple: '/logo/apple-touch-icon.png',
	},
};

export const viewport: Viewport = { themeColor: '#0b0b0c' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html
			lang="en"
			className={`${sans.variable} ${mono.variable}`}
			suppressHydrationWarning
		>
			<head>
				<script
					dangerouslySetInnerHTML={{
						__html: "matchMedia('(prefers-reduced-motion: no-preference)').matches&&document.documentElement.classList.add('motion')",
					}}
				/>
			</head>
			<body>
				<a
					href="#main"
					className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[80] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
				>
					Skip to content
				</a>
				<div className="grid-bg" aria-hidden />
				<div className="grain" aria-hidden />
				<SmoothScroll>
					<Nav />
					<main id="main" className="relative z-10 overflow-x-clip">
						{children}
					</main>
				</SmoothScroll>
			</body>
		</html>
	);
}
