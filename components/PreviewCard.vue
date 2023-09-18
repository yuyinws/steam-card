<script lang="ts" setup>
// @ts-expect-error any
import Atropos from 'atropos/vue'
</script>

<template>
  <UCard class="flex-[50%]">
    <template #header>
      <div class="flex items-center gap-1">
        <UIcon name="i-heroicons-eye" class="w-5 h-5 text-gray-500" />
        <h1 class="text-xl cursor-default font-semibold text-gray-500">
          Preview
        </h1>
      </div>
    </template>

    <div class="w-full flex items-center justify-center">
      <Atropos :shadow="false">
        <NuxtImg src="https://card.yuy1n.io/card/76561198028121353/ocean-dark,en,badge,group,bg-game,games,screenshots,guides" />
      </Atropos>
    </div>
  </UCard>
</template>

<style>

</style>
