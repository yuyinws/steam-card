<script lang="ts" setup>
defineProps<{
  name: string
  help?: string
}>()
</script>

<template>
  <div>
    <p class="text-sm block font-medium mb-1">
      {{ name }}
    </p>
    <slot />
    <p v-if="help" class="mt-1 text-gray-500 text-xs">
      {{ help }}
    </p>
  </div>
</template>
