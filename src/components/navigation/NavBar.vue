<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link
        class="navbar-brand"
        to="/dashboard"
      >Social Study</router-link>

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
        style="width: 34px; height: 34px;margin-right: 20px; border: none"
        class="btn s-circle"
        @click="$store.commit('toggleChatActive')"
      ><i class="fas fa-comment-alt"></i></button>
      <div
        @mouseover="menuActive = true;"
        @mouseout="menuActive = false;"
        class="menu-container"
      >
        <Avatar
          style="width: 40px; height: 40px; font-size: 1em;"
          v-if="firestoreUser"
          :user="{
                  displayName: this.firestoreUser.displayName,
                  photoURL: this.firestoreUser.photoURL
                 }"
        />
        <div
          v-else
          style="background-color: #3c3c3c; border-radius: 50%; height: 40px; width: 40px;"
          class="loading loading-lg"
        ></div>

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
  background-color: $dark;
  padding: 0px 10px 0px 0px;
  max-height: 6vh;
  min-height: 60px;
}

a.navbar-brand {
  font-family: $logo-font;
  font-size: 1.7em;
  color: white;
  min-width: 200px;
  margin-right: 25px;
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
