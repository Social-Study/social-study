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
const firestore = new admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Date util library
const dateFNS = require("date-fns");

exports.removeExpiredEvents = functions.firestore
  .document("/study-groups/{groupID}/agenda/{documentID}")
  .onCreate((snap, context) => {
    let groupID = context.params.groupID;

    firestore
      .collection("study-groups")
      .doc(groupID)
      .collection("agenda")
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          if (dateFNS.isPast(doc.data().date.toDate())) {
            deleteDocument(doc.id, groupID);
            console.log("past event found!");
          }
          console.log("not a past event");
        });
        return null;
      })
      .catch(error => {
        console.error("this is the error catcher " + error);
      });
  });

function deleteDocument(id, groupID) {
  firestore
    .collection("study-groups")
    .doc(groupID)
    .collection("agenda")
    .doc(id)
    .delete()
    .catch(error => {
      console.error(error);
    });
}
