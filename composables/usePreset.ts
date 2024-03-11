import { defineStore } from 'pinia'
import type { ConfigMeta } from '~/types'

interface Preset {
  id: string
  name: string
  config: ConfigMeta
}

export const usePreset = defineStore('preset', () => {
  const presets = ref<Preset[]>([])

  return {
    presets,
  }
}, {
  persist: true,
})
