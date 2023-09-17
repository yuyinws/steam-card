<script setup lang="ts">
const scrollContainerRef = ref()
const scrollContentRef = ref()
</script>

<template>
  <div ref="scrollContainerRef" class="overflow-hidden mt-10">
    <div ref="scrollContentRef" class="flex gap-4">
      <NuxtImg height="112.5" width="300" src="/example/1.svg" />
      <NuxtImg height="112.5" width="300" src="/example/2.svg" />
      <NuxtImg height="112.5" width="300" src="/example/3.svg" />
      <NuxtImg height="112.5" width="300" src="/example/4.svg" />
      <NuxtImg height="112.5" width="300" src="/example/5.svg" />
      <NuxtImg height="112.5" width="300" src="/example/1.svg" />
      <NuxtImg height="112.5" width="300" src="/example/2.svg" />
    </div>
  </div>
</template>
