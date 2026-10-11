import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// WebP at q90: AVIF's defaults smear the fine text in product screenshots.
	images: {
		formats: ['image/webp'],
		qualities: [75, 90],
		// Sources are static and renamed when they change: cache transforms for a month.
		minimumCacheTTL: 2678400,
		// No 3840 step: nothing here benefits from it, and each width is a transform.
		deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2560],
	},
	// Work media never changes in place (new file, new name), so browsers keep it.
	async headers() {
		return [
			{
				source: '/work/:path*',
				headers: [
					{
						key: 'Cache-Control',
						value: 'public, max-age=31536000, immutable',
					},
				],
			},
		];
	},
	async redirects() {
		return [
			{ source: '/experience', destination: '/#experience', permanent: true },
			{ source: '/projects', destination: '/#work', permanent: true },
			{ source: '/about', destination: '/#experience', permanent: true },
		];
	},
};

export default nextConfig;
