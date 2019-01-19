<template>
  <div>
    <page-title>
      <template slot="left">
        <button
          class="btn btn-primary"
          @click="$router.push(`/${$route.params.groupID}/flashcards/create`)"
        >New Deck <i class="fas fa-plus"></i>
        </button>
      </template>
      <template slot="center">Flashcard Collection</template>
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
    <div
      v-if="!isLoading"
      class="card-container"
    >
      <flashcard-icon
        v-for="(deck,index) in filteredDecks"
        :key="index"
        :info="deck"
      >
      </flashcard-icon>
    </div>
    <div
      v-else
      class="loading loading-lg"
    ></div>
  </div>
</template>

<script>
import FlashcardIcon from "@/components/flashcards/FlashcardIcon";
import PageTitle from "@/components/navigation/PageTitle";
import { db } from "@/firebaseConfig";

export default {
  name: "FlashcardCollection",
  components: {
    PageTitle,
    FlashcardIcon
  },
  data() {
    return {
      isLoading: true,
      decks: [],
      searchQuery: ""
    };
  },
  created() {
    const groupID = this.$route.params.groupID;
    let flashcardCollection = db
      .collection("study-groups")
      .doc(groupID)
      .collection("flashcards");

    // This allows it to auto update
    this.$bind("decks", flashcardCollection).then(flashcardDecks => {
      this.decks === flashcardDecks;
      this.isLoading = false;
    });
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
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.card-container {
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 288px));
  grid-auto-rows: 218px;
  justify-content: center;
  padding: 20px;
  transition: all 350ms ease-in;
}
</style>
