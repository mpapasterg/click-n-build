<script setup>
useHead({
  title: "About",
});
definePageMeta({});
</script>

<template>
  <div>
    <div
      class="fullscreen bg-primary text-white text-center q-pa-md flex flex-center">
      <div>
        <div class="text-h1 row flex-center q-pa-lg">
          <q-icon left size="8rem" name="img:logo.svg" />
          <span class="brand-name">Click n' Build</span>
        </div>

        <div class="text-h3">
          Designed with
          <q-icon size="xl" color="negative" name="fa-solid fa-heart" /> by
          <nuxt-link href="mailto:itsmpapasterg@gmail.com" external
            >Menelaos</nuxt-link
          >,
          <nuxt-link href="mailto:valentinpascari08@gmail.com" external
            >Valentin</nuxt-link
          >,
          <nuxt-link href="mailto:panilian1011@gmail.com" external
            >Iliana</nuxt-link
          >
          &
          <nuxt-link href="mailto:johnnygeog@gmail.com" external
            >Johnny</nuxt-link
          >
        </div>

        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="primary"
          to="/"
          label="Start building!"
          style="font-size: 1.5rem" />
      </div>
    </div>
  </div>
</template>
