<template>
  <v-container>
    <div v-for="user in users" :key="user.id">
      {{ user.name }}
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["users"])
  },
  mounted() {
    this.$store.dispatch("loadUsers");
  }
};
</script>

<style></style>
