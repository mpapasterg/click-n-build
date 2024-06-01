// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  app: {
    baseURL: "/",
    buildAssetsDir: "/_nuxt/",
    cdnURL: "",
    head: {
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      meta: [],
      link: [],
      style: [],
      script: [],
      noscript: [{ children: "JavaScript is required" }],
    },
    keepalive: false,
    layoutTransition: false,
    pageTransition: false,
    rootId: "__nuxt",
    rootTag: "div",
  },
  css: ["assets/css/global.css"],
  imports: {
    autoImport: true,
    dirs: ["stores/**", "specs/**"],
  },
  plugins: ["plugins/ofetch.ts"],
  modules: [
    "@nuxt/test-utils/module",
    "nuxt-quasar-ui",
    "@pinia/nuxt",
    "@pinia-plugin-persistedstate/nuxt",
  ],
  quasar: {
    plugins: ["LoadingBar", "Notify"],
    lang: "en-US",
    iconSet: "fontawesome-v6",
    extras: {
      font: "roboto-font",
      fontIcons: ["material-icons", "fontawesome-v6"],
      svgIcons: ["material-icons", "fontawesome-v6"],
      animations: "all",
    },
    config: {
      dark: false,
      brand: {
        primary: "#0b3954",
        secondary: "#5a7e8f",
        accent: "#ff5a5f",
        dark: "#001e30",
        positive: "#61cf5f",
        negative: "#eb4646",
        info: "#12a4b8",
        warning: "#ebd35e",
      },
      loadingBar: {
        position: "bottom",
        size: "4px",
        color: "accent",
        skipHijack: true,
      },
      notify: {
        badgeColor: "accent",
        badgeTextColor: "white",
        badgePosition: "top-left",
        progress: true,
        progressClass: "bg-accent",
      },
    },
  },
  pinia: {
    storesDirs: ["./stores/**"],
  },
  router: {
    options: {
      end: true,
      sensitive: false,
      strict: false,
      hashMode: false,
    },
  },
  typescript: {
    strict: true,
    typeCheck: "build",
  },
  devServer: {
    host: "0.0.0.0",
    https: true,
    port: 8000,
  },
  ignorePrefix: "-",
  ssr: true,
  spaLoadingTemplate: "public/spa-loading-template.html",
  telemetry: false,
  nitro: {
    imports: {
      autoImport: true,
      dirs: ["specs/**"],
    },
  },
  ignore: ["db/**"],
});
