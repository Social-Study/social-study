<template>
  <div>
    <page-title>
      {{$store.getters.activeGroup.details.className}}: Members
    </page-title>
    <div v-if="!loading">
      <!-- Display card for each member of the Study Group -->
      <div class="content-container">
        <!-- TODO: Export members card to a separate component -->
        <member-card
          v-for="(member, index) in memberDetails"
          :key="index"
          :photoURL="member.photoURL"
          :displayName="member.displayName"
        ></member-card>
        <member-card
          @click.native="inviteMember()"
          add
        > </member-card>
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
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import Avatar from "../components/Avatar";
import PageTitle from "../components/PageTitle";
import MemberCard from "../components/MemberCard";

import { db, FirebaseConsts } from "../firebaseConfig";
import { getGroupData } from "../scripts/firebaseFunctions";
import generateCode from "../scripts/generateCode";

export default {
  name: "MembersPage",
  components: {
    Avatar,
    SideBar,
    PageTitle,
    MemberCard
  },
  data() {
    return {
      loading: false,
      memberDetails: [],
      displayModal: false,
      inviteCode: "",
      studyGroup: null
    };
  },
  created() {
    // Watch for changes on the document, if there is, reload the info
    console.log("Created called");
    db.collection("study-groups")
      .doc(this.$store.getters.activeGroup.groupID)
      .onSnapshot(snapshot => {
        this.getMemberInfo();
      });
    this.studyGroup = this.$store.getters.activeGroup.details;
    this.getMemberInfo();
  },
  methods: {
    // TODO: Extract this code to an outside file
    copyCode() {
      // When a user copies the code, the code is saved to firebase
      db.collection("study-groups")
        .doc(this.$store.getters.activeGroup.groupID)
        .update({
          inviteCodes: FirebaseConsts.firestore.FieldValue.arrayUnion(
            this.inviteCode
          )
        });
      this.$refs.invite.select();
      document.execCommand("copy");
    },
    inviteMember() {
      this.inviteCode = generateCode();
      this.displayModal = true;
    },
    getMemberInfo() {
      let counter = this.studyGroup.members.length;
      this.memberDetails = [];

      this.studyGroup.members.forEach(uid => {
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
      console.log(this.memberDetails);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

// Flexbox container to hold all member cards
.content-container {
  margin: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
