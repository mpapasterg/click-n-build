<script setup lang="ts">
definePageMeta({
  name: "profile",
  middleware: "auth",
});

const authStore = useAuthStore();

useHead({
  title: authStore.auth!.username,
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
      <div class="row q-py-xl justify-start items-center">
        <q-avatar
          size="5rem"
          font-size="lg"
          color="secondary"
          text-color="white"
          class="on-left text-capitalize"
          >{{ authStore.auth!.username[0] }}</q-avatar
        >
        <div class="col items-start q-gutter-sm">
          <div class="row text-h4 text-bold">
            {{ authStore.auth!.username }}
          </div>
          <div class="row text-h6 text-bold">
            {{ authStore.auth!.email }}
          </div>
        </div>
      </div>
      <div class="row q-py-md justify-start">
        <div class="col q-gutter-md">
          <div class="text-h5 text-bold">My builds</div>
          <q-separator />
          <div
            v-if="builds === null"
            key="loading"
            class="flex flex-center fixed-center">
            <QSpinner size="lg" color="secondary" :thickness="4" />
          </div>
          <QMarkupTable
            v-else-if="builds.success"
            class="row bg-gray-4"
            separator="horizontal"
            flat>
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
          <div v-else key="error" class="fixed-center flex q-gutter-md">
            <div class="text-h2">Error fetching page:</div>
            <div class="text-h6">{{ components.error.message }}</div>
          </div>
        </div>
      </div>
    </div>
  </nuxt-layout>
</template>
