export default defineNitroPlugin((nitro) => {
  // Log all errors
  nitro.hooks.hook("error", async (error, { event }) => {
    console.error(`[${event?.path}] Captured error:`, error);
  });
});
