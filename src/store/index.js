import Vue from "vue";
import Vuex from "vuex";
import Api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_PLAYED_VIDEOS(state, video_ids) {
      state.playedVideos = video_ids;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.playedVideos.concat(videoId);
      state.playedVideos = playedVideos;

      window.localStorage.playedVideos = JSON.stringify(playedVideos);
    }
  },
  actions: {
    async loadVideos({ commit }) {
      let response = await Api().get("videos");

      let videos = response.data.data;
      let tags = response.data.included.filter((i) => i.type == "tag");

      videos.forEach((v) => {
        v.attributes.tag_ids = v.relationships.tags.data.map((t) => t.id);
      });

      tags.forEach((t) => {
        t.attributes.id = t.id;
        t.attributes.video_ids = t.relationships.videos.data.map((v) => v.id);
      });

      commit(
        "SET_VIDEOS",
        videos.map((v) => v.attributes)
      );
      commit(
        "SET_TAGS",
        tags.map((tag) => tag.attributes)
      );

      let playedVideos = JSON.parse(window.localStorage.playedVideos);
      commit("SET_PLAYED_VIDEOS", playedVideos);
    },
    markPlayed({commit}, videoId) {
      commit("MARK_VIDEO_PLAYED", videoId);
    }
  },
  modules: {},
  getters: {
    getTag: (state) => (id) => {
      return state.tags.find((t) => t.id == id);
    }
  }
});
