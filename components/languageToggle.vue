<script setup lang="ts">
const { locale, locales } = useI18n() as any

const items = computed(() => {
  return locales.value.map((i: any) => ({
    label: i.name,
    code: i.code,
    disabled: i.code === locale.value,
    click: () => {
      locale.value = i.code
      localStorage.setItem('locale', i.code)
    },
  }))
})
</script>

<template>
  <UDropdown mode="hover" :items="[items]" :popper="{ placement: 'bottom-end' }">
    <UButton icon="i-heroicons-language" color="gray" variant="ghost" aria-label="Theme" />
    <template #item="{ item }">
      <div class="w-full text-left" :class="locale === item.code ? 'font-bold cursor-not-allowed' : ''">
        {{ item.label }}
      </div>
    </template>
    <template #fallback>
      <div class="w-8 h-8" />
    </template>
  </UDropdown>
</template>
