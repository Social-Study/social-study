<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link class="navbar-brand" to="/dashboard"
        ><img
          src="../../assets/icons/social_study_white.png"
          height="38px"
          width="38px"
          alt=""
        />
        <h1>Social Study</h1>
      </router-link>

      <group-dropdown :study-groups="studyGroups" />

      <create-join-popover></create-join-popover>
    </section>

    <profile-settings
      v-if="user && firestoreUser"
      v-show="isSettingsActive"
      profile-settings
      :user="user"
      :photo-u-r-l="firestoreUser.photoURL"
      @closeSettings="isSettingsActive = false"
    />

    <!-- Right Side Menu and Avatar -->
    <section class="navbar-section">
      <button
        v-if="$route.params.groupID"
        id="chat-button"
        style="width: 36px; height: 36px;margin-right: 20px;"
        class="btn btn-action"
        @click="$store.commit('toggleChatActive')"
      >
        <i class="fas fa-comment-alt"></i>
      </button>
      <div
        class="menu-container"
        @mouseover="menuActive = true"
        @mouseout="menuActive = false"
      >
        <Avatar :user="firestoreUser" class="avatar" />

        <ul v-show="menuActive == true" class="menu settings-menu">
          <li class="menu-item text-left">
            <p v-if="user" class="h5 text-center text-ellipsis">
              {{ user.displayName }}
            </p>
          </li>
          <li class="divider"></li>
          <!-- Settings Button -->
          <li class="menu-item text-left">
            <a
              id="settings"
              class="text-center c-pointer"
              @click="isSettingsActive = true"
            >
              <i class="fas fa-cog" style="margin-right: 10px;"></i> Settings
            </a>
          </li>

          <!-- Log Out Button -->
          <li class="menu-item text-left">
            <a id="logOutButton" class="text-center" @click="logOut">
              <i class="fas fa-sign-out-alt" style="margin-right: 10px;"></i>
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>

<script>
import Avatar from "@/components/Avatar";
import ProfileSettings from "@/components/ProfileSettings";
import CreateJoinPopover from "@/components/navigation/CreateJoinPopover";
import GroupDropdown from "@/components/navigation/GroupDropdown";
import firebase, { db } from "@/firebaseConfig";

export default {
  name: "NavBar",
  components: {
    Avatar,
    ProfileSettings,
    CreateJoinPopover,
    GroupDropdown
  },
  data() {
    return {
      menuActive: false,
      isSettingsActive: false,
      user: null,
      firestoreUser: null,
      studyGroups: []
    };
  },
  created() {
    // TODO: Might get this as a prop from the App component. Would let the app have a single source of truth.
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
        this.$store.commit("setUID", user.uid);
        this.$bind(
          "studyGroups",
          db
            .collection("study-groups")
            .where("members", "array-contains", this.$store.getters.uid)
        ).then(studyGroups => {
          this.studyGroups === studyGroups;
        });

        this.$bind("firestoreUser", db.collection("users").doc(user.uid)).then(
          user => {
            this.firestoreUser === user;
            this.$store.commit("setPhoto", user.photoURL);
            this.$store.commit("setSidebarOpen", user.sidebarOpen);
          }
        );
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    logOut() {
      firebase.auth().signOut();
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.badge::after {
  top: 25px !important;
  font-size: 12px !important;
  vertical-align: center;
  // padding: 0px !important;
  width: 10px !important;
  height: 18px !important;
}

.navbar {
  background-color: $primary;
  padding: 0px 10px 0px 10px;
  height: $nav-height;
}

a.navbar-brand {
  font-family: $logo-font;

  display: flex;
  flex-flow: row nowrap;
  min-width: 200px;
  justify-content: space-between;
  align-items: center;
  margin-right: 25px;
  padding-right: 10px;

  h1 {
    font-size: 1.4em;
    padding-left: 10px;
    padding-right: 10px;
    color: white;
    margin: 0;
  }
}

.menu {
  cursor: pointer;
  background-color: $transparent-dark;
  color: white;
  li {
    margin-top: 0;
  }
}

.menu-container {
  padding: 2px;
}

#settings:hover,
#logOutButton:hover {
  background-color: white;
  color: $primary;
}

#chat-button {
  background-color: $transparent-dark;
  color: white;
  border: solid 2px $primary;

  &:hover {
    color: $primary;
    background-color: white;
  }
}

.settings-menu {
  position: absolute;
  top: 25px;
  right: 30px;
}

.btn-create:hover {
  background-image: white;
}

.h5 {
  margin: 0;
}
</style>
