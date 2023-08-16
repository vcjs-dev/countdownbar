<template>
  <div ref="countdownBarContainer"></div>
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
      millisecond: true,
    })
  }
}

onMounted(() => {
  init()
})
</script>
