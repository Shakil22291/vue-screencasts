<template>
  <div>
    <video-player
      class="video-player-box"
      ref="videoPlayer"
      :options="playerOptions"
    ></video-player>
    <h3>{{ video.name }}</h3>
    <div v-html="video.description"></div>
  </div>
</template>

<script>
// require styles
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
export default {
  name: "video",
  components: {
    videoPlayer
  },
  data() {
    return {
      id: this.$route.params.id
    };
  },
  computed: {
    video() {
      return (
        this.$store.state.videos.find((video) => video.id == this.id) || {}
      );
    },
    playerOptions() {
      return {
        // videojs options
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [
          {
            type: "video/mp4",
            src: this.video.video_url
          }
        ],
        poster: this.video.thumbnail
      };
    }
  }
};
</script>

<style>
.video-player-box .video-js {
  margin: auto;
}
</style>
