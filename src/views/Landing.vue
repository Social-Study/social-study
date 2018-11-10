<template>
  <div class="landing">

    <!-- Header Section -->
    <header class="navbar">
      <section class="navbar-section">
        <a href="..." class="navbar-brand m-2">Social Study</a>
      </section>

      <!-- <section class="navbar-section "> -->
      <form class="navbar-section login-container" @submit.prevent method="" data-vv-scope="login">
        <input v-validate.disable="'required|email'" name="email" v-model="email" placeholder="Email" type="text" id="" class="form-input mx-1" autofocus>
        <input v-validate.disable="'required|min:6'" name="password" v-model="password" placeholder="Password" type="password" id="" class="form-input mx-1">
        <button @click="logIn" class="btn btn-primary m-1">Log In</button>
      </form>
      <!-- </section> -->
    </header>

    <div v-show="error.show" class="toast toast-error">
      <button @click="error.show = !error.show" class="btn btn-clear float-right"></button>
      {{ this.error.message }}
    </div>

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
          <form @submit.prevent data-vv-scope="signup">
            <input v-validate.disable="'required|alpha_spaces'" v-model="userName" class="form-input" type="text" name="name" placeholder="Name"><br>
            <input v-validate.disable="'required|email'" v-model="newEmail" type="text" class="form-input" name="email" placeholder="Email Address"><br>
            <input v-validate.disable="'required|min:6'" v-model="newPassword" class="form-input" type="password" name="password" placeholder="Password"><br>
            <button @click="createAccount" class="btn btn-primary mx-1">Sign Up</button>
            <button @click="googleSignIn" class="btn btn-primary mx-1">
              <fa-icon :icon="['fab', 'google']"></fa-icon>
            </button>
          </form>

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
// Constant objects; Used for GetAuthTypeGoogle and Persistence
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
      this.$validator.validateAll("login").then(result => {
        if (!result) {
          // there is a validation error, display them in order
          if (this.errors.has("login.email")) {
            this.error.message = this.errors.first("login.email");
          } else if (this.errors.first("login.password")) {
            this.error.message = this.errors.first("login.password");
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
      this.$validator.validateAll("signup").then(result => {
        if (!result) {
          console.log(this.errors);
          if (this.errors.first("signup.name")) {
            this.error.message = this.errors.first("signup.name");
          } else if (this.errors.first("signup.email")) {
            this.error.message = this.errors.first("signup.email");
          } else if (this.errors.first("signup.password")) {
            this.error.message = this.errors.first("signup.password");
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
                    // TODO: change all alerts to error messages
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
      // TODO: Try out redirection instead of popup, works better for mobile
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
@import "../styleVariables.scss";

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
  background-image: $main-gradient;
  padding: 0px 10px;
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
