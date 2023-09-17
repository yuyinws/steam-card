<script setup lang="ts">
import { storeToRefs } from 'pinia'

const router = useRouter()

const { currentAccountIndex, accounts } = storeToRefs(useAccount())

if (accounts.value.length === 0) {
  router.replace('/login')
}
else {
  if (currentAccountIndex.value === -1)
    currentAccountIndex.value = 0
}
</script>

<template>
  <div>
    <!-- <ConfigPanel
      v-model:loading="isImgLoading"
      v-model:url="steamcardUrl"
    /> -->
  </div>
</template>
