<template>
  <div>
    <!-- Only show if there are public decks -->
    <div v-if="publicDecks.length > 0">
      <h5>Public Flashcard Decks</h5>
      <div id="container">
        <div
          v-for="deck in publicDecks"
          id="deck"
          :key="deck.title"
          :class="deck.selected ? 'selected' : ''"
          @click="toggleSelected(deck)"
        >
          <div id="deck-details">
            <div id="deck-name">
              {{ deck.title }}
            </div>
            <div id="deck-author">
              {{ deck.creatorName }}
            </div>
          </div>
          <div id="card-count">
            {{ deck.terms.length }}
          </div>
        </div>
      </div>
    </div>
    <!-- Only show if there are private decks -->
    <div v-if="privateDecks.length > 0">
      <h5>Private Flashcard Decks</h5>
      <div id="container">
        <div
          v-for="deck in privateDecks"
          id="deck"
          :key="deck.title"
          :class="deck.selected ? 'selected private' : ''"
          @click="toggleSelected(deck)"
        >
          <div id="deck-details">
            <div id="deck-name">
              {{ deck.title }}
            </div>
            <div id="deck-author">
              {{ deck.creatorName }}
            </div>
          </div>
          <div id="card-count">
            {{ deck.terms.length }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "@/firebaseConfig";

export default {
  name: "DeckSelector",
  props: {
    limit: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      privateIsLoading: true,
      publicIsLoading: true,
      publicDecks: [],
      privateDecks: [],
      totalSelected: 0
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
      // Catch public deck loading error
      .catch(function(error) {
        // console.log("Error getting public decks: ", error);
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
      // Catch public deck loading error
      .catch(function(error) {
        // console.log("Error getting private decks: ", error);
      });
  },
  methods: {
    toggleSelected(deck) {
      if (!deck.selected) {
        // Deck not selected, check if adding a new deck will be over the limit
        if (this.totalSelected + deck.terms.length < this.limit) {
          deck.selected = true;
          this.$emit("selected", this.getAllSelected());
          this.totalSelected += deck.terms.length;
        } else {
          // TODO: Display error notification
        }
      } else {
        // You can always unselect the deck
        deck.selected = false;
        this.$emit("selected", this.getAllSelected());
        this.totalSelected -= deck.terms.length;
      }
    },
    getAllSelected() {
      let decks = { public: [], private: [] };
      // Returns an object containing the selected public and private deck ids
      this.publicDecks.forEach(deck => {
        if (deck.selected) {
          decks.public.push(deck);
        }
      });

      this.privateDecks.forEach(deck => {
        if (deck.selected) {
          decks.private.push(deck);
        }
      });

      return decks;
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
    background-color: white;

    width: 288px;
    height: 60px;

    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;

    #deck-details {
      text-align: center;
      flex: 4;

      #deck-name {
        font-family: $secondary-font;
        font-weight: 700;
      }

      #deck-author {
        font-size: 12px;
        color: $secondary-light;
      }
    }

    #card-count {
      flex: 1;
      height: 100%;
      padding: 4px;

      // background-color: lighten($secondary-light, 20);
      background-color: $transparent-dark;
      color: white;

      display: flex;
      justify-content: center;
      align-items: center;

      text-align: center;
      font-size: 24px;
      font-family: $secondary-font;
      font-weight: 700;
    }
    &.selected {
      border: $border-selected;
      box-shadow: $shadow;

      #deck-details #deck-author {
        color: $dark;
      }
    }
    &:hover {
      border-color: $primary;
      box-shadow: $shadow-hovered;
    }
  }
}
</style>
