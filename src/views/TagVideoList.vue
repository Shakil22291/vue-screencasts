<template>
  <div>
    <h1>Tag video List {{ tag.name }}</h1>
    <div v-for="video in videosOnTag" :key="video.id">
      <VideoListVideo :video="video"></VideoListVideo>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import VideoListVideo from '../components/VideoListVideo.vue';
export default {
  components: { VideoListVideo },
  name: "tag-video-list",
  computed:{
    ...mapState(["videos", "tags"]),
    ...mapGetters(["getTag"]),
    tag() {
      return this.getTag(this.$route.params.id);
    },
    videosOnTag() {
        return this.videos.filter((v) =>
          this.tag.video_ids.includes(v.id)
        );
    }
  },

};
</script>

<style></style>
