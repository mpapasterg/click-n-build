/// <reference types="vitest" />
import { defineVitestConfig } from "@nuxt/test-utils/config";

export default defineVitestConfig({
  test: {
    environment: "nuxt",
    environmentOptions: {
      nuxt: {
        domEnvironment: "happy-dom",
      },
    },
    reporters: ["default"],
    coverage: {
      enabled: true,
      clean: true,
      provider: "v8",
      reporter: ["text"],
    },
    setupFiles: ["tests/setup.ts"],
  },
});
