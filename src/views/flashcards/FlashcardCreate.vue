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
        :key="index"
        :index="index"
        maxlength="100"
        @termUpdated="termUpdated"
        @defUpdated="defUpdated"
        @addNew="addCard"
      />
      <div
        class="addCard"
        @click="addCard"
      >
        <h2>Add Card</h2>
        <div class="gradient-border add">
          <div class="add-button">
            <h1 class="button-icon">+</h1>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import FlashcardCreateForm from "@/components/flashcards/FlashcardCreateForm";
import firebase, { db } from "@/firebaseConfig";

export default {
  name: "flashcardCreate",
  components: {
    PageTitle,
    FlashcardCreateForm
  },
  data() {
    return {
      terms: [null],
      definitions: [null],
      deckTitle: "",
      noTitle: false,
      contentFilled: true
    };
  },
  created() {},
  methods: {
    termUpdated(value) {
      this.terms[value.index] = value.term;
    },
    defUpdated(value) {
      this.definitions[value.index] = value.def;
    },
    addCard() {
      this.terms.push(null);
      this.definitions.push(null);
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
      // for (let i = 0; i < this.definitions.length; i++) {
      //   if (this.definitions[i] === null) {
      //     console.log("def null Term Found");
      //     this.contentFilled = false;
      //   }
      // }

      // Confirm that all fields are filled
      if (this.deckTitle !== "" && this.contentFilled) {
        const groupID = this.$route.params.groupID;
        const flashcardCollection = db
          .collection("study-groups")
          .doc(groupID)
          .collection("flashcards");
        let user = firebase.auth().currentUser; // Used to get user's name
        let initDate = new Date(); //Date object for creation and modified fields
        flashcardCollection
          .add({
            title: this.deckTitle,
            terms: this.terms,
            definitions: this.definitions,
            creatorUID: this.$store.getters.uid,
            creatorName: user.displayName,
            creationDate: initDate,
            lastUpdated: initDate,
            creatorPhoto: this.$store.getters.photoURL
          })
          .then(docRef => {
            console.log("Flashcard Deck created with doc id: ", docRef.id);
            db.collection("study-groups")
              .doc(groupID)
              .collection("flashcards")
              .doc(docRef.id)
              .update({
                documentID: docRef.id
              })
              .then(() => {
                this.$router.push(`/${this.$route.params.groupID}/flashcards`);
              });
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
@import "@/styleVariables.scss";

.page-content {
  display: flex;
  flex-flow: row wrap;
  justify-content: left;
  align-items: center;
  margin: 40px;
}

.addCard {
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

// Icon on the new members button
.button-icon {
  text-align: center;
  font-size: 144px;
  font-weight: 600;
  background-clip: text;
  bottom: 25px;
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
  background-color: #bebebe;
  user-select: none;
}
</style>
