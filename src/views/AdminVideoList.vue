<template>
  <v-container>
    <h1>Admin videos</h1>
    <v-btn to="/video/create">Add video</v-btn>
    <hr class="my-3" />
    <h2>All videos</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">
              Name
            </th>
            <th class="text-left">
              Description
            </th>
            <th class="text-center" colspan="2">
              actions
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="video in videos" :key="video.id">
            <td>
              <router-link
                class="text-decoration-none"
                :to="{ name: 'video-watch', params: { id: video.id } }"
                >{{ video.name }}</router-link
              >
            </td>
            <td>{{ video.description | abbreviate }}</td>
            <td>
              <v-btn text @click="deleteVideo(video)">Delete</v-btn>
            </td>
            <td><v-btn text>Edit</v-btn></td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["videos"])
  },
  filters: {
    abbreviate(text) {
      if (text) {
        text = text.replace("<p>", "");
        return text.slice(0, 25) + "...";
      }
    }
  },

  methods: {
    deleteVideo(video) {
      let response = confirm(`Are you shure you want to delete ${video.name}`);
      if (response) {
        this.$store.dispatch("deleteVideo", video);
      }
    }
  }
};
</script>

<style></style>
