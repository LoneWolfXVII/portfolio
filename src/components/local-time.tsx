'use client';

import { profile } from '@/content/profile';
import { useEffect, useState } from 'react';

const fmt = new Intl.DateTimeFormat('en-GB', {
	timeZone: profile.tz,
	hour: '2-digit',
	minute: '2-digit',
	hour12: false,
});

/** Rendered client-side only, so server HTML never disagrees with the clock. */
export function LocalTime() {
	const [now, setNow] = useState<string | null>(null);

	useEffect(() => {
		const tick = () => setNow(fmt.format(new Date()));
		tick();
		const id = setInterval(tick, 30_000);
		return () => clearInterval(id);
	}, []);

	return <time suppressHydrationWarning>{now ?? '--:--'} UTC+5:30</time>;
}
