import { ofetch } from "ofetch";

export default defineNuxtPlugin((nuxtApp) => {
  globalThis.$fetch = ofetch.create({
    onRequest() {
      LoadingBar.start();
    },
    onRequestError() {
      LoadingBar.stop();
    },
    onResponse() {
      LoadingBar.stop();
    },
    onResponseError() {
      LoadingBar.stop();
    },
  });
});
