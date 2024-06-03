<script setup lang="ts">
import { Component } from "~/specs/domain";

definePageMeta({
  name: "type",
});

const emits = defineEmits<{
  (event: "componentAdded", component: BaseComponent): void;
}>();

const route = useRoute();

const componentType = route.params.type as string;

const components = ref<FetchResponse<Array<BaseComponent>> | null>(null);

const loadComponents = async () => {
  const componentsResult = await Component.getComponents(componentType);
  if (componentsResult === null) {
    components.value = {
      success: false,
      error: {
        message: `Could not fetch components of type '${componentType}'.`,
      },
    };
  } else {
    components.value = {
      success: true,
      data: componentsResult,
    };
  }
};

const addComponent = (component: BaseComponent) => {
  emits("componentAdded", component);
};

onMounted(async () => {
  await nextTick();
  await loadComponents();
});
</script>

<template>
  <div class="row">
    <div
      v-if="components === null"
      key="loading"
      class="flex flex-center fixed-center">
      <QSpinner size="lg" color="secondary" :thickness="4" />
    </div>
    <div class="row q-gutter-md" v-else-if="components.success">
      <q-card
        v-for="(component, index) of components.data"
        :key="index"
        bordered
        rounded
        elevated>
        <q-card-section>
          <q-img :src="component.image" ratio="1" width="200px" />
        </q-card-section>
        <q-card-actions class="row">
          <div class="col">Price: {{ component.price }}</div>
          <q-btn
            class="col"
            label="Add"
            no-caps
            size="md"
            color="red"
            text-color="black"
            @click="addComponent(component)" />
        </q-card-actions>
      </q-card>
    </div>
    <div v-else key="error" class="fixed-center flex q-gutter-md">
      <div class="text-h2">Error fetching page:</div>
      <div class="text-h6">{{ components.error.message }}</div>
    </div>
  </div>
</template>
