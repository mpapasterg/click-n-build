export default defineEventHandler((event) => {
  // Remove auth token from cookies
  setCookie(event, "x-auth-token", "");
  return {};
});
