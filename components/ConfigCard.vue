<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { t, locale } = useI18n()
const { configMeta, imgLoading, steamCardUrl } = storeToRefs(useConfig())
const { currentAccount } = storeToRefs(useAccount())
const { parseConfig } = useConfig()
const { presets } = storeToRefs(usePreset())

const themeList = computed(() => {
  return themes.map((i) => {
    return {
      label: t(`themes.${i}`),
      id: i,
    }
  })
})

const bgTypes = computed(() => {
  return [{
    id: 'color',
    label: t('config.bg.color'),
  }, {
    id: 'game-cover',
    label: t('config.bg.game-cover'),
  }]
})

const statList = computed(() => {
  return statisticsList.map((i) => {
    return {
      label: t(`config.statistics.${i}`),
      value: i,
    }
  })
})

defineShortcuts({
  enter: {
    handler: () => {
      if (!imgLoading.value)
        parseConfig(locale.value, currentAccount.value!.steamId)
    },
    usingInput: true,
  },
})

onMounted(() => {
  if (!steamCardUrl.value)
    parseConfig(locale.value, currentAccount.value!.steamId)
})
</script>

<template>
  <UCard class="flex-[50%]">
    <template #header>
      <div class="flex justify-between">
        <div class="flex items-center gap-1">
          <UIcon name="i-heroicons-cog-8-tooth" class="w-5 h-5 text-gray-800 dark:text-gray-200" />
          <h1 class="text-xl cursor-default font-semibold text-gray-800 dark:text-gray-200">
            {{ $t('config.name') }}
          </h1>
        </div>
        <LoadPreset v-if="presets.length > 0" />
      </div>
    </template>
    <div class="flex flex-col gap-4">
      <FormGroup :name="$t('config.theme')">
        <USelectMenu
          v-model="configMeta.theme" value-attribute="id" option-attribute="label" icon="i-gridicons-themes"
          :options="themeList"
        >
          <template #label>
            {{ themeList.find((i) => i.id === configMeta.theme)?.label }}
          </template>
        </USelectMenu>
      </FormGroup>

      <FormGroup :name="$t('config.text-color')">
        <UInput
          v-model="configMeta.textColor" :placeholder="`${$t('config.eg')}: #666666`"
          icon="i-heroicons-paint-brush"
        />
      </FormGroup>

      <FormGroup :name="$t('config.bg.name')">
        <USelectMenu
          v-model="configMeta.bgType" value-attribute="id" option-attribute="label" icon="i-heroicons-photo"
          :options="bgTypes"
        >
          <template #label>
            {{ bgTypes.find((i) => i.id === configMeta.bgType)?.label }}
          </template>
        </USelectMenu>
      </FormGroup>

      <FormGroup v-if="configMeta.bgType === 'color'" :help="$t('config.bg.bg-color-helper')" :name="$t('config.bg.bg-color')">
        <UInput
          v-model="configMeta.bgColor" :placeholder="`${$t('config.eg')}: #564ecb,#2bcc88`"
          icon="i-ri-paint-fill"
        />
      </FormGroup>

      <FormGroup v-if="configMeta.bgType === 'game-cover'" :help="$t('config.bg.bg-game-helper')" :name="$t('config.bg.bg-game-id')">
        <UInput
          v-model="configMeta.bgGameId" :placeholder="`${$t('config.eg')}: 400`"
          icon="i-ri-gamepad-line"
        />
      </FormGroup>

      <FormGroup :name="$t('config.icon.name')" :help="$t('config.icon.helper')">
        <div class="flex items-center gap-2 mb-2">
          <span class="text-sm text-gray-500">{{ $t('config.icon.badge') }}</span>
          <UToggle v-model="configMeta.badge" on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" />
        </div>
        <div class="flex items-center gap-2">
          <span class="text-sm text-gray-500">{{ $t('config.icon.group') }}</span>
          <UToggle v-model="configMeta.group" on-icon="i-heroicons-check-20-solid" off-icon="i-heroicons-x-mark-20-solid" />
        </div>
      </FormGroup>

      <FormGroup :name="$t('config.statistics.name')" :help="$t('config.statistics.help')">
        <CheckboxGroup v-model:value="configMeta.statistics" :options="statList" />
      </FormGroup>
    </div>
    <template #footer>
      <div class="flex gap-2">
        <UButton :disabled="imgLoading" size="lg" class="justify-center flex-1" @click="() => parseConfig(locale, currentAccount!.steamId)">
          {{ $t('system.generate') }}
          <template #trailing>
            <UIcon name="i-icon-park-outline-enter-key" />
          </template>
        </UButton>
        <SavePreset />
      </div>
    </template>
  </UCard>
</template>
