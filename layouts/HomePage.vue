<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header bordered class="bg-white text-black col items-center">
      <q-toolbar class="row justify-center" style="height: 5rem">
        <q-toolbar-title class="col-auto">
          <q-icon left size="xl" name="img:/logo.png" />
          <a href="/" class="text-black text-h5" style="text-decoration: none"
            >Click n' Build
          </a>
        </q-toolbar-title>

        <q-space />

        <div class="col-auto">
          <div class="row no-wrap">
            <q-btn
              label="Building"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              flat
              to="/building" />
            <q-btn
              label="Guides & Tips"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              flat
              to="/guides" />
            <q-btn
              label="Wall of Builds"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              flat
              to="/wob" />
            <q-btn
              label="Support"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              flat
              to="/support" />
            <q-btn
              label="About Us"
              no-caps
              size="lg"
              color="white"
              text-color="black"
              flat
              to="/about" />

            <q-separator spaced vertical color="black" />

            <q-btn
              v-if="authStore.isAuthenticated"
              :label="authStore.auth!.username[0]"
              size="lg"
              color="secondary"
              text-color="white"
              round>
              <q-menu
                anchor="bottom end"
                self="top end"
                :offset="[0, 20]"
                transition-show="jump-down"
                transition-hide="jump-up"
                transition-duration="300"
                class="bg-white">
                <div class="col flex-center">
                  <div class="row justify-center q-pa-md">
                    <q-avatar
                      size="xl"
                      font-size="lg"
                      color="secondary"
                      text-color="white"
                      class="text-capitalize"
                      >{{ authStore.auth!.username[0] }}</q-avatar
                    >
                  </div>
                  <div
                    class="row q-px-md text-h6 text-bold text-primary justify-center">
                    {{ authStore.auth!.username }}
                  </div>
                  <div
                    class="row q-px-md text-subtitle2 text-primary justify-center">
                    {{ authStore.auth!.email }}
                  </div>
                  <q-list class="q-pt-md" separator>
                    <q-item
                      class="bg-secondary text-white"
                      clickable
                      v-ripple
                      to="/profile"
                      exact>
                      <q-item-section
                        class="bg-secondary text-center text-subtitle1">
                        View Profile
                      </q-item-section>
                    </q-item>

                    <q-item
                      class="bg-secondary text-white"
                      clickable
                      v-ripple
                      @click="authStore.signOut()">
                      <q-item-section class="text-center text-subtitle1">
                        Sign out
                      </q-item-section>
                    </q-item>
                  </q-list>
                </div>
              </q-menu>
            </q-btn>
            <template v-else>
              <q-btn
                label="Sign in"
                no-caps
                size="lg"
                color="primary"
                text-color="black"
                flat
                to="/signin" />
              <q-btn
                label="Sign up"
                no-caps
                size="lg"
                color="primary"
                text-color="black"
                flat
                to="/signup" />
            </template>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <slot name="drawer" />

    <q-page-container>
      <q-page>
        <slot name="default" />
      </q-page>
    </q-page-container>

    <q-footer>
      <q-toolbar class="bg-white text-black" style="height: 4rem">
        <q-toolbar-title class="row justify-center">
          © 2024 CEID-Software Engineering All Rights Reserved</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
