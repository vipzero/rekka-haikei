import Link from 'next/link'
import React from 'react'
import { events } from '../config'

export const EventLinks = () => (
	<div style={{ display: 'flex', gap: '4px' }}>
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
