<script setup lang="ts">
definePageMeta({
  name: "expert",
  redirect(to) {
    return to.path + "/cpu";
  },
});

useHead({
  title: "Expert Mode",
});

const name = ref<string>("My New Build");
const cpu = ref<any>(null);
const gpu = ref<any>(null);
const ram = ref<any>(null);
const drive = ref<any>(null);
const cooling_system = ref<any>(null);
const decoration = ref<any>(null);
const motherboard = ref<any>(null);
const psu = ref<any>(null);
const pc_case = ref<any>(null);

const componentAdded = (component: BaseComponent) => {
  if (component instanceof CPU) {
    cpu.value = component;
  } else if (component instanceof GPU) {
    gpu.value = component;
  } else if (component instanceof RAM) {
    ram.value = component;
  } else if (component instanceof Drive) {
    drive.value = component;
  } else if (component instanceof CoolingSystem) {
    cooling_system.value = component;
  } else if (component instanceof Decoration) {
    decoration.value = component;
  } else if (component instanceof Motherboard) {
    motherboard.value = component;
  } else if (component instanceof PSU) {
    psu.value = component;
  } else if (component instanceof Case) {
    pc_case.value = component;
  }
};

const finishBuilding = async () => {
  // Create build from components
  const newBuild = new Build(
    "",
    name.value!,
    cpu.value!,
    gpu.value!,
    ram.value!,
    drive.value!,
    cooling_system.value!,
    decoration.value!,
    motherboard.value!,
    psu.value!,
    pc_case.value!
  );

  // Check compatibility of components
  if (!newBuild.constraintsMet()) {
  }

  // Create new build
  const savedBuildID = await newBuild.saveBuild();

  // Redirect to build view
  if (savedBuildID === "") {
    Notify.create({
      type: "error",
      timeout: 5000,
      message: `Could not save build`,
    });
  } else {
    navigateTo("/build/" + savedBuildID);
  }
};
</script>

<template>
  <nuxt-layout name="home-page">
    <div class="col q-px-lg">
      <div class="row q-py-xl">
        <div class="col-11 text-h4 text-bold text-center">Expert Mode</div>
        <q-btn
          class="col=1"
          label="Finish"
          no-caps
          size="lg"
          color="positive"
          text-color="black"
          :disabled="
            cpu === null ||
            gpu === null ||
            ram === null ||
            drive === null ||
            cooling_system === null ||
            decoration === null ||
            motherboard === null ||
            psu === null ||
            pc_case === null
          "
          @click="finishBuilding" />
      </div>
    </div>
    <div class="row q-pa-md full-height">
      <q-list padding class="col-3 q-pr-sm">
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/cpu">
          <q-item-section> CPU </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/gpu">
          <q-item-section> GPU </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/ram">
          <q-item-section> RAM </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/drive">
          <q-item-section> Drive </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/coolingsystem">
          <q-item-section> Cooling System </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/decoration">
          <q-item-section> Decoration </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/motherboard">
          <q-item-section> Motherboard </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/psu">
          <q-item-section> PSU </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          exact
          exact-active-class="text-white bg-blue"
          active-class="text-white bg-blue"
          class="rounded-right"
          to="/expert/case">
          <q-item-section> Case </q-item-section>
        </q-item>
      </q-list>
      <nuxt-page class="col" @componentAdded="componentAdded" />
    </div>
  </nuxt-layout>
</template>
