<script setup lang="ts">
useHead({
  title: 'Steam Card',
  link: [
    {
      rel: 'icon', type: 'image/svg', href: '/icon.svg',
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
