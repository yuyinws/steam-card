<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { cloneDeep } from 'lodash'

const { presets } = storeToRefs(usePreset())
const { configMeta, imgLoading } = storeToRefs(useConfig())
const { currentAccount } = storeToRefs(useAccount())
const { parseConfig } = useConfig()
const selected = ref(presets.value[0].id)

const { $toast } = useNuxtApp()

const isOpen = ref(false)
const current = computed(() => presets.value.find(preset => preset.id === selected.value))

const { t, locale } = useI18n()
function loadPreset() {
  try {
    configMeta.value = cloneDeep(current.value!.config)
    isOpen.value = false
    $toast.success(t('preset.preset-loaded'))
    parseConfig(locale.value, currentAccount.value!.steamId)
  }
  catch (error) {
    $toast.error(t('preset.preset-loaded-fail'))
  }
}

function deletePreset(index: number) {
  presets.value.splice(index, 1)
  if (presets.value.length === 0)
    isOpen.value = false
  else
    selected.value = presets.value[0].id
}
</script>

<template>
  <UButton :disabled="imgLoading" color="gray" variant="solid" @click="isOpen = true">
    {{ $t('preset.load-preset') }}
  </UButton>

  <UModal v-model="isOpen">
    <UCard :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        {{ $t('preset.load-preset') }}
      </template>
      <div class="flex flex-wrap gap-2 items-center">
        <UButtonGroup v-for="(preset, index) in presets" :key="preset.id" size="sm" orientation="horizontal">
          <UButton :label="preset.name" :color="selected === preset.id ? 'black' : 'white'" @click="selected = preset.id" />
          <UButton icon="i-heroicons-x-mark" :color="selected === preset.id ? 'black' : 'white'" @click="deletePreset(index)" />
        </UButtonGroup>
      </div>
      <template #footer>
        <UButton class="mr-2 w-[7rem] justify-center" @click="loadPreset">
          {{ $t('preset.confirm') }}
        </UButton>
        <UButton color="gray" class="w-[7rem] justify-center" variant="solid" @click="isOpen = false">
          {{ $t('preset.cancel') }}
        </UButton>
      </template>
    </UCard>
  </UModal>
</template>
