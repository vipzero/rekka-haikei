import React from 'react'

export const BirthdayEx = ({ s }: { s: string }) => {
	if (!s) return null
	const [dayKey, name, title] = s.split(':')
	const [m, d] = [dayKey.substring(0, 2), dayKey.substring(3, 5)].map(Number)
	return (
		<div id="birth">
			<div style={{ display: 'flex', alignItems: 'flex-end' }}>
				<div className="grad">🎉Happy Birthday🎂</div>
				<div className="dayKey">
					{m}月{d}日
				</div>
			</div>
			<div className="name">{name}</div>
			{title.trim() && <div className="title">{title}</div>}
		</div>
	)
}

export default BirthdayEx
