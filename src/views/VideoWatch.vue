<template>
  <v-container>
    <v-row>
      <v-col md="9" cols="12">
        <video-player
          class="video-player-box"
          ref="videoPlayer"
          :options="playerOptions"
          @ended="markAsPlayed"
        ></video-player>
      </v-col>
      <v-col md="3" cols="12">
        <h3 class="display-1 mb-2">{{ video.name }}</h3>
        <div class="green--text" v-if="isPlayed">
          <font-awesome-icon icon="check"></font-awesome-icon> Played
        </div>
        <div v-else class="mb-2">
          <v-btn @click="markAsPlayed" x-small>
            mark as watched
          </v-btn>
        </div>
        <div v-html="video.description"></div>

        <span v-for="tag_id in video.tag_ids" :key="tag_id">
          <v-btn
            small
            color="primary"
            :to="{ name: 'tag', params: { id: tag_id } }"
            class="ma-1"
          >
            {{ getTag(tag_id).name }}
          </v-btn>
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// require styles
import "video.js/dist/video-js.css";
import { videoPlayer } from "vue-video-player";
import { mapGetters, mapState } from "vuex";
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
    ...mapGetters(["getTag"]),
    ...mapState(["playedVideos", "videos"]),
    video() {
      return this.videos.find((video) => video.id == this.id) || {};
    },
    playerOptions() {
      return {
        // videojs options
        muted: false,
        language: "en",
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        fluid: true,
        sources: [
          {
            type: "video/mp4",
            src: this.video.video_url
          }
        ],
        poster: this.video.thumbnail
      };
    },
    isPlayed() {
      return this.playedVideos.includes(this.video.id);
    }
  },
  methods: {
    markAsPlayed() {
      this.$store.dispatch("markPlayed", this.video.id);
    }
  }
};
</script>
