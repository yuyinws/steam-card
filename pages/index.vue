<script setup lang="ts">
import { ACheckbox, AInput, ASelect, ASwitch } from 'anu-vue'
import { useI18n } from 'vue-i18n'

interface Config {
  steamId: string
  theme: string
  groupIcon: boolean
  badgeIcon: boolean
  statistics: string[]
  lang: string
}

const themeList = ['dark', 'light', 'radical', 'tokyonight', 'solarized-light', 'ocean-dark']
const statisticsList = [
  'groups',
  'badges',
  'games',
  'screenshots',
  'guides',
  'artworks',
  'reviews',
]
const { locale } = useI18n()

const config: Config = reactive({
  steamId: '76561198340841543',
  theme: 'dark',
  badgeIcon: true,
  groupIcon: true,
  statistics: [],
  lang: locale.value,
})

const isDisabled = computed(() => {
  return config.statistics.length >= 3
})

const steamcardUrl = ref('')

watch(config, (val) => {
  const settings = []
  settings.push(config.theme)
  if (config.lang !== 'zh-CN')
    settings.push(config.lang)

  if (config.badgeIcon)
    settings.push('badge')

  if (config.groupIcon)
    settings.push('group')

  settings.push(...config.statistics)

  steamcardUrl.value = `/card/${val.steamId}/${settings.join(',')}`
}, {
  deep: true,
  immediate: true,
})
</script>

<template>
  <div>
    <div class="grid-row sm:grid-cols-2 place-items-stretch">
      <AInput
        v-model="config.steamId"
        class="text-xs"
        type="number"
        label="SteamID"
        dark:bg="#222"
      />
      <ASelect
        v-model="config.theme"
        class="text-xs"
        :label="$t('theme')"
        :options="themeList"
        dark:bg="#222"
      />
    </div>
    <div mt-20px class="grid-row grid-cols-2 place-items-stretch">
      <ASwitch v-model="config.badgeIcon" class="text-sm i-switch">
        <template #default>
          <span>Badge Icon</span>
        </template>
      </ASwitch>
      <ASwitch v-model="config.groupIcon" class="text-sm i-switch">
        <template #default>
          <span>Group Icon</span>
        </template>
      </ASwitch>
    </div>
    <div mt-20px>
      <div text-12px mb-5px>
        统计数据
      </div>
      <div flex flex-wrap gap-20px>
        <ACheckbox
          v-for="i in statisticsList"
          :key="i"
          v-model="config.statistics"
          :disabled="isDisabled && !config.statistics.includes(i)"
          :value="i"
        >
          <template #default>
            <span w-80px>
              {{ i }}
            </span>
          </template>
        </ACheckbox>
      </div>
    </div>
    <img :src="steamcardUrl" alt="steamCard" srcset="">
  </div>
</template>

<style>
.i-switch {
  justify-content: flex-start!important;
  gap: 10px;
}
</style>
