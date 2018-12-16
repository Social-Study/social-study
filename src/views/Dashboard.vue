<template>

  <!-- TODO: Render loading indicator if firebase has not finished async load -->
  <div v-if="this.user !== null">

    <!-- Class Join Confirmation Modal -->
    <div
      v-if="confirmJoin && inviteGroup !== null"
      class="modal modal-sm active"
    >
      <a
        @click="confirmJoin = false"
        href="#close"
        class="modal-overlay"
        aria-label="Close"
      ></a>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title h5">Join {{inviteGroup.className}}?</div>
        </div>
        <div class="modal-body">
          <div class="text-uppercase text-left text-dark">Instructor</div>
          <div class="text-center text-primary">{{inviteGroup.instructorName}}</div>
          <div class="text-uppercase text-left text-dark"># of Members</div>
          <div class="text-center text-primary">{{inviteGroup.members.length}}</div>
        </div>
        <div class="modal-footer">
          <button
            @click="confirmJoin=false"
            class="btn modal-btn"
          >Cancel</button>
          <button
            @click="joinStudyGroup"
            class="btn btn-primary modal-btn"
          >Join</button>
        </div>
      </div>
    </div>

    <div class="dashboardBody">
      <div class="empty">
        <div class="empty-icon">
          <img
            id="undraw"
            class="undraw-svg"
            src="../assets/undraw_no_data.svg"
            alt="No Study Groups"
          >
        </div>
        <p
          v-if="this.studyGroups && this.studyGroups.length === 0"
          class="empty-title h5"
        >You don't have any Study Groups!</p>
        <p class="empty-subtitle">Create a brand new Study Group</p>
        <div class="empty-action">
          <button
            @click="$router.push('/dashboard/create')"
            class="btn btn-primary"
          >Create</button>
        </div>
        <p class="empty-subtitle">or</p>
        <p class="empty-subtitle ">Join an existing Study Group.</p>
        <div class="empty-action input-group input-inline">
          <input
            v-model="inviteCode"
            class="form-input"
            type="text"
          >
          <button
            @click="queryStudyGroup"
            class="btn btn-primary input-group-btn"
          >Join</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <div class="loading loading-lg"></div>
  </div>
</template>

<script>
import firebase, { db, FirebaseConsts } from "@/firebaseConfig";
import { getUserData } from "@/scripts/userFuncs";

export default {
  name: "dashboard",
  data: function() {
    return {
      user: null,
      // List user's study groups
      studyGroups: [],
      // Show/Hide the confirmation modal
      confirmJoin: false,
      // The user entered group invite code
      inviteCode: "",
      // The returned id of the group
      newGroupID: "",
      // The returned group's detail data
      inviteGroup: null
    };
  },
  methods: {
    // Add the current user's id to the new Study Group
    joinStudyGroup() {
      db.collection("study-groups")
        .doc(this.newGroupID)
        .update({
          members: FirebaseConsts.firestore.FieldValue.arrayUnion(
            this.$store.getters.uid
          )
        })
        .then(() => {
          this.confirmJoin = false;
          this.$router.push(`/${this.newGroupID}/home`);
        });
    },
    // Search all study groups to find a matching group for the invite code
    queryStudyGroup() {
      if (this.inviteCode !== "") {
        db.collection("study-groups")
          .where("inviteCodes", "array-contains", this.inviteCode)
          .limit(1)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.size !== 0) {
              querySnapshot.forEach(doc => {
                this.newGroupID = doc.id;
                this.confirmJoin = true;
              });
              return true;
            } else {
              console.log("Study Group Not Found!");
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
                });
            } else {
              console.log("didn't run because group not found");
            }
          });
      } else {
        // TODO: Show some sort of error notification
        console.log("You did not enter a code!!");
      }
    }
  },
  created() {
    // Load user data from firebase using the stored uid
    getUserData(this.$store.getters.uid)
      .then(user => {
        this.user = user;
      })
      .catch(error => {
        console.log(eror);
      });

    // Get members list of joined study Groups
    this.$bind(
      "studyGroups",
      db
        .collection("study-groups")
        .where("members", "array-contains", this.$store.getters.uid)
    ).then(studyGroups => {
      this.studyGroups === studyGroups;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.empty {
  background-color: $background-color;
}

.modal-container {
  border-radius: 10px;
}

.modal-btn {
  margin: 4px;
  min-width: 80px;
}

.dashboardBody {
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

#undraw {
  width: 10em;
}
</style>
