<!-- SCI ID: 013 -->
<!-- Name: FlashcardCreate -->
<!-- Version: 1.1 -->
<template>
  <div class="content-container">
    <page-title>
      <template slot="left">
        <input
          v-model="deckTitle"
          class="name-input"
          type="text"
          maxlength="30"
          placeholder="Untitled Flashcard Deck"
          @change="isSaved = false"
        />
      </template>

      <template slot="right">
        <toggle-switch
          v-if="deckID === null"
          :default="toggled"
          :values="['Private', 'Public']"
          @toggle="toggled = $event"
        ></toggle-switch>
        <button
          class="btn btn-action split"
          @click="saveDeck"
        >
          <i class="fas fa-save"></i>
        </button>

        <confirm-button
          v-if="deckID !== null"
          class="split"
          @buttonClicked="deleteDeck"
        >
          <template v-slot:title>
            Delete Flashcard Deck?
          </template>
          <template v-slot:body>
            The flashcard deck will be permanently deleted.
          </template>
          <template v-slot:button-text>
            Delete Deck
          </template>
        </confirm-button>
      </template>
    </page-title>

    <div
      v-if="noTitle"
      class="toast toast-error"
    >
      <button
        class="btn btn-clear float-right"
        @click="noTitle = false"
      ></button>
      Please Enter a title for the flashcard deck
    </div>
    <div
      v-if="!contentFilled"
      class="toast toast-error"
    >
      <button
        class="btn btn-clear float-right"
        @click="contentFilled = true"
      ></button>
      Please Enter term and definition for each flashcard
    </div>
    <div
      v-if="!isLoading"
      class="page-content"
    >
      <!-- maxlength="100" -->
      <flashcard-create-form
        v-for="(term, index) in terms"
        :key="hash[index]"
        :init-term="term"
        :init-def="definitions[index]"
        :initNum="index"
        @termUpdated="termUpdated($event, index)"
        @defUpdated="defUpdated($event, index)"
        @addNew="addCard"
        @delete="deleteCard(index)"
      />
      <div
        class="addCard"
        @click="addCard"
      >
        <h1 class="button-icon"><i class="fas fa-plus"></i></h1>
        <h1>Add Card</h1>
      </div>
    </div>
    <div
      v-else
      class="loading loading-lg"
    ></div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import FlashcardCreateForm from "@/components/flashcards/FlashcardCreateForm";
import ConfirmButton from "@/components/ConfirmButton";

import firebase, { db } from "@/firebaseConfig";
// Make sure that you cannot submit an empty set.

