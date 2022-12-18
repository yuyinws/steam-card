<script setup lang="ts">
import { ABtn, ACheckbox, AInput, ASelect, ASwitch } from 'anu-vue'
import { useI18n } from 'vue-i18n'
import { POSITION, useToast } from 'vue-toastification'
import { cloneDeep } from 'lodash-es'

interface Config {
  steamId: string
  theme: string
  groupIcon: boolean
  badgeIcon: boolean
  textColor: string | null
  bgColor: string | null
  statistics: string[]
  lang: string
}

const toast = useToast()
const { locale, t } = useI18n()

const themeList = ['dark', 'light', 'radical', 'tokyonight', 'solarized-light', 'ocean-dark']
const languages = [
  {
    label: '简体中文',
    value: 'zh-CN',
  },
  {
    label: 'English',
    value: 'en',
  },
]
const statisticsList = [
  'groups',
  'badges',
  'games',
  'screenshots',
  'guides',
  'artworks',
  'reviews',
]

const config: Config = reactive({
  steamId: '76561198028121353',
  theme: 'dark',
  badgeIcon: true,
  groupIcon: true,
  textColor: null,
  bgColor: null,
  statistics: ['games', 'groups', 'badges'],
  lang: locale.value,
})

const isDisabled = computed(() => {
  return config.statistics.length >= 3
})

const steamcardUrl = ref('')

const isImgLoading = ref(true)

function generateCard() {
  const _config = cloneDeep(config)
  isImgLoading.value = true
  const settings = []
  settings.push(_config.theme)
  if (_config.lang !== 'zh-CN')
    settings.push(_config.lang)

  if (_config.badgeIcon)
    settings.push('badge')

  if (_config.groupIcon)
    settings.push('group')

  if (_config.textColor) {
    const textColor = _config.textColor.replaceAll('#', '')
    settings.push(`text-${textColor}`)
  }

  if (_config.bgColor) {
    const bgColor = _config.bgColor.replaceAll('#', '')
    settings.push(`bg-${bgColor}`)
  }

  if (!_config.statistics.includes('games') || !_config.statistics.includes('groups') || !_config.statistics.includes('badges'))
    settings.push(..._config.statistics)

  steamcardUrl.value = `/card/${_config.steamId}/${settings.join(',')}`
}

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

function onLanguageChange(val: string) {
  locale.value = val
}

function onImgload() {
  isImgLoading.value = false
}

function openImgPage() {
  window.open(steamcardUrl.value, '_blank')
}

function steamID64Page() {
  if (locale.value === 'zh-CN')
    window.open('https://keylol.com/t38759-1-1', '_blank')
  else
    window.open('https://steamid.pro/', '_blank')
}

function colorPage() {
  window.open('https://htmlcolorcodes.com/', '_blank')
}

onKeyStroke('Enter', (e) => {
  e.preventDefault()
  generateCard()
})

onMounted(() => {
  generateCard()
})
</script>

<template>
  <div flex="~ wrap" items-start justify-around>
    <div w="400px" p-10px flex="~ col" gap-20px>
      <div flex="~ col" w-full>
        <div text="center sm" flex justify-center gap-5px>
          <div font-bold mb-10px>
            SteamID64
          </div>
          <div cursor-pointer i-bi:question-circle @click="steamID64Page" />
        </div>
        <AInput
          id="steamid"
          v-model="config.steamId"
          class="text-xs"
          type="number"
          dark:bg="#222"
          prepend-icon="i-mdi:steam"
        />
      </div>

      <ASelect
        id="language"
        v-model="config.lang"
        class="text-xs"
        :options="languages"
        dark:bg="#222"
        prepend-icon="i-mdi:language"
        @update:modelValue="onLanguageChange"
      >
        <template #label>
          <label for="a-input-language">
            <div mb-10px text="center sm" font-bold>{{ $t('language') }}</div>
          </label>
        </template>
      </ASelect>
      <ASelect
        id="theme"
        v-model="config.theme"
        class="text-xs"
        :options="themeList"
        dark:bg="#222"
        prepend-icon="i-gridicons:themes"
      >
        <template #label>
          <label for="a-input-theme">
            <div mb-10px text="center sm" font-bold>{{ $t('theme') }}</div>
          </label>
        </template>
      </ASelect>

      <div>
        <div text="center sm" items-center flex justify-center gap-5px font-bold mb-20px>
          <div>{{ $t('custom-color') }}</div>
          <div cursor-pointer i-bi:question-circle @click="colorPage" />
        </div>

        <div flex gap-10px items-center mb-10px>
          <div text="12px right">
            {{ $t('text') }}
          </div>
          <AInput v-model="config.textColor" class="text-xs" dark:bg="#222" :placeholder="`${$t('eg')}:#666666`" />
        </div>
        <div flex gap-10px items-center>
          <div :class="[locale === 'en' ? 'w-66px' : '']" text="12px right">
            {{ $t('bg') }}
          </div>
          <AInput v-model="config.bgColor" class="text-xs" dark:bg="#222" :placeholder="`${$t('eg')}:#1e2837`" />
        </div>
      </div>

      <div>
        <div text="center sm" font-bold>
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
        <div text="center sm" font-bold mb-10px>
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

      <ABtn
        color="success"
        @click="generateCard"
      >
        {{ $t('generate') }}
      </ABtn>
    </div>

    <div w="400px" p-10px>
      <div flex="~ col" gap-10px items-center>
        <div text="center xl" font-bold>
          {{ $t('preview') }}
        </div>
        <img v-show="!isImgLoading" w-400px cursor-pointer :src="steamcardUrl" alt="steamCard" srcset="" @click="openImgPage" @load="onImgload">
        <div v-show="isImgLoading" w-400px h-150px b-1 text-center leading-150px>
          {{ $t('loading') }}
        </div>
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
