import { Meta } from '@storybook/react'
import { ImasBoard } from '../components/Home/ex/ImasBoard'

export default {
	title: 'ImasBoard',
	component: ImasBoard,
} as Meta<typeof ImasBoard>

export const Full = {
	args: {
		bools: [
			[true, true, true, true, true],
			Array(111).fill(false),
			[false, true],
			Array(111).fill(false),
			Array(39).fill(false),
		],
	},
}
