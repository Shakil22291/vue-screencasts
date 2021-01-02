import Vue from "vue";
import Vuex from "vuex";
import Api from "../services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    videos: [],
    tags: [],
    playedVideos: [],
    users: []
  },
  mutations: {
    SET_VIDEOS(state, videos) {
      state.videos = videos;
    },
    SET_TAGS(state, tags) {
      state.tags = tags;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_PLAYED_VIDEOS(state, video_ids) {
      state.playedVideos = video_ids;
    },
    MARK_VIDEO_PLAYED(state, videoId) {
      let playedVideos = state.playedVideos.concat(videoId);
      state.playedVideos = playedVideos;

      window.localStorage.playedVideos = JSON.stringify(playedVideos);
    },
    CREATE_VIDEO(state, video) {
      let videos = state.videos.concat(video);
      state.videos = videos;
    },
    DELETE_VIDEO(state, videoId) {
      let videos = state.videos.filter((v) => v.id != videoId);
      state.videos = videos;
    },
    EDIT_VIDEO(state, newVideo) {
      state.videos.forEach((v) => {
        if (v.id == newVideo.id) {
          v = newVideo;
        }
      });
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
    markPlayed({ commit }, videoId) {
      commit("MARK_VIDEO_PLAYED", videoId);
    },
    async createVideo({ commit }, video) {
      let response = await Api().post("/videos", video);
      let savedVideo = response.data.data.attributes;
      commit("CREATE_VIDEO", savedVideo);

      return savedVideo;
    },
    async deleteVideo({ commit }, video) {
      let response = await Api().delete(`videos/${video.id}`);
      if (response.status == 200 || response.status == 204) {
        commit("DELETE_VIDEO", video.id);
      }
    },
    async editVideo({ commit }, video) {
      let response = await Api().put(`videos/${video.id}`, video);
      let newVideo = response.data.data.attributes;
      commit("EDIT_VIDEO", newVideo);

      return newVideo;
    },
    async loadUsers({ commit }) {
      let response = await Api().get("/users");
      let users = response.data.data;
      commit(
        "SET_USERS",
        users.map((u) => u.attributes)
      );
    }
  },

  modules: {},
  getters: {
    getTag: (state) => (id) => {
      return state.tags.find((t) => t.id == id);
    }
  }
});
