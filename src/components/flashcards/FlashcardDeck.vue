<template>
  <div
    class="flashcard-deck"
    @click="goToStudy"
  >
    <h1 class="deck-title">{{title}}</h1>
    <h3 class="card-count">{{cardNum}} Cards</h3>
    <h5 class="deck-creator text-gray">{{creator}}</h5>
  </div>
</template>

<script>
export default {
  name: "FlashcardDeck",
  props: {
    title: String,
    cardNum: Number,
    creator: String,
    creatorUid: String,
    documentID: String
  },
  methods: {
    goToStudy() {
      this.$router.push(
        `/${this.$route.params.groupID}/flashcards/${this.documentID}/study`
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styleVariables.scss";

.flashcard-deck {
  cursor: pointer;
  padding: 40px 0px;
  // margin: 0 0 40px 40px;
  border-radius: 10px;
  width: 400px;
  height: 240px;
  background-color: #e7e7e7;
  box-shadow: $shadow-heavy;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: $shadow-hovered;
  }
}

.deck-title {
  flex: 6;
  font-size: 2em;
  margin: 0;
}

.card-count {
  flex: 1;
  font-size: 1.5em;
}

.deck-creator {
  flex: 1;
  font-size: 1.2em;
}
</style>
