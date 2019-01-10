<template>
  <div>
    <page-title>
      <template slot="left">
        <!-- Show a popover menu when the user chooses to create a new note -->
        <div class="popover popover-right">
          <button class="btn btn-primary">New Note <i class="fas fa-plus"></i></button>
          <div
            style="margin-top: 20px;"
            class="popover-container"
          >
            <div class="card">
              <div class="card-header">
                Enter a title for your new note:
              </div>
              <div class="card-body">
                <input
                  @keydown.enter="createNote"
                  v-model="noteTitle"
                  type="text"
                  class="form-input"
                >
              </div>
              <div class="card-footer">
                <button
                  @click="createNote"
                  class="btn btn-primary"
                  :class="loadingNewNote ? 'loading' : ''"
                >Create Note</button>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template slot="center">
        Private Notes Collection
      </template>
      <template slot="right">
        <div class="has-icon-left">
          <input
            type="text"
            class="form-input"
            placeholder="Search by Title"
            v-model="searchQuery"
          >
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
        :info="note"
        :key="note.id"
        @delete="deleteNote(note.id)"
        @viewNote="$router.push(`/${$route.params.groupID}/notes/${note.id}`)"
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
  created() {
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
  methods: {
    createNote() {
      // Create a new note
      this.loadingNewNote = true;
      let initDate = new Date();
      notesRef
        .collection("private")
        .add({
          title: this.noteTitle,
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
    },
    deleteNote(id) {
      // TODO: Add some sort of confirmation before deleting
      db.collection("study-groups")
        .doc(this.$route.params.groupID)
        .collection("notes")
        .doc(this.$store.getters.uid)
        .collection("private")
        .doc(id)
        .delete();
    }
  }
};
</script>

<style lang="scss" scoped>
.popover-container {
  top: 60px !important;

  .card {
    border-radius: 10px !important;
  }
}

// .content-container {
//   margin: 40px 40px;
//   display: flex;
//   flex-flow: row wrap;
//   justify-content: flex-start;
// }

.content-container {
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 216px));
  grid-auto-rows: 288px;
  justify-content: center;
  padding: 20px;
  transition: all 350ms ease-in;
}
</style>
