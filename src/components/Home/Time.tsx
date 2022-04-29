import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { Song } from '../../types'
import { formatTime, pad2 } from '../../util'
import { EeSelector } from './EeSelector'

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
	const { time: startTime, trackTimeMillis } = song

	const currentSongEnd: null | number = trackTimeMillis
		? startTime + trackTimeMillis
		: null

	const [cur, leftHour, nextHour] = useMemo(() => {
		if (!now) return ['--:--:--', '--:--', 0]

		const cur = formatTime(+now)
		const diff = [
			pad2(60 - now.getMinutes() - 1),
			pad2((60 - now.getSeconds()) % 60),
		].join(':')

		return [cur, diff, now.getHours() + 1]
	}, [now])

	const [songEndStr, songLeftStr, songElapsStr] = useMemo(() => {
		if (!now) return ['--:--:--', '--:--', '--:--']
		const elapsedTime = +now - startTime
		const songElaps = `${pad2(Math.floor(elapsedTime / 60000))}:${pad2(
			Math.floor((elapsedTime % 60000) / 1000)
		)}`

		if (!currentSongEnd) return ['--:--:--', '--:--', songElaps]
		const songEnd = formatTime(+currentSongEnd)
		const diff = currentSongEnd - +now

		const songDiff = `${pad2(Math.floor(diff / 60000))}:${pad2(
			Math.floor((diff % 60000) / 1000)
		)}`

		return [songEnd, songDiff, songElaps]
	}, [now, currentSongEnd])

	if (!now) return null

	return (
		<Style>
			<div className="mirror-table">
				<div className={'lst'}>曲開始</div>
				<div className={'lcu'}>現在</div>
				<div className={'len'}>曲終了</div>
				<div className={'lnh'}>次のHour</div>

				<div className={'tst'}>{formatTime(startTime)}</div>
				<div className={'tcu'}>{cur}</div>
				<div className={'ten'}>{songEndStr}</div>
				<div className={'tnh'}>{nextHour}:00:00</div>

				<div className={'del'}>+{songElapsStr}</div>
				<div className={'dlf'}>-{songLeftStr}</div>
				<div className={'dnh'}>-{leftHour}</div>
			</div>
			<div>
				<div>画像検索クエリ</div>
				<div
					style={{
						wordWrap: 'break-word',
						maxWidth: '212px',
						fontSize: '0.6rem',
					}}
				>
					<a href="https://github.com/vipzero/haikei-server/blob/main/src/utils/makeSearchWord.ts">
						改善案募集
					</a>
					{song.imageSearchWord}
				</div>
			</div>
			<EeSelector />
		</Style>
	)
}

const Style = styled.div`
	font-family: monospace;
	background: #6b6b6b;
	color: #fff;
	border: solid var(--back-color);
	padding: 0 4px;
	a {
		color: white;
	}

	.mirror-table {
		display: grid;
		gap: 2px;

		grid-template-areas:
			'lst lcu len lnh'
			'tst tcu ten tnh'
			'del --- dlf dnh';

		.lst,
		.del,
		.del,
		.tst {
			text-align: left;
		}

		.lcu,
		.tcu {
			text-align: center;
		}
		.len,
		.dlf,
		.ten {
			text-align: right;
		}
		.dnh,
		.lnh,
		.tnh {
			text-align: right;
		}

		.lst {
			grid-area: lst;
		}
		.lcu {
			grid-area: lcu;
		}
		.len {
			grid-area: len;
		}
		.lnh {
			grid-area: lnh;
		}

		.tst {
			grid-area: tst;
		}
		.tcu {
			grid-area: tcu;
		}
		.ten {
			grid-area: ten;
		}
		.tnh {
			grid-area: tnh;
		}

		.del {
			grid-area: del;
		}
		.dlf {
			grid-area: dlf;
		}
		.dnh {
			grid-area: dnh;
		}
	}
`
export default Time
