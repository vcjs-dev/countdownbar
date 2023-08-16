<template>
  <DemoHeader
    logo-text="CD"
    title="Countdown Bar"
    title-link="https://github.com/vcjs-dev/countdownbar"
    :right-links="[
      {
        href: 'https://github.com/vcjs-dev/countdownbar',
        title: 'Documentation',
      },
      {
        href: 'https://github.com/vcjs-dev/countdownbar/blob/main/CHANGELOG.md',
        title: 'Changelog',
      },
      { href: 'https://github.com/vcjs-dev/countdownbar', title: 'Github' },
    ]"
  />
  <RouterView />
</template>

<script setup lang="ts">
import { DemoHeader } from 'demoify'
import { RouterView } from 'vue-router'
</script>
