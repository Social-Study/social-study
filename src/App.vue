<template>
  <div id="app">
    <NavBar v-if="$route.name !== 'landing'" />
    <router-view v-if="!$route.params.groupID" />
    <side-bar
      :show="sidebarActive"
      v-else
    >
      <router-view
        id="router-view"
        :class="getActive"
      />
      <chat
        :show="chatActive"
        :user="user"
      />
    </side-bar>
  </div>
</template>


<script>
import NavBar from "@/components/navigation/NavBar";
import SideBar from "@/components/navigation/SideBar";
import Chat from "@/components/chat/Chat";

import { mapGetters } from "vuex";

import firebase from "@/firebaseConfig";
export default {
  name: "App",
  components: {
    NavBar,
    SideBar,
    Chat
  },
  data() {
    return {
      user: null,
      isActive: true
    };
  },
  computed: {
    ...mapGetters(["chatActive", "sidebarActive"]),
    // Compute what sidebar are active and set the proper class
    getActive() {
      let classString = "";
      if (this.chatActive) {
        classString = "chat-active";
      } else {
        classString = "chat-inactive";
      }

      if (this.sidebarActive) {
        classString += " sidebar-active";
      } else {
        classString += " sidebar-inactive";
      }
      return classString;
    }
  },
  created() {
    // Keep track current logged in users
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        user = null;
      }
    });
  }
};
</script>


// Global Styles
<style lang="scss">
@import "@/styles.scss";
@import "node_modules/animate.css/animate";
@import "node_modules/spectre.css/src/spectre.scss";
@import "node_modules/spectre.css/src/spectre-exp.scss";
@import url("https://fonts.googleapis.com/css?family=Pacifico");
@import url("https://fonts.googleapis.com/css?family=Roboto:400,500");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,700");
// @import "node_modules/spectre.css/src/spectre-icons.scss";
// @import url("https://rsms.me/inter/inter-ui.css");
// @import url("https://fonts.googleapis.com/css?family=Montserrat:400,600");

html,
body {
  height: 100%;
  background-color: $light;
}

#app {
  font-family: $primary-font;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

#router-view {
  height: 100%;
  margin-bottom: 0;
}

// Applies to all modal-overlays
a.modal-overlay {
  background-image: $dark-gradient !important;
}

// Sidebar Styles for Visible /
.sidebar-active {
  margin-left: 200px;
  transition: .25s;
}

.sidebar-inactive {
  margin-left: 50px;
  transition: .25s;
}

// Chat Sidebar Styles for Visible / Hidden
.chat-active {
  margin-right: 300px;
  transition: 0.25s;
}

.chat-inactive {
  margin-right: 0px;
  transition: 0.25s;
}
</style>
