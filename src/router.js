import Vue from "vue";
import Router from "vue-router";
import firebase from "@/firebaseConfig";

// User login and signup page
import Landing from "@/views/Landing.vue";

// User Specific Homepage
import Dashboard from "@/views/Dashboard.vue";

// Create a New Group
import CreateGroup from "@/views/CreateGroup";

// Group Specific Homepage
import GroupHomePage from "@/views/GroupHomePage";

// Flashcard Functionality Pages
import FlashcardCollection from "@/views/flashcards/FlashcardCollection";
import FlashcardStudy from "@/views/flashcards/FlashcardStudy";
import FlashcardCreate from "@/views/flashcards/FlashcardCreate";

// Quiz Functionality Pages
import QuizCreate from "@/views/quiz/QuizCreate";
import Quiz from "@/views/quiz/Quiz";

// Agenda Functionality Pages
import GroupAgenda from "@/views/agenda/GroupAgenda.vue";

// Note Functionality Pages
import NotesCollection from "@/views/notes/NotesCollection";
import NotePage from "@/views/notes/NotePage";

// Group Members Listing
import MembersPage from "@/views/MembersPage";

// Group Settings Page (Only the Group Owner can access)
import GroupSettings from "@/views/GroupSettings";

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
      path: "/:groupID/agenda",
      name: "agenda",
      component: GroupAgenda,
      meta: {
        title: "Group Agenda | Social Study",
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
