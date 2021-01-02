<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2 class="display-2">Edit Video</h2>
        <v-form>
          <v-text-field
            label="Name"
            v-model="video.name"
            hint="Video title"
          ></v-text-field>
          <v-textarea
            label="Description"
            v-model="video.description"
            rows="2"
            auto-grow
            hint="Description can be long"
          ></v-textarea>
          <v-text-field
            label="Thumbnail Url"
            v-model="video.thumbnail"
            hint="Url of the video thumbnail"
          ></v-text-field>
          <v-text-field
            label="Video Url"
            v-model="video.video_url"
            hint="Url of the video"
          ></v-text-field>
          <v-btn type="submit" color="primary" @click.prevent="saveVideo"
            >Update</v-btn
          >
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <VideoListVideo :video="video"></VideoListVideo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";
export default {
  components: { VideoListVideo },
  computed: {
    ...mapState(["videos"]),
    video() {
      return this.videos.find((v) => v.id == this.$route.params.id);
    }
  },
  methods: {
    async saveVideo() {
      await this.$store.dispatch("editVideo", this.video);
      this.$router.push({name: 'admin-videos'});
    }
  }
};
</script>

<style></style>
