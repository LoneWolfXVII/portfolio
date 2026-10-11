import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// WebP at q90: AVIF's defaults smear the fine text in product screenshots.
	images: { formats: ['image/webp'], qualities: [75, 90] },
	async redirects() {
		return [
			{ source: '/experience', destination: '/#experience', permanent: true },
			{ source: '/projects', destination: '/#work', permanent: true },
			{ source: '/about', destination: '/#experience', permanent: true },
		];
	},
};

export default nextConfig;
