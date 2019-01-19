<template>
  <div v-if="!isLoading && !isError">
    <notifications
      group="notes"
      position="left top"
    />

    <!-- New Header Component -->
    <page-title>
      <template slot="left">
        <input
          @input="handleChange()"
          class="name-input"
          v-model="noteTitle"
          type="text"
          maxlength="40"
        >
      </template>
      <template slot="right">
        <!-- Change preview theme css -->
        <div class="dropdown split">
          <a
            href="#"
            class="btn btn-action dropdown-toggle tooltip tooltip-bottom"
            data-tooltip="Preview Style"
            tabindex="0"
          >
            <i
              style="color: #5755d9"
              class="fas fa-palette"
            ></i>
          </a>
          <!-- menu component -->
          <ul class="menu">
            <li @click="markStyleNum = 1">Social Study</li>
            <li @click="markStyleNum = 2">Github</li>
          </ul>
        </div>

        <!-- Open link to markdown cheatsheet in new browser tab -->
        <a
          target="_blank"
          href="https://www.markdownguide.org/cheat-sheet"
        >
          <button class="btn btn-action split"><i class="fas fa-info"></i></button>
        </a>
        <!-- Save the markdown to database -->
        <button
          @click="saveNote"
          class="btn btn-action split"
        ><i class="fas fa-save"></i></button>

      </template>
    </page-title>

    <div class="content-container">
      <textarea
        @input="handleChange()"
        @keydown.ctrl.83.prevent="saveNote"
        v-model="userText"
        class="page-edit"
      >
      </textarea>
      <!-- TODO: Use a computed property for the styling when I add more styles -->
      <div
        v-html="render"
        class="page-view"
        :class="markStyleNum === 1 ? 'markdown-css': '' || markStyleNum === 2 ? 'markdown-body': ''"
      ></div>
    </div>
  </div>
  <div
    v-else-if="!isLoading && isError"
    id="error-container"
  >
    <img
      style="width: 10em;"
      class="undraw-svg"
      src="@/assets/undraw_warning.svg"
      alt="Error Loading Group"
    />
    <h1>Error loading note...</h1>
  </div>
  <div
    v-else
    class="loading loading-lg"
  ></div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import { db } from "@/firebaseConfig";

let marked = require("marked");

export default {
  name: "NotePage",
  components: {
    PageTitle
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      if (confirm("Note is note saved! Are you sure you want to leave?")) {
        next();
      }
    } else {
      next();
    }
  },
  data() {
    return {
      // Set to false when firebase query returns
      isLoading: true,
      // If firebase returns with error, set to true
      isError: false,
      isSaved: true,
      noteTitle: "",
      userText: "",
      markStyleNum: 2
    };
  },
  created() {
    db.collection("study-groups")
      .doc(this.$route.params.groupID)
      .collection("notes")
      .doc(this.$store.getters.uid)
      .collection("private")
      .doc(this.$route.params.noteID)
      .get()
      .then(doc => {
        this.noteTitle = doc.data().title;
        this.userText = doc.data().content;
        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        this.isError = true;
      });
  },
  methods: {
    handleChange() {
      this.isSaved = false;
    },
    saveNote() {
      // TODO: Display notification saying that the document has been saved
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .collection("notes")
        .doc(this.$store.getters.uid)
        .collection("private")
        .doc(this.$route.params.noteID)
        .update({
          title: this.noteTitle,
          lastUpdated: new Date(),
          content: this.userText
        })
        .then(() => {
          this.isSaved = true;
          this.$notify({
            group: "notes",
            type: "success",
            title: "Note saved!",
            text: "The note has been saved successfully."
          });
        });
    }
  },
  computed: {
    render() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: true,
        smartypants: false
      });
      return marked(this.userText);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";
@import "../../../node_modules/spectre-markdown.css/dist/markdown.min.css";
@import "../../../node_modules/github-markdown-css/github-markdown.css";

#error-container {
  max-height: 75%;
  margin-top: 200px;
}

.dropdown > ul.menu {
  left: -70px;
  border-radius: 10px;

  li {
    cursor: pointer;
    border-radius: 5px;
    padding: 5px;
    &:hover {
      background-image: $orange-gradient;
      color: white;
    }
  }
}

.content-container {
  display: inline-block;
  min-height: 844px;
  max-height: 844px;
  padding: 30px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  height: 100%;
}

.page-edit {
  padding: 10px;
  box-shadow: $shadow-hovered;
  border: none;
  display: inline-block;
  height: 100%;
  width: 50%;
  margin-right: 40px;
  background-color: white;
  color: black;
  text-align: left;
  resize: none;
}

.page-view {
  padding: 20px 10px !important;
  box-shadow: $shadow-hovered;
  font-family: "Inter UI";
  background-color: white;
  padding: 0;
  overflow-y: auto;
  text-align: left;
  height: 100%;
  width: 50%;
}
</style>
