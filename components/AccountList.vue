<script setup lang="ts">
import { storeToRefs } from 'pinia'

const { accounts, currentAccount, currentAccountIndex } = storeToRefs(useAccount())
const { imgLoading, steamCardUrl } = storeToRefs(useConfig())
const { parseConfig } = useConfig()
const isModalOpen = ref(false)
const router = useRouter()
const { t, locale } = useI18n()

const items = computed(() => {
  return [
    // [
    //   {
    //     label: currentAccount.value?.nickName || '',
    //     disabled: true,
    //     icon: '',
    //   },
    // ],
    accounts.value.map((account, index) => {
      return {
        label: account.nickName,
        account,
        slot: 'account',
        disabled: account.steamId === currentAccount.value?.steamId,
        click: () => {
          currentAccountIndex.value = index
          parseConfig(locale.value, account.steamId)
        },
      }
    }),
    [{
      label: t('system.add-account'),
      icon: 'i-heroicons-plus-circle',
      click: () => {
        isModalOpen.value = true
      },
    }, {
      label: t('system.sign-out'),
      icon: 'i-heroicons-arrow-left-on-rectangle',
      click: () => {
        accounts.value.splice(currentAccountIndex.value, 1)
        imgLoading.value = true
        if (accounts.value?.length > 0) {
          currentAccountIndex.value = 0
        }
        else {
          currentAccountIndex.value = -1
          steamCardUrl.value = ''
          router.replace('/login')
        }
      },
    }],
  ]
})
</script>

<template>
  <template v-if="accounts.length > 0">
    <UDropdown class="px-2" mode="hover" :items="items" :popper="{ placement: 'bottom-end' }">
      <UAvatar :src="currentAccount?.avatarUrl" />

      <template #account="{ item }">
        <UAvatar size="xs" :src="item.account.avatarUrl" />
        <span class="truncate">{{ item.label }}</span>
      </template>

      <template #item="{ item }">
        <span class="truncate">{{ item.label }}</span>
        <UIcon :name="item.icon" class="flex-shrink-0 h-4 w-4 text-gray-400 dark:text-gray-500 ms-auto z-1000" />
      </template>
    </UDropdown>

    <UModal v-model="isModalOpen">
      <UCard class="w-full" :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
        <template #header>
          <h1 class="text-xl font-semibold">
            {{ $t('system.add-account') }}
          </h1>
        </template>
        <div class="flex flex-col items-center">
          <AddAccount @callback="() => { isModalOpen = false }" />
        </div>
      </UCard>
    </UModal>
  </template>
</template>
