'use client';

import { Check, Copy } from '@/components/icons';
import { profile } from '@/content/profile';
import { useEffect, useState } from 'react';

export function CopyEmail() {
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		if (!copied) return;
		const id = setTimeout(() => setCopied(false), 2000);
		return () => clearTimeout(id);
	}, [copied]);

	const copy = async () => {
		try {
			await navigator.clipboard.writeText(profile.email);
			setCopied(true);
		} catch {
			window.location.href = `mailto:${profile.email}`;
		}
	};

	return (
		<button
			type="button"
			onClick={copy}
			className="group flex min-h-11 w-full items-center justify-between gap-4 border-b border-white/20 pb-3 text-left text-[clamp(1.25rem,2.6vw,2rem)] tracking-[-0.03em] transition-colors duration-300 hover:border-accent"
		>
			<span className="truncate">{profile.email}</span>
			<span
				className="annot flex shrink-0 items-center gap-2"
				aria-live="polite"
			>
				{copied ? <Check className="text-accent" /> : <Copy />}
				{copied ? 'Copied' : 'Copy'}
			</span>
		</button>
	);
}
