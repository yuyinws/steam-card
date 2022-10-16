<script setup lang="ts">
import { ACheckbox, AInput, ASelect, ASwitch } from 'anu-vue'
import { useI18n } from 'vue-i18n'
import { POSITION, useToast } from 'vue-toastification'

const toast = useToast()

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
const { locale, t } = useI18n()

const config: Config = reactive({
  steamId: '76561198340841543',
  theme: 'dark',
  badgeIcon: true,
  groupIcon: true,
  statistics: ['games', 'groups', 'badges'],
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

  if (!config.statistics.includes('games') || !config.statistics.includes('groups') || !config.statistics.includes('badges'))
    settings.push(...config.statistics)

  steamcardUrl.value = `/card/${val.steamId}/${settings.join(',')}`
}, {
  deep: true,
  immediate: true,
})

const referenceList = ref([
  {
    name: 'BBCode',
    url: computed(() => {
      return `[img]${window.location.origin}${steamcardUrl.value}[/img]`
    }),
  },
  {
    name: 'Html',
    url: computed(() => {
      return `<img width="400" height="140" src="${window.location.origin}${steamcardUrl.value}">`
    }),
  },
  {
    name: 'Markdown',
    url: computed(() => {
      return `![Steam Card](${window.location.origin}${steamcardUrl.value})`
    }),
  },

])

async function copyUrl(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    toast.success(t('copy-success'),
      {
        timeout: 2000,
        position: POSITION.TOP_CENTER,
      })
  }
  catch (error) {
    toast.error(t('copy-failed'),
      {
        timeout: 2000,
        position: POSITION.TOP_CENTER,
      })
  }
}
</script>

<template>
  <div flex="~ wrap" items-start justify-around>
    <div w="500px" p-10px flex="~ col" gap-20px>
      <AInput
        id="steamid"
        v-model="config.steamId"
        class="text-xs"
        type="number"
        dark:bg="#222"
      >
        <template #label>
          <label for="a-input-steamid">
            <div mb-10px text="center 16px" font-bold>SteamID</div>
          </label>
        </template>
      </AInput>
      <ASelect
        id="theme"
        v-model="config.theme"
        class="text-xs"
        :options="themeList"
        dark:bg="#222"
      >
        <template #label>
          <label for="a-input-theme">
            <label for="a-input-steamid">
              <div mb-10px text="center 16px" font-bold>{{ $t('theme') }}</div>
            </label>
          </label>
        </template>
      </ASelect>
      <div>
        <div text="center 16px" font-bold>
          {{ $t('icons') }}
        </div>
        <div flex justify-between>
          <ASwitch v-model="config.badgeIcon" class="text-sm i-switch">
            <template #default>
              <span>{{ $t('badge-icon') }}</span>
            </template>
          </ASwitch>
          <ASwitch v-model="config.groupIcon" class="text-sm i-switch">
            <template #default>
              <span>{{ $t('group-icon') }}</span>
            </template>
          </ASwitch>
        </div>
      </div>
      <div>
        <div text="center 16px" font-bold mb-10px>
          {{ $t('statistics') }}
        </div>
        <div flex="~ wrap" gap-10px>
          <ACheckbox
            v-for="i in statisticsList"
            :key="i"
            v-model="config.statistics"
            :disabled="isDisabled && !config.statistics.includes(i)"
            :value="i"
          >
            <template #default>
              <span text-sm w-80px>
                {{ $t(i) }}
              </span>
            </template>
          </ACheckbox>
        </div>
      </div>
    </div>
    <div w="500px" p-10px>
      <div flex="~ col" gap-10px items-center>
        <div text="center 16px" font-bold>
          {{ $t('preview') }}
        </div>
        <img w-400px :src="steamcardUrl" alt="steamCard" srcset="">
        <div v-for="(item, index) in referenceList" :key="index" cursor-pointer relative pt-20px pb-10px px-10px rounded shadow-sm b-1 w-full>
          <div text-gray-300 text-sm absolute top-3px right-5px>
            {{ item.name }}
          </div>
          <div text-center break-all text-sm @click="copyUrl(item.url)">
            {{ item.url }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.i-switch {
  justify-content: flex-start!important;
  gap: 10px;
}
</style>
