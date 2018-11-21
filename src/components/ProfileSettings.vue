<template>
  <div class="modal modal-md active">
    <a @click="$emit('closeSettings')" href="#close" class="modal-overlay" aria-label="Close"></a>
    <div class="modal-container">
      <div class="modal-body">
        <div class="panel">
          <div class="panel-header">
            <div class="panel-title h5">Settings</div>
          </div>
          <nav class="panel-nav">
            <ul class="tab">
              <li @click="activeTab = 1" class="tab-item" :class="[activeTab === 1 ? 'active' : '']">
                <a href="#">Profile</a>
              </li>
              <li @click="activeTab = 2" class="tab-item" :class="[activeTab === 2 ? 'active' : '']">
                <a href="#">Account</a>
              </li>
            </ul>
          </nav>
          <div class="panel-body">
            <!-- Tab One Content -->
            <div v-if="activeTab === 1">
              <div class="tile tile-centered">
                <div class="tile-content text-left">
                  <div class="tile-title text-bold">Display Name</div>
                  <div class="tile-subtitle">
                    <input class="form-input" v-model="profileDetails.newName" type="text" :placeholder="user.displayName">
                  </div>
                </div>
              </div>
              <div class="tile text-left">
                <div class="tile-content">
                  <div class="tile-title text-bold">Profile Picture</div>
                  <div class="tile-subtitle">
                    <span>
                      Current Picture:
                      <Avatar style="margin: 5px;" :user="this.user" />
                      <input class="form-input" @change="handleFile($event)" accept="image/*" type="file" name="" id="">
                    </span>
                  </div>
                </div>
              </div>
              <div class="tile text-left">
                <div class="tile-content">
                  <div class="tile-title text-bold">About You</div>
                  <div class="tile-subtitle">
                    <textarea name="bio" cols="50" rows="3" style="resize: none;" placeholder="Write some details about yourself here"></textarea>
                  </div>
                </div>
              </div>
            </div>

            <!-- Tab Two Content -->
            <div v-if="activeTab === 2">
              <div class="tile tile-center">
                <div class="tile-content text-left">
                  <div class="tile-title text-bold">Email</div>
                  <div class="tile-subtitle"><input class="form-input" :value="user.email" type="text" placeholder="New Email"></div>
                </div>
              </div>
              <div class="tile tile-center">
                <div class="tile-content text-left">
                  <div class="tile-title text-bold">Password</div>
                  <div class="tile-subtitle">
                    <div class="form-group">
                      <label class="form-label" for="currentPassword">Confirm Current Password</label>
                      <input class="form-input" type="password" id="currentPassword" placeholder="Old Password">
                      <label class="form-label" for="newPassword">Enter New Password</label>
                      <input class="form-input" type="password" id="newPassword" placeholder="New Password">
                    </div>
                  </div>
                </div>
              </div>
              <div class="tile tile-center">
                <div class="tile-content text-left">
                  <div class="tile-title text-bold">Delete Account</div>
                  <div class="tile-subtitle">
                    <div class="form-group">
                      <label for="deleteBtn" class="form-label text-warning">This cannot be undone!</label>
                      <button id="deleteBtn" class="btn btn-error">Delete Account</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="panel-footer">
            <button @click="saveChanges" class="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "@/firebaseConfig";
import { FirebaseConsts } from "@/firebaseConfig";
import Avatar from "@/components/Avatar";

let picRef = FirebaseConsts.storage().ref();

export default {
  name: "ProfileSettings",
  components: {
    Avatar
  },
  props: {
    user: Object
  },
  data() {
    return {
      activeTab: 1,
      profileDetails: {
        newName: "",
        newPhoto: null,
        newBio: ""
      }
    };
  },
  methods: {
    saveChanges() {
      if (this.activeTab === 1) {
        if (
          this.profileDetails.newName !== this.user.displayName &&
          this.profileDetails.newName !== ""
        ) {
          this.user.updateProfile({
            displayName: this.profileDetails.newName
          });
        }

        if (this.profileDetails.newPhoto !== null) {
          // Set metadata for image
          var metadata = {
            contentType: "image/jpeg"
          };

          let path =
            "profilePicture/" +
            this.user.uid +
            "_" +
            this.profileDetails.newPhoto.name;

          // Upload new picture
          picRef.child(path).put(this.profileDetails.newPhoto, metadata);
          picRef
            .child(path)
            .getDownloadURL()
            .then(url => {
              this.user.updateProfile({
                photoURL: url
              });
            });
          // TODO: Figure out error checking for this
        }
        this.$emit("closeSettings");
      }
    },
    handleFile(event) {
      this.profileDetails.newPhoto = event.target.files[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.modal-container {
  border-radius: 10px;
  padding: 0;
}
</style>
