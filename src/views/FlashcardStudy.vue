<template>
  <div
    v-if="dataloaded"
    class="content-container"
    @keyup.space="flipcard()"
  >

    <page-title>{{deckName}} Flashcards</page-title>
    <div class="page-content">
      <button
        @click="prevCard"
        class="btn btn-action btn-success btn-lg s-circle"
        :class="cardIndex === 0 ? 'disabled' : ''"
      > <i class="icon icon-arrow-left"></i>
      </button>
      <div class="flashcard-container">
        <div
          class="flashcard"
          :style="{backgroundColor: cardColor}"
          @click="flipcard"
        >
          <h1 class="flashcard-content">
            {{currentContent}}
          </h1>
        </div>
      </div>
      <button
        @click="nextCard"
        class="btn btn-action btn-success btn-lg s-circle"
        :class="cardIndex < termList.length - 1 ? '' : 'disabled'"
      >
        <i class="icon icon-arrow-right"></i>
      </button>
    </div>
    <h1 id="cardIndex">{{cardIndex + 1}} / {{termList.length}}</h1>
  </div>

</template>

<script>
import PageTitle from "../components/PageTitle";
import { setTimeout } from "timers";
import firebase, { db } from "../firebaseConfig";
import anime from 'animejs';

export default {
  name: "flashcardStudy",
  components: {
    PageTitle
  },
  data: function() {
    return {
      user: null,
      currentContent: String,
      cardIndex: 0,
      flipped: false,
      termList: [],
      definitionList: [],
      cardColor: "#E7E7E7",
      deckName: '',
      dataloaded: false
    };
  },
  created() {
    const groupID = this.$route.params.groupID;
    const deckID = this.$route.params.deckID;
    const self = this;
    let flashcardCollection = db.collection('study-groups').doc(groupID).collection('flashcardDecks').doc(deckID); 
    flashcardCollection
    .get().then(function(doc) {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            self.deckName = doc.data().title;
            self.termList = doc.data().terms;
            self.definitionList = doc.data().definitions;
            self.currentContent = self.termList[0];
            self.dataloaded = true;

        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
  },
  methods: {
    //flips the current card
    flipcard() {
      anime({
        targets: ".flashcard",
        height: [{ value: 0, duration: 150 }, { value: 300, duration: 150 }]
      });
      anime({
        targets: ".flashcard-content",
        opacity: [{ value: 0, duration: 150 }, { value: 1, duration: 150 }]
      });
      const self = this;
      setTimeout(function() {
        //definition side
        if (self.flipped) {
          self.getCurrentContent();
          self.flipped = false;
          self.cardColor = "#E7E7E7";
        }
        //term side
        else {
          self.getCurrentContent();
          self.flipped = true;
          self.cardColor = "#c5c5c5";
        }
      }, 100);
    },
    //increments the current card index and updates the displayed content
    nextCard() {
      if (this.cardIndex < this.termList.length - 1) {
        let nextAnimation = anime.timeline({
          targets: ".flashcard",
          easing: "linear",
          duration: 100
        });
        nextAnimation
          .add({
            rotate: -10,
            translateX: -200,
            opacity: 0
          })
          .add({
            translateX: 200,
            opacity: 0,
            duration: 1
          })
          .add({
            translateX: 0,
            opacity: 1,
            rotation: 0
          });
        this.cardIndex++;
        const self = this;
        setTimeout(function() {
          self.currentContent = self.termList[self.cardIndex];
          self.flipped = false;
          self.cardColor = "#E7E7E7";
        }, 110);
      }
    },
    //decrements the current card index and updates the displayed info
    prevCard() {
      if (this.cardIndex > 0) {
        let prevAnimation = anime.timeline({
          targets: ".flashcard",
          easing: "linear",
          duration: 100
        });
        prevAnimation
          .add({
            rotate: 10,
            translateX: 200,
            opacity: 0
          })
          .add({
            translateX: -200,
            opacity: 0,
            duration: 1
          })
          .add({
            translateX: 0,
            opacity: 1,
            rotation: 0
          });
        this.cardIndex--;
        const self = this;
        setTimeout(function() {
          self.flipped = false;
          self.currentContent = self.termList[self.cardIndex];
          self.cardColor = "#E7E7E7";
        }, 110);
      }
    },
    //loads the content that should be shown into the currentContent variable based on flipped variable
    getCurrentContent() {
      if (this.flipped) {
        this.currentContent = this.termList[this.cardIndex];
      } else {
        this.currentContent = this.definitionList[this.cardIndex];
      }
    },
    //calls the correct function based on key press
    keyPressed(event) {
      switch (event.which) {
        case 32:
          this.flipcard();
          break;
        case 38:
          this.flipCard();
          break;
        case 37:
          this.prevCard();
          break;
        case 39:
          this.nextCard();
          break;
      }
    }
  },
  //creates the key event listener
  beforeMount() {
    window.addEventListener("keyup", this.keyPressed);
  },
  //destroys the key event listener
  beforeDestroy() {
    window.removeEventListener("keyup", this.keyPressed);
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.page-content {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.flashcard-container {
  min-height: 64vh;
  align-items: baseline;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flashcard {
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: $light-grey;
  border-radius: 10px;
  width: 500px;
  height: 300px;
  box-shadow: $shadow-heavy;
}

.flashcard-content {
  font-size: 300%;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn {
  margin: 10px;
}
#cardIndex {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
