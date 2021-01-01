<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="8">
        <h2>Create Video</h2>
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
          <v-btn type="submit" color="primary" @click.prevent="createVideo">Create</v-btn>
        </v-form>
      </v-col>
      <v-col cols="12" md="4">
        <VideoListVideo :video="video"></VideoListVideo>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import VideoListVideo from "../components/VideoListVideo.vue";
export default {
  components: { VideoListVideo },
  data() {
    return {
      video: {}
    };
  },
  methods: {
    async createVideo() {
      let video = await this.$store.dispatch("createVideo", this.video);
      this.$router.push({name: 'video-watch', params: {id: video.id}});
    }
  }
};
</script>

<style></style>
