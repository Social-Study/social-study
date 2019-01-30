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
    <div v-if="!publicIsLoading && !privateIsLoading">
      <h5 class="text-left">Public Decks</h5>
      <div class="card-container">
        <flashcard-icon
          v-for="(deck,index) in computePublic"
          :key="index"
          :info="deck"
        >
        </flashcard-icon>
      </div>
      <h5 class="text-left">Private Decks</h5>
      <div class="card-container">
        <flashcard-icon
          v-for="(deck,index) in computePrivate"
          :key="index"
          :info="deck"
          :isPrivate="true"
        >
        </flashcard-icon>
      </div>
    </div>
    <div
      v-else
      style="margin-top: 35%;"
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
      privateIsLoading: true,
      publicIsLoading: true,
      publicDecks: [],
      privateDecks: [],
      searchQuery: ""
    };
  },
  created() {
    const groupID = this.$route.params.groupID;
    let publicCollection = db
      .collection("study-groups")
      .doc(groupID)
      .collection("flashcards");

    let privateCollection = db
      .collection("study-groups")
      .doc(groupID)
      .collection("flashcards")
      .doc("private")
      .collection(this.$store.getters.uid);

    // This allows it to auto update
    this.$bind("publicDecks", publicCollection).then(flashcardDecks => {
      this.publicDecks === flashcardDecks;
      // Need to filter out the private document to prevent null errors
      this.publicDecks = this.publicDecks.filter(deck => {
        return deck.id !== "private";
      });
      this.publicIsLoading = false;
    });

    this.$bind("privateDecks", privateCollection).then(flashcardDecks => {
      this.privateDecks === flashcardDecks;
      this.privateIsLoading = false;
    });
  },
  computed: {
    computePublic() {
      // Filter the note list by the query string. Including partial matches.
      // Converted to lowercase to avoid capitalization enforcement
      return this.publicDecks.filter(deck => {
        return deck.title
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    computePrivate() {
      return this.privateDecks.filter(deck => {
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
  // margin: 0 auto;
  // width: 100%;
  // padding: 20px;
  margin: 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 288px));
  grid-auto-rows: 218px;
  justify-content: center;
  transition: all 350ms ease-in;
}
</style>
