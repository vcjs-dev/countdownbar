<template>
  <div ref="countdownBarContainer" class="countdown-bar"></div>
</template>

<script lang="ts" setup>
import { createCountdownBar } from '@/lib/main'
import type { CountdownBarInstance } from '@/lib/interfaces/core'
import { onMounted, ref } from 'vue'

const countdownInstance = ref<CountdownBarInstance>()
const countdownBarContainer = ref<HTMLElement>()

const init = () => {
  if (countdownBarContainer.value) {
    countdownInstance.value = createCountdownBar({
      container: countdownBarContainer.value,
      // countdown with 24h
      time: 24 * 60 * 60 * 1000,
      template(currentTime) {
        return `
          <div class="countdown-bar__time">${currentTime.hours}</div>
          <div class="countdown-bar__divider">:</div>
          <div class="countdown-bar__time">${currentTime.minutes}</div>
          <div class="countdown-bar__divider">:</div>
          <div class="countdown-bar__time">${currentTime.seconds}</div>
          
        `
      },
    })
  }
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
:deep() {
  .countdown-bar {
    &__time {
      min-width: 24px;
      height: 24px;
      border-radius: 4px;
      background-color: crimson;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-size: 13px;
      color: #fff;
    }

    &__divider {
      display: inline-block;
    }
  }
}
</style>
