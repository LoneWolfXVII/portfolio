import variants from '@/content/image-variants.json';

type Entry = { width: number; variants: number[] };
const table = variants as Record<string, Entry>;

/**
 * Serves pre-sized static files (see scripts/gen-images.mjs) instead of
 * resizing on request: the smallest variant at least as wide as asked, or
 * the original. Anything without variants (logo, posters) is served as is.
 */
export default function loader({ src, width }: { src: string; width: number }) {
	const entry = table[src];
	if (!entry) return src;
	const fit = entry.variants.find((w) => w >= width);
	return fit ? src.replace(/\.webp$/, `-${fit}w.webp`) : src;
}
