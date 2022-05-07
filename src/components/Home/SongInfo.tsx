import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { useQeuryEid } from '../../hooks/useQueryEid'
import { isSongFull, Song } from '../../types'
import { formatCount, searchImageUrl, utanetSearchUrl } from '../../util'
import { useSettings } from '../../hooks/useSettings'
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
		.sort((a, b) => (a.count - b.count) * 100 + a.s.localeCompare(b.s))
}

type Props = { song: Song }

function SongInfo({ song }: Props) {
	const titles = makeTitle(song)
	const eid = useQeuryEid()
	const { showArtwork, showCounts } = useSettings()

	return (
		<Wrap id="panel">
			<p className="titles">{titles}</p>
			<div className="details">
				<div style={{ display: 'flex' }}>
					<div style={{ flex: 1 }}>
						{/* そろそろ汚えええええ */}
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
								<p>
									<span className="date">{song.date}</span>
									{song.chapNum && (
										<span className="chapnum">全{song.chapNum}話</span>
									)}
								</p>
							</>
						)}
						{song.singer && <p>歌手: {song.singer}</p>}
						<p>
							{song.composer && <span>作詞: {song.composer}</span>}
							{song.arranger && <span>編曲: {song.arranger}</span>}
							{song.writer && <span>作曲: {song.writer}</span>}
						</p>
						<p>
							{song.albumName && (
								<>
									{song.albumName.replace(' - Single', '')}
									{song.copyright && ` (${song.copyright})`}{' '}
									<a href={song.itunesUrl}>iTunes</a>{' '}
								</>
							)}
						</p>
						<p style={{ display: 'flex', gap: '4px' }}>
							<a
								href={utanetSearchUrl(song.icy)}
								target="_blank"
								rel="noreferrer"
							>
								歌詞検索
							</a>
							<a
								href={searchImageUrl(song.imageSearchWord)}
								target="_blank"
								rel="noreferrer"
							>
								画像検索
							</a>
						</p>
						{showCounts && (
							<p className="tags">
								{tagOrder(song.wordCounts)
									.filter(({ s }) => s !== song.icy)
									.map((tag, i) => (
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
											<a>
												{tag.s}({formatCount(tag.count)})
											</a>
										</Link>
									))}
								<BookCount songId={song.time} />
							</p>
						)}
					</div>
					<div>
						{showArtwork && song.artworkUrl100 && (
							<div className="album">
								<img src={song.artworkUrl100} />
							</div>
						)}
					</div>
				</div>
			</div>
			{isSongFull(song) && <p className="icy">icy_title: {song.icy}</p>}
		</Wrap>
	)
}

const Wrap = styled.div`
	background-color: var(--content-bg-color);
	padding: 12px;
	border-radius: 4px;
	.details {
		p {
			padding-top: 4px;
			font-size: 0.6rem;
		}
		.animetitle {
			font-size: 0.9rem;
		}
		span:not(:first-child) {
			margin-left: 0.5rem;
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
		}
	}
	.icy {
		margin-top: 1rem;
		text-align: right;
		font-size: 0.5rem;
	}
	.album {
		img {
			margin-top: 12px;
			width: 150px;
		}
	}
`

export default SongInfo
