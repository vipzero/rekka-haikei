import { Snap } from '../../types'

type Props = {
	snap: Snap
	onDelete: () => void
}
export function SnapReplica({ snap }: Props) {
	return <div>{snap.time}</div>
}
