<script setup lang="ts">
definePageMeta({
  name: "home",
});
</script>

<template>
  <nuxt-layout name="main">
    <template v-slot:navigation>
      <q-btn
        label="Building"
        no-caps
        size="lg"
        color="primary"
        text-color="black"
        flat
        to="/building" />
      <q-btn
        label="Guides & Tips"
        no-caps
        size="lg"
        color="primary"
        text-color="black"
        flat
        to="/guides" />
      <q-btn
        label="Wall of Builds"
        no-caps
        size="lg"
        color="primary"
        text-color="black"
        flat
        to="/wall-of-builds" />
      <q-btn
        label="Support"
        no-caps
        size="lg"
        color="primary"
        text-color="black"
        flat
        to="/support" />
      <q-btn
        label="About Us"
        no-caps
        size="lg"
        color="primary"
        text-color="black"
        flat
        to="/about" />
    </template>
    <div class="col text-black">
      <div class="row justify-center">
        <div class="col-10 items-center">
          <div class="row justify-center q-pa-lg text-h4">
            Welcome PC Builder
          </div>
          <div class="row justify-center text-center q-pa-md te text-h6">
            <p>
              At "Click n' Build", we understand that building your own PC can
              be an exciting yet daunting task. That's why we're here to guide
              you every step of the way, ensuring a seamless and enjoyable
              experience.
            </p>

            <p>
              As you embark on your PC-building journey, our platform offers
              three distinct modes to cater to your expertise level: Beginner
              Mode, Normal Mode, and Expert Mode. Whether you're a novice
              looking for step-by-step assistance or a seasoned pro seeking
              customization options, we've got you covered.
            </p>

            <p>
              Navigate through our user-friendly interface to select from a vast
              array of high-quality components, handpicked to meet your specific
              needs and preferences. Our comprehensive guides and tips for PC
              building are readily available to provide you with invaluable
              insights and assistance throughout the process.
            </p>

            <p>
              But the journey doesn't end there. Before finalizing your order,
              take advantage of our unique offer: publish your build on our page
              and social media channels to receive a discount equivalent to the
              cost of shipping. It's our way of saying thank you for being a
              part of our community.
            </p>

            <p>
              Join us at "Click n' Build" and let's turn your PC-building dreams
              into reality.
            </p>
          </div>
        </div>
      </div>
      <q-separator spaced color="black" size="2px" />
      <div class="row justify-center">
        <div class="col vertical-bottom">
          <div class="row q-pa-md justify-center text-h5">
            <span style="font-weight: bold; text-decoration: underline"
              >Before you start...</span
            >
          </div>
          <div class="row q-py-md justify-center">
            <div class="col">
              <q-btn
                class="row q-ma-md"
                label="Read some guides & tips for PC building"
                no-caps
                size="lg"
                color="white"
                text-color="black"
                rounded
                to="/guides" />
              <q-btn
                class="row q-ma-md"
                label="Take a look at the top 10 PC builds"
                no-caps
                size="lg"
                color="white"
                text-color="black"
                rounded
                to="/wall-of-builds" />
              <q-btn
                class="row q-ma-md"
                label="Read our company policy"
                no-caps
                size="lg"
                color="white"
                text-color="black"
                rounded
                to="/guides" />
            </div>
          </div>
        </div>
        <q-separator spaced vertical color="black" size="2px" />
        <div class="col">
          <div class="row q-pa-md justify-center text-h5">
            <span style="font-weight: bold; text-decoration: underline"
              >Are you ready?</span
            >
          </div>
          <div class="row q-py-md justify-center">
            <div class="col">
              <q-btn
                class="row q-ma-md"
                label="Already have an account? Just sign in!"
                no-caps
                size="lg"
                color="white"
                text-color="black"
                rounded
                to="/signin" />
              <q-btn
                class="row q-ma-md"
                label="First time here? Sign up now!"
                no-caps
                size="lg"
                color="white"
                text-color="black"
                rounded
                to="/signup" />
              <q-btn
                class="row q-ma-md"
                label="Wanna just take a look? Start as guest!"
                no-caps
                size="lg"
                color="white"
                text-color="black"
                rounded
                to="/building" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>
