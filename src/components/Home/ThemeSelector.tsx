import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import { useSettingsTheme } from '../../hooks/useSettings'

export const ThemeSelector = () => {
	const { setTheme, themes, theme } = useSettingsTheme()
	const [animate, setAnimate] = useState(false)

	useEffect(() => {
		if (animate) return
		setAnimate(true)
		setTimeout(() => {
			setAnimate(false)
		}, 3000)
	}, [theme])

	return (
		<Style>
			{themes.map((t) => (
				<button
					key={t.key}
					className="theme-btn"
					data-active={t.selected}
					data-opened={t.visible}
					data-name={t.key}
					onClick={() => {
						if (t.visible) setTheme(t.id)
					}}
				>
					<span>{t.visible ? '✦' : '?'}</span>
				</button>
			))}
		</Style>
	)
}

const halfBallBg = (main: string, sub: string, deg = '45deg') => css`
	background-image: repeating-linear-gradient(
		${deg},
		${main},
		${main} 50%,
		${sub} 50%,
		${sub} 100%
	);
`

const Style = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);
	transition: background-color 2s ease-out;

	button.theme-btn {
		cursor: pointer;
		min-height: 20px;
		min-width: 20px;
		margin: 2px;
		aspect-ratio: 1;
		border-radius: 50% !important;
		&[data-opened='false'] {
			cursor: not-allowed;
			opacity: 0.5;
		}
		text-align: center;
		&[data-opened='true'] {
			&[data-name='CLEAR'] {
				background-color: #888;
				background-image: linear-gradient(
					0deg,
					transparent 40%,
					#aaa 40%,
					#aaa 60%,
					transparent 60%,
					transparent
				);
				background-color: white;
				--cw: 16px;
				background-size: var(--cw) var(--cw);
			}
			&[data-name='WHITE'] {
				background-color: #fff;
			}
			&[data-name='BLACK'] {
				background-color: #000;
			}
			&[data-name='EMPTY'] {
				--cw: 16px;
				background-image: repeating-linear-gradient(
						45deg,
						#aaa 25%,
						transparent 25%,
						transparent 75%,
						#aaa 75%,
						#aaa
					),
					repeating-linear-gradient(
						45deg,
						#aaa 25%,
						#fff 25%,
						#fff 75%,
						#aaa 75%,
						#aaa
					);
				background-position: 0 0, calc(var(--cw) / 2) calc(var(--cw) / 2);
				background-size: var(--cw) var(--cw);
			}
			&[data-name='SINGL'] {
				background-color: #888;
				background-image: linear-gradient(
					0deg,
					transparent 45%,
					#aaa 45%,
					#aaa 55%,
					transparent 55%,
					transparent
				);
				background-color: white;
			}
			&[data-name='CUSTM'] {
				${halfBallBg('#87DFD6', '#FBFD8A', '0deg')}
			}
			&[data-name='PSYCH'] {
				${halfBallBg('#15353b', '#13e0ad')}
			}
			&[data-name='KOKAK'] {
				${halfBallBg('#0385f4', '#b8deff')}
			}
			&[data-name='LAIN_'] {
				${halfBallBg('#310d0d', '#880000')}
			}
			&[data-name='ID___'] {
				${halfBallBg('#373f4f', '#9eece4')}
			}
			&[data-name='CHOCO'] {
				${halfBallBg('#310d0d', '#ffe697')}
			}
		}
		@keyframes changeSelect {
			0% {
				transform: scale(0.8);
				opacity: 0;
			}
			100% {
				opacity: 1;
				transform: scale(1);
			}
		}
		&[data-active='false'] {
			span {
				color: transparent !important;
				transform: scale(0.1) rotate(1000deg);
			}
		}
		span {
			transition: transform cubic-bezier(0.215, 0.61, 0.355, 1) 0.5s, color 0.5s;
		}
		&[data-active='true'] {
			/* border-end-end-radius: 0%; */
			/* border-top: 2px solid;
			border-left: 2px solid; */
			span {
				display: inline-block;
				opacity: 1;
				color: black;
				mix-blend-mode: difference;
				filter: invert(1);
				transform: scale(1.2) rotate(0deg);
			}
		}
	}
`
