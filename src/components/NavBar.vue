<template>
  <header class="navbar">
    <section class="navbar-section">
      <router-link
        class="navbar-brand"
        to="/dashboard"
      >Social Study</router-link>

      <!-- Study Group Switcher -->
      <div
        v-if="studyGroups.length > 0"
        class="dropdown"
      >
        <a
          class="nav-button btn btn-primary dropdown-toggle"
          tabindex="0"
        >
          Study Groups<i class="icon icon-caret"></i>
        </a>
        <!-- Your Study Group List Dropdown Items -->
        <ul class="menu group-menu">
          <div
            v-for="(group, index) in studyGroups"
            :key="index"
          >
            <li>
              <div
                class="group-card"
                :class="index+1 === studyGroups.length ? '' : 'mb-2'"
              >
                <router-link
                  class="card-text"
                  :to="{ name: 'home', params: { groupID: group.id } }"
                >
                  <p class="card-text text-ellipsis text-bold text-large">
                    {{ group.className }}
                  </p>
                  <p class="card-text text-ellipsis text-italic">
                    {{ group.instructorName }}
                  </p>
                  <p class="card-text text-ellipsis text-center">
                    {{ getAbrev(group.meetingDays) }} | {{ getTime(group.meetingTime[0])}}-{{ getTime(group.meetingTime[1]) }}
                  </p>
                </router-link>
              </div>
            </li>
          </div>
        </ul>
      </div>

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
import CreateJoinPopover from "@/components/CreateJoinPopover";
import firebase, { db } from "@/firebaseConfig";

export default {
  name: "NavBar",
  components: {
    Avatar,
    ProfileSettings,
    CreateJoinPopover
  },
  data: function() {
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
          }
        );
      } else {
        this.user = null;
      }
    });
  },
  methods: {
    getTime(time) {
      try {
        let hour = parseInt(time.split(":")[0]);
        let minutes = time.split(":")[1];
        return ((hour + 11) % 12) + 1 + ":" + minutes;
      } catch (err) {
        // console.log(err);
      }
    },
    getAbrev(days) {
      let string = "";
      days.forEach(day => {
        if (day === "Thursday") {
          string += day.slice(0, 2) + " ";
        } else {
          string += day.charAt(0).toUpperCase() + " ";
        }
      });
      return string;
    },
    logOut: function() {
      firebase.auth().signOut();
      this.$router.push("/");
    },
    switchGroup(id) {
      this.$router.push(`/${id}/home`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.badge::after {
  top: 25px !important;
  font-size: 12px !important;
  vertical-align: center;
  // padding: 0px !important;
  width: 10px !important;
  height: 18px !important;
}
.group-card {
  width: 100%;
  max-width: 250px;
  padding: 5px;
  border-radius: 10px;
  background-color: white;

  &:hover {
    background-color: $main-gray;
    p {
      color: white;
    }
  }

  a {
    text-decoration: none;
  }
}

.card-text {
  user-select: none;
  margin: 0;
  color: $main-gray;
}

.nav-button {
  width: 250px;
  margin-right: 20px;
}

.navbar {
  background-image: $nav-gradient;
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

.group-menu {
  background-color: rgb(66, 64, 212);
  box-shadow: none;
  max-width: 250px;
  min-width: 250px;
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
