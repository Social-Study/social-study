<template>
  <div>
    <!-- Title Bar -->
    <page-title>
      <template slot="center">
        Overview
      </template>
    </page-title>

    <div class="page-content">
      <!-- Calendar Component: Will be replaced -->
      <div class="calendar-container">
        <calendar />
        <div class="date-details">
          The selected day's details will appear here
        </div>
      </div>

      <!-- Displays recent notes and flashcards -->
      <div class="recent-container">
        <div class="notes-container">
          <div class="tile-header">
            <h4>Recent Notes</h4>
            <router-link :to="`/${$route.params.groupID}/notes/`"
              >View All</router-link
            >
          </div>
          <div class="icon-container">
            <div v-if="notesLoading" class="loading loading-lg"></div>
            <note-icon
              v-for="note in recentNotes"
              v-else
              :key="note.id"
              :info="note"
            />
          </div>
        </div>

        <div class="divider-vert"></div>

        <!-- Displays the group's most popular flashcards -->
        <!-- Decide metric (Study Count, Recently Created, Favorited) -->
        <div class="flashcards-container">
          <div class="tile-header">
            <h4>Recent Flashcards</h4>
            <router-link :to="`/${$route.params.groupID}/flashcards/`"
              >View All</router-link
            >
          </div>

          <div class="icon-container">
            <div v-if="flashcardsLoading" class="loading loading-lg"></div>
            <flashcard-icon
              v-for="deck in recentFlashcards"
              v-else
              :key="deck.id"
              :info="deck"
            ></flashcard-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import Calendar from "@/components/Calendar";
import NoteIcon from "@/components/NoteIcon";
import FlashcardIcon from "@/components/flashcards/FlashcardIcon";

import { db } from "@/firebaseConfig";

export default {
  name: "GroupHomePage",
  components: {
    Calendar,
    PageTitle,
    NoteIcon,
    FlashcardIcon
  },
  data() {
    return {
      recentNotes: [],
      notesLoading: false,
      recentFlashcards: [],
      flashcardsLoading: false
    };
  },
  computed: {
    filteredDecks() {
      // Filter the note list by the query string. Including partial matches.
      // Converted to lowercase to avoid capitalization enforcement
      return this.decks.filter(deck => {
        return deck.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    }
  },
  watch: {
    // reload the group data when route changes
    "$route.params.groupID"() {
      this.loadData();
    }
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      this.notesLoading = true;
      this.flashcardsLoading = true;
      // Load recent notes by date last modified
      this.$bind(
        "recentNotes",
        db
          .collection("study-groups")
          .doc(this.$route.params.groupID)
          .collection("notes")
          .doc(this.$store.getters.uid)
          .collection("private")
          .orderBy("lastUpdated", "desc")
          .limit(3)
      ).then(notes => {
        this.recentNotes = notes;
        this.notesLoading = false;
      });
      // Load 4 flashcards... Need to implement more  details on the flashcards
      this.$bind(
        "recentFlashcards",
        db
          .collection("study-groups")
          .doc(this.$route.params.groupID)
          .collection("flashcards")
          .limit(4)
      ).then(flashcards => {
        this.recentFlashcards = flashcards;
        // this.recentFlashcards = this.recentFlashcards.filter(deck => {
        //   return deck.id !== "private";
        // });
        this.flashcardsLoading = false;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/styles.scss";

.page-content {
  display: flex;
  flex-flow: column nowrap;
  height: $page-with-header-height;

  .calendar-container {
    flex: 1;
    display: flex;
    flex-flow: row nowrap;

    .calendar {
      flex: 1;
      margin: 40px;
      max-height: 300px;
      max-width: 280px;
    }

    .date-details {
      flex: 1;
    }
  }

  .recent-container {
    display: flex;
    flex-flow: row nowrap;
    flex: 1;
    text-align: left;

    .notes-container {
      flex: 1;
    }

    .flashcards-container {
      flex: 1;
    }
  }
}

.icon-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;

  #note {
    margin-left: 20px;
  }

  #flashcard {
    margin-left: 20px;
  }
}

.tile-header {
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
  align-items: center;
  padding: 8px;

  h4 {
    font-family: $secondary-font;
    font-weight: 700;
  }
}

.loading.loading-lg {
  margin: 20% auto;
}
</style>
