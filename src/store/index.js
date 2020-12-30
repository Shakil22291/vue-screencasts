import Vue from "vue";
import Vuex from "vuex";
import Api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
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

      tags.forEach((t) => (t.attributes.id = t.id));

      commit(
        "SET_VIDEOS",
        videos.map((v) => v.attributes)
      );
      commit(
        "SET_TAGS",
        tags.map((tag) => tag.attributes)
      );
    }
  },
  modules: {},
  getters: {
    getTag: (state) => (id) => {
      return state.tags.find((t) => (t.id == id));
    }
  }
});
