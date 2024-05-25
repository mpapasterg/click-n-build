<script setup lang="ts">
definePageMeta({
  name: "building",
});
</script>

<template>
  <nuxt-layout name="main">
    <div class="col text-black">
      <div class="row justify-center">
        <div class="col-10 items-center">
          <div class="row justify-center q-pa-lg text-h4">Select Mode</div>
        </div>
      </div>
      <div class="row justify-center q-px-lg q-gutter-md">
        <q-card
          bordered
          class="col q-pa-md bg-white text-black justify-between">
          <div class="row justify-center text-center text-h5 q-pa-md">
            Beginner Mode
          </div>
          <div class="row justify-center text-center text-h6">
            <p>
              By selecting the Beginner Mode you are asked to answer a set of
              questions that will determine your individual preferences, goals
              and budget.
            </p>

            <p>
              Our system will generate several PC builds tailored precisely to
              those constraints, objectives, and budget considerations, ensuring
              maximum value for your investment. You'll have the opportunity to
              select the build that best resonates with your needs.
            </p>

            <p>
              Upon completion, you'll have the flexibility to fine-tune the
              selected build and review your order details before finalizing
              your purchase.
            </p>
          </div>
          <q-btn
            class="row q-ma-md"
            label="Beginner Mode"
            no-caps
            size="lg"
            color="cyan"
            text-color="white"
            rounded
            to="/beginner" />
        </q-card>
        <q-card bordered class="col q-pa-md bg-white text-black">
          <div class="row justify-center text-center text-h5 q-pa-md">
            Normal Mode
          </div>
          <div class="row justify-center text-center text-h6">
            <p>
              During this phase, you'll navigate through essential steps where
              you'll select the foundational components of your build. While
              these components are not inherently interdependent, they set the
              stage for the selection of subsequent parts.
            </p>

            <p>The foundational components encompass the CPU, GPU, and RAM.</p>

            <p>
              The subsequent parts include the Motherboard, Power Supply Unit,
              Case, and more.
            </p>

            <p>
              Our system generate the remaining components based on your initial
              selections, and you'll have the option to customize them. Once you
              proceed beyond this step, the foundational components cannot be
              modified.
            </p>

            <p>
              Upon completion, you'll have the flexibility to review and adjust
              your order details before confirming your purchase.
            </p>
          </div>
          <q-btn
            class="row q-ma-md"
            label="Normal Mode"
            no-caps
            size="lg"
            color="red"
            text-color="white"
            rounded
            to="/normal" />
        </q-card>
        <q-card bordered class="col q-pa-md bg-white text-black">
          <div class="row justify-center text-center text-h5 q-pa-md">
            Expert Mode
          </div>
          <div class="row justify-center text-center text-h6">
            <p>Unlock the full potential of your build with "Expert Mode".</p>

            <p>
              With Expert Mode, you have the freedom to craft your build from
              start to finish without constraints.
            </p>

            <p>
              Should any components prove incompatible, our system will promptly
              notify you, preventing progress to the order details until
              modifications are made to ensure compatibility.
            </p>

            <p>
              If navigating compatibility proves challenging, our system offers
              alternative correction options for your consideration.
            </p>

            <p>
              Upon completion, you'll have the flexibility to thoroughly review
              and refine your build and order details before finalizing your
              purchase.
            </p>
          </div>
          <q-btn
            class="row q-ma-md"
            label="Expert Mode"
            no-caps
            size="lg"
            color="purple"
            text-color="white"
            rounded
            to="/expert" />
        </q-card>
      </div>
    </div>
  </nuxt-layout>
</template>
