<template>
  <header class="bg-background/75 backdrop-blur border-b -mb-px sticky top-0 z-50 border-gray-200 dark:border-gray-600">
    <div class="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-1">
      <div class="flex justify-between items-center">
        <div class="flex items-center gap-2 sm:justify-between w-full">
          <UIcon name="i-tabler-steam" class="text-[#38bdf8] dark:text-blue-100 w-6 h-6" />
          <AppName v-if="$route.name !== 'login'" />
          <div />
        </div>
        <div class="flex items-center">
          <DarkToggle />
          <LanguageToggle />
          <AccountList v-if="$route.name !== 'login'" />
        </div>
      </div>
    </div>
  </header>
</template>
