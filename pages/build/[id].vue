<script setup lang="ts">
import { SpellChecker } from "~/specs/domain";

definePageMeta({
  name: "build",
});

useHead({
  title: "Build View",
});

const route = useRoute();
const auth = useAuthStore();

const buildID: string = route.params.id as string;
const build = ref<FetchResponse<InstanceType<typeof Build>> | null>(null);

const loadBuildData = async () => {
  const response = await useTypedFetch(
    BuildGetResponseSchema,
    BuildGetURL.replace("[id]", buildID),
    {
      method: "GET",
      server: false,
    }
  );

  if (response.error.value) {
    build.value = {
      success: false,
      error: ServerErrorResponseSchema.parse(response.error.value.data.data),
    };
  } else {
    const data = response.data.value;
    build.value = {
      success: true,
      data: new Build(
        data.id,
        data.name,
        new CPU(
          data.cpu.id,
          data.cpu.name,
          data.cpu.price,
          data.cpu.image,
          data.cpu.description,
          data.cpu.manufacturer,
          data.cpu.architecture,
          data.cpu.socket,
          data.cpu.cores,
          data.cpu.threads,
          data.cpu.base_clock,
          data.cpu.oc_clock,
          data.cpu.caches,
          data.cpu.watt_consumption
        ),
        new GPU(
          data.gpu.id,
          data.gpu.name,
          data.gpu.price,
          data.gpu.image,
          data.gpu.description,
          data.gpu.manufacturer,
          data.gpu.architecture,
          data.gpu.base_clock,
          data.gpu.oc_clock,
          data.gpu.vram_type,
          data.gpu.vram_size,
          data.gpu.pcie_type,
          data.gpu.watt_consumption
        ),
        new RAM(
          data.ram.id,
          data.ram.name,
          data.ram.price,
          data.ram.image,
          data.ram.description,
          data.ram.manufacturer,
          data.ram.type,
          data.ram.modules,
          data.ram.size,
          data.ram.clock_speed,
          data.ram.cas_latency,
          data.ram.rgb_lighting,
          data.ram.watt_consumption
        ),
        new Drive(
          data.drive.id,
          data.drive.name,
          data.drive.price,
          data.drive.image,
          data.drive.description,
          data.drive.manufacturer,
          data.drive.storage_type,
          data.drive.size,
          data.drive.read_speed,
          data.drive.write_speed,
          data.drive.buffer_size,
          data.drive.watt_consumption
        ),
        new CoolingSystem(
          data.cooling_system.id,
          data.cooling_system.name,
          data.cooling_system.price,
          data.cooling_system.image,
          data.cooling_system.description,
          data.cooling_system.manufacturer,
          data.cooling_system.type,
          data.cooling_system.active_cooling,
          data.cooling_system.watt_consumption
        ),
        new Decoration(
          data.decoration.id,
          data.decoration.name,
          data.decoration.price,
          data.decoration.image,
          data.decoration.description,
          data.decoration.manufacturer,
          data.decoration.type,
          data.decoration.watt_consumption
        ),
        new Motherboard(
          data.motherboard.id,
          data.motherboard.name,
          data.motherboard.price,
          data.motherboard.image,
          data.motherboard.description,
          data.motherboard.manufacturer,
          data.motherboard.size_type,
          data.motherboard.socket,
          data.motherboard.chipset,
          data.motherboard.memory_channels,
          data.motherboard.pcie_slots,
          data.motherboard.external_io,
          data.motherboard.rgb_lighting,
          data.motherboard.watt_consumption,
          data.motherboard.ram_type,
          data.motherboard.nvme_slots
        ),
        new PSU(
          data.psu.id,
          data.psu.name,
          data.psu.price,
          data.psu.image,
          data.psu.description,
          data.psu.manufacturer,
          data.psu.size_type,
          data.psu.max_wattage,
          data.psu.certification,
          data.psu.modularity_type
        ),
        new Case(
          data.pc_case.id,
          data.pc_case.name,
          data.pc_case.price,
          data.pc_case.image,
          data.pc_case.description,
          data.pc_case.manufacturer,
          data.pc_case.type,
          data.pc_case.motherboard_types_supported,
          data.pc_case.skin,
          data.pc_case.features,
          data.pc_case.watt_consumption
        )
      ),
    };
    useHead({
      title: build.value.data.name,
    });
  }
};

const editBuild = () => {}; // TODO:

const spellCheck = (comment: string) => SpellChecker.spellCheck(comment);

const rateBuild = ({
  liked = false,
  disliked = false,
  comment,
}: {
  liked?: boolean;
  disliked?: boolean;
  comment?: string;
}) => {
  if (build.value?.success) {
    if (liked === true) {
      build.value.data.increaseLikes();
    } else if (disliked === true) {
      build.value.data.increaseDislikes();
    } else if (comment) {
      build.value.data.uploadComment(comment);
    }
  }
};

const comment = ref<string>("Type comment...");
watch(comment, () => {
  rateBuild({ comment: comment.value });
});

const saveBuild = () => {
  Notify.create({
    type: "warning",
    timeout: 5000,
    message: `Build Saved!`,
    caption: "",
  });
};

