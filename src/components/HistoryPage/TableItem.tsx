import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faStar as faStarFill } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import { timeColorMap } from '../../config'
import { History } from '../../types'
import { formatDate } from '../../util'

const toH = (ts: number) =>
	Math.floor(
		((ts + 9 * 60 * 60 * 1000) % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
	)

export const TableItem = ({
	reco,
	favorited,
	toggleFavorites,
}: {
	reco: History
	favorited: boolean
	toggleFavorites: () => void
}) => {
	return (
		<ColorTr
			key={reco.time}
			className="hist-row"
			data-h2={toH(reco.time) % 2}
			style={{
				// @ts-ignore
				['--daytime-color']: timeColorMap[toH(reco.time)],
			}}
		>
			<div>{formatDate(reco.time)}</div>
			<div>{reco.title}</div>
			<div className={'non-copy'}>
				<FontAwesomeIcon
					icon={favorited ? faStarFill : faStar}
					onClick={toggleFavorites}
				/>
			</div>
			<div
				className={'non-copy'}
				data-prog-cell
				style={{
					background: `linear-gradient(90deg, #9b49ff 0%, #9b49ff ${
						reco.b ?? 0
					}%, #fff ${reco.b ?? 0}%, #fff 100%)`,
					textAlign: 'right',
				}}
			>
				{reco.b || '-'}
			</div>
		</ColorTr>
	)
}

const ColorTr = styled.div<{ h: number }>`
	> div {
		padding: 2px;
	}
	> div:first-child {
		border-left: solid var(--daytime-color) 8px;
	}
	--bg-strip-color1: #98e0ff;
	--bg-strip-color2: #e5faff;
	@media (prefers-color-scheme: dark) {
		--bg-strip-color1: #002737;
		--bg-strip-color2: #003c4b;
	}
	&[data-h2='0'] {
		> div:first-child {
			background: var(--bg-strip-color1);
		}
	}
	&[data-h2='1'] {
		> div:first-child {
			background: var(--bg-strip-color2);
		}
	}
	[data-prog-cell] {
		color: black;
	}
`
