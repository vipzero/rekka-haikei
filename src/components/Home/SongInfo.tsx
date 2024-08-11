import {
	faCompactDisc,
	faFilm,
	faTags,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import styled from 'styled-components'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { useSettings } from '../../hooks/useSettings'
import { Song, isSongFull } from '../../types'
import {
	formatCount,
	isTimeTag,
	searchImageUrl,
	utanetSearchUrl,
} from '../../util'
import { useSong } from '../../hooks/useSongAtom'
import BookCount from './BookCount'

function makeTitle(song: Song) {
	if (isSongFull(song)) return `${song.title} - ${song.artist}`
	const [artist, title] = song.icy.split(' - ')

	if (!artist) return song.icy
	return `${title} - ${artist}`
}
type TagCount = { s: string; count: number }
function tagOrder(tags: Record<string, number>): TagCount[] {
	return Object.entries(tags)
		.map(([s, count]) => ({ s, count }))
		.sort((a, b) => {
			// const score1 = Number(isTimeTag(a.s)) - Number(isTimeTag(b.s))
			const score2 = a.count - b.count
			const score3 = a.s.localeCompare(b.s)
			return score2 * 100 + score3
		})
}

const SingerLine = ({ singer }: { singer?: string }) => (
	<>{singer && <p>歌手: {singer}</p>}</>
)
const ArtistLine = ({
	composer,
	arranger,
	writer,
}: Pick<Song, 'composer' | 'arranger' | 'writer'>) =>
	[composer, arranger, writer].every(Boolean) ? (
		<p className="flex-rows">
			{composer && <span>作詞: {composer}</span>}
			{arranger && <span>編曲: {arranger}</span>}
			{writer && <span>作曲: {writer}</span>}
		</p>
	) : null
const AlbumLine = ({
	albumName,
	itunesUrl,
	copyright,
}: Pick<Song, 'albumName' | 'itunesUrl' | 'copyright'>) => (
	<p className="flex-rows">
		{albumName && (
			<>
				<span className="songinfo-icon">
					<FontAwesomeIcon icon={faCompactDisc} />
				</span>
				<span>
					{albumName.replace(' - Single', '')}
					{copyright && ` (${copyright})`}
				</span>
				<a href={itunesUrl}>iTunes</a>
			</>
		)}
	</p>
)

type Props = {}
function SongInfo({}: Props) {
	const song = useSong()
	const titles = makeTitle(song)
	const eid = useQeuryEid()
	const { showArtwork, showCounts } = useSettings()
	const tags = tagOrder(song.wordCounts).filter(
		({ s }) => s !== song.icy && !isTimeTag(s)
	)

	const { singer, composer, arranger, writer } = song

	const { albumName, copyright, itunesUrl } = song
	const sUrl = searchImageUrl(song.imageSearchWord)
	const uUrl = utanetSearchUrl(song.icy)

	return (
		<Wrap
			id="panel"
			data-show-artwark={showArtwork && song.artworkUrl100}
			data-show-tags={showCounts}
		>
			<div id="panel-shadow" />
			<p id="title">{titles}</p>
			<div className="details">
				<div style={{ display: 'flex' }}>
					<div style={{ flex: 1 }}>
						{isSongFull(song) && (
							<>
								<p>
									{song.animeTitle && (
										<span className="animetitle">{song.animeTitle}</span>
									)}
									<span className="subinfo">
										[{song.opOrEd}
										{song.spInfo ? ` ${song.spInfo}` : ''}] {song.category}
										{song.gameType && ' ' + song.gameType}
									</span>
								</p>
								<p className="flex-rows">
									<span className="songinfo-icon">
										<FontAwesomeIcon icon={faFilm} />
									</span>

									<span className="date">{song.date}</span>
									{song.chapNum && (
										<span className="chapnum">全{song.chapNum}話</span>
									)}
								</p>
							</>
						)}
						<SingerLine singer={singer} />
						<ArtistLine {...{ composer, arranger, writer }} />
						<AlbumLine {...{ albumName, copyright, itunesUrl }} />
						<p style={{ display: 'flex', gap: '4px' }}>
							<a href={uUrl} target="_blank" rel="noreferrer">
								歌詞検索
							</a>
							<a href={sUrl} target="_blank" rel="noreferrer">
								画像検索
							</a>
						</p>

						<p className="tags">
							<span className="songinfo-icon">
								<FontAwesomeIcon icon={faTags} />
							</span>
							{tags.map((tag, i) => (
								<Link
									prefetch={false}
									href="/[eid]/history"
									as={{
										pathname: `/${eid}/history`,
										query: { q: encodeURIComponent(tag.s) },
									}}
									key={i}
									passHref
								>
									<a data-count={tag.count}>
										{tag.s}({formatCount(tag.count)})
									</a>
								</Link>
							))}
							<BookCount songId={song.time} />
						</p>
					</div>
					<div>
						<div id="artwork">
							<img src={song.artworkUrl100} />
						</div>
					</div>
				</div>
			</div>
			{isSongFull(song) && <p className="icy">icy_title: {song.icy}</p>}
		</Wrap>
	)
}

const Wrap = styled.div`
	position: relative;

	background: var(--co-bg);
	padding: var(--co-pad);
	border-radius: 4px;
	overflow: hidden;

	#panel-shadow {
		// ee
		display: none;
		width: 100%;
		height: 100%;
		margin: -12px;
		box-sizing: content-box;
		position: absolute;
	}
	.details {
		p {
			padding-top: 4px;
			font-size: 0.6rem;
		}
		.animetitle {
			font-size: 0.9rem;
		}
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 2px;
		a {
			font-size: 0.6rem;
			text-decoration: none;
			/* background: #00000033; */
			padding: 0px 2px;
			&:not([data-count='1']) {
				opacity: 0.5;
			}
		}
	}
	.icy {
		margin-top: 1rem;
		text-align: right;
		font-size: 0.5rem;
	}
	#artwork {
		img {
			margin-top: 12px;
			width: 150px;
		}
	}
	&[data-show-artwark='false'] {
		#artwork {
			display: none;
		}
	}
	&[data-show-tags='false'] {
		.tags {
			display: none;
		}
	}

	.flex-rows {
		> *:not(:first-child) {
			margin-left: 4px;
		}
	}
`

export default SongInfo
