<template>
  <div class="content-container">
    <page-title>
      <template slot="left">
        <input
          class="name-input"
          type="text"
          v-model="deckTitle"
          maxlength="30"
          placeholder="Untitled Flashcard Deck"
        >
      </template>

      <template slot="right">
        <toggle-switch
          @toggle="toggled = $event"
          :values="['Private', 'Public']"
        ></toggle-switch>
        <button
          @click="saveDeck"
          class="btn btn-action split"
        >
          <i class="fas fa-save"></i>
        </button>
      </template>
    </page-title>

    <div
      class="toast toast-error"
      v-if="noTitle"
    >
      <button
        class="btn btn-clear float-right"
        @click="noTitle = false"
      ></button>
      Please Enter a title for the flashcard deck
    </div>
    <div
      class="toast toast-error"
      v-if="!contentFilled"
    >
      <button
        class="btn btn-clear float-right"
        @click="contentFilled = true"
      ></button>
      Please Enter term and definition for each flashcard
    </div>
    <div class="page-content">
      <flashcard-create-form
        v-for="(term, index) in terms"
        :key="hash[index]"
        :index="index"
        maxlength="100"
        @termUpdated="termUpdated"
        @defUpdated="defUpdated"
        @addNew="addCard"
        @delete="deleteCard(index)"
      />
      <div
        class="addCard"
        @click="addCard"
      >
        <div class="gradient-border add">
          <div class="add-button">
            <h1 class="button-icon"><i class="fas fa-plus"></i></h1>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import ToggleSwitch from "@/components/ToggleSwitch.vue";
import FlashcardCreateForm from "@/components/flashcards/FlashcardCreateForm";

import firebase, { db } from "@/firebaseConfig";

export default {
  name: "FlashcardCreate",
  components: {
    FlashcardCreateForm,
    PageTitle,
    ToggleSwitch
  },
  data() {
    return {
      terms: [null],
      definitions: [null],
      hash: [null], // Hash is used as a unique way to access each item. Without it there may not be any unique property to use as the key
      deckTitle: "",
      noTitle: false,
      contentFilled: true,
      toggled: false
    };
  },
  created() {
    this.hash.push(new Date().getTime());
  },
  methods: {
    deleteCard(index) {
      console.log("delete: " + index);
      this.$delete(this.terms, index);
      this.$delete(this.definitions, index);
      this.$delete(this.hash, index);
    },
    termUpdated(value) {
      this.terms[value.index] = value.term;
    },
    defUpdated(value) {
      this.definitions[value.index] = value.def;
    },
    addCard() {
      this.terms.push(null);
      this.definitions.push(null);
      this.hash.push(new Date().getTime());
    },
    //saves the current deck and pushes it to firebase
    saveDeck() {
      for (let i = 0; i < this.terms.length; i++) {
        if (this.terms[i] === null) {
          console.log("term null Term Found");
          this.contentFilled = false;
        }
        if (this.definitions[i] === null) {
          console.log("def null Term Found");
          this.contentFilled = false;
        }
      }

      // Confirm that all fields are filled
      if (this.deckTitle !== "" && this.contentFilled) {
        const groupID = this.$route.params.groupID;

        // Main flashcard collection route
        let flashcardCollection = db
          .collection("study-groups")
          .doc(groupID)
          .collection("flashcards");

        if (!this.toggled) {
          console.log("private");
          flashcardCollection = db
            .collection("study-groups")
            .doc(groupID)
            .collection("flashcards")
            .doc("private")
            .collection(this.$store.getters.uid);
        }

        let user = firebase.auth().currentUser; // Used to get user's name
        let initDate = new Date(); //Date object for creation and modified fields

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
            creatorPhoto: this.$store.getters.photoURL
          })
          .then(docRef => {
            console.log("Flashcard Deck created with doc id: ", docRef.id);
            this.$router.push(`/${this.$route.params.groupID}/flashcards`);
          })
          .catch(error => {
            console.error("Error adding document: ", error);
          });
      } else {
        console.log("noTitle");
        this.noTitle = true;
      }
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/styles.scss";

.page-content {
  margin: 0 auto;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(100px, 250px));
  grid-auto-rows: 250px;
  justify-content: center;
  margin: 20px;
}

.addCard {
  cursor: pointer;
  box-shadow: $shadow;
  width: 250px;
  height: 250px;
  border-radius: 10px;
  background-color: $light-grey;
  user-select: none;
  padding-top: 10px;
  margin: 0 40px 40px 0;

  &:hover {
    box-shadow: $shadow-hovered;
  }
}

.gradient-border {
  margin: 30px auto;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  background-image: $nav-gradient;
}

.button-icon {
  text-align: center;
  font-size: 8em;
  bottom: 2px;
  position: relative;
  vertical-align: center;
}

// Circle background between the gradient and add icon
.add-button {
  position: relative;
  top: 10px;
  left: 10px;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  // background-color: #bebebe;
  background-color: $light;
  user-select: none;
}
</style>
