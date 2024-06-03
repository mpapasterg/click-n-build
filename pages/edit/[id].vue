<script setup lang="ts">
definePageMeta({
  name: "expert",
  redirect(to) {
    return to.path + "/cpu";
  },
});

useHead({
  title: "Edit Build",
});

const componentAdded = (component: BaseComponent) => {
  console.log(component.id);
}; // TODO:

const finishBuilding = () => {}; // TODO:
</script>

<template>
  <nuxt-layout name="home-page">
    <div class="col q-px-lg">
      <div class="row q-py-xl">
        <div class="col-11 text-h4 text-bold text-center">Edit</div>
        <q-btn
          class="col=1"
          label="Finish"
          no-caps
          size="lg"
          color="positive"
          text-color="black"
          @click="finishBuilding" />
      </div>
    </div>
    <div class="row q-pa-md full-height">
      <q-list padding class="col-3 q-pr-sm">
        <q-item clickable v-ripple class="rounded-right" to="/expert/cpu">
          <q-item-section> CPU </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="rounded-right" to="/expert/gpu">
          <q-item-section> GPU </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="rounded-right" to="/expert/ram">
          <q-item-section> RAM </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="rounded-right" to="/expert/drive">
          <q-item-section> Drive </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="rounded-right"
          to="/expert/coolingsystem">
          <q-item-section> Cooling System </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="rounded-right"
          to="/expert/decoration">
          <q-item-section> Decoration </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          class="rounded-right"
          to="/expert/motherboard">
          <q-item-section> Motherboard </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="rounded-right" to="/expert/psu">
          <q-item-section> PSU </q-item-section>
        </q-item>
        <q-item clickable v-ripple class="rounded-right" to="/expert/case">
          <q-item-section> Case </q-item-section>
        </q-item>
      </q-list>
      <nuxt-page class="col" @componentAdded="componentAdded" />
    </div>
  </nuxt-layout>
</template>
