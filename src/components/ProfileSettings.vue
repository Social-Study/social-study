<template>
  <div class="modal modal-md active">
    <a
      @click="closeAndReset"
      href="#close"
      class="modal-overlay"
      aria-label="Close"
    ></a>

    <div class="modal-container">
      <div class="modal-header">
        <a
          @click="closeAndReset"
          href="#close"
          id="close"
          class="float-right"
          aria-label="Close"
        >
          <i class="fas fa-times"></i>
        </a>

        <div class="modal-title h4">Settings</div>
      </div>
      <div class="modal-body">
        <ul class="tab">
          <li
            @click="activeTab = 1;"
            class="tab-item"
            :class="[activeTab === 1 ? 'active' : '']"
          >
            <a>Profile</a>
          </li>
          <li
            @click="activeTab = 2;"
            class="tab-item"
            :class="[activeTab === 2 ? 'active' : '']"
          >
            <a>Account</a>
          </li>
          <li
            @click="activeTab = 3;"
            class="tab-item"
            :class="[activeTab === 3 ? 'active' : '']"
          >
            <a>Study Groups</a>
          </li>
        </ul>

        <!-- Tab One Content -->
        <div v-if="activeTab === 1">
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Display Name</div>
              <div class="tile-subtitle">
                <input
                  class="form-input"
                  v-model="profileDetails.newName"
                  type="text"
                  :placeholder="user.displayName"
                />
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Profile Picture</div>
              <div class="tile-subtitle">
                Upload a new picture:
                <input
                  class="form-input form-inline"
                  @change="handleFile($event);"
                  style="width: 300px;"
                  accept="image/*"
                  type="file"
                  name=""
                  id=""
                />
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">About You</div>
              <div class="tile-subtitle">
                <textarea
                  @keydown.ctrl.enter="saveChanges"
                  name="bio"
                  rows="3"
                  style="resize: none;"
                  v-model="profileDetails.newBio"
                  :placeholder="userBio"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Two Content -->
        <div v-if="activeTab === 2">
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Email</div>
              <div class="tile-subtitle">
                <input
                  class="form-input"
                  :value="user.email"
                  type="text"
                  placeholder="New Email"
                />
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Password</div>
              <div class="tile-subtitle">
                <div class="form-group">
                  <label
                    class="form-label"
                    for="currentPassword"
                  >Confirm Current Password</label>
                  <input
                    class="form-input"
                    type="password"
                    id="currentPassword"
                    placeholder="Old Password"
                  />
                  <label
                    class="form-label"
                    for="newPassword"
                  >Enter New Password</label>
                  <input
                    class="form-input"
                    type="password"
                    id="newPassword"
                    placeholder="New Password"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Delete Account</div>
              <div class="tile-subtitle">
                <div class="form-group">
                  <label
                    for="deleteBtn"
                    class="form-label text-warning"
                  >This cannot be undone!</label>
                  <button
                    id="deleteBtn"
                    class="btn btn-error"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Three Content -->
        <div v-if="activeTab === 3">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Members</th>
                <th class="text-center">Leave Group</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(group, index) in groupList"
                :key="index"
              >
                <td>{{ group.className }}</td>
                <td>{{ group.membersLength }}</td>
                <td class="button-td">

                  <button
                    @click="leaveGroup(group.groupID);"
                    class="btn btn-error"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="modal-footer">
        <button
          v-if="activeTab !== 3"
          @click="saveChanges"
          class="save-btn btn btn-primary"
        >
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserData, getUserGroups } from "@/scripts/userFuncs";
import { FirebaseConsts, Storage, db } from "@/firebaseConfig";

let picRef = Storage.ref();

export default {
  name: "ProfileSettings",
  props: {
    user: Object,
    photoURL: String
  },
  data() {
    return {
      activeTab: 1,
      profileDetails: {
        newName: "",
        newPhoto: null,
        newBio: ""
      },
      groupList: [],
      userBio: ""
    };
  },
  beforeMount() {
    // Load the user's description from firestore
    getUserData(this.user.uid)
      .then(user => {
        this.userBio = user.description;
      })
      // Catch load user data error
      .catch(error => {
        // console.log("ProfileSettings: " + error);
      });

    this.loadGroups();

    // db.collection("study-groups").where();
  },
  watch: {
    activeTab(newVal) {
      if (newVal === 3) {
        // console.log("reloading groups");
        this.loadGroups();
      }
    }
  },
  methods: {
    closeAndReset() {
      this.activeTab = 1;
      this.$emit("closeSettings");
    },
    loadGroups() {
      getUserGroups(this.user.uid)
        .then(groupList => {
          this.groupList = groupList;
        })
        // Catch group loading error
        .catch(error => {
          // console.log(error);
        });
    },
    leaveGroup(id) {
      // Remove the user from members list of specific study group
      db.collection("study-groups")
        .doc(id)
        .update({
          members: FirebaseConsts.firestore.FieldValue.arrayRemove(
            this.$store.getters.uid
          )
        });
      this.loadGroups();
    },
    saveChanges() {
      if (this.activeTab === 1) {
        if (
          this.profileDetails.newName !== this.user.displayName &&
          this.profileDetails.newName !== ""
        ) {
          // Update the user's auth account
          this.user.updateProfile({
            displayName: this.profileDetails.newName
          });

          // Update the firestore doc for the user
          db.collection("users")
            .doc(this.$store.getters.uid)
            .update({
              displayName: this.profileDetails.newName
            });
        }

        if (this.profileDetails.newPhoto !== null) {
          // Set metadata for image
          var metadata = {
            contentType: "image/jpeg"
          };

          let path = "profile-pictures/" + this.user.uid;

          // Upload new picture
          picRef
            .child(path)
            .put(this.profileDetails.newPhoto, metadata)
            .then(() => {
              picRef
                .child(path)
                .getDownloadURL()
                .then(url => {
                  this.user.updateProfile({
                    photoURL: url
                  });

                  db.collection("users")
                    .doc(this.user.uid)
                    .update({
                      photoURL: url
                    });
                });
            });
        }

        // Create new profile bio in firestore
        if (this.profileDetails.newBio !== "") {
          db.collection("users")
            .doc(this.user.uid)
            .update({
              description: this.profileDetails.newBio
            });
        }

        this.closeAndReset();
      }
    },
    handleFile(event) {
      this.profileDetails.newPhoto = event.target.files[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.modal-container {
  #close {
    color: $secondary;
    i {
      font-size: 24px;
    }
    &:hover {
      color: darken($secondary, 5);
    }
    &:focus {
      outline: none;
    }
  }
}

textarea {
  width: 100%;
}

.modal-header {
  margin: 15px 15px 0 15px;
}

.modal-title {
  font-family: $secondary-font;
  font-weight: 700;
}

.tile-title {
  // padding: 5px;
  margin-top: 15px;
  margin-bottom: 5px;
  font-family: $secondary-font;
}

.tab-item {
  cursor: pointer;
  color: $secondary-light;
  a:hover {
    color: $secondary !important;
  }
  &.active {
    font-weight: 700;
  }
}

.button-td {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  .btn {
    width: 40px;
  }
}
</style>
