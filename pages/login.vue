<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})
</script>

<template>
  <div class="text-center mt-10 flex flex-col items-center">
    <AppName class="!text-5xl lg:!text-7xl" />
    <p style="text-wrap: balance;" class="text-gray-500 mb-10 dark:text-gray-300 text-xl lg:text-2xl mt-3">
      {{ $t('system.slogan') }}
    </p>
    <AddAccount
      @callback="() => {
        $router.replace('/')
      }"
    />
    <ScrollCard />
  </div>
</template>
