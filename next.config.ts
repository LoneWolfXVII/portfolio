import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: { formats: ['image/avif', 'image/webp'] },
	async redirects() {
		return [
			{ source: '/experience', destination: '/#experience', permanent: true },
			{ source: '/projects', destination: '/#work', permanent: true },
			{ source: '/about', destination: '/#experience', permanent: true },
		];
	},
};

export default nextConfig;
