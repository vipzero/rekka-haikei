import Link from 'next/link'
import React from 'react'
import { events } from '../config'

const paths = [
	{ path: 'bg', label: '背景' },
	{ path: 'history', label: '履歴' },
]

export const EventLinks = () => (
	<div>
		{events.map((e) => (
			<div key={e.id} style={{ display: 'flex', gap: '4px' }}>
				{paths.map((p) => (
					<Link
						key={p.path}
						href={{ pathname: `/[eid]/${p.path}`, query: { eid: e.id } }}
						passHref
					>
						<a>{p.label}</a>
					</Link>
				))}
				<div>
					{e.label}
					{e.current && '(現行)'}
				</div>
			</div>
		))}
	</div>
)

export const EventLinksLine = () => (
	<div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
		{events.map((e) => (
			<Link
				key={e.id}
				href={{ pathname: `/[eid]/bg`, query: { eid: e.id } }}
				passHref
			>
				<a>{e.label}</a>
			</Link>
		))}
	</div>
)
