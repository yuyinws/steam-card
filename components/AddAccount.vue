<script setup lang="ts">
import { storeToRefs } from 'pinia'

const emits = defineEmits<{
  callback: []
}>()
const { locale, t } = useI18n()
const steamId = ref('')

const steamLoginLoading = ref(false)
const { $toast } = useNuxtApp()
const route = useRoute()

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

// 76561198878187072
// 76561198039361453

const addBtnLoading = ref(false)

const { accounts } = storeToRefs(useAccount())

async function handleAdd() {
  try {
    addBtnLoading.value = true
    if (accounts.value.some(item => item.steamId === steamId.value)) {
      $toast.error(t('toast.alreay-exist'))
      return false
    }
    const data = await $fetch(`/info/${steamId.value}`)

    accounts.value.push({
      steamId: steamId.value,
      avatarUrl: data.avatar,
      nickName: data.nickName,
    })

    $toast.success(t('toast.add-account-success'))

    emits('callback')
    // if (route.name === 'login')
    //   router.replace('/')
  }
  catch (error) {
    $toast.error(t('toast.alreay-exist'))
  }
  finally {
    addBtnLoading.value = false
  }
}

onMounted(() => {
  if (route.query.openid) {
    steamId.value = route.query.openid as string
    handleAdd()
  }
})
</script>

<template>
  <UButton :disabled="addBtnLoading" :loading="steamLoginLoading" color="gray" class="w-[18rem] justify-center" icon="i-bi-steam" size="lg" @click="handleLogin">
    {{ $t('system.login') }}
  </UButton>
  <div class="relative w-[18rem] my-2">
    <div class="absolute inset-0 flex items-center">
      <span class="w-[18rem] border-t border-gray-300 dark:border-gray-600" />
    </div>
    <div class="relative flex justify-center text-xs uppercase">
      <span class="bg-white dark:bg-[#121212] text-gray-600 px-2">{{ $t('system.or') }}</span>
    </div>
  </div>
  <div class="flex flex-col items-start">
    <div class="flex items-center gap-2 w-[18rem] ">
      <UInput v-model="steamId" :placeholder="$t('system.steamid')" class="flex-1 flex-shrink-0" size="lg" />
    </div>
    <div class="mt-1 text-gray-500 gap-2 text-sm flex items-center">
      <div>
        {{ $t('config.eg') }}: 76561198340841543
      </div>
      <NuxtLink :to="locale === 'zhCN' ? 'https://keylol.com/t38759-1-1' : 'https://steamid.pro/'" target="_blank">
        <UIcon name="i-bi-question-circle" class="h-4 w-4 relative top-[2px]" />
      </NuxtLink>
    </div>
  </div>

  <UButton :loading="addBtnLoading" :disabled="steamId.length !== 17" class="w-[18rem] mt-3 justify-center" size="lg" @click="handleAdd">
    {{ $t('system.add') }}
  </UButton>
</template>
