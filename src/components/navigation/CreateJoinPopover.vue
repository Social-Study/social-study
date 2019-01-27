<template>
  <div>
    <div class="popover popover-bottom">
      <button class="btn btn-action"><i class="fas fa-plus"></i></button>
      <div class="popover-container">
        <div class="card">
          <div class="card-body text-bold">
            <button
              @click="$router.push('/dashboard/create')"
              class="btn btn-primary btn-create"
            >Create</button> New Study Group
            <div
              class="divider text-center"
              data-content="OR"
            ></div>
            <div class="empty-action input-group input-inline">
              <input
                @keydown.enter="fetchStudyGroup"
                v-model="inviteCode"
                class="form-input"
                placeholder="Invite Code"
                type="text"
              >
              <button
                @click="fetchStudyGroup"
                class="btn btn-primary input-group-btn"
              >Join</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Class Join Confirmation Modal -->
    <div
      v-if="showModal && inviteGroup !== null"
      class="modal modal-sm active"
    >
      <a
        @click="showModal = false"
        href="#close"
        class="modal-overlay"
        aria-label="Close"
      ></a>
      <div class="modal-container">
        <div class="modal-header">
          <div class="modal-title h5 text-bold text-large">Join {{inviteGroup.className}}?</div>
        </div>
        <div class="modal-body">
          <div class="text-uppercase text-bold text-left text-dark">Instructor</div>
          <div class="text-center text-primary">{{inviteGroup.instructorName}}</div>
          <div class="text-uppercase text-left text-bold text-dark"># of Members</div>
          <div class="text-center text-primary">{{inviteGroup.members.length}}</div>
        </div>
        <div class="modal-footer">
          <button
            @click="showModal=false"
            class="btn modal-btn"
          >Cancel</button>
          <button
            @click="joinStudyGroup"
            class="btn btn-primary modal-btn"
            :class="isLoading ? 'loading' : ''"
          >Join</button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { db, FirebaseConsts } from "@/firebaseConfig";

// 913bd710
export default {
  name: "CreateJoinPopover",
  data() {
    return {
      inviteCode: "",
      // Show/Hide the confirmation modal
      showModal: false,
      // The returned group's detail data
      inviteGroup: null,
      isLoading: false
    };
  },
  methods: {
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
.btn-create {
  margin-right: 20px;
}
.popover-container {
  // top: -10px !important;
  .card {
    border-radius: 10px !important;
  }
}

.modal-container {
  border-radius: 10px;
}

.modal-btn {
  margin-left: 20px;
}
</style>