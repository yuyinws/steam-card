export default defineNuxtRouteMiddleware((to) => {
  const { accounts } = storeToRefs(useAccount())
  if (accounts.value?.length) {
    if (to.path === '/login')
      return navigateTo('/')
  }
  else {
    if (to.path !== '/login')
      return navigateTo('/login')
  }
})
