<script setup lang="ts">
const steamcardUrl = ref('')
const isImgLoading = ref(true)
</script>

<template>
  <div flex="~ wrap" items-start justify-center gap-20px>
    <ConfigPanel
      v-model:loading="isImgLoading"
      v-model:url="steamcardUrl"
    />
    <Preview
      v-model:loading="isImgLoading"
      :steamcard-url="steamcardUrl"
    />
  </div>
</template>

<style>
.i-switch {
  justify-content: flex-start!important;
  gap: 10px;
}
</style>
