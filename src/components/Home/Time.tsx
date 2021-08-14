import { unstable_createMuiStrictModeTheme } from '@material-ui/core'
import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Song } from '../../types'
import { pad2, formatTime } from '../../util'

type Props = {
	song: Song
}

const useTick = () => {
	const [now, setNow] = useState<Date | null>(null)
	useEffect(() => {
		const t = setInterval(() => {
			const d = new Date()
			d.setMilliseconds(0)
			setNow(d)
		}, 100)
		return () => clearInterval(t)
	}, [])
	return now
}

const Time = ({ song }: Props) => {
	const now = useTick()
	const { time, trackTimeMillis } = song

	const currentSongEnd: null | number = trackTimeMillis
		? time + trackTimeMillis
		: null

	const [cur, diff, nextHour] = useMemo(() => {
		if (!now) return ['--:--:--', '--:--', 0]

		const cur = formatTime(+now)
		const diff = [
			pad2(60 - now.getMinutes() - 1),
			pad2((60 - now.getSeconds()) % 60),
		].join(':')

		return [cur, diff, now.getHours() + 1]
	}, [now])

	const [songEnd, songDiff] = useMemo(() => {
		if (!now || !currentSongEnd) return ['--:--:--', '--:--']
		const songEnd = formatTime(+currentSongEnd)
		const diff = currentSongEnd - +now

		const songDiff = `${pad2(Math.floor(diff / 60000))}:${pad2(
			Math.floor((diff % 60000) / 1000)
		)}`

		return [songEnd, songDiff]
	}, [now, currentSongEnd])

	useMemo(() => {
		return
	}, [currentSongEnd])
	if (!now) return null

	return (
		<Style>
			<div className="mirror-table">
				<div>
					<div>現在</div>
					<div>次の時間</div>
					<div>曲終了</div>
				</div>
				<div>
					<div>{cur}</div>
					<div>
						{nextHour}:00:00
						<span>(-{diff})</span>
					</div>
					<div>
						{songEnd}
						<span>
							(-{songDiff}){!currentSongEnd && '曲情報取得失敗'}
						</span>
					</div>
				</div>
			</div>
		</Style>
	)
}
const Style = styled.div`
	font-family: monospace;
	background: #6b6b6b;
	.mirror-table {
		display: flex;
		gap: 4px;
		> div:first-child {
			text-align: right;
		}
		> div:nth-of-type(2) {
			text-align: left;
		}
	}
`
export default Time
