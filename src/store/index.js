import Vue from "vue";
import Vuex from "vuex";
import Api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: []
  },
  mutations: {
    setVideos(state, videos) {
      state.videos = videos;
    }
  },
  actions: {
    async loadVideos({ commit }) {
      let response = await Api().get("videos");
      let videos = response.data.data.map((video) => video.attributes);
      commit("setVideos", videos);
    }
  },
  modules: {}
});
