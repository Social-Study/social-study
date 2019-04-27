<!-- SCI ID: 011 -->
<!-- Name: NotesCollection -->
<!-- Version: 1.1 -->
<template>
  <div>
    <page-title>
      <template slot="left">
        <!-- Show a popover menu when the user chooses to create a new note -->
        <div class="popover popover-right">
          <button
            class="btn btn-primary"
            :class="loadingNewNote ? 'loading' : ''"
            @keydown.enter="createNote"
            @click="createNote"
          >
            Create Note
          </button>
        </div>
      </template>
      <template slot="center">
        Private Notes Collection
      </template>
      <template slot="right">
        <div class="has-icon-left">
          <input
            v-model="searchQuery"
            type="text"
            class="search-input"
            placeholder="Search by Title"
          />
          <i class="form-icon fas fa-search"></i>
        </div>
      </template>
    </page-title>
    <!-- In the future this will hold other things like the sort buttons, etc. -->

    <div
      v-if="!isLoading"
      class="content-container"
    >
      <note-icon
        v-for="note in filteredNotes"
        :key="note.id"
        :info="note"
      />
    </div>
    <div
      v-else
      class="loading loading-lg"
    ></div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import NoteIcon from "@/components/NoteIcon";

import { db } from "@/firebaseConfig";

let notesRef;

export default {
  name: "NotesCollection",
  components: {
    PageTitle,
    NoteIcon
  },
  data() {
    return {
      isLoading: true,
      notesList: [],
      noteTitle: "",
      searchQuery: "",
      loadingNewNote: false
    };
  },
  computed: {
    filteredNotes() {
      // Filter the note list by the query string. Including partial matches.
      // Converted to lowercase to avoid capitalization enforcement
      return this.notesList.filter(note => {
        return note.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    }
  },
  created() {
    // Load all user's notes on page load
    notesRef = db
      .collection("study-groups")
      .doc(this.$route.params.groupID)
      .collection("notes")
      .doc(this.$store.getters.uid);

    this.$bind("notesList", notesRef.collection("private")).then(notesList => {
      this.notesList === notesList;
      this.isLoading = false;
    });
  },
  methods: {
    createNote() {
      // Create a new note
      this.loadingNewNote = true;
      let initDate = new Date();
      notesRef
        .collection("private")
        .add({
          title: 'Untitled Note',
          creationDate: initDate,
          lastUpdated: initDate,
          content: "# Enter your note here"
        })
        .then(note => {
          // Get the note's ID and save it in the note itself.
          notesRef
            .collection("private")
            .doc(note.id)
            .update({
              id: note.id
            })
            .then(() => {
              this.loadingNewNote = false;
              this.$router.push(
                `/${this.$route.params.groupID}/notes/${note.id}`
              );
            });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.content-container {
  margin: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 216px));
  grid-auto-rows: 288px;
  justify-content: center;
  transition: all 350ms ease-in;
}
</style>
