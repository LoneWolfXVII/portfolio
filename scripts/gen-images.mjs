// Pre-sizes every work image once, so hosts serve static files instead of
// resizing on request. Run after adding or replacing an image: `yarn images`.
import { readdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = 'public/work';
export const WIDTHS = [480, 960, 1440, 1920];
const VARIANT = /-\d+w\.webp$/;

const manifest = {};
for (const dir of await readdir(ROOT)) {
	for (const file of await readdir(path.join(ROOT, dir))) {
		if (!file.endsWith('.webp') || VARIANT.test(file)) continue;
		const src = path.join(ROOT, dir, file);
		const { width } = await sharp(src).metadata();
		const made = [];
		for (const w of WIDTHS.filter((w) => w < width)) {
			const out = src.replace(/\.webp$/, `-${w}w.webp`);
			if (!existsSync(out))
				await sharp(src).resize(w).webp({ quality: 88, effort: 6, smartSubsample: true }).toFile(out);
			made.push(w);
		}
		manifest[`/work/${dir}/${file}`] = { width, variants: made };
	}
}
await writeFile('src/content/image-variants.json', JSON.stringify(manifest, null, '\t') + '\n');
console.log(`variants for ${Object.keys(manifest).length} images`);
