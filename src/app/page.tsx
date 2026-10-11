import { BuildLog } from '@/components/sections/build-log';
import { Contact } from '@/components/sections/contact';
import { FeaturedInvestabl } from '@/components/sections/featured-investabl';
import { Hero } from '@/components/sections/hero';
import { SelectedWork } from '@/components/sections/selected-work';
import { SheetIndex } from '@/components/sheet-index';

export default function Home() {
	return (
		<>
			<Hero />
			<FeaturedInvestabl />
			<SelectedWork />
			<BuildLog />
			<Contact />
			<SheetIndex />
		</>
	);
}
