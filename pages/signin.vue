<script setup lang="ts">
import { QForm } from "quasar";

definePageMeta({
  middleware: (to, from) => {
    const authStore = useAuthStore();

    if (authStore.isAuthenticated) {
      navigateTo({
        path: from.path,
      });
    }
  },
});

useHead({
  title: "Sign in",
});

// Dependencies
const authStore = useAuthStore();
const route = useRoute();

// Form
const formEmail = ref<string>("");
const formEmailRules = [
  (value: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ) || "E-mail entered is not valid.",
];
const formPassword = ref<string>("");
const formPasswordVisible = ref<boolean>(false);
const formError = ref<string>("");
const submitLoading = ref<boolean>(false);

const onSubmit = async () => {
  submitLoading.value = true;
  const response = await authStore.signIn({
    email: formEmail.value,
    password: formPassword.value,
  });
  if (response.error.value) {
    formError.value = ServerErrorResponseSchema.parse(
      response.error.value.data
    ).message;
  } else {
    if (
      route.query.redirectedFrom !== undefined &&
      route.query.redirectedFrom !== null
    ) {
      navigateTo(route.query.redirectedFrom.toString(), {
        replace: true,
      });
    } else {
      navigateTo("/", {
        replace: true,
      });
    }
  }
  submitLoading.value = false;
};
</script>

<template>
  <div class="fullscreen row flex-center">
    <QCard class="col-lg-4 col-md-6 col-auto bg-white text-black">
      <QCardSection>
        <QForm
          class="col q-gutter-lg q-pa-lg"
          autofocus
          greedy
          @submit.prevent="onSubmit">
          <div class="text-h3 row-auto q-py-md">Sign in to Click n' Build</div>
          <div class="text-subtitle1 row-auto text-center">
            If you are not registered yet, <QLink to="/signup">sign up</QLink>.
          </div>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            type="email"
            label="E-mail"
            class="row-auto"
            v-model="formEmail"
            :rules="formEmailRules"
            clearable
            clear-icon="fa-solid fa-close"
            color="white"
            bg-color="secondary"
            filled>
            <template #prepend>
              <q-icon name="fa-solid fa-at" />
            </template>
          </q-input>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            spellcheck="false"
            :type="formPasswordVisible ? 'text' : 'password'"
            label="Password"
            class="row-auto"
            v-model="formPassword"
            clearable
            clear-icon="fa-solid fa-close"
            color="white"
            bg-color="secondary"
            filled>
            <template #prepend>
              <q-icon name="fa-solid fa-key" />
            </template>
            <template #append>
              <q-icon
                :name="formPasswordVisible ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="formPasswordVisible = !formPasswordVisible" />
            </template>
          </q-input>
          <div class="text-negative" v-if="formError">
            {{ formError }}
          </div>
          <div class="row justify-center">
            <q-btn
              class="col-auto"
              type="submit"
              :loading="submitLoading"
              label="Sign in"
              no-caps
              no-wrap
              size="lg"
              color="secondary"
              text-color="white" />
          </div>
        </QForm>
      </QCardSection>
    </QCard>
  </div>
</template>
