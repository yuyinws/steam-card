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
    <Toaster rich-colors position="top-center" />
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

:root,:root.dark {
  --a-primary: 235, 97.7%, 66.3%
}
</style>
