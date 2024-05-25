export default defineNuxtLink({
  componentName: "QLink",
  externalRelAttribute: "noopener noreferrer",
  activeClass: "text-accent text-weight-bold",
  exactActiveClass: "text-positive text-weight-bold",
  prefetchedClass: "text-info text-weight-medium",
  trailingSlash: "append",
});
