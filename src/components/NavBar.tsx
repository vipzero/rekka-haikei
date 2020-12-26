import { useRouter } from 'next/router'
import Link from 'next/link'
import styled from 'styled-components'
import { Typography } from '@material-ui/core'
import menuGroups from './menuGroups'

const Wrapper = styled.div`
	display: flex;
	overflow: hidden;
	flex-wrap: wrap;
	background: #eee;
	&[data-fiexed='true'] {
		position: 'absolute';
	}
`

const Group = styled.div`
	display: flex;
	flex-wrap: wrap;
	border-bottom: 1px solid;
	margin-bottom: 4px;
	margin-left: 8px !important;
	padding-right: 8px;
`

const Tab = styled(Typography)`
	background: black;
	font-size: 20px;
	color: white;
	padding: 0 8px;
`

const MenuItem = styled.div`
	cursor: pointer;
	padding-top: 4px;
	margin-left: 10px;
	text-decoration: none;
	color: #555;
	border-bottom: 1px double gray;

	&:visited {
		color: #222;
	}
`

type Props = {}
function NavBar(_: Props) {
	const { pathname } = useRouter()

	const fixed = pathname === '/'

	return (
		<Wrapper data-fixed={fixed}>
			{menuGroups.map((g) => (
				<Group key={g.name}>
					<Tab>{g.name}</Tab>
					{g.menus.map((menu) => (
						<MenuItem key={menu.path}>
							<Link href={`${menu.path}`}>
								<Typography>{menu.name}</Typography>
							</Link>
						</MenuItem>
					))}
				</Group>
			))}
		</Wrapper>
	)
}

export default NavBar
