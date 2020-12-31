<template>
  <div class="home">
    <h1 class="display-2 ma-4 d-flex justify-center"> All Videos</h1>
    <div class="d-flex flex-wrap justify-center">
      <div v-for="video in videos" :key="video.name">
        <VideoListVideo :video="video"></VideoListVideo>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import VideoListVideo from "../components/VideoListVideo.vue";
export default {
  components: { VideoListVideo },
  name: "home",
  computed: {
    ...mapState(["videos", "tags"])
  }
};
</script>