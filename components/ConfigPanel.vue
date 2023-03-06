<script setup lang="ts">
import { AAvatar, ABtn, ACheckbox, AInput, ASelect, ASwitch } from 'anu-vue'
import { useI18n } from 'vue-i18n'
import { cloneDeep } from 'lodash-es'
import { parse } from 'cookie'
import { useStorage } from '@vueuse/core'
import type { Config } from 'types'

const emits = defineEmits(['update:loading', 'update:url'])

const { locale, t } = useI18n()
const steamId = parse(document.cookie).openid
const bgTypeList = ref([
  {
    label: computed(() => t('color')),
    value: 'color',
  },
  {
    label: computed(() => t('game_cover')),
    value: 'game',
  },
])
const themeList = computed(() => {
  return themes.map((i) => {
    return {
      label: t(`themes.${i}`),
      value: i,
    }
  })
})

const defaultConifg: Config = {
  steamId: steamId || defaultSteamId,
  bgType: 'color',
  theme: 'dark',
  badge: true,
  group: true,
  textColor: '',
  bg: '',
  statistics: ['games', 'groups', 'badges'],
  lang: locale.value,
}

const config = useStorage('config', defaultConifg)

locale.value = config.value.lang
if (steamId)
  config.value.steamId = steamId
else
  config.value.steamId = defaultSteamId

function generateCard() {
  const _config = cloneDeep(config.value)
  emits('update:loading', true)
  const settings = []
  settings.push(_config.theme)
  if (_config.lang !== 'zh-CN')
    settings.push(_config.lang)

  if (_config.badge)
    settings.push('badge')

  if (_config.group)
    settings.push('group')

  if (_config.textColor) {
    const textColor = _config.textColor.replaceAll('#', '')
    settings.push(`text-${textColor}`)
  }

  if (_config.bgType === 'color' && _config.bg) {
    let color = _config.bg.replaceAll('#', '')
    color = color.split(',').join('-')
    settings.push(`bg-${color}`)
  }

  if (_config.bgType === 'game') {
    let gameBg = ''
    if (_config.bg)
      gameBg = `bg-game-${_config.bg}`
    else
      gameBg = 'bg-game'

    settings.push(gameBg)
  }

  if (!_config.statistics.includes('games') || !_config.statistics.includes('groups') || !_config.statistics.includes('badges'))
    settings.push(..._config.statistics)

  emits('update:url', `/card/${_config.steamId}/${settings.join(',')}`)
}

// info
const avatar = ref('')
async function handleLogin() {
  try {
    const origin = encodeURI(location.origin)
    const { redirectUrl } = await $fetch('/auth/steam', {
      params: {
        origin,
      },
    })
    window.location.replace(redirectUrl)
  }
  catch (error) {

  }
}
function handleLogout() {
  document.cookie = 'openid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
  localStorage.removeItem('avatar')
  avatar.value = ''
}
async function onLogBtnClick() {
  if (avatar.value)
    handleLogout()

  else
    handleLogin()
}
async function getAvatar() {
  try {
    if (localStorage.getItem('avatar')) {
      avatar.value = localStorage.getItem('avatar')!
    }
    else {
      const { avatar: _avatar } = await $fetch(`/info/${steamId}`)
      localStorage.setItem('avatar', _avatar)
      avatar.value = _avatar
    }
  }
  catch (error) {

  }
}
function steamID64Page() {
  if (locale.value === 'zh-CN')
    window.open('https://keylol.com/t38759-1-1', '_blank')
  else
    window.open('https://steamid.pro/', '_blank')
}

const isDisabled = computed(() => {
  return config.value.statistics.length >= 3
})

function colorPage() {
  window.open('https://htmlcolorcodes.com/', '_blank')
}

onMounted(() => {
  generateCard()
  steamId && getAvatar()
})

onKeyStroke('Enter', (e) => {
  e.preventDefault()
  generateCard()
})
</script>

<template>
  <div w="400px" p-10px flex="~ col" gap-20px>
    <div flex="~ col" w-full>
      <div text="center sm" flex justify-center gap-5px>
        <div font-bold mb-10px>
          SteamID64
        </div>
        <div cursor-pointer i-bi:question-circle @click="steamID64Page" />
      </div>
      <div flex items-center gap-10px>
        <AInput
          id="steamid"
          v-model="config.steamId"
          class="text-xs"
          type="number"
          prepend-icon="i-mdi:steam"
        />
        <ABtn variant="light" :color=" avatar ? 'danger' : 'info'" class="text-xs" @click="onLogBtnClick">
          <AAvatar v-if="avatar" w-14px h-14px :src="avatar" />
          <i v-else class="i-mdi:steam" />
          <span>
            {{ avatar ? $t('logout') : $t('login') }}
          </span>
        </ABtn>
      </div>
    </div>

    <ASelect
      id="language"
      v-model="config.lang"
      class="text-xs"
      :options="languages"
      prepend-icon="i-mdi:language"
      @update:model-value="(val:string) => locale = val"
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
        <div>{{ $t('text-color') }}</div>
        <div cursor-pointer i-bi:question-circle @click="colorPage" />
      </div>

      <div flex gap-10px items-center mb-10px>
        <div text="12px right">
          {{ $t('text') }}
        </div>
        <AInput v-model="config.textColor" class="text-xs" :placeholder="`${$t('eg')}:#666666`" />
      </div>
    </div>

    <div>
      <div text="center sm" items-center flex justify-center gap-5px font-bold mb-20px>
        <div>{{ $t('custom-bg') }}</div>
      </div>
      <div flex gap-10px items-center>
        <div text="12px right">
          {{ $t('bg-type') }}
        </div>
        <ASelect
          v-model="config.bgType"
          class="text-xs"
          :options="bgTypeList"
          @update:model-value="config.bg = ''"
        />
      </div>
      <div mt-10px flex gap-10px items-center>
        <div text="12px right">
          {{ config.bgType === 'color' ? $t('bg-color-value') : $t('bg-game-value') }}
        </div>
        <AInput
          v-model="config.bg"
          class="text-xs flex-1"
          :placeholder="config.bgType === 'game' ? t('bg-game-placeholder') : t('bg-color-placeholder')"
        />
      </div>
    </div>

    <div>
      <div text="center sm" font-bold>
        {{ $t('icons') }}
      </div>
      <div flex justify-between>
        <ASwitch v-model="config.badge" class="text-sm i-switch">
          <template #default>
            <span text-12px>{{ $t('badge-icon') }}</span>
          </template>
        </ASwitch>
        <ASwitch v-model="config.group" class="text-sm i-switch">
          <template #default>
            <span text-12px>{{ $t('group-icon') }}</span>
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
            <span text-12px w-80px>
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
</template>
