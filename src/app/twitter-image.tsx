import { ImageResponse } from 'next/og';

export const alt = 'Nischal Gupta — Founding Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const grid = 'rgba(255,255,255,0.05)';

export default function OgImage() {
	return new ImageResponse(
		<div
			style={{
				width: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				padding: 72,
				background: '#0b0b0c',
				backgroundImage: `linear-gradient(${grid} 1px, transparent 1px), linear-gradient(90deg, ${grid} 1px, transparent 1px)`,
				backgroundSize: '64px 64px',
				color: '#ededed',
				fontFamily: 'monospace',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'space-between',
					fontSize: 20,
					color: '#8a8a8f',
				}}
			>
				<span>NG-001 · NISCHALGUPTA.DEV</span>
				<span style={{ color: '#ff5b1f' }}>FOUNDING ENGINEER</span>
			</div>
			<div
				style={{
					display: 'flex',
					flexDirection: 'column',
					fontFamily: 'sans-serif',
				}}
			>
				<div style={{ fontSize: 96, letterSpacing: -4, lineHeight: 1 }}>
					Nischal Gupta
				</div>
				<div style={{ fontSize: 40, color: '#8a8a8f', marginTop: 24 }}>
					Design system → interface → services → cloud.
				</div>
			</div>
			<div
				style={{
					display: 'flex',
					height: 2,
					background: '#ff5b1f',
					width: 160,
				}}
			/>
		</div>,
		size,
	);
}
