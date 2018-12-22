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
    </page-title>
    <div class="card-container">
      <flashcard-deck
        v-for="(deck,index) in decks"
        :key="index"
        :title="deck.title"
        :cardNum="deck.cardNum"
        :creator="deck.creatorName"
        :creatorUid="deck.uid"
        :documentID="deck.documentID"
      ></flashcard-deck>
    </div>
  </div>
</template>

<script>
import FlashcardDeck from "@/components/FlashcardDeck";
import PageTitle from "../components/PageTitle";
import { db } from "../firebaseConfig";

export default {
  name: "FlashcardCollection",
  components: {
    PageTitle,
    FlashcardDeck
  },
  data() {
    return {
      decks: []
    };
  },
  created() {
    const groupID = this.$route.params.groupID;
    let flashcardCollection = db
      .collection("study-groups")
      .doc(groupID)
      .collection("flashcardDecks");

    // This allows it to auto update
    this.$bind("decks", flashcardCollection).then(flashcardDecks => {
      this.decks === flashcardDecks;
    });
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

// Flexbox container to hold all member cards
.card-container {
  margin: auto;
  width: 82%;
  margin-top: 40px;
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-items: center;
}
</style>
