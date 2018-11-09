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
      redirect: "/landing"
    },
    {
      path: "/",
      redirect: "/landing"
    },
    {
      path: "/landing",
      name: "landing",
      component: Landing
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

export default router;
