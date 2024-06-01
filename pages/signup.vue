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
  title: "Sign up",
});

// Dependencies
const authStore = useAuthStore();

// Form
const formUsername = ref<string>("");
const formUsernameRules = [
  (value: string) =>
    value.length >= 3 || "Username must be at least 3 characters long.",
  (value: string) =>
    value.length <= 30 || "Username must be less than 30 characters long.",
];
const formEmail = ref<string>("");
const formEmailRules = [
  (value: string) =>
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    ) || "E-mail entered is not valid.",
];
const formPassword = ref<string>("");
const formPasswordVisible = ref<boolean>(false);
const formPasswordRepeat = ref<string>("");
const formPasswordRepeatVisible = ref<boolean>(false);
const formPasswordRules = [
  (value: string) =>
    value.length >= 8 || "Password must be at least 8 characters long.",
  (value: string) =>
    /\d/.test(value) || "Password must contain at least a digit.",
  (value: string) =>
    /[A-Z]/.test(value) ||
    "Password must contain at least an uppercase letter.",
  (value: string) =>
    /[#\$&@\*]/.test(value) ||
    "Password must contain at least a symbol (#$&@*).",
];
const formPasswordRepeatRules = [
  ...formPasswordRules,
  (value: string) => value === formPassword.value || "Passwords do not match.",
];
const formError = ref<string>("");
const submitLoading = ref<boolean>(false);

const onSubmit = async () => {
  submitLoading.value = true;
  const response = await authStore.signUp({
    username: formUsername.value,
    email: formEmail.value,
    password: formPassword.value,
  });
  if (response.error.value) {
    formError.value = ServerErrorResponseSchema.parse(
      response.error.value.data.data
    ).message;
  } else {
    navigateTo("/signin", { replace: true });
  }
  submitLoading.value = false;
};
</script>

<template>
  <div class="fullscreen row flex-center form-background">
    <QCard class="col-lg-4 col-md-6 col-auto bg-white text-black">
      <QCardSection>
        <QForm
          class="col-auto q-gutter-lg q-pa-lg"
          greedy
          @submit.prevent="onSubmit">
          <div class="text-h3 row-auto q-py-md">Welcome to Click n' Build!</div>
          <div class="text-subtitle1 row-auto text-center">
            Use the form below to sign up you are not
            <QLink to="/signin">already a user</QLink>.
          </div>
          <q-input
            autocomplete="off"
            type="text"
            label="Username"
            class="row-auto"
            v-model="formUsername"
            :rules="formUsernameRules"
            hint="Between 3 and 30 characters."
            hide-hint
            clearable
            clear-icon="fa-solid fa-close"
            color="black"
            bg-color="grey-4"
            filled>
            <template #prepend>
              <q-icon name="fa-solid fa-user" />
            </template>
          </q-input>
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
            color="black"
            bg-color="grey-4"
            filled>
            <template #prepend>
              <q-icon name="fa-solid fa-at" />
            </template>
          </q-input>
          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            :type="formPasswordVisible ? 'text' : 'password'"
            label="Password"
            class="row-auto"
            v-model="formPassword"
            :rules="formPasswordRules"
            clearable
            clear-icon="fa-solid fa-close"
            hint="At least 8 characters long with 1 uppercase letter, 1 digit and 1 symbol (#$&@*)."
            hide-hint
            color="black"
            bg-color="grey-4"
            counter
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
          <q-input
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            :type="formPasswordRepeatVisible ? 'text' : 'password'"
            label="Repeat password"
            class="row-auto"
            v-model="formPasswordRepeat"
            :rules="formPasswordRepeatRules"
            clearable
            clear-icon="fa-solid fa-close"
            color="black"
            bg-color="grey-4"
            counter
            filled>
            <template #prepend>
              <q-icon name="fa-solid fa-key" />
            </template>
            <template #append>
              <q-icon
                :name="
                  formPasswordRepeatVisible ? 'visibility_off' : 'visibility'
                "
                class="cursor-pointer"
                @click="
                  formPasswordRepeatVisible = !formPasswordRepeatVisible
                " />
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
              label="Sign up"
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