export default {
  name: "FlashcardCreate",
  components: {
    FlashcardCreateForm,
    PageTitle,
    ToggleSwitch,
    ConfirmButton
  },
  props: {
    deckID: {
      type: String,
      default: null,
      required: false
    },
    isPrivate: {
      type: Boolean,
      default: false
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.isSaved) {
      if (confirm("Deck is not saved! Are you sure you want to leave?")) {
        next();
      }
    } else {
      next();
    }
  },
  data() {
    return {
      terms: [null],
      definitions: [null],
      hash: [new Date().getTime()], // Hash is used as a unique way to access each item.
      // Without it there may not be any unique property to use as the key
      deckTitle: "",
      noTitle: false,
      contentFilled: true,
      toggled: false,
      isSaved: true,
      isLoading: false
    };
  },
  created() {
    // Editing existing deck
    if (this.deckID != null) {
      // Remove the toggle switch when editing (easy solution to a tough problem)
      // This value is received from the FlashCardIcon where the user clicks the "edit button"
      this.toggled = !this.isPrivate; // Still need to set toggled to determine collection location
      this.loadDeck();
      this.isLoading = true;
    } else {
      this.isSaved = false;
    }
  },
  methods: {
    getCollection() {
      // Determines what Firestore path to use and returns the object
      const groupID = this.$route.params.groupID;
      // Main flashcard collection route
      if (!this.toggled) {
        return db
          .collection("study-groups")
          .doc(groupID)
          .collection("flashcards")
          .doc("private")
          .collection(this.$store.getters.uid);
      } else {
        return db
          .collection("study-groups")
          .doc(groupID)
          .collection("flashcards");
      }
    },
    deleteCard(index) {
      if (this.terms.length !== 1) {
        this.isSaved = false;
        this.$delete(this.terms, index);
        this.$delete(this.definitions, index);
        this.$delete(this.hash, index);
      }
    },
    termUpdated(value, index) {
      this.isSaved = false;
      this.terms[index] = value.term;
    },
    defUpdated(value, index) {
      this.isSaved = false;
      this.definitions[index] = value.def;
    },
    addCard() {
      this.isSaved = false;
      this.terms.push(null);
      this.definitions.push(null);
      this.hash.push(new Date().getTime());
    },
    deleteDeck() {
      // Reset isSaved so it doesn't show when you want to delete the deck
      this.isSaved = true;
      this.getCollection()
        .doc(this.deckID)
        .delete();
      this.$router.push(`/${this.$route.params.groupID}/flashcards`);
    },
    loadDeck() {
      let deck = this.getCollection().doc(this.deckID);
      deck
        .get()
        .then(doc => {
          if (doc.exists) {
            this.deckTitle = doc.data().title;
            this.terms = doc.data().terms;
            this.definitions = doc.data().definitions;
            this.hash = doc.data().hash;
          }
        })
        .then(() => {
          this.isLoading = false;
        })
        .catch(err => {
          // console.log(err);
        });
    },
    //saves the current deck and pushes it to firebase
    saveDeck() {
      for (let i = 0; i < this.terms.length; i++) {
        if (this.terms[i] === null) {
          this.contentFilled = false;
        }
        if (this.definitions[i] === null) {
          this.contentFilled = false;
        }
      }

      // Confirm that all fields are filled
      if (this.deckTitle !== "" && this.contentFilled) {
        let flashcardCollection = this.getCollection();

        let user = firebase.auth().currentUser; // Used to get user's name
        let initDate = new Date(); //Date object for creation and modified fields

        // Editing not creating so update firstore not create new
        if (this.deckID != null) {
          flashcardCollection
            .doc(this.deckID)
            .update({
              title: this.deckTitle,
              terms: this.terms,
              definitions: this.definitions,
              hash: this.hash,
              creatorName: user.displayName,
              lastUpdated: initDate,
              creatorPhoto: this.$store.getters.photoURL,
              downvotes: [],
              upvotes: []
            })
            .then(() => {
              this.isSaved = true;
              this.$router.push(`/${this.$route.params.groupID}/flashcards`);
            })
            .catch(error => {
              // console.error("Error updating document: ", error);
            });
        } else {
          // Otherwise create a brand new document
          flashcardCollection
            .add({
              title: this.deckTitle,
              terms: this.terms,
              definitions: this.definitions,
              hash: this.hash,
              creatorUID: this.$store.getters.uid,
              creatorName: user.displayName,
              creationDate: initDate,
              lastUpdated: initDate,
              creatorPhoto: this.$store.getters.photoURL,
              downvotes: [],
              upvotes: []
            })
            .then(docRef => {
              // console.log("Flashcard Deck created with doc id: ", docRef.id);
              this.isSaved = true;
              this.$router.push(`/${this.$route.params.groupID}/flashcards`);
            })
            .catch(error => {
              // console.error("Error adding document: ", error);
            });
        }
      } else {
        this.noTitle = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.page-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 5em;
  padding-top: 105px;
}

.gradient-border {
  margin: 30px auto;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-image: $nav-gradient;
}

// Icon on the new members button
.button-icon {
  font-size: 3em;
  position: relative;
  top: 20px;
}

.addCard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 500px;
  height: 250px;
  background-color: white;
  user-select: none;
  padding-top: 10px;

  h1 {
    font-weight: 1;
  }

  &:hover {
    box-shadow: $shadow-hovered;
    border-image-slice: 1;
  }
}

.add {
  background-image: $nav-gradient;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

// Circle background between the gradient and add icon
.add-button {
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background-color: $light;
  user-select: none;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
