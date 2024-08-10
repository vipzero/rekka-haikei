import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { storageKeys } from '../config'

export const useStreamAtom = atomWithStorage<string>(storageKeys.streamUrl, '')

export const useStreamUrl = () => useAtom(useStreamAtom)
