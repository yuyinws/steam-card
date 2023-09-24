<template>
  <div class="container mt-10">
    <div class="horizontal-scrolling-items gap-4">
      <div v-for="i in 2" :key="i" class="flex gap-4">
        <NuxtImg class="sm:h-[150px] sm:w-[400px] w-[311px] h-[117px]" src="/example/1.svg" />
        <NuxtImg class="sm:h-[150px] sm:w-[400px] w-[311px] h-[117px]" src="/example/2.svg" />
        <NuxtImg class="sm:h-[150px] sm:w-[400px] w-[311px] h-[117px]" src="/example/3.svg" />
        <NuxtImg class="sm:h-[150px] sm:w-[400px] w-[311px] h-[117px]" src="/example/4.svg" />
      </div>
    </div>
  </div>
</template>

<style>
@keyframes infiniteScroll {
  from {
    transform: translateX(0)
  }

  to {
    transform: translateX(-50%)
  }
}

.container {
  width: 100%;
  overflow-x: hidden;
}

.horizontal-scrolling-items {
  display: flex;
  width: 4200px;
  animation-name: infiniteScroll;
  animation-duration: 20s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.horizontal-scrolling-items__item {
  white-space: nowrap;
}
</style>
