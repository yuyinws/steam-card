<script lang="ts" setup>
// @ts-expect-error missing types
import Atropos from 'atropos/vue'
import { storeToRefs } from 'pinia'

const { steamCardUrl, imgLoading } = storeToRefs(useConfig())

const appConfig = useAppConfig()

const ORIGIN = appConfig.origin || window.location.origin
const { $toast } = useNuxtApp()
const { t } = useI18n()

const referenceList = computed(() => {
  return [
    {
      type: 'URL',
      url: `${ORIGIN}${steamCardUrl.value}`,
    },
    {
      type: 'BBCode',
      url: `[img]${ORIGIN}${steamCardUrl.value}[/img]`,
    },
    {
      type: 'HTML',
      url: `<img width="400" height="140" src="${ORIGIN}${steamCardUrl.value}">`,
    },
    {
      type: 'Markdown',
      url: `![Steam Card](${ORIGIN}${steamCardUrl.value})`,
    },
  ]
})

async function copyUrl(url: string) {
  try {
    await navigator.clipboard.writeText(url)
    $toast.success(t('system.copy-success'))
  }
  catch (error) {
    $toast.error(t('system.copy-failed'))
  }
}
</script>

<template>
  <UCard class="flex-[50%]">
    <template #header>
      <div class="flex items-center gap-1">
        <UIcon name="i-heroicons-eye" class="w-5 h-5  text-gray-800 dark:text-gray-200" />
        <h1 class="text-xl cursor-default font-semibold text-gray-800 dark:text-gray-200">
          {{ t('system.preview') }}
        </h1>
      </div>
    </template>

    <ClientOnly>
      <div class="w-full flex items-center justify-center">
        <Atropos :shadow="false">
          <img
            v-show="!imgLoading"
            :key="steamCardUrl"
            alt="Steam Card"
            height="150" width="400"
            class="sm:h-[150px] sm:w-[400px] w-[311px] h-[117px]"
            :src="ORIGIN + steamCardUrl"
            @load="() => { imgLoading = false }"
            @error="() => { imgLoading = false }"
          >

          <div v-show="imgLoading" class="flex justify-center items-center sm:h-[150px] sm:w-[400px] w-[311px] h-[117px] border border-gray-300 dark:border-gray-700 rounded-md">
            <div class="flex flex-col gap-2 justify-center items-center">
              <UIcon class="w-8 h-8 animate-spin text-gray-500" name="i-ant-design-loading-outlined" />
              <div class="text-gray-500">
                Loading...
              </div>
            </div>
          </div>
        </Atropos>
      </div>
    </ClientOnly>

    <UCard v-for="link in referenceList" :key="link.type" class="relative cursor-copy mt-5" @click="copyUrl(link.url)">
      <span class="text-xs text-gray-400 absolute top-2 right-2">
        {{ link.type }}
      </span>
      <span class="break-all text-sm text-gray-700 dark:text-gray-400">
        {{ link.url }}
      </span>
    </UCard>
  </UCard>
</template>
