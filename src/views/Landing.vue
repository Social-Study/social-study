<template>
  <div class="landing">
    <div class="info">
      <h1 id="logo">Social Study</h1>
      <p>Social Study is a brand new online study tool for students of all ages</p>
    </div>

    <!-- Login Forms -->
    <div>
      <!-- Toggle between sign in and sign up -->
      <label class="switch">
        <input type="checkbox" v-model="hasAccount">
        <span class="slider round"></span>
      </label>

      <!-- TODO: Use vee-validate to check inputs before sending to server -->
      <!-- Conditional rendering of login or create account prompts -->
      <!-- Login -->
      <div v-show="hasAccount">
        <h2>Sign In</h2>
        <input v-model="email" type="text" placeholder="Email Address" autofocus><br>
        <input v-model="password" type="password" placeholder="Password"><br>
        <button @click="logIn">Log In</button>
      </div>

      <!-- Create new account -->
      <div v-show="!hasAccount">
        <h2>Sign Up</h2>
        <input v-model="userName" type="text" placeholder="Name"><br>
        <input v-model="email" type="text" placeholder="Email Address"><br>
        <input v-model="password" type="password" placeholder="Password"><br>
        <button @click="createAccount">Sign Up</button>
      </div>

      <button @click="logout">Log Out</button><br>
      <button @click="debug">Print User</button><br>
    </div>
  </div>
</template>

<script>
import firebase from "@/firebaseConfig";
// need to import this by itself to get the persistance consts for some reason
import persistance from "firebase";

export default {
  name: "landing",
  data: function() {
    return {
      email: "",
      password: "",
      hasAccount: false,
      userName: "",
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
      firebase
        .auth()
        .setPersistence(persistance.auth.Auth.Persistence.LOCAL)
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
    },
    createAccount: function() {
      // Attempt to create an account
      firebase
        .auth()
        .setPersistence(persistance.auth.Auth.Persistence.LOCAL)
        .then(() => {
          firebase
            .auth()
            .createUserWithEmailAndPassword(this.email, this.password)
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
  }
};
</script>


<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css?family=Pacifico");

#logo {
  font-family: "Pacifico", cursive;
  font-size: 6em;
}

.login {
  margin-top: 40px;
}

input {
  margin: 10px 0;
  width: 20%;
  padding: 15px;
}

button {
  margin-top: 20px;
  width: 10%;
  cursor: pointer;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #2196f3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
