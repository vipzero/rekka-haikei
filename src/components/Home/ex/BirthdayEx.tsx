import React from 'react'
import styled from 'styled-components'
import { zIndex } from '../../../config'

const BirthStyle = styled.div`
	background: radial-gradient(#f588d8, #c0a3e5);
	color: white;
	z-index: ${zIndex.layerFrontEx};
	position: absolute;
	padding: 16px;
	bottom: 0;
	left: 0;
	padding: 4px;
	border-radius: 4px;
	.dayKey {
		font-size: 0.5rem;
		border-radius: 0.5rem;
		padding: 0 0.4rem;
		margin-right: 0.4rem;
		border: solid 1px #ddd;
	}
	.title {
		font-size: 0.8rem;
	}
	.name {
		font-size: 1.2rem;
	}
	.grad {
		font-size: 1rem;
		text-align: center;
	}
`

export const BirthdayEx = ({ s }: { s: string }) => {
	if (!s) return null
	const [dayKey, name, title] = s.split(':')
	const [m, d] = [dayKey.substring(0, 2), dayKey.substring(3, 5)].map(Number)
	return (
		<BirthStyle>
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<div className="grad">🎉Happy Birthday🎂</div>
				<div className="dayKey">
					{m}月{d}日
				</div>
			</div>
			<div className="name">{name}</div>
			{title.trim() && <div className="title">{title}</div>}
		</BirthStyle>
	)
}

export default BirthdayEx
