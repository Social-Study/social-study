<!-- SCI ID: 006 -->
<!-- Name: Dashboard -->
<!-- Version: 1.1 -->
<template>
  <div id="full-screen">
    <notifications
      group="joinErrors"
      position="right top"
    />

    <div class="welcome-msg">
      <span>{{getGreeting()}}</span>
      <p id="date">It is {{getCurrentTime()}} on {{getDate()}}</p>
    </div>

    <div class="group-management">
      <router-link
        class="link-card"
        :to="{name: 'createGroup'}"
      >
        <h4>Create a Group</h4>
        <!-- <i class="fas fa-plus"></i> -->
      </router-link>
      <div class="link-card">
        <input
          @keydown.enter="fetchStudyGroup()"
          v-model="inviteCode"
          placeholder="Invite Code"
          class=""
          type="text"
        >
      </div>
    </div>

    <!-- Centered Empty Dashboard Placeholder -->
    <p id="group-header">Your Study Groups</p>
    <div v-if="!isLoadingGroups">
      <div class="study-group-container">
        <router-link
          class="group-card"
          :to="{ name: 'home', params: { groupID: group.id } }"
          v-for="(group, index) in studyGroups"
          :key="index"
        >
          <div id="name">{{group.className}}</div>
          <div id="professor">{{group.instructorName}}</div>
          <div id="class-time">
            {{ getAbrev(group.meetingDays) }} @
            {{ getClassTime(group.meetingTime[0]) }}-{{
            getClassTime(group.meetingTime[1]) }}
          </div>
        </router-link>
      </div>
    </div>
    <div
      v-else
      class="loading loading-lg"
    ></div>

    <!-- Class Join Confirmation Modal -->
    <div
      v-if="showModal && inviteGroup !== null"
      class="modal modal-sm active"
    >
      <a
        href="#close"
        class="modal-overlay"
        aria-label="Close"
        @click="showModal = false"
      ></a>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title h5 text-bold text-large">
            Join {{ inviteGroup.className }}?
          </div>
        </div>
        <div class="modal-body">
          <div class="text-uppercase text-bold text-left text-dark">
            Instructor
          </div>
          <div class="text-center text-primary">
            {{ inviteGroup.instructorName }}
          </div>
          <div class="text-uppercase text-left text-bold text-dark">
            # of Members
          </div>
          <div class="text-center text-primary">
            {{ inviteGroup.members.length }}
          </div>
          <div class="text-uppercase text-left text-bold text-dark">
            Description
          </div>
          <div class="text-center text-primary">
            {{ inviteGroup.extraInfo }}
          </div>
        </div>
        <div class="modal-footer">
          <button
            id="cancel-btn"
            class="btn btn-link"
            @click="showModal = false"
          >
            Cancel
          </button>
          <button
            class="btn btn-primary"
            :class="isLoading ? 'loading' : ''"
            @click="joinStudyGroup"
          >
            Join
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { db, FirebaseConsts } from "@/firebaseConfig";
import { getUserData } from "@/scripts/userFuncs";

import { getHours, format } from "date-fns";

