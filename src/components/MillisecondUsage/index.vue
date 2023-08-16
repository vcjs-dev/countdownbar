<template>
  <div class="">
    <DemoPanel title="Millisecond level rendering">
      <template #description>
        The countdown defaults to rendering once per second, and setting the
        <code class="lang-markup"> millisecond </code> option can enable
        millisecond level rendering.
      </template>

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
  name: 'MillisecondUsage',
})
</script>
