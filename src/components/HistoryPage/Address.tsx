import React from 'react'
import styled from 'styled-components'
import { EventLinks } from '../EventLinks'

const notes: Record<string, string> = {
	'2021-12-26:20': 'スケジュールにラベル追加',
	'2021-12-26:19': 'ボタン変更・説明追加',
}

function Address() {
	return (
		<div>
			<p>
				<a href="https://forms.gle/fBQnrAxMnKNhmFA16">使用リクエスト</a>
			</p>
			<EventLinks />
			<div>
				<p>更新ノート</p>
				<List>
					{Object.entries(notes).map(([date, msg], i) => (
						<p key={`msg-${i}_${date}`}>
							<code>{date}</code>
							{msg}
						</p>
					))}
				</List>
			</div>
			<p>
				連絡先<code>hiroflighter+haikei@gmail.com</code>
			</p>
		</div>
	)
}

const List = styled.div`
	p {
		margin-top: 4px;
		margin-bottom: 0;
	}
	code {
		margin-right: 1rem;
	}
`
export default Address
