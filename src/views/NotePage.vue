<template>
  <div style="height: 85%;">
    <notifications
      group="notes"
      position="left top"
    />

    <!-- New Header Component -->
    <page-title>
      <template slot="left">
        <input
          class="name-input"
          v-model="noteTitle"
          type="text"
        >
      </template>
      <template slot="right">
        <div class="dropdown split">
          <a
            href="#"
            class="btn btn-action dropdown-toggle"
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

        <a
          target="_blank"
          href="https://www.markdownguide.org/cheat-sheet"
        >
          <button class="btn btn-action split"><i class="fas fa-info"></i></button>
        </a>
        <button
          @click="saveNote"
          class="btn btn-action split"
        ><i class="fas fa-save"></i></button>

      </template>
    </page-title>

    <div class="
      content-container">
      <textarea
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
</template>

<script>
import PageTitle from "@/components/PageTitle";
import { db } from "@/firebaseConfig";

let marked = require("marked");

export default {
  name: "NotePage",
  components: {
    PageTitle
  },
  data() {
    return {
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
      });
  },
  methods: {
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
@import "../styleVariables";
@import "../../node_modules/spectre-markdown.css/dist/markdown.min.css";
@import "../../node_modules/github-markdown-css/github-markdown.css";

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
  // height: 100%;
  margin: 40px;
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
  // min-height: 800px;
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
  // min-height: 800px;
  // max-height: 800px;
  width: 50%;
}
</style>
