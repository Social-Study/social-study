<template>
  <div>
    <!-- Notification displays when a new code is generated -->
    <notifications
      group="generateInvite"
      position="left top"
    />
    <page-title>
      <template slot="center">Members</template>
    </page-title>
    <div
      v-if="!loading"
      style="display: flex; flex-flow: row nowrap; justify-content: center;"
    >

      <!-- Display card for each member of the Study Group -->
      <transition-group
        name="transition"
        enter-active-class="animated pulse"
        leave-active-class="animated fadeOut"
        appear
        class="content-container"
      >
        <!-- Invite New Member Card -->
        <member-card
          key="addButton"
          @click.native="inviteMember()"
          add
        > </member-card>

        <!-- Show card for each group member -->
        <member-card
          v-for="member in memberDetails"
          :key="member.uid"
          :photoURL="member.photoURL"
          :displayName="member.displayName"
          :owner="member.uid === studyGroup.owner"
        >
        </member-card>
      </transition-group>

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
          <div class="modal-title h5">Generate New Invite</div>

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
              >Generate</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import MemberCard from "@/components/MemberCard";

import { db, FirebaseConsts } from "@/firebaseConfig";
import { getGroupData } from "@/scripts/groupFuncs";
import generateCode from "@/scripts/generateCode";

export default {
  name: "MembersPage",
  components: {
    PageTitle,
    MemberCard
  },
  data() {
    return {
      loading: true,
      memberDetails: [],
      displayModal: false,
      inviteCode: "",
      studyGroup: null
    };
  },
  created() {
    // Load initial group data and save it
    getGroupData(this.$route.params.groupID)
      .then(group => {
        this.studyGroup = group;
      })
      .catch(error => {
        console.log(error);
      });

    // Watch for changes on the document, if there is, set study group to new info
    db.collection("study-groups")
      .doc(this.$route.params.groupID)
      .onSnapshot(snapshot => {
        this.studyGroup = snapshot.data();
        this.getMemberInfo();
      });
  },
  methods: {
    // TODO: Extract this code to an outside file
    copyCode() {
      // When a user copies the code, the code is saved to firebase
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          inviteCodes: FirebaseConsts.firestore.FieldValue.arrayUnion(
            this.inviteCode
          )
        })
        .then(() => {
          this.$notify({
            group: "generateInvite",
            type: "success",
            title: "Invite Code Generated",
            text: "The code has been copied to your clipboard."
          });
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
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";
.modal-container {
  border-radius: 10px;
  .modal-title {
    font-family: $secondary-font;
    font-weight: 700;
  }
}
.content-container {
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 300px));
  grid-auto-rows: 300px;
  justify-content: center;
  padding: 20px;
  transition: all 350ms ease-in;
}
</style>
