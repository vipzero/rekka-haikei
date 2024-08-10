import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { storageKeys } from '../config'

const state = atomWithStorage<string>(storageKeys.streamUrl, '')

export const useStreamUrl = () => useAtom(state)
