<template>
  <div>
    <!-- Title Bar -->
    <page-title>
      <template slot="center">
        Overview
      </template>
    </page-title>

    <div class="page-content">
      <div class="left-right-container">
        <div class="agenda-container">
          <div class="tile-header">
            <h4>Upcoming Events</h4>
            <router-link :to="`/${$route.params.groupID}/agenda/`"
              >View All</router-link
            >
          </div>
          <div
            v-if="agendaLoading"
            id="loading-indicator"
            class="loading loading-lg"
          ></div>

          <div
            v-for="(item, index) in agendaItems"
            v-else
            :key="item.creationDate.toDate().getTime()"
          >
            <agenda-item-date-header
              v-if="showDateHeader(index)"
              :date="item.date.toDate()"
            />
            <!-- :selected="checkSelected(index)" -->
            <agenda-item
              :item="item"
              @itemSelected="handleAgendaSelected(index)"
            />
          </div>
        </div>

        <div class="divider-vert"></div>

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
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import NoteIcon from "@/components/NoteIcon";
import FlashcardIcon from "@/components/flashcards/FlashcardIcon";
import AgendaItem from "@/components/agenda/AgendaItem";
import AgendaItemDateHeader from "@/components/agenda/AgendaItemDateHeader";

import { db } from "@/firebaseConfig";
import { isSameDay } from "date-fns";

export default {
  name: "GroupHomePage",
  components: {
    AgendaItem,
    AgendaItemDateHeader,
    PageTitle,
    NoteIcon,
    FlashcardIcon
  },
  data() {
    return {
      recentNotes: [],
      notesLoading: true,
      recentFlashcards: [],
      flashcardsLoading: true,
      agendaItems: [],
      agendaLoading: true
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
    handleAgendaSelected(index) {
      this.$router.push(
        `/${this.$route.params.groupID}/agenda/${this.agendaItems[index].id}`
      );
    },
    /**
     * Determine if the previous agenda item has the same date as the current
     * index item. (3/15/19 === 3/15/19)
     *
     * This is used to conditionally show the date header only when the dates
     * are different. There will be blocks of items using the same header.
     */
    showDateHeader(index) {
      if (index !== 0) {
        return !isSameDay(
          this.agendaItems[index].date.toDate(),
          this.agendaItems[index - 1].date.toDate()
        );
      } else {
        // The first item will always show the header.
        return true;
      }
    },
    loadData() {
      // Load recent notes by date last modified
      this.$bind(
        "recentNotes",
        db
          .collection("study-groups")
          .doc(this.$route.params.groupID)
          .collection("notes")
          .doc(this.$store.getters.uid)
          .collection("private")
          .orderBy("lastUpdated", "asc")
          .limit(6)
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
          .limit(6)
      ).then(flashcards => {
        this.recentFlashcards = flashcards;
        this.flashcardsLoading = false;
      });

      // Load agenda items?
      this.$bind(
        "agendaItems",
        db
          .collection("study-groups")
          .doc(this.$route.params.groupID)
          .collection("agenda")
          .orderBy("date", "asc")
      ).then(agendaItems => {
        this.agendaItems === agendaItems;
        this.agendaLoading = false;
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

  .left-right-container {
    display: flex;
    flex-flow: row nowrap;
    height: 100%;

    .agenda-container {
      flex: 1;
      height: 100%;
      padding: 0 20px 20px 20px;
      overflow: auto;

      #loading-indicator {
        display: flex;
        flex-flow: column nowrap;
        justify-content: center;
      }
    }

    .divider-vert {
      padding: 0;
    }

    .recent-container {
      display: flex;
      flex-flow: column nowrap;
      flex: 2;
      text-align: left;
      justify-content: center;
      align-items: space-between;
      max-width: 70%;

      .notes-container {
        flex: 1;
      }

      .flashcards-container {
        flex: 1;
      }
    }
  }
}

.icon-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  overflow-y: auto;
  padding-bottom: 100px;

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
