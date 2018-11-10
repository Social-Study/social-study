<template>
  <div class="landing">

    <!-- Header Section -->
    <header class="navbar">
      <section class="navbar-section">
        <a href="..." class="navbar-brand m-2">Social Study</a>
      </section>

      <section class="navbar-section login-container">
        <input v-validate.disable="'required|email'" name="email" v-model="email" placeholder="Email" type="text" id="" class="form-input mx-1" autofocus>
        <input v-validate.disable="'required|min:6'" name="password" v-model="password" placeholder="Password" type="password" id="" class="form-input mx-1">
        <button @click="logIn" class="btn btn-primary m-1">Log In</button>
      </section>

      <div v-show="error.show" class="toast toast-error">
        <button @click="error.show = !error.show" class="btn btn-clear float-right"></button>
        {{ this.error.message }}
      </div>

    </header>

    <!-- TODO: Use vee-validate to check inputs before sending to server -->

    <!-- Left Block: Information -->
    <div class="container">
      <div class="columns">
        <div class="column col-6">
          <h1 id="logo">Social Study</h1>
          <p>Social Study is an online learning tool for all ages.</p>
        </div>

        <!-- <div class="divider-vert "></div> -->

        <!-- Right Block: Signup -->
        <div class="column col-6">
          <h2>Sign Up</h2>
          <input v-validate.disable="'required|alpha_spaces'" v-model="userName" class="form-input" type="text" name="name" placeholder="Name"><br>
          <input v-validate.disable="'required|email'" v-model="newEmail" type="text" class="form-input" name="email" placeholder="Email Address"><br>
          <input v-validate.disable="'required|min:6'" v-model="newPassword" class="form-input" type="password" name="password" placeholder="Password"><br>
          <button @click="createAccount" class="btn btn-primary mx-1">Sign Up</button>
          <button @click="googleSignIn" class="btn btn-primary mx-1">
            <fa-icon :icon="['fab', 'google']"></fa-icon>
          </button>

          <!-- <button @click="logout">Log Out</button><br>
          <button @click="debug">Print User</button><br> -->
        </div>
      </div>
    </div>

    <!-- Create new account -->

  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
// need to import this by itself to get the persistance constants for some reason
import FirebaseConsts from "firebase";

export default {
  name: "landing",
  data: function() {
    return {
      email: "",
      password: "",
      newEmail: "",
      newPassword: "",
      userName: "",
      error: {
        show: false,
        message: ""
      },
      user: null
    };
  },
  beforeMount: function() {},
  mounted: function() {
    this.user = firebase.auth().currentUser;
  },
  methods: {
    debug: function() {
      // print the current username, shows that the update was successful
      console.log(firebase.auth().currentUser.displayName);
    },
    logout: function() {
      firebase.auth().signOut();
    },
    // TODO: Implement option that allows a user to sign in with their google account
    // TODO: Add options to reset password and setup email confirmation
    logIn: function() {
      // Attempt to log in
      this.$validator.validateAll().then(result => {
        if (!result) {
          // there is a validation error
          // Show the email errors first before showing password errors
          if (this.errors.first("email")) {
            this.error.message = this.errors.first("email");
          } else if (this.errors.first("password")) {
            this.error.message = this.errors.first("password");
          }
          this.error.show = true;
        } else {
          firebase
            .auth()
            .setPersistence(FirebaseConsts.auth.Auth.Persistence.LOCAL)
            .then(() => {
              firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                  this.$router.replace("dashboard");
                })
                .catch(function(error) {
                  alert(error.message);
                });
            })
            .catch(error => {
              alert(error.message);
            });
        }
      });
    },
    createAccount: function() {
      // Attempt to create an account
      this.$validator.validate().then(result => {
        if (!result) {
          console.log("errrs btw");

          if (this.errors.first("name")) {
            this.error.message = this.errors.first("name");
          } else if (this.errors.first("email")) {
            this.error.message = this.errors.first("email");
          } else if (this.errors.first("password")) {
            this.error.message = this.errors.first("password");
          }
          this.error.show = true;
        } else {
          firebase
            .auth()
            .setPersistence(FirebaseConsts.auth.Auth.Persistence.LOCAL)
            .then(() => {
              firebase
                .auth()
                .createUserWithEmailAndPassword(this.newEmail, this.newPassword)
                .then(() => {
                  let user = firebase.auth().currentUser;
                  if (user) {
                    user
                      .updateProfile({
                        displayName: this.userName, //pass displayName from form
                        photoURL: "" //you can pass this empty
                      })
                      .then(() => {
                        //redirect to your post-registration page
                        this.$router.replace("dashboard");
                      })
                      .catch(error => {
                        alert(error.message);
                      });
                  } else {
                    alert(
                      "Unable to change username because I could not retrieve current user"
                    );
                  }
                })
                .catch(function(error) {
                  alert(error.message);
                });
            });
        }
      });
    },
    googleSignIn: function() {
      console.log("Google sign in here");
      let provider = new FirebaseConsts.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          let token = result.credential.accessToken;
          var user = result.user;
          console.log(user.displayName);
        })
        .catch(error => {
          alert(error.message);
        });
    }
  }
};
</script>


<style lang="scss" scoped>
// TODO: put some of these imports in the main css file
@import "../styleVariables.scss";
@import url("https://fonts.googleapis.com/css?family=Pacifico");
@import url("https://rsms.me/inter/inter-ui.css");

* {
  font-family: "Inter UI", monospace;
}

p {
  font-size: 1.5em;
}

.login-container {
  display: flex;
  flex: row;
  justify-content: flex-end;
}

.container {
  margin-top: 15%;
}

.column input {
  max-width: 300px;
  margin: auto;
}

.columns {
  min-height: 100%;
}

.navbar {
  background-image: linear-gradient(-90deg, #5c00fd, #fd007e);
}

.navbar-section input {
  width: 35%;
  margin: 0 100px 0 100px;
}

.navbar-brand {
  font-family: "Pacifico", cursive;
  font-size: 2em;
  color: white;
}

#logo {
  font-family: "Pacifico", cursive;
  font-size: 6em;
}
</style>
