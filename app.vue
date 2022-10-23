<script setup>
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
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
}
</style>
