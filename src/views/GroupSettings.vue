<!-- SCI ID: 004 -->
<!-- Name: GroupSettings -->
<!-- Version: 1.0 -->
<template>
  <div v-if="userAuthorized && !isLoading">
    <page-title>
      <template slot="center">Study Group Admin Settings</template>
      <template
        slot="right"
        @buttonClicked="deleteGroup"
      >
        <confirm-button>
          <template v-slot:title>
            Delete Group?
          </template>
          <template v-slot:body>
            This will delete the group and all of its content. Consider
            transferring ownership and leaving instead.
          </template>
          <template v-slot:button-text>
            Yes, Delete the Group
          </template>
        </confirm-button>
      </template>
    </page-title>
    <notifications
      group="save"
      position="left top"
    />
    <div class="container">
      <div class="columns">
        <div class="column col-5 col-mx-auto col-xl-10">
          <div class="group-details">
            <h2>Edit Group Details</h2>

            <form
              v-if="!loading.details"
              action=""
              class="col-12 form-horizontal"
            >
              <!-- Class Name Input -->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Class Name</label>
                <input
                  v-model="details.className"
                  class="col-9 form-input"
                  type="text"
                  placeholder="Class Name"
                />
              </div>

              <!-- Course Code Input (Optional) -->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Course Code</label>
                <input
                  v-model="details.courseCode"
                  class="col-9 form-input"
                  type="text"
                  placeholder="Course Code"
                />
              </div>

              <!-- Class Instructor Input -->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Instructor Name</label>
                <input
                  v-model="details.instructorName"
                  class="col-9 form-input"
                  type="text"
                  placeholder="Instructor Name"
                />
              </div>

              <!-- Class Meeting Location Input -->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Meeting Location</label>
                <input
                  v-model="details.location"
                  class="col-9 form-input"
                  type="text"
                  placeholder="Meeting Location"
                />
              </div>

              <!-- Class Meeting Time Input -->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Meeting Time</label>
                <div
                  id="time-group"
                  class="col-9"
                >
                  <flat-pickr
                    v-model="details.meetingTime[0]"
                    :config="config"
                    class="form-input"
                    style="margin-right: 10px;"
                    placeholder="Time"
                  />
                  -
                  <flat-pickr
                    v-model="details.meetingTime[1]"
                    :config="config"
                    class="form-input"
                    style="margin-left: 10px;"
                    placeholder="Time"
                  />
                </div>
              </div>

              <!-- Meeting Days -->
              <div class="form-group day-selector">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Meeting Days</label>
                <div class="col-9 btn-group btn-group-block">
                  <button
                    :class="details.meetingDays.monday ? 'active' : ''"
                    class="btn btn-block"
                    @click.prevent="toggle('monday')"
                  >
                    Mon
                  </button>
                  <button
                    :class="details.meetingDays.tuesday ? 'active' : ''"
                    class="btn btn-block"
                    @click.prevent="toggle('tuesday')"
                  >
                    Tue
                  </button>
                  <button
                    :class="details.meetingDays.wednesday ? 'active' : ''"
                    class="btn btn-block"
                    @click.prevent="toggle('wednesday')"
                  >
                    Wed
                  </button>
                  <button
                    :class="details.meetingDays.thursday ? 'active' : ''"
                    class="btn btn-block"
                    @click.prevent="toggle('thursday')"
                  >
                    Thu
                  </button>
                  <button
                    :class="details.meetingDays.friday ? 'active' : ''"
                    class="btn btn-block"
                    @click.prevent="toggle('friday')"
                  >
                    Fri
                  </button>
                </div>
              </div>

              <!-- Website URL (Optional) -->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Course Website</label>
                <input
                  v-model="details.url"
                  class="col-9 form-input"
                  type="url"
                  placeholder="Optional Website URL"
                />
              </div>

              <!-- Study Group Description (Optional-->
              <div class="form-group">
                <label
                  class=" col-3 form-label"
                  for="input-example-1"
                >Group Description</label>
                <textarea
                  v-model="details.description"
                  class="col-9 form-input"
                  type="url"
                  placeholder="Optional Description"
                  style="resize: none;"
                />
                </div>
            </form>
            <div v-else class="loading loading-lg"></div>
            <div id="btn-container">
              <button
                v-if="!loading.details"
                id="save-btn"
                class="btn btn-primary "
                @click="saveData"
              >
                Save Changes <i class="fas fa-save"></i>
              </button>
            </div>
          </div>
        </div>
        <div class="column col-6 col-xl-12">
          <div class="columns">
            <div class="group-details column col-10 col-mx-auto">
              <h2>Active Invite Codes</h2>
              <table v-if="!loading.codes" class="table table-hover">
                <thead>
                  <tr>
                    <th style="width: 95%;">Code</th>
                    <th class="text-center">Revoke?</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="code in inviteCodes" :key="code">
                    <td style="width: 95%;">{{ code }}</td>
                    <td class="button-td">
                      <button
                        class="btn btn-action btn-error"
                        @click="removeCode(code)"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="loading loading-lg"></div>
            </div>
            <div class="group-details column col-10  col-mx-auto">
              <h2>Study Group Members</h2>
              <table v-if="!loading.members" class="table table-hover">
                <thead>
                  <tr>
                    <th style="width: 95%;">Name</th>
                    <th class="text-center">Remove?</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- Show all members but you; the admin -->
                  <tr v-for="member in membersWithoutYou" :key="member.uid">
                    <td style="width: 95%;">{{ member.displayName }}</td>
                    <td class="button-td">
                      <button
                        class="btn btn-action btn-error"
                        @click="removeMember(member.uid)"
                      >
                        <i class="fas fa-times"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div v-else class="loading loading-lg"></div>
            </div>
            <div class="group-details column col-10  col-mx-auto">
              <h2>Transfer Group Ownership</h2>
              <p id="info">Choose another member to manage the Study Group.</p>
              <div v-if="!loading.members" class="transfer-group input-group">
                <select v-model="selected" class="form-select">
                  <option
                    v-for="member in membersWithoutYou"
                    :key="member.uid"
                    :value="member.uid"
                    >{{ member.displayName }}
                  </option>
                </select>
                <button
                  class="btn btn-primary input-group-btn"
                  @click="changeOwner"
                >
                  Transfer
                </button>
              </div>
              <div v-else class="loading loading-lg"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- TODO: Craft error landing page -->
  <h1 v-else-if="!isLoading && !userAuthorized">WTF ARE YOU DOING HERE</h1>
  <div v-else class="loading loading-lg"></div>
</template>

<script>
/**
 *  Owner - Group Privledges
 *
 *  Change Group Information Data
 *  Manage Group Member List
 *  Manage active invite codes
 *  Transfer Ownership ?
 *  Delete Group
 */
import { checkOwner } from "@/scripts/groupFuncs";
import { db, FirebaseConsts } from "@/firebaseConfig";
import PageTitle from "@/components/navigation/PageTitle";
import ConfirmButton from "@/components/ConfirmButton";

import flatPickr from "vue-flatpickr-component";
import "flatpickr/dist/flatpickr.css";

export default {
  name: "GroupSettings",
  components: {
    ConfirmButton,
    PageTitle,
    flatPickr
  },
  data() {
    return {
      config: {
        dateFormat: "h:i K",
        enableTime: true,
        noCalendar: true
      },
      isLoading: true,
      userAuthorized: false,
      loading: {
        details: true,
        codes: true,
        members: true
      },
      // Group Details Bindings
      details: {
        className: "",
        courseCode: "",
        instructorName: "",
        location: "",
        meetingTime: [],
        meetingDays: {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false
        },
        url: "",
        description: ""
      },
      inviteCodes: [],
      memberUID: [],
      memberDetails: [],
      selected: ""
    };
  },
  computed: {
    // Returns the member's list without you
    membersWithoutYou() {
      return this.memberDetails.filter(member => {
        return member.uid !== this.$store.getters.uid;
      });
    }
  },
  created() {
    this.checkAuth();
    this.loadData();
  },
  methods: {
    deleteGroup() {
      // db.collection("study-groups").doc(this.$route.params.groupID).delete();
      // TODO: Work out deletion logic to delete group and all subcollections
      // Have to manually find and delete subcollections
    },
    changeOwner() {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          owner: this.selected
        })
        .then(() => {
          this.$router.go(-1);
        });
    },
    // Verify that the user is the owner before showing admin settings
    checkAuth() {
      checkOwner(this.$store.getters.uid, this.$route.params.groupID)
        .then(() => {
          this.userAuthorized = true;
          this.isLoading = false;
        })
        .catch(() => {
          this.isLoading = false;
        });
    },
    saveData() {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          className: this.details.className,
          courseCode: this.details.courseCode,
          instructorName: this.details.instructorName,
          location: this.details.location,
          meetingTime: this.details.meetingTime,
          meetingDays: this.getDaysArray(this.details.meetingDays),
          websiteURL: this.details.url,
          extraInfo: this.details.description
        })
        .then(() => {
          this.$notify({
            group: "save",
            type: "success",
            title: "Changes Saved",
            text: "All details successfully saved!"
          });
        });
    },
    getDaysArray() {
      let arr = [];
      Object.keys(this.details.meetingDays).forEach(key => {
        if (this.details.meetingDays[key] === true) {
          arr.push(key.charAt(0).toUpperCase() + key.slice(1));
        }
      });
      return arr;
    },
    loadData() {
      // Get all data from firestore to populate the form
      this.loading;
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .get()
        .then(doc => {
          this.loading.codes = false;
          this.loading.details = false;
          let data = doc.data();
          this.details = {
            className: data.className,
            courseCode: data.courseCode,
            instructorName: data.instructorName,
            location: data.location,
            meetingTime: data.meetingTime,
            url: data.websiteURL,
            description: data.extraInfo,
            meetingDays: this.parseDays(data.meetingDays)
          };
          this.memberUID = data.members;
          this.inviteCodes = data.inviteCodes;
        })
        .then(() => {
          let counter = this.memberUID.length;
          this.memberDetails = [];
          this.memberUID.forEach(uid => {
            db.collection("users")
              .where("uid", "==", uid)
              .limit(1)
              .get()
              .then(docSnapshot => {
                if (docSnapshot.size == 1) {
                  counter--;
                  this.memberDetails.push(docSnapshot.docs[0].data());
                  if (counter == 0) {
                    this.loading.members = false;
                  }
                }
              });
          });
        })
        .catch(error => {
          // console.log(error);
        });
    },
    parseDays(days) {
      // Generate date object for the day picker from an array of day names
      let parsedDays = {};
      days.forEach(element => {
        parsedDays[element.toLowerCase()] = true;
      });
      return { ...this.details.meetingDays, ...parsedDays };
    },
    removeMember(uid) {
      // Remove a member from the study group
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          members: FirebaseConsts.firestore.FieldValue.arrayRemove(uid)
        });
      this.memberDetails = this.memberDetails.filter(obj => {
        return obj.uid !== uid;
      });
    },
    // Deactivate a study group invite code
    removeCode(code) {
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .update({
          inviteCodes: FirebaseConsts.firestore.FieldValue.arrayRemove(code)
        });
      this.inviteCodes = this.inviteCodes.filter(obj => {
        return obj !== code;
      });
    },
    // Toggle the day on or off (day selector buttons)
    toggle(key) {
      this.details.meetingDays[key] = !this.details.meetingDays[key];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles";

#save-btn {
  margin: 20px 0 20px 0;
  i {
    color: $secondary-light;
  }
}

#time-group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;

  .form-input {
    width: 150px;
  }
}

.container {
  margin-top: 40px;
}

.button-td {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.group-details {
  cursor: pointer;
  padding: 0;
  background-color: white;
  margin-bottom: 40px;
  h2 {
    font-family: $secondary-font;
    font-weight: 700;
    color: $secondary;
    padding: 5px;
    font-size: 32px;

    // Create bottom gradient border without <hr> element
    background-image: none, $orange-gradient;
    background-size: 100% 1px;
    background-position: 0% 0%, 0% 100%;
    background-repeat: no-repeat;
  }

  &:hover {
    box-shadow: $shadow-hovered;
  }

  form {
    padding: 0 30px 16px 30px;
  }
  table {
    margin: auto;
    width: 95%;
    margin: 0 auto 10px auto;
  }

  #info {
    color: $secondary-light;
  }
}

.transfer-group {
  width: 50%;
  margin: 0 auto 40px auto;
}
</style>
