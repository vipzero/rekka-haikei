import { atom, useRecoilState } from 'recoil'
import { storageKeys } from '../config'
import { localStorageEffect } from '../atom/effects'

const key = storageKeys.streamUrl
const state = atom<string>({
	key,
	default: '',
	effects: [localStorageEffect(key)],
})

export const useStreamUrl = () => useRecoilState(state)
