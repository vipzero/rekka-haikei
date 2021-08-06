import React, { useState } from 'react'
import { addFeedback } from '../../../service/firebase'
import { Song } from '../../types'

function genDefaultReportText(song: Song) {
	return `${song.icy}\nsize: ${window.innerWidth},${
		window.innerHeight
	}\nword: ${song.wordCountsAna.map((v) => v.name).join(',')}\n`
}

export function FeedBackForm({ song }: { song: Song }) {
	const [feedBack, setFeedBack] = useState<string>('')
	const onClickReport = () =>
		setFeedBack(feedBack ? '' : genDefaultReportText(song))
	const onSubmit = () => {
		addFeedback(feedBack).then(() => {
			alert('フィードバックサンクスb')
			setFeedBack('')
		})
	}

	return (
		<div>
			<button onClick={onClickReport}>レポート</button>

			<div data-visible={!!feedBack}>
				<div>歌詞の分割ミス・表示崩れなどあれば</div>
				<textarea
					rows={4}
					style={{ width: '60vw' }}
					value={feedBack}
					onChange={(e) => setFeedBack(e.target.value)}
				></textarea>
				<button onClick={onSubmit}>送信</button>
			</div>
		</div>
	)
}
