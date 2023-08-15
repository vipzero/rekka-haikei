import styled from 'styled-components'
import { useSettingsTheme } from '../../hooks/useSettings'

export const ThemeSelector = () => {
	const { setTheme, themes } = useSettingsTheme()
	return (
		<Style>
			{themes.map((t) => (
				<button
					key={t.key}
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

const Style = styled.div`
	display: grid;
	grid-template-columns: repeat(6, 1fr);

	button {
		cursor: pointer;
		min-height: 20px;
		min-width: 20px;
		margin: 2px;
		aspect-ratio: 1;
		border-radius: 50%;
		&[data-opened='false'] {
			cursor: not-allowed;
			opacity: 0.5;
		}
		text-align: center;
		&[data-opened='true'] {
			color: transparent;
			&[data-name='CLEAR'] {
				background-color: #aaa;
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
				background-color: #321515;
			}
		}
		&[data-active='true'] {
			border-end-end-radius: 0%;
			border-top: 2px solid;
			border-left: 2px solid;
			span {
				opacity: 1;
				color: black;
				mix-blend-mode: difference;
				filter: invert(1);
			}
		}
	}
`
