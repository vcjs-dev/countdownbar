<template>
  <div class="">
    <DemoPanel title="Basic Usage">
      <CountdownBar />
      <template #code>
        <pre
          class="lang-markup"
        ><code>{{ formatLibName(CountdownBarRaw) }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import CountdownBar from './CountdownBar.vue'
import CountdownBarRaw from './CountdownBar.vue?raw'
import { formatLibName } from '@/utils'
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BasicUsage',
})
</script>
