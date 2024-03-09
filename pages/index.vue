<script setup lang="ts">
import { storeToRefs } from 'pinia'

definePageMeta({
  middleware: 'auth',
})

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
  <div class="flex flex-col lg:flex-row gap-5 my-5">
    <ConfigCard />
    <PreviewCard />
  </div>
</template>
