// Content integrity check: `yarn check:content`. Fails loudly on broken data.
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { experience } from '../src/content/experience.ts';
import { work } from '../src/content/work.ts';

const slugs = work.map((w) => w.slug);
assert.equal(new Set(slugs).size, slugs.length, 'duplicate slugs');

for (const w of work) {
	const media = [w.cover, ...w.gallery].filter((m) => m !== undefined);
	for (const m of media) {
		for (const file of [m.src, m.video].filter((f) => f !== undefined)) {
			assert.ok(
				existsSync(`public${file}`),
				`${w.slug}: missing public${file}`,
			);
		}
		assert.ok(m.alt.length > 0, `${w.slug}: empty alt on ${m.src}`);
	}
	if (w.hasPage) {
		assert.ok(w.owned.length > 0, `${w.slug}: empty owned`);
		assert.ok(w.deepdives.length >= 2, `${w.slug}: needs 2+ deepdives`);
		assert.ok(w.context && w.outcome, `${w.slug}: missing context/outcome`);
	}
}

const layers = work.find((w) => w.slug === 'investabl')?.layers?.map((l) => l.name);
assert.deepEqual(layers, ['Design system', 'Interface', 'Services', 'Cloud']);

const years = experience.map((r) => r.startYear);
assert.deepEqual(
	years,
	[...years].sort((a, b) => b - a),
	'experience not newest-first',
);

console.log(`content ok: ${work.length} work entries, ${experience.length} roles`);