export default {
  name: "Dashboard",
  data() {
    return {
      currentDT: new Date(),
      displayName: "",
      user: null,
      inviteCode: "",
      showModal: false,
      // List user's study groups
      studyGroups: [],
      // The returned id of the group
      newGroupID: "",
      inviteGroup: "",
      greetings: ["Good morning", "Good afternoon", "Good evening"],
      isLoadingGroups: true,
      isLoading: false
    };
  },
  beforeMount() {
    // Load user data from firebase using the stored uid
    getUserData(this.$store.getters.uid)
      .then(user => {
        this.user = user;
        this.displayName = user.displayName;
        // Get members list of joined study Groups
        this.$bind(
          "studyGroups",
          db
            .collection("study-groups")
            .where("members", "array-contains", this.$store.getters.uid)
        ).then(studyGroups => {
          this.studyGroups === studyGroups;
          this.isLoadingGroups = false;
        });
        this.isLoadingGroups = false;
      })
      // Catch error when loading user's account data
      .catch(error => {
        // console.log(error);
      });

    setInterval(() => {
      this.currentDT = new Date();
    }, 1000);
  },
  methods: {
    getGreeting() {
      let currentHour = getHours(this.currentDT);
      let str = "";
      if (currentHour >= 0 && currentHour < 12) {
        str += this.greetings[0];
      } else if (currentHour >= 12 && currentHour < 18) {
        str += this.greetings[1];
      } else if (currentHour >= 18 && currentHour < 24) {
        str += this.greetings[2];
      }
      return str + ", " + this.displayName + ".";
    },
    getCurrentTime() {
      return format(this.currentDT, "h:mm A");
    },
    getDate() {
      return format(this.currentDT, "dddd, MMMM Mo, YYYY");
    },
    getClassTime(time) {
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
          string += day.charAt(0).toUpperCase();
        }
      });
      return string;
    },
    joinStudyGroup() {
      this.isLoading = true;
      db.collection("study-groups")
        .doc(this.newGroupID)
        .update({
          members: FirebaseConsts.firestore.FieldValue.arrayUnion(
            this.$store.getters.uid
          )
        })
        .then(() => {
          this.showModal = false;
          this.isLoading = false;
          this.$router.push(`/${this.newGroupID}/home`);
        });
    },
    // Search all study groups to find a matching group for the invite code
    fetchStudyGroup() {
      if (this.inviteCode !== "") {
        db.collection("study-groups")
          .where("inviteCodes", "array-contains", this.inviteCode)
          .limit(1)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size !== 0) {
              querySnapshot.forEach(doc => {
                this.newGroupID = doc.id;
              });
              return true;
            } else {
              return false;
            }
          })
          .then(groupFound => {
            if (groupFound) {
              db.collection("study-groups")
                .doc(this.newGroupID)
                .get()
                .then(doc => {
                  this.inviteGroup = doc.data();
                  // Check if the group already contains the user
                  if (
                    !this.inviteGroup.members.includes(this.$store.getters.uid)
                  ) {
                    this.showModal = true;
                  } else {
                    this.$notify({
                      group: "joinErrors",
                      type: "warning",
                      title: "Unable to Join Study Group",
                      text:
                        "You are already a member of " +
                        this.inviteGroup.className
                    });
                  }
                  // Reset input field after clicking join button
                  this.inviteCode = "";
                });
            } else {
              this.$notify({
                group: "joinErrors",
                type: "error",
                title: "Study Group Not Found",
                text: "A Study Group matching the invite code was not found."
              });
              // Reset input field after clicking join button
              this.inviteCode = "";
            }
          });
      } else {
        this.$notify({
          group: "joinErrors",
          type: "error",
          title: "Invalid Input",
          text: "Please enter your Study Group Invite Code"
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles.scss";

.welcome-msg {
  font-size: 300%;
  margin: 20px;
  font-family: $secondary-font;
  span {
    color: white;
  }

  #date {
    font-size: 75%;
    font-family: $primary-font;
  }
}

#full-screen {
  min-height: $content-height;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: space-between;
  background-image: $dashboard-gradient;
  color: $secondary-light;
}

.group-management {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  .link-card {
    cursor: pointer;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    background-color: white;
    color: $dark;
    box-shadow: $shadow;

    padding: 5px 15px 5px 15px;
    margin: 10px;
    width: 240px;
    height: 50px;
    text-align: center;
    text-decoration: none;
    font-size: 1rem;

    h4 {
      margin: 0;
    }

    input {
      width: 100%;
      border: none;
      text-align: center;
      caret-color: $primary;
    }

    &:hover {
      box-shadow: $shadow-heavy;
    }
  }
}

.study-group-container {
  display: flex;
  flex-flow: row wrap;
  max-width: 60%;
  margin: auto;
  align-items: center;
  justify-content: center;
  overflow-y: auto;
}

.group-card {
  cursor: pointer;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: white;
  color: $dark;
  padding: 10px;
  box-shadow: $shadow;
  margin: 10px;
  min-width: 250px;
  height: 150px;
  text-align: center;
  text-decoration: none;

  #name {
    font-weight: bold;
    font-size: 125%;
    margin: 0px;
    padding: 0px;
  }

  #professor,
  #class-time {
    font-family: $primary-font;
    font-size: 100%;
  }

  &:hover {
    box-shadow: $shadow-heavy;
  }
}

#group-header {
  padding-top: 50px;
  font-size: 50px;
  color: white;
  font-family: $secondary-font;
}
</style>
