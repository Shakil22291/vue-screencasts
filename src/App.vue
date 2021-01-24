<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-btn to="/" text class="mr-1">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="30"
        />
        <span>Vue screencasts</span>
      </v-btn>
      <v-btn to="/admin/videos" text>Admin</v-btn>

      <v-spacer></v-spacer>
      <div v-if="currentUser.name">
        <span class="mr-2">
          {{ currentUser.name }}
        </span>
        <v-btn text @click="logoutUser">
          <span class="mr-2">Logout</span>
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
      <v-btn text v-else :to="{name: 'user-login'}">
        <span class="mr-2">Login</span>
        <v-icon>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "App",
  computed: {
    ...mapState(["currentUser"])
  },
  mounted() {
    this.$store.dispatch("loadVideos");
  },
  methods: {
    logoutUser() {
      this.$store.dispatch('logoutUser');
    }
  }
};
</script>
