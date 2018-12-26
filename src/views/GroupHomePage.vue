<template>
  <div style="min-height: 800px;">
    <page-title>
      <template slot="center">
        Home
      </template>
    </page-title>
    <div class="page-content">
      <div class="calendar-container">
        <calendar />
        <div class="date-details">
          The selected day's details will appear here
        </div>
      </div>
      <div
        class="divider-vert"
        style="padding: 0;"
      ></div>
      <div class="recent-container">
        <div class="notes-container">
          <div class="tile-header">
            <h4>Recent Notes</h4>
            <router-link :to="`/${$route.params.groupID}/notes/`">View All</router-link>
          </div>
          <div class="icon-container">
            <div
              v-if="notesLoading"
              class="loading loading-lg"
            ></div>
            <note-icon
              v-else
              @click.native="$router.push(`/${$route.params.groupID}/notes/${note.id}`)"
              v-for="note in recentNotes"
              :info="note"
              :key="note.id"
            />
          </div>
        </div>

        <div class="divider"></div>

        <!-- Displays the group's most popular flashcards -->
        <!-- Decide metric (Study Count, Recently Created, Favorited) -->
        <div class="flashcards-container">
          <div class="tile-header">
            <h4>Recent Flashcards</h4>
            <router-link :to="`/${$route.params.groupID}/flashcards/`">View All</router-link>

          </div>

          <div class="icon-container">
            <div
              v-if="flashcardsLoading"
              class="loading loading-lg"
            ></div>
            <flashcard-deck
              v-else
              v-for="(deck,index) in recentFlashcards"
              :key="index"
              :title="deck.title"
              :cardNum="deck.cardNum"
              :creator="deck.creatorName"
              :creatorUid="deck.uid"
              :documentID="deck.documentID"
            ></flashcard-deck>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";import Calendar from "@/components/Calendar";
import NoteIcon from "@/components/NoteIcon";
import FlashcardDeck from "@/components/flashcards/FlashcardDeck";

import { db } from "@/firebaseConfig";

export default {
  name: "GroupHomePage",
  components: {
    Calendar,
    PageTitle,
    NoteIcon,
    FlashcardDeck
  },
  data() {
    return {
      recentNotes: [],
      notesLoading: false,
      recentFlashcards: [],
      flashcardsLoading: false
    };
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
          .collection("flashcardDecks")
          .limit(4)
      ).then(flashcards => {
        this.recentFlashcards = flashcards;
        this.flashcardsLoading = false;
      });
    }
  },
  watch: {
    // reload the group data when route changes
    "$route.params.groupID"() {
      this.loadData();
    }
  }
};
</script>
<style lang="scss" scoped>
.page-content {
  display: flex;
  flex-flow: row nowrap;
  height: 94%;

  .calendar-container {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;

    .calendar {
      flex: 1;
      margin: 40px auto;
      max-height: 300px;
      max-width: 280px;
    }

    .date-details {
      flex: 1;
    }
  }

  .recent-container {
    display: flex;
    flex-flow: column nowrap;
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
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;

  .note {
    margin: 40px 0px 40px 40px;
  }

  .flashcard-deck {
    padding: 4px;
    height: 150px;
    width: 250px;
    margin: 0px 0px 20px 20px;
    h1.deck-title {
      color: white;
    }
  }
}

.tile-header {
  display: flex;
  flex-flow: row no-wrap;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
}

.loading.loading-lg {
  margin: 20% auto;
}
</style>
