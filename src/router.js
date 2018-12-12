import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import Landing from "./views/Landing.vue";
import GroupHomePage from "./views/GroupHomePage";
import CreateGroup from "./views/CreateGroup";

import MembersPage from "./views/MembersPage";
import FlashcardCollection from "./views/FlashcardCollection";
import FlashcardStudy from "./views/FlashcardStudy";

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
    // {
    //   path: "/",
    //   name: "landing",
    //   component: Landing,
    //   meta: {
    //     title: "Social Study"
    //   }
    // },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        title: "Dashboard | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/dashboard/create",
      name: "create",
      component: CreateGroup,
      meta: {
        title: "Create | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/home",
      name: "home",
      component: GroupHomePage,
      meta: {
        title: "Homepage | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/flashcards",
      name: "flashcards",
      component: FlashcardCollection,
      meta: {
        title: "Flcashcards | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/flashcards/study",
      name: "flashcardStudy",
      component: FlashcardStudy,
      meta: {
        title: "Flashcard | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/members",
      name: "members",
      component: MembersPage,
      meta: {
        title: "Members | Social Study",
      requiresAuth: true
    }
  ]
});

export default router;
