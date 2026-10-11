import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	// Images are pre-sized at build time (scripts/gen-images.mjs) and served as
	// static files: no on-request resizing, which is slow and uncached on Netlify.
	images: {
		loader: 'custom',
		loaderFile: './src/lib/image-loader.ts',
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
