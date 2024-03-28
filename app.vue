<script setup lang="ts">
useHead({
  titleTemplate: (titlePart?: string) =>
    titlePart ? `${titlePart} - Click n' Build` : `Click n' Build`,
});

// Constants
const headerHeight: string = "5rem";
</script>

<template>
  <NuxtPage :headerHeight="headerHeight" />
</template>
