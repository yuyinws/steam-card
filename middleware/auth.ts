export default defineNuxtRouteMiddleware((to) => {
  const { accounts, currentAccountIndex } = storeToRefs(useAccount())
  if (accounts.value?.length) {
    if (currentAccountIndex.value === -1)
      currentAccountIndex.value = 0

    if (to.path === '/login')
      return navigateTo('/')
  }
  else {
    if (to.path !== '/login')
      return navigateTo('/login')
  }
})
