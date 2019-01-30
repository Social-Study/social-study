<template>
  <div>
    <h5>Public Flashcard Decks</h5>
    <div id="container">
      <div
        id="deck"
        v-for="deck in publicDecks"
        :key="deck.title"
        @click="toggleSelected(deck)"
        :class="deck.selected ? 'selected': ''"
      >
        <div id="deck-details">
          {{deck.title}}
        </div>
      </div>
    </div>

    <h5>Private Flashcard Decks</h5>
    <div id="container">
      <div
        id="deck"
        v-for="deck in privateDecks"
        :key="deck.title"
        @click="toggleSelected(deck)"
        :class="deck.selected ? 'selected private': ''"
      >
        <div id="deck-details">
          {{deck.title}}
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// TODO: Load flashcards from database
// TODO: Split flashcards into public and private sections
// TODO: Figure out how to emit the selected flashcards

import { db } from "@/firebaseConfig";

export default {
  name: "DeckSelector",
  data() {
    return {
      privateIsLoading: true,
      publicIsLoading: true,
      publicDecks: [],
      privateDecks: []
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

    publicCollection
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.publicDecks.push({ id: doc.id, selected: false, ...doc.data() });
        });
      })
      .catch(function(error) {
        console.log("Error getting public decks: ", error);
      });

    privateCollection
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          this.privateDecks.push({
            id: doc.id,
            selected: false,
            ...doc.data()
          });
        });
      })
      .catch(function(error) {
        console.log("Error getting private decks: ", error);
      });
  },
  methods: {
    toggleSelected(deck) {
      // TODO: Add question limit checks when loading actual data.
      deck.selected = !deck.selected;
      console.log(deck.selected);
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

      &.private {
        border-image: $blue-gradient;
        border-image-slice: 1;
        border-width: 3px;
        box-shadow: $shadow-heavy;
      }
    }
  }
}
</style>
