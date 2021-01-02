import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/admin/videos",
      name: "admin-videos",
      component: () => import("@/views/AdminVideoList.vue")
    },
    {
      path: "/admin/videos/:id/edit",
      name: "admin-video-edit",
      component: () => import("@/views/AdminVideoEdit.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue")
    },
    {
      path: "/video/create",
      name: "video-create",
      component: () => import("@/views/VideoCreate.vue")
    },
    {
      path: "/video/:id",
      name: "video-watch",
      component: () => import("@/views/VideoWatch.vue")
    },
    {
      path: "/tag/:id",
      name: "tag",
      component: () => import("@/views/TagVideoList.vue"),
    }
  ]
});
