<template>
  <div>

    <div id="container">
      <div
        id="deck"
        v-for="deck in decks"
        :key="deck.name"
        @click="toggleSelected(deck)"
        :class="deck.selected ? 'selected': ''"
      >
        <div id="deck-details">
          {{deck.name}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// TODO: Load flashcards from database
// TODO: Split flashcards into public and private sections
// TODO: Figure out how to emit the selected flashcards

export default {
  name: "DeckSelector",
  data() {
    return {
      decks: [
        { name: "deck1", selected: false },
        { name: "deck2", selected: false },
        { name: "deck3", selected: false }
      ]
      // selectedDecks: [true, true, false, false, false]
    };
  },
  methods: {
    toggleSelected(deck) {
      // TODO: Add question limit checks when loading actual data.
      deck.selected = !deck.selected;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#container {
  margin: 20px;
  padding: 0 50px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 288px));
  grid-auto-rows: 60px;
  justify-content: center;
  transition: all 350ms ease-in;

  #deck {
    cursor: pointer;
    user-select: none;

    width: 288px;
    height: 60px;

    // box-shadow: $shadow;
    // border-radius: 16px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    border: 2px solid $secondary-light;

    #deck-details {
      text-align: center;
    }

    &.selected {
      // border: 2px solid $primary !important;
      border-image: $nav-gradient;
      border-image-slice: 1;
      border-width: 3px;
      box-shadow: $shadow-heavy;
    }
  }
}
</style>
