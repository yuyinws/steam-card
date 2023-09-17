<script lang="ts" setup>
const { t } = useI18n()

const configMeta = ref({
  theme: 'dark',
  textColor: '',
  bgType: 'color',
})

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
</script>

<template>
  <UCard class="flex-[50%] min-h-screen">
    <template #header>
      <div class="flex items-center gap-1">
        <UIcon name="i-heroicons-cog-8-tooth" class="w-5 h-5 text-gray-500" />
        <h1 class="text-xl cursor-default font-semibold text-gray-500">
          Config
        </h1>
      </div>
    </template>
    <div class="flex flex-col gap-4">
      <div>
        <p class="text-base block font-medium   mb-1">
          {{ $t('config.theme') }}
        </p>
        <USelectMenu
          v-model="configMeta.theme"
          value-attribute="id"
          option-attribute="label"
          icon="i-gridicons-themes" :options="themeList"
        >
          <template #label>
            {{ themeList.find((i) => i.id === configMeta.theme)?.label }}
          </template>
        </USelectMenu>
      </div>

      <div>
        <p class="text-base block font-medium   mb-1">
          {{ $t('config.text-color') }}
        </p>
        <UInput v-model="configMeta.textColor" :placeholder="`${$t('config.eg')}: #666666`" icon="i-heroicons-paint-brush" />
      </div>

      <div>
        <p class="text-base block font-medium   mb-1">
          {{ $t('config.bg.text') }}
        </p>
        <USelectMenu
          v-model="configMeta.bgType"
          value-attribute="id"
          option-attribute="label"
          icon="i-heroicons-photo" :options="bgTypes"
        >
          <template #label>
            {{ bgTypes.find((i) => i.id === configMeta.bgType)?.label }}
          </template>
        </USelectMenu>
      </div>

      <div>
        <p class="text-base block font-medium   mb-1">
          {{ $t('config.bg.bg-color') }}
        </p>
        <UInput v-model="configMeta.textColor" :placeholder="`${$t('config.eg')}: #564ecb,#2bcc88`" icon="i-ri-paint-fill" />
        <p class="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          {{ $t('config.bg.bg-color-helper') }}
        </p>
      </div>

      <div>
        <p class="text-base block font-medium   mb-1">
          {{ $t('config.bg.bg-game-id') }}
        </p>
        <UInput v-model="configMeta.textColor" :placeholder="`${$t('config.eg')}: #564ecb,#2bcc88`" icon="i-ri-paint-fill" />
        <p class="mt-2 text-gray-500 dark:text-gray-400 text-sm">
          {{ $t('config.bg.bg-color-helper') }}
        </p>
      </div>
    </div>
  </UCard>
</template>

<style>

</style>
