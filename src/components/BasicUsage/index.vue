<template>
  <div class="">
    <DemoPanel title="Basic Usage">
      <CountdownBar />
      <template #code>
        <pre class="lang-markup"><code>{{ CountdownBarRaw }}</code></pre>
      </template>
    </DemoPanel>
  </div>
</template>

<script lang="ts" setup>
import { DemoPanel } from 'demoify'
import CountdownBar from './CountdownBar.vue'
import CountdownBarRaw from './CountdownBar.vue?raw'
</script>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'BasicUsage',
})
</script>
