import { ComingSoonPage } from '@/components/layout/coming-soon';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Nischal Gupta | Senior Frontend Engineer',
	description:
		"Explore Nischal Gupta's portfolio – a skilled software engineer specializing in Next.js, React, and modern web technologies. Showcasing innovative projects, UI/UX expertise, and high-performance web applications.",
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
		title: 'Nischal Gupta | Senior Frontend Engineer',
		description:
			"Discover Nischal Gupta's expertise in software engineering, React, and Next.js. View projects, case studies, and technical skills.",
		url: 'https://nischalgupta.dev',
		type: 'website',
		images: [
			{
				url: '/images/nischal_tech_3d_render.png',
				width: 1200,
				height: 630,
				alt: 'Nischal Gupta - Senior Frontend Engineer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Nischal Gupta | Senior Frontend Engineer',
		description:
			"Explore Nischal Gupta's software engineering projects and expertise in React, Next.js, and modern web development.",
		images: ['/images/nischal_tech_3d_render.png'],
	},
	icons: {
		icon: '/favicon.ico',
	},
};

export default function Page() {
	return (
		<div>
			{/* <FullScreen>
				<ExperienceTimeline />
			</FullScreen> */}
			<ComingSoonPage pageName="Experience" />
		</div>
	);
}
