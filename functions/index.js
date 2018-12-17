const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp({
  apiKey: "AIzaSyBm8Y6ihxnlsTdvxbQ11X2owrg-C40Hon4",
  authDomain: "social-study-f3af2.firebaseapp.com",
  databaseURL: "https://social-study-f3af2.firebaseio.com",
  projectId: "social-study-f3af2",
  storageBucket: "social-study-f3af2.appspot.com",
  messagingSenderId: "265403435232"
});
const firestore = admin.firestore();

exports.removeOldInvites = functions.firestore
  .document("/study-groups/{groupID}")
  .onUpdate((snap, context) => {
    // The Invite Codes List has changed in some way
    if (snap.after.data().inviteCodes !== snap.before.data().inviteCodes) {
      console.log("Invite Code List Changed");
      console.log("GroupID: " + context.params.groupID);
      // firestore.collection("study-groups").doc(context.params.groupID).
      // TODO: Implement logic to check details of inviteTimes and see if they are older than 24 hours
      // Need to redo all the existing study groups before that...
    }
  });
