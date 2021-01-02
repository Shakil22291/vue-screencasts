<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2>Create Video</h2>
        <VideoEditForm
          :video="video"
          buttonText="Create Video"
          :saveVideo="createVideo"
        ></VideoEditForm>
      </v-col>
      <v-col cols="12" md="4">
        <VideoListVideo :video="video"></VideoListVideo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoEditForm from "../components/VideoEditForm.vue";
import VideoListVideo from "../components/VideoListVideo.vue";
export default {
  components: { VideoListVideo, VideoEditForm },
  data() {
    return {
      video: {}
    };
  },
  methods: {
    async createVideo() {
      let video = await this.$store.dispatch("createVideo", this.video);
      this.$router.push({ name: "video-watch", params: { id: video.id } });
    }
  }
};
</script>

<style></style>
