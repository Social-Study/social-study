import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

import Landing from "./views/Landing.vue";

import GroupHomePage from "./views/GroupHomePage";
import CreateGroup from "./views/CreateGroup";
import MembersPage from "./views/MembersPage";
import NotesCollection from "@/views/NotesCollection";
import NotePage from "@/views/NotePage";
import FlashcardCollection from "./views/FlashcardCollection";
import FlashcardStudy from "./views/FlashcardStudy";
import FlashcardCreate from "./views/FlashcardCreate";

import firebase from "./firebaseConfig";

Vue.use(Router);

// TODO: Figure out how to get dynamic page titles.
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
      path: "/:groupID/notes",
      name: "notes",
      component: NotesCollection,
      meta: {
        title: "Notes | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/notes/:noteID",
      name: "note",
      component: NotePage,
      meta: {
        title: "Note | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/flashcards",
      name: "flashcards",
      component: FlashcardCollection,
      meta: {
        title: "Flashcards | Social Study",
        requiresAuth: true
      }
    },

    // with firebase integration this path will have to be /:groupID/flashcards/deckID/study
    //                                                                                /edit
    //                                                                                /create
    {
      path: "/:groupID/flashcards/study",
      name: "study",
      component: FlashcardStudy,
      meta: {
        title: "Flashcard | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/flashcards/create",
      name: "createflashcard",
      component: FlashcardCreate,
      meta: {
        title: "Flashcard Create | Social Study",
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
    }
  ]
});

// Prevents navigation to certain pages if you are not logged in
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  firebase.auth().onAuthStateChanged(user => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!user) {
        next({
          path: "/landing"
        });
      } else {
        next();
      }
    } else {
      if (user && to.name === "landing") {
        next({
          path: "/dashboard"
        });
      } else {
        next();
      }
    }
  });
});
// router.beforeEach((to, from, next) => {
//   document.title = to.meta.title;
//   console.log(to);
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     firebase.auth().onAuthStateChanged(user => {
//       if (!user) {
//         next({
//           path: "/landing"
//         });
//       } else {
//         next();
//       }
//     });
//   } else {
//     next();
//   }
// });

export default router;
