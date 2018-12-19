<template>
  <div class="flashcard-deck">
    <h1 class="deck-title">Software Engineering Terms</h1>
    <h3 class="card-count">5 Cards</h3>
    <h5 class="deck-creator text-gray">Evan Buss</h5>
  </div>
</template>

<script>
export default {
  name: "FlashcardDeck"
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.flashcard-deck {
  cursor: pointer;
  padding: 40px 0px;
  margin: 0 40px 40px 0;
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
  flex: 8;
}

.card-count {
  flex: 1;
}

.deck-creator {
  flex: 1;
}
</style>
