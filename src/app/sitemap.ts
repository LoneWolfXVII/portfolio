import { profile } from '@/content/profile';
import { caseStudies } from '@/content/work';
import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{ url: profile.site, priority: 1 },
		...caseStudies.map((w) => ({
			url: `${profile.site}/work/${w.slug}`,
			priority: 0.8,
		})),
	];
}
