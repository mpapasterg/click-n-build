<script setup lang="ts">
definePageMeta({
  name: "home",
});

const authStore = useAuthStore();
</script>

<template>
  <q-layout view="hHh lpR fFf" class="bg-white">
    <q-header bordered class="bg-white text-black col items-center">
      <q-toolbar class="row justify-center" style="height: 5rem">
        <q-toolbar-title class="col-auto">
          <q-icon left size="xl" name="img:/logo.svg" />
          <a
            href="/"
            class="text-black"
            style="font-size: 1.5rem; text-decoration: none"
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
              color="primary"
              text-color="black"
              flat
              to="/building-mode" />
            <q-btn
              label="Guides & Tips"
              no-caps
              size="lg"
              color="primary"
              text-color="black"
              flat
              to="/guides" />
            <q-btn
              label="Wall of Builds"
              no-caps
              size="lg"
              color="primary"
              text-color="black"
              flat
              to="/wall-of-builds" />
            <q-btn
              label="Support"
              no-caps
              size="lg"
              color="primary"
              text-color="black"
              flat
              to="/support" />
            <q-btn
              label="About Us"
              no-caps
              size="lg"
              color="primary"
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

    <q-page-container>
      <div class="col items-center text-black">
        <div class="row justify-center q-pa-lg" style="font-size: 1.75rem">
          Welcome PC Builder
        </div>
        <div class="row justify-center q-pa-md" style="font-size: 1.25rem">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vitae
          malesuada justo. Ut tempor sagittis augue sed egestas. Cras id
          lobortis nunc. Quisque mi enim, venenatis eu turpis nec, vestibulum
          vulputate nulla. Vivamus placerat sem in consequat interdum. Maecenas
          commodo, ex in ullamcorper sodales, dolor turpis lobortis metus,
          sollicitudin ornare leo turpis vel nulla. Quisque sodales condimentum
          urna vel pellentesque. Curabitur sed hendrerit erat. Mauris orci ante,
          placerat ac ligula eu, volutpat feugiat ex. Sed pretium libero nisl,
          sit amet sagittis nulla vehicula eget. Nunc sed nulla nulla. Nulla
          semper in tellus gravida imperdiet. Sed efficitur ex et nisl pretium
          luctus. Sed dui turpis, vulputate non commodo blandit, interdum ac
          odio. Pellentesque bibendum a nibh eget commodo. Fusce iaculis
          ullamcorper mollis. Morbi libero leo, tincidunt id iaculis sed,
          imperdiet nec ante. Duis quis metus sollicitudin, cursus nibh non,
          maximus velit. Sed nec ipsum nec nulla placerat rhoncus ut quis nunc.
          Sed eu quam iaculis, aliquam nulla sed, blandit dolor. Quisque
          lobortis non tortor non accumsan. Nam in ante lorem. Aenean ex est,
          condimentum ut lobortis at, facilisis imperdiet ex. Mauris gravida
          tempus leo, vel dignissim justo hendrerit in.
        </div>
        <div class="row q-pa-md vertical-bottom">
          <div class="col">
            <div class="row q-pa-md justify-center" style="font-size: 1.5rem">
              <span style="font-weight: bold; text-decoration: underline"
                >Before you start...</span
              >
            </div>
            <div class="row q-py-md justify-center">
              <div class="col">
                <q-btn
                  class="row q-ma-md"
                  label="Read some guides & tips for PC building"
                  no-caps
                  size="lg"
                  color="white"
                  text-color="black"
                  rounded
                  to="/guides" />
                <q-btn
                  class="row q-ma-md"
                  label="Take a look at the top 10 PC builds"
                  no-caps
                  size="lg"
                  color="white"
                  text-color="black"
                  rounded
                  to="/wall-of-builds" />
                <q-btn
                  class="row q-ma-md"
                  label="Read our company policy"
                  no-caps
                  size="lg"
                  color="white"
                  text-color="black"
                  rounded
                  to="/guides" />
              </div>
            </div>
          </div>
          <q-separator spaced vertical color="black" size="2px" />
          <div class="col">
            <div class="row q-pa-md justify-center" style="font-size: 1.5rem">
              <span style="font-weight: bold; text-decoration: underline"
                >Are you ready?</span
              >
            </div>
            <div class="row q-py-md justify-center">
              <div class="col">
                <q-btn
                  class="row q-ma-md"
                  label="Already have an account? Just sign in!"
                  no-caps
                  size="lg"
                  color="white"
                  text-color="black"
                  rounded
                  to="/signin" />
                <q-btn
                  class="row q-ma-md"
                  label="First time here? Sign up now!"
                  no-caps
                  size="lg"
                  color="white"
                  text-color="black"
                  rounded
                  to="/signup" />
                <q-btn
                  class="row q-ma-md"
                  label="Wanna just take a look? Start as guest!"
                  no-caps
                  size="lg"
                  color="white"
                  text-color="black"
                  rounded
                  to="/building-mode" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-page-container>

    <q-footer bordered class="bg-white text-black">
      <q-toolbar>
        <q-toolbar-title class="row justify-center">
          © 2024 CEID-Software Engineering All Rights Reserved</q-toolbar-title
        >
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>
