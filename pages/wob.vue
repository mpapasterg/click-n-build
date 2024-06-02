<script setup lang="ts">
definePageMeta({
  name: "wob",
});

useHead({
  title: "Wall of Builds",
});

const builds = ref<FetchResponse<Array<{ id: string; name: string }>> | null>(
  null
);

const loadBuildsData = async () => {
  const response = await useTypedFetch(WoBGetResponseSchema, WoBGetURL, {
    method: "GET",
    server: false,
  });

  if (response.error.value) {
    builds.value = {
      success: false,
      error: ServerErrorResponseSchema.parse(response.error.value.data.data),
    };
  } else {
    const data = response.data.value.builds;
    const buildsData = new Array<{ id: string; name: string }>();
    for (const build of data) {
      buildsData.push({
        id: build.id,
        name: build.name,
      });
    }
    builds.value = {
      success: true,
      data: buildsData,
    };
  }
};

onMounted(async () => {
  await nextTick();
  await loadBuildsData();
});
</script>

<template>
  <nuxt-layout name="home-page">
    <div class="col q-px-lg">
      <div class="row q-py-xl justify-center">
        <div class="col q-gutter-md">
          <div class="text-h4 text-center text-bold">Wall of Builds</div>
          <q-separator />
        </div>
      </div>
      <div
        v-if="builds === null"
        key="loading"
        class="flex flex-center fixed-center">
        <QSpinner size="lg" color="secondary" :thickness="4" />
      </div>
      <div v-else-if="builds.success" class="row justify-center items-center">
        <QMarkupTable class="col-8 bg-gray-4" separator="horizontal" flat>
          <thead>
            <tr>
              <th class="text-left">Rank</th>
              <th class="text-center">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(build, index) of builds.data">
              <td class="text-left">#{{ index }}</td>
              <td class="text-center">
                <nuxt-link :to="`/build/${build.id}`">{{
                  build.name
                }}</nuxt-link>
              </td>
            </tr>
          </tbody>
        </QMarkupTable>
      </div>
      <div v-else key="error" class="fixed-center flex q-gutter-md">
        <div class="text-h2">Error fetching page:</div>
        <div class="text-h6">{{ builds.error.message }}</div>
      </div>
    </div>
  </nuxt-layout>
</template>