const postBuild = () => {
  if (build.value?.success) {
    WallOfBuilds.postBuild(build.value.data);
    Notify.create({
      type: "warning",
      timeout: 5000,
      message: `Build posted to Wall of Builds!`,
      caption: "",
    });
  }
};

const purchaseBuild = () => {}; // TODO:

onMounted(async () => {
  await nextTick();
  await loadBuildData();
});
</script>

<template>
  <nuxt-layout name="home-page">
    <div class="col q-px-lg">
      <div class="row q-py-xl justify-center">
        <div class="text-h5 text-bold text-center">
          {{ build?.success ? build.data.name : "" }}
        </div>
      </div>
      <Transition appear>
        <div
          v-if="build === null"
          key="loading"
          class="flex flex-center fixed-center">
          <QSpinner size="lg" color="secondary" :thickness="4" />
        </div>
        <div v-else-if="build.success" key="data" class="row justify-center">
          <div class="column col-4">
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">{{ build.data.cpu.name }}</div>
              </q-card-section>
              <q-card-section>
                <q-img :src="build.data.cpu.image" ratio="1" height="10px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">{{ build.data.gpu.name }}</div>
              </q-card-section>
              <q-card-section>
                <q-img :src="build.data.gpu.image" ratio="1" width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">{{ build.data.ram.name }}</div>
              </q-card-section>
              <q-card-section>
                <q-img :src="build.data.ram.image" ratio="1" width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">{{ build.data.drive.name }}</div>
              </q-card-section>
              <q-card-section>
                <q-img :src="build.data.drive.image" ratio="1" width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">
                  {{ build.data.cooling_system.name }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-img
                  :src="build.data.cooling_system.image"
                  ratio="1"
                  width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">
                  {{ build.data.decoration.name }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-img
                  :src="build.data.decoration.image"
                  ratio="1"
                  width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">
                  {{ build.data.motherboard.name }}
                </div>
              </q-card-section>
              <q-card-section>
                <q-img
                  :src="build.data.motherboard.image"
                  ratio="1"
                  width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">{{ build.data.psu.name }}</div>
              </q-card-section>
              <q-card-section>
                <q-img :src="build.data.psu.image" ratio="1" width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
            <q-card class="row" bordered square>
              <q-card-section horizontal class="col items-center">
                <div class="q-px-sm text-h6">{{ build.data.pc_case.name }}</div>
              </q-card-section>
              <q-card-section>
                <q-img :src="build.data.pc_case.image" ratio="1" width="40px" />
              </q-card-section>
              <q-card-actions vertical align="center">
                <q-btn
                  class="q-ma-md"
                  label="Change"
                  no-caps
                  flat
                  size="lg"
                  color="white"
                  text-color="black"
                  @click="editBuild" />
              </q-card-actions>
            </q-card>
          </div>
          <div class="col items-center full-width">
            <q-card class="col items-center q-pa-md" bordered flat>
              <q-card-section class="row items-center">
                <q-img
                  :src="build.data.pc_case.image"
                  ratio="1"
                  width="200px" />
              </q-card-section>
              <q-card-actions
                class="row items-center"
                v-if="auth.isAuthenticated">
                <div class="row">
                  <q-btn
                    flat
                    round
                    size="md"
                    icon="fa-solid fa-thumbs-up"
                    @click="rateBuild({ liked: true })" />
                  <q-btn
                    flat
                    round
                    size="md"
                    icon="fa-solid fa-thumbs-down"
                    @click="rateBuild({ disliked: true })" />
                  <q-btn flat size="md" label="Comment Build" />
                  <q-popup-edit
                    v-model="comment"
                    auto-save
                    :validate="spellCheck"
                    v-slot="scope">
                    <q-input
                      v-model="scope.value"
                      autofocus
                      counter
                      color="white"
                      bg-color="gray-4"
                      @keyup.enter="scope.set">
                      <template v-slot:after>
                        <q-btn
                          flat
                          dense
                          color="negative"
                          icon="cancel"
                          @click.stop.prevent="scope.cancel" />
                        <q-btn
                          flat
                          dense
                          color="positive"
                          icon="check_circle"
                          @click.stop.prevent="scope.set"
                          :disable="
                            scope.validate(scope.value) === false ||
                            scope.initialValue === scope.value
                          " /> </template
                    ></q-input>
                  </q-popup-edit>
                </div>
              </q-card-actions>
            </q-card>
            <q-separator />
            <q-btn
              class="row q-ma-md full-width"
              label="Save to library"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              rounded
              @click="saveBuild" />
            <q-btn
              class="row q-ma-md full-width"
              label="Post to Wall of Builds"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              rounded
              @click="postBuild" />
            <q-btn
              class="row q-ma-md full-width"
              label="Proceed to Purchase"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              rounded
              @click="purchaseBuild" />
          </div>
        </div>
        <div v-else key="error" class="fixed-center flex q-gutter-md">
          <div class="text-h2">Error fetching page:</div>
          <div class="text-h6">{{ build.error.message }}</div>
        </div>
      </Transition>
    </div>
  </nuxt-layout>
</template>
