// SCI ID: 047
// Name: router
// Version: 1.0

import Vue from "vue";
import Router from "vue-router";
import firebase from "@/firebaseConfig";

// User login and signup page
// import Landing from "@/views/Landing.vue";
const Landing = () => import("@/views/Landing");

// User Specific Homepage
const Dashboard = () => import("@/views/Dashboard");

// Create a New Group
const CreateGroup = () => import("@/views/CreateGroup");

// Group Specific Homepage
const GroupHomePage = () => import("@/views/GroupHomePage");

// Flashcard Functionality Pages
const FlashcardCollection = () =>
  import("@/views/flashcards/FlashcardCollection");
const FlashcardStudy = () => import("@/views/flashcards/FlashcardStudy");
const FlashcardCreate = () => import("@/views/flashcards/FlashcardCreate");

// Quiz Functionality Pages
const QuizCreate = () => import("@/views/quiz/QuizCreate");
const Quiz = () => import("@/views/quiz/Quiz");

// Agenda Functionality Pages
const GroupAgenda = () => import("@/views/agenda/GroupAgenda.vue");

// Note Functionality Pages
const NotesCollection = () => import("@/views/notes/NotesCollection");
const NotePage = () => import("@/views/notes/NotePage");

// Group Members Listing
const MembersPage = () => import("@/views/MembersPage");

// Group Settings Page (Only the Group Owner can access)
const GroupSettings = () => import("@/views/GroupSettings");

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
      name: "createGroup",
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
        title: "Home | Social Study",
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
    {
      path: "/:groupID/flashcards/:deckID/study",
      name: "study",
      component: FlashcardStudy,
      // TODO: Dynamic page titles
      meta: {
        title: "Flashcard Study | Social Study",
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/:groupID/flashcards/create",
      name: "createFlashcards",
      component: FlashcardCreate,
      meta: {
        title: "Create a Deck | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/flashcards/edit",
      name: "editFlashcards",
      component: FlashcardCreate,
      meta: {
        title: "Edit Deck | Social Study",
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/:groupID/quizzes/create",
      name: "createQuiz",
      component: QuizCreate,
      meta: {
        title: "Generate a Quiz | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/quizzes/quiz",
      name: "quiz",
      component: Quiz,
      meta: {
        title: "Quiz | Social Study",
        requiresAuth: true
      },
      props: true
    },
    {
      path: "/:groupID/agenda/:itemID?",
      name: "agenda",
      component: GroupAgenda,
      meta: {
        title: "Group Agenda | Social Study",
        requiresAuth: true
      }
    },
    // {
    //   path: "/:groupID/agenda",
    //   name: "agenda",
    //   component: GroupAgenda,
    //   meta: {
    //     title: "Group Agenda | Social Study",
    //     requiresAuth: true
    //   }
    // },
    {
      path: "/:groupID/members",
      name: "members",
      component: MembersPage,
      meta: {
        title: "Members | Social Study",
        requiresAuth: true
      }
    },
    {
      path: "/:groupID/settings",
      name: "settings",
      component: GroupSettings,
      meta: {
        title: "Group Settings | Social Study",
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

export default router;
