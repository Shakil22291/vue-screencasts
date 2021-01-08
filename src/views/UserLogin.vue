<template>
  <v-container>
    <h2 class="display-2">Login</h2>
    <v-form>
      <v-text-field
        v-model="loginInfo.email"
        type="email"
        label="Email Address"
      ></v-text-field>
      <v-text-field
        v-model="loginInfo.password"
        type="password"
        label="Password"
      ></v-text-field>
      <v-btn type="submit" color="primary" @click.prevent="loginUser">Login</v-btn>
    </v-form>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loginInfo: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    loginUser() {
      this.$store.dispatch("loginUser", this.loginInfo);
    }
  }
};
</script>

<style></style>
