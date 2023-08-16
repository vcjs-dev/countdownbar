<template>
  <div v-if="current">
    <span>Total time：{{ current.total }} , </span>
    <span>Left days：{{ current.days }} , </span>
    <span>Left hours：{{ current.hours }} , </span>
    <span>Left minutes：{{ current.minutes }} , </span>
    <span>Left seconds：{{ current.seconds }} , </span>
    <span>Left milliseconds：{{ current.milliseconds }}</span>
  </div>
</template>

<script lang="ts" setup>
import { createCountdownBar } from '@/lib/main'
import type { CountdownBarInstance } from '@/lib/interfaces/core'
import { computed, onMounted, ref } from 'vue'

const countdownInstance = ref<CountdownBarInstance>()

const current = computed(() => countdownInstance.value?.current)

const init = () => {
  countdownInstance.value = createCountdownBar({
    // countdown with 24h
    time: 24 * 60 * 60 * 1000,
  })

  countdownInstance.value.start()
}

onMounted(() => {
  init()
})
</script>
