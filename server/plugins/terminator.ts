export default defineNitroPlugin((nitro) => {
  // Terminate Nitro Gracefully
  nitro.hooks.hookOnce("close", async () => {
    console.log("Closing Nitro Server...");
  });
});
