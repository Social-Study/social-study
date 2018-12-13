// These functions all relate to loading firebase data for a specific Study Group

function getGroupData(groupID) {
  return new Promise((resolve, reject) => {
    db.collection("study-groups")
      .doc(groupID)
      .get()
      .then(doc => {
        if (doc.exists) {
          resolve({ id: doc.id, ...doc.data() });
        } else {
          reject("Group not found.");
        }
      });
  });
}

export { getGroupData };
