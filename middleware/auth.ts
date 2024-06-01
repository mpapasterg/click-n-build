export default defineNuxtRouteMiddleware((to, _) => {
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo({
      path: "/signin",
      query: {
        redirectedFrom: to.path,
      },
    });
  }

  if (to.path === "/signin" || to.path === "/signup") {
    return navigateTo({
      path: "/",
    });
  }
});
