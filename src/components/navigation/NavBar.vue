<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link
        class="navbar-brand"
        to="/dashboard"
      ><img
          src="../../assets/icons/social_study_white.png"
          height="38px"
          width="38px"
          alt=""
        >
        <h1>Social Study</h1>
      </router-link>

      <group-dropdown :studyGroups="studyGroups" />

      <create-join-popover></create-join-popover>

    </section>

    <profile-settings
      v-if="user && firestoreUser"
      profile-settings
      :user="this.user"
      :photoURL="this.firestoreUser.photoURL"
      @closeSettings="isSettingsActive = false;"
      v-show="isSettingsActive"
    />

    <!-- Right Side Menu and Avatar -->
    <section class="navbar-section">
      <button
        v-if="$route.params.groupID"
        style="width: 32px; height: 32px;margin-right: 20px; border: none"
        class="btn btn-action"
        @click="$store.commit('toggleChatActive')"
      ><i class="fas fa-comment-alt"></i></button>
      <div
        @mouseover="menuActive = true;"
        @mouseout="menuActive = false;"
        class="menu-container"
      >
        <Avatar :user="firestoreUser" />

        <ul
          v-show="menuActive == true"
          class="menu settings-menu"
        >
          <li class="menu-item text-left">
            <p
              v-if="user"
              class="h5 text-center text-ellipsis"
            >
              {{ user.displayName }}
            </p>
          </li>
          <li class="divider"></li>
          <!-- Settings Button -->
          <li class="menu-item text-left">
            <a
              @click="isSettingsActive = true;"
              class="text-center c-pointer"
            >
              <i
                class="fas fa-cog"
                style="margin-right: 10px;"
              ></i> Settings
            </a>
          </li>

          <!-- Log Out Button -->
          <li class="menu-item text-left">
            <a
              @click="logOut"
              class="text-center"
            >
              <i
                class="fas fa-sign-out-alt"
                style="margin-right: 10px;"
              ></i>
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
  // background-color: $dark;
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
  border-radius: 10px;
  li {
    margin-top: 0;
  }
}

.menu-container {
  padding: 2px;
}

.settings-menu {
  position: absolute;
  border-radius: 10px 0px 10px 10px;
  top: 25px;
  right: 30px;
}

.btn-create:hover {
  background-color: white;
}

.h5 {
  margin: 0;
}
</style>
