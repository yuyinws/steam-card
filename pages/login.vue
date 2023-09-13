<script setup lang="ts">
import BiQuestionCircle from '~icons/bi/question-circle'

const { locale, t } = useI18n()

const steamId = ref('')
const steamLoginLoading = ref(false)
const { $toast } = useNuxtApp()

async function handleLogin() {
  try {
    steamLoginLoading.value = true
    const origin = encodeURI(location.origin)
    const { redirectUrl } = await $fetch('/auth/steam', {
      params: {
        origin,
      },
    })

    window.location.replace(redirectUrl)
  }
  catch (error) {
    $toast(t('toast.login-fail'))
  }
  finally {
    steamLoginLoading.value = false
  }
}

const scrollContainerRef = ref()
const scrollContentRef = ref()

// onMounted(() => {
//   const container = scrollContainerRef.value
//   const content = scrollContentRef.value

//   let scrollAmount = 0
//   const scrollSpeed = 2

//   setInterval(() => {
//     scrollAmount += scrollSpeed
//     if (scrollAmount >= content.offsetWidth)
//       scrollAmount = 0

//     container.scrollLeft = scrollAmount
//   }, 20)
// })
</script>

<template>
  <div class="text-center mt-10 flex flex-col items-center">
    <AppName class="!text-5xl lg:!text-7xl" />
    <p style="text-wrap: balance;" class="text-gray-500 dark:text-gray-300 text-xl lg:text-2xl mt-3">
      {{ $t('system.slogan') }}
    </p>
    <UButton :loading="steamLoginLoading" color="gray" class="mt-10 w-[18rem] justify-center" icon="i-bi-steam" size="lg" @click="handleLogin">
      {{ $t('system.login') }}
    </UButton>
    <div class="relative w-[18rem] my-2">
      <div class="absolute inset-0 flex items-center">
        <span class="w-[18rem] border-t border-gray-300 dark:border-gray-600" />
      </div>
      <div class="relative flex justify-center text-xs uppercase">
        <span class="bg-white dark:bg-[#131313] text-gray-600 px-2">{{ $t('system.or') }}</span>
      </div>
    </div>
    <div class="flex items-center gap-2 w-[18rem] ">
      <UInput v-model="steamId" :placeholder="$t('system.steamid')" class="flex-1 flex-shrink-0" size="lg" />
      <NuxtLink :to="locale === 'zhCN' ? 'https://keylol.com/t38759-1-1' : 'https://steamid.pro/'" target="_blank">
        <BiQuestionCircle class="text-gray-500" />
      </NuxtLink>
    </div>
    <UButton :disabled="steamId.length !== 17" class="w-[18rem] mt-3 justify-center" size="lg">
      Add
    </UButton>

    <!-- <div ref="scollContainerRef" class="mt-10 w-full flex gap-4 overflow-x-hidden">
      <div ref="firstContainerRef" class="flex gap-4" style="flex: 0 0 auto">
        <NuxtImg height="112.5" width="300" style="flex: 0 0 auto" src="/example/1.svg" />
        <NuxtImg height="112.5" width="300" src="/example/1.svg" />
      </div>

      <div class="flex gap-4" style="flex: 0 0 auto">
        <NuxtImg height="112.5" width="300" style="flex: 0 0 auto" src="/example/1.svg" />
        <NuxtImg height="112.5" width="300" src="/example/1.svg" />
      </div>
    </div> -->
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
  </div>
</template>
