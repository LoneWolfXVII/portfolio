import { LayoutWithHeader } from '@/components/layout/layout-with-header';
import { ThemeProvider } from '@/components/theme-provider';
import '@/styles/globals.css';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { Exo_2 } from 'next/font/google';

const exo2 = Exo_2({
	subsets: ['latin', 'vietnamese', 'cyrillic'],
	weight: ['300', '400', '500', '600', '700', '800', '900'],
	variable: '--font-exo2',
});

export const metadata: Metadata = {
	title: 'Nischal Gupta | Frontend Developer Portfolio',
	description:
		"Explore Nischal Gupta's portfolio – a skilled Frontend Developer specializing in Next.js, React, and modern web technologies. Showcasing innovative projects, UI/UX expertise, and high-performance web applications.",
	keywords: [
		'Frontend Developer',
		'Next.js Developer',
		'React Developer',
		'Nischal Gupta Portfolio',
		'Web Development',
		'UI/UX Design',
		'JavaScript',
		'TypeScript',
		'Modern Web Technologies',
	],
	openGraph: {
		title: 'Nischal Gupta | Frontend Developer Portfolio',
		description:
			"Discover Nischal Gupta's expertise in Frontend Development, React, and Next.js. View projects, case studies, and technical skills.",
		url: 'https://nischal.id.vn',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nischal Gupta | Frontend Developer Portfolio',
		description:
			"Explore Nischal Gupta's frontend projects and expertise in React, Next.js, and modern web development.",
	},
	icons: {
		icon: '/favicon.ico',
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body
				className={`${exo2.variable} antialiased scroll-smooth w-full max-w-dvw overflow-x-hidden`}
			>
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					disableTransitionOnChange
				>
					<LayoutWithHeader>{children}</LayoutWithHeader>
				</ThemeProvider>
				<Analytics />
				<SpeedInsights />
			</body>
		</html>
	);
}
