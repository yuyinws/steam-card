<script setup lang="ts">
const appConfig = useAppConfig()
const ORIGIN = appConfig.origin || window.location.origin
</script>

<template>
  <div class="container mt-10">
    <div class="horizontal-scrolling-items gap-4">
      <Vue3Marquee
        :loop="0"
        clone
        pause-on-hover
      >
        <img v-for="i in 4" :key="i" class="sm:h-[150px] sm:w-[400px] w-[311px] h-[117px] mr-5" :src="`${ORIGIN}/example/${i}.svg`">
      </Vue3Marquee>
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
