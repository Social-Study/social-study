import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Landing from "./views/Landing.vue";

Vue.use(Router);

let router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "landing",
      component: Landing,
      meta: {
        title: "Social Study"
      }
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: "Dashboard | Social Study",
        requiresAuth: true
      }
    }
  ]
});

export default router;
