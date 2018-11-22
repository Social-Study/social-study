<template>
  <div class="modal modal-md active">
    <a @click="$emit('closeSettings')" href="#close" class="modal-overlay" aria-label="Close"></a>

    <div class="modal-container">
      <div class="modal-header">
        <a @click="$emit('closeSettings')" href="#close" class="btn btn-clear float-right" aria-label="Close"></a>

        <div class="modal-title h4">Settings</div>
      </div>
      <div class="modal-body">

        <ul class="tab">
          <li @click="activeTab = 1" class="tab-item" :class="[activeTab === 1 ? 'active' : '']">
            <a href="#">Profile</a>
          </li>
          <li @click="activeTab = 2" class="tab-item" :class="[activeTab === 2 ? 'active' : '']">
            <a href="#">Account</a>
          </li>
        </ul>

        <!-- Tab One Content -->
        <div v-if="activeTab === 1">
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Display Name</div>
              <div class="tile-subtitle">
                <input class="form-input" v-model="profileDetails.newName" type="text" :placeholder="user.displayName">
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Profile Picture</div>
              <div class="tile-subtitle">
                Current Picture:
                <Avatar class="form-inline" style="margin: 10px;" :user="this.user" />
                <input class="form-input form-inline" @change="handleFile($event)" style="width: 300px;" accept="image/*" type="file" name="" id="">
              </div>
            </div>
          </div>
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">About You</div>
              <div class="tile-subtitle">
                <textarea @keydown.ctrl.enter="saveChanges" name="bio" cols="53" rows="3" style="resize: none;" v-model="profileDetails.newBio" :placeholder="userBio"></textarea>
              </div>
            </div>
          </div>
        </div>

        <!-- Tab Two Content -->
        <div v-if="activeTab === 2">
          <div class="tile">
            <div class="tile-content text-left">
              <div class="tile-title text-bold">Email</div>
              <div class="tile-subtitle"><input class="form-input" :value="user.email" type="text" placeholder="New Email"></div>
            </div>
          </div>
          <div class="tile">
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
          <div class="tile">
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

      <div class="modal-footer">
        <button @click="saveChanges" class="btn btn-primary">
          Save Changes
        </button>
      </div>
    </div>
  </div>
</template>

<script>
// import firebase from "@/firebaseConfig";
import { Storage, db, FirebaseConsts } from "@/firebaseConfig";
import Avatar from "@/components/Avatar";

let picRef = Storage.ref();

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
      },
      userBio: "",
      users: []
    };
  },
  firestore() {
    return {
      users: db.collection("users")
    };
  },
  beforeMount() {
    // Get existing user bio to use as placeholder in textarea
    db.collection("users")
      .doc(this.user.uid)
      .get()
      .then(doc => {
        if (doc.exists) {
          return doc.data().description;
        } else {
          return "";
        }
      })
      .then(value => {
        this.userBio = value;
      });
    // .then(querySnapShot => {
    //   querySnapShot.forEach(doc => {
    //     this.userBio = doc.data().description;
    //   });
    // });
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
                });
            });
          // TODO: Figure out error checking for this
        }

        // Create new profile bio in firestore
        if (this.profileDetails.newBio !== "") {
          db.collection("users")
            .doc(this.user.uid)
            .set({
              uid: this.user.uid,
              description: this.profileDetails.newBio,
              lastUpdated: FirebaseConsts.firestore.FieldValue.serverTimestamp()
            });
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
}

.tile-title {
  padding: 5px;
}
</style>
