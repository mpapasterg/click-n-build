<script setup lang="ts">
import type { NuxtError } from "nuxt/app";

const props = defineProps<{
  error: NuxtError;
}>();

// showError({
//   message: "API return type error",
//   statusCode: 406,
//   statusMessage: "Not acceptable",
//   data: result.error,
//   fatal: true,
// });
// console.log(props.error.data);
</script>

<template>
  <div class="error-container">
    <h1 class="error-header">:(</h1>
    <br />
    <h2 class="error-status">
      <span>{{ props.error.statusCode }}</span
      >: {{ props.error.statusMessage }}
    </h2>
    <h2 class="error-message">
      {{ props.error.message }}
    </h2>
    <h3>
      <NuxtLink class="error-option" @click="clearError({ redirect: '/' })"
        >Return Home</NuxtLink
      >&nbsp;|&nbsp;<NuxtLink class="error-option" @click="clearError()"
        >Reload</NuxtLink
      >
    </h3>
  </div>
</template>

<style scoped>
.error-container {
  --bg: #3498db;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  background-color: var(--bg);
  color: #fff;
  padding-left: 3rem;
}

.error-header {
  font-size: 10rem;
}

.error-status span {
  font-weight: bold;
}

.error-option {
  text-decoration: none;
  color: #fff;
}

.error-option:hover {
  text-decoration: none;
  background: #fff;
  color: var(--bg);
  cursor: pointer;
}
</style>
