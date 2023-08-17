<template>
  <main class="home-main">
    <BasicUsage />
    <MillisecondUsage />
    <CustomStyleUsage />
  </main>
</template>

<script lang="ts" setup>
import 'prismjs'
import BasicUsage from '@/components/BasicUsage/index.vue'
import MillisecondUsage from '@/components/MillisecondUsage/index.vue'
import CustomStyleUsage from '@/components/CustomStyleUsage/index.vue'
</script>

<style lang="scss" scoped>
.home-main {
  max-width: 980px;
  margin: 0 auto;
}
</style>
