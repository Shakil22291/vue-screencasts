<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2 class="display-2">Edit Video</h2>
        <VideoEditForm
          :video="video"
          :saveVideo="saveVideo"
          buttonText="Save Video"
        ></VideoEditForm>
      </v-col>
      <v-col cols="12" md="4">
        <VideoListVideo :video="video"></VideoListVideo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import VideoEditForm from "../components/VideoEditForm.vue";
import VideoListVideo from "../components/VideoListVideo.vue";
export default {
  components: { VideoListVideo, VideoEditForm },
  computed: {
    ...mapState(["videos"]),
    video() {
      return this.videos.find((v) => v.id == this.$route.params.id);
    }
  },
  methods: {
    async saveVideo() {
      await this.$store.dispatch("editVideo", this.video);
      this.$router.push({ name: "admin-videos" });
    }
  }
};
</script>

<style></style>
