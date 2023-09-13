<script setup lang="ts">
const { locale } = useI18n()

const items = [
  [
    {
      label: 'English',
      click: () => {
        locale.value = 'en'
      },
    },
    {
      label: '简体中文',
      click: () => {
        locale.value = 'zhCN'
      },
    },
  ],
]

// const languageItems = locales.value.map((i) => ({
//   label: i.
// }))
</script>

<template>
  <UDropdown mode="hover" :items="items">
    <UButton icon="i-heroicons-language" color="gray" variant="ghost" aria-label="Theme" />
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </UDropdown>
</template>
