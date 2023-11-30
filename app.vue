<script setup lang="ts">
const { locale } = useI18n()

locale.value = localStorage.getItem('locale') || 'en'

localStorage.setItem('locale', locale.value)

useHead({
  title: 'Steam Card',
  meta: [
    {
      name: 'description',
      content: '⚡ Generate Your Steam Profile Card Quickly/快速生成你的Steam资料卡片 ⚡',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg',
      href: '/icon.svg',
    },
  ],
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
    <ClientOnly>
      <Toaster rich-colors position="top-center" />
    </ClientOnly>
  </NuxtLayout>
</template>
