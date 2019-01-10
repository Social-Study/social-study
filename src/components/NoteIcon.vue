<template>
  <!-- Note Icon -->
  <div id="note">
    <!-- Title -->
    <h2 id="title">{{info.title}}</h2>
    <div>
      <!-- Created -->
      <p id="created"><i>Created:</i> {{info.creationDate.toDate().toLocaleDateString()}}</p>
      <!-- Modified -->
      <p id="modified"><i>Modified:</i> {{info.lastUpdated.toDate().toLocaleDateString()}}</p>
      <div id="button-container">
        <button
          @click="$emit('delete')"
          id="deleteBtn"
        >Delete</button>
        <button
          @click="$emit('viewNote')"
          id="editBtn"
        >Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoteIcon",
  props: {
    info: {
      type: Object,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styleVariables.scss";

/* Center note on page */
#page-content {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5fa;
}

/* Icon itself */
#note {
  background-color: white;
  height: 288px;
  width: 216px;
  padding: 1em;
  border-radius: 10px;
  box-shadow: 0 6px 15px rgba(36, 37, 38, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

#title {
  font-family: "Montserrat";
  font-weight: 600;
  text-overflow: ellipsis;
  overflow: hidden;
  /* white-space: ; */
  max-width: 10em;
  max-height: 5em;
}

#created,
#modified {
  padding: 0.3em 0 0.3em 0;
  border-radius: 20px;
  border: 1px solid $secondary;
  margin: 10px;
  text-align: center;
  color: $dark;
  font-size: 0.8em;
  font-weight: 500;
}

// Date labels
p > i {
  font-style: normal;
  color: $secondary-light;
  font-weight: 400;
}

#button-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-evenly;
  align-items: center;
}

#deleteBtn {
  cursor: pointer;
  border: none;
  padding: 0.3em;
  background-color: transparent;
  // color: red;
  color: $secondary;
  font-weight: 500;
}

#deleteBtn:hover {
  color: hsl(0, 100%, 85%);
}

#editBtn {
  cursor: pointer;
  border: none;
  border-radius: 5px;
  /* padding: 0.3em 0.5em 0.3em 0.5em; */
  padding: 4px 8px 4px 8px;
  background-color: $primary;
  color: white;
  font-weight: 400;
}

#editBtn:hover {
  background-color: lighten($primary, 10);
}
</style>
