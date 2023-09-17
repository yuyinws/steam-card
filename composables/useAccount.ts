import { defineStore } from 'pinia'

export const useAccount = defineStore('account', () => {
  const accounts = ref<Account[]>([])
  const currentAccountIndex = ref(-1)

  const currentAccount = computed(() => {
    if (currentAccountIndex.value > -1)
      return accounts.value[currentAccountIndex.value]

    return null
  })

  return {
    accounts,
    currentAccount,
    currentAccountIndex,
  }
},
{
  persist: true,
},
)
