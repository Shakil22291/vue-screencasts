<template>
  <div class="home">
    <h1>Videos</h1>
    <div class="video-container">
      <div v-for="video in videos" :key="video.name">
        <router-link :to="{ name: 'video-watch', params: { id: video.id } }">
          <div class="video-box">
            <img :src="video.thumbnail" :alt="video.name" />
            <div>
              <h3>{{ video.name }}</h3>
              <div v-html="video.description"></div>
              <span v-for="tag_id in video.tag_ids" :key="tag_id">
                <button class="tag-button">{{ getTag(tag_id).name }}</button>
              </span>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "home",
  computed: {
    ...mapState(["videos", "tags"]),
    ...mapGetters(['getTag'])
  },
  methods: {
    getTag(tag_id) {
      return this.tags.find(t => t.id == tag_id);
    }
  }
};
</script>

<style scoped lang="scss">
.video-container {
  .video-box {
    border: 1px solid black;
    border-radius: 10px;
    margin: 10px;
    padding: 10px;
    text-align: left;
    display: flex;
    justify-content: flex-start;
    img {
      width: 200px;
      padding: 10px;
    }
  }
}
</style>
