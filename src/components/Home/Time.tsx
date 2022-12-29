import { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { Song } from '../../types'
import { formatTime, pad2 } from '../../util'
import { EeSelectorConnected } from './EeSelector'

type Props = {
	song: Song
}

const useTick = () => {
	const [now, setNow] = useState<Date>(new Date())
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

const formatMmSs = (t: number) =>
	`${pad2(Math.floor(t / 60000))}:${pad2(Math.floor((t % 60000) / 1000))}`

function calcTimes(now: Date, startTime: number, trackTimeMillis) {
	const leftMin = 60 - now.getMinutes() - 1
	const leftSec = (60 - now.getSeconds()) % 60
	const curHourEnd = leftMin * 60 + leftSec
	const leftHour = [pad2(leftMin), pad2(leftSec)].join(':')
	const nextHour = now.getHours() + 1

	const currentSongEnd: null | number = trackTimeMillis
		? startTime + trackTimeMillis
		: null

	const elapsedTime = +now - startTime
	const songElapsStr = formatMmSs(elapsedTime)

	if (!currentSongEnd)
		return [leftHour, nextHour, '--:--:--', '--:--:--', '--:--', '--:--:--']
	const songEndStr = formatTime(+currentSongEnd)
	const diff = currentSongEnd - +now

	const leftFromSongEndStr = formatMmSs(curHourEnd * 1000 - diff)

	const songLeftStr = formatMmSs(diff)

	return [
		leftHour,
		nextHour,
		songEndStr,
		songLeftStr,
		songElapsStr,
		leftFromSongEndStr,
	]
}

const Time = ({ song }: Props) => {
	const now = useTick()
	const { time: startTime, trackTimeMillis } = song
	const eid = useQeuryEid()

	const cur = formatTime(+now)
	const [
		leftHour,
		nextHour,
		songEndStr,
		songLeftStr,
		songElapsStr,
		leftFromSongEndStr,
	] = useMemo(
		() => calcTimes(now, startTime, trackTimeMillis),
		[Math.floor(+now / 1000)]
	)

	if (!now) return null
	const trackTimeStr = trackTimeMillis ? formatMmSs(trackTimeMillis) : '??:??'

	return (
		<Style id="the-goal-of-all-life-is-death">
			<div className="mirror-table">
				<div className={'lst'}>曲開始</div>
				<div className={'lcu'}>現在</div>
				<div className={'len'}>曲終了</div>
				<div className={'lnh'}>次のHour</div>

				<div className={'tst'}>{formatTime(startTime)}</div>
				<div className={'tcu'}>{cur}</div>
				<div className={'ten'}>{songEndStr}</div>
				<div className={'tnh'}>{nextHour}:00:00</div>

				<div className={'ttt'}>[{trackTimeStr}]</div>
				<div className={'del'}>+{songElapsStr}</div>
				<div className={'dlf'}>-{songLeftStr}</div>
				<div className={'dnh'}>-{leftHour}</div>
				<div className={'lfs'}>-[{leftFromSongEndStr}]</div>
			</div>
			<EeSelectorConnected />
		</Style>
	)
}

const Style = styled.div`
	font-family: monospace;
	background: #6b6b6b;
	color: #fff;
	border: solid var(--sub-bg-color);
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
			'del ttt dlf dnh'
			'--- --- --- lfs';

		.lst,
		.del,
		.del,
		.tst {
			text-align: left;
		}

		.lcu,
		.ttt,
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
		.tnh,
		.lfs {
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
		.lfs {
			grid-area: lfs;
		}
	}
`
export default Time
