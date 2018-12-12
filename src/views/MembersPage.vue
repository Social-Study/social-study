<template>
  <side-bar>
    <div v-if="!loading">
      <h1> {{$store.getters.activeGroup.details.className}} Members</h1>
      <!-- Display card for each member of the Study Group -->
      <div class="content-container">
        <!-- TODO: Export members card to a separate component -->
        <div
          v-for="(member, index) in memberDetails"
          :key="index"
          class="profile-card"
        >
          <div class="gradient-border">
            <Avatar
              class="profile-image"
              :user="{photoURL: member.photoURL, displayName: member.displayName}"
            />
          </div>
          <h1>{{ member.displayName }}</h1>
        </div>

        <!-- <div class="content-container"> -->
        <div
          @click="inviteMember()"
          class="profile-card"
        >
          <div class="gradient-border add">
            <div class="add-button">
              <h1 class="button-icon">+</h1>
            </div>
          </div>
          <h2>Invite Member</h2>
        </div>
        <!-- </div> -->
      </div>
    </div>
    <div
      v-else
      class="loading loading-lg"
    ></div>

    <!-- Display Invite Code Modal -->
    <div
      v-show="displayModal"
      class="modal modal-sm active"
      id="modal-id"
    >
      <a
        @click="displayModal = false"
        href="#"
        class="modal-overlay"
        aria-label="Close"
      ></a>
      <div class="modal-container">
        <div class="modal-header">
          <a
            href="#"
            @click="displayModal = false"
            class="btn btn-clear float-right"
            aria-label="Close"
          ></a>
          <div class="modal-title h5">Study Group Invite Code</div>
        </div>
        <div class="modal-body">
          <div class="content">
            <div class="input-group">
              <input
                v-model="inviteCode"
                ref="invite"
                type="text"
                class="form-input"
              >
              <button
                @click="copyCode"
                class="btn btn-primary input-group-btn"
              >Copy Code</button>
            </div>
          </div>
        </div>
      </div>
    </div>

  </side-bar>
</template>

<script>
import SideBar from "../components/SideBar";
import Avatar from "../components/Avatar";
import { db, FirebaseConsts } from "../firebaseConfig";
import generateCode from "../scripts/generateCode";
export default {
  name: "MembersPage",
  components: {
    Avatar,
    SideBar
  },
  data() {
    return {
      loading: true,
      memberIDs: [],
      memberDetails: [],
      displayModal: false,
      inviteCode: ""
    };
  },
  methods: {
    // TODO: Extract this code to an outside file
    copyCode() {
      // Allows user to copy the invite code on button click
      this.$refs.invite.select();
      document.execCommand("copy");
    },
    inviteMember() {
      console.log("invite function");
      this.inviteCode = generateCode();
      db.collection("study-groups")
        .doc(this.$store.getters.activeGroup.groupID)
        .update({
          inviteCodes: FirebaseConsts.firestore.FieldValue.arrayUnion(
            this.inviteCode
          )
        });
      this.displayModal = true;
    },
    getMemberInfo() {
      let counter = this.memberIDs.length;
      this.memberIDs.forEach(uid => {
        db.collection("users")
          .where("uid", "==", uid)
          .limit(1)
          .get()
          .then(docSnapshot => {
            if (docSnapshot.size == 1) {
              counter--;
              this.memberDetails.push(docSnapshot.docs[0].data());
              if (counter == 0) {
                this.loading = false;
              }
            }
          });
      });
    }
  },
  created() {
    this.memberIDs = this.$store.getters.activeGroup.details.members;
    this.ownerID = this.$store.getters.activeGroup.details.owner;
    this.getMemberInfo();
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

// Flexbox container to hold all member cards
.content-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

// Individual info card
.profile-card {
  cursor: pointer;
  height: 300px;
  width: 300px;
  margin: 0 20px 20px 0px;
  border-radius: 16px;
  background-color: white;
  box-shadow: $shadow;

  &:hover {
    box-shadow: $shadow-hovered;
  }
}

// gradient background around border
.gradient-border {
  margin: 30px auto;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-image: $blue-gradient;
}

// Change the gradient color for the add member button
.add {
  background-image: $nav-gradient;
}

// Icon on the new members button
.button-icon {
  text-align: center;
  font-size: 144px;
  font-weight: 600;
  background: $nav-gradient;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  bottom: 25px;
  position: relative;
  vertical-align: center;
}

// Circle background between the gradient and add icon
.add-button {
  position: relative;
  top: 10px;
  left: 10px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: #bebebe;
}

// Image on top of the gradient background
.profile-image {
  position: relative;
  top: 10px;
  width: 140px;
  height: 140px;
  font-size: 60px;
}
</style>
