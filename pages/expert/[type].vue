<script setup lang="ts">
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
  const response = await useTypedFetch(
    ComponentGetResponseSchema,
    ComponentGetURL.replace("[type]", componentType),
    {
      method: "GET",
      server: false,
    }
  );

  if (response.error.value) {
    components.value = {
      success: false,
      error: ServerErrorResponseSchema.parse(response.error.value.data.data),
    };
  } else {
    const data = response.data.value.components;
    const componentsData = new Array<BaseComponent>();
    switch (componentType) {
      case "cpu":
        for (const component of data as Array<InterfaceType<typeof CPU>>) {
          componentsData.push(
            new CPU(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.architecture,
              component.socket,
              component.cores,
              component.threads,
              component.base_clock,
              component.oc_clock,
              component.caches,
              component.watt_consumption
            )
          );
        }
        break;
      case "gpu":
        for (const component of data as Array<InterfaceType<typeof GPU>>) {
          componentsData.push(
            new GPU(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.architecture,
              component.base_clock,
              component.oc_clock,
              component.vram_type,
              component.vram_size,
              component.pcie_type,
              component.watt_consumption
            )
          );
        }
        break;
      case "ram":
        for (const component of data as Array<InterfaceType<typeof RAM>>) {
          componentsData.push(
            new RAM(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.type,
              component.modules,
              component.size,
              component.clock_speed,
              component.cas_latency,
              component.rgb_lighting,
              component.watt_consumption
            )
          );
        }
        break;
      case "drive":
        for (const component of data as Array<InterfaceType<typeof Drive>>) {
          componentsData.push(
            new Drive(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.storage_type,
              component.size,
              component.read_speed,
              component.write_speed,
              component.buffer_size,
              component.watt_consumption
            )
          );
        }
        break;
      case "coolingsystem":
        for (const component of data as Array<
          InterfaceType<typeof CoolingSystem>
        >) {
          componentsData.push(
            new CoolingSystem(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.type,
              component.active_cooling,
              component.watt_consumption
            )
          );
        }
        break;
      case "decoration":
        for (const component of data as Array<
          InterfaceType<typeof Decoration>
        >) {
          componentsData.push(
            new Decoration(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.type,
              component.watt_consumption
            )
          );
        }
        break;
      case "motherboard":
        for (const component of data as Array<
          InterfaceType<typeof Motherboard>
        >) {
          componentsData.push(
            new Motherboard(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.size_type,
              component.socket,
              component.chipset,
              component.memory_channels,
              component.pcie_slots,
              component.external_io,
              component.rgb_lighting,
              component.watt_consumption,
              component.ram_type,
              component.nvme_slots
            )
          );
        }
        break;
      case "psu":
        for (const component of data as Array<InterfaceType<typeof PSU>>) {
          componentsData.push(
            new PSU(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.size_type,
              component.max_wattage,
              component.certification,
              component.modularity_type
            )
          );
        }
        break;
      case "case":
        for (const component of data as Array<InterfaceType<typeof Case>>) {
          componentsData.push(
            new Case(
              component.id,
              component.name,
              component.price,
              component.image,
              component.description,
              component.manufacturer,
              component.type,
              component.motherboard_types_supported,
              component.skin,
              component.features,
              component.watt_consumption
            )
          );
        }
        break;
    }
    console.log(componentsData);
    components.value = {
      success: true,
      data: componentsData,
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
