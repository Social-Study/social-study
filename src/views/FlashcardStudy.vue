<template>
  <div
    class="content-container"
    @keyup.space="flipcard()"
  >

    <page-title>Software Engineering Terms</page-title>
    <div class="page-content">
      <button
        @click="prevCard"
        class="btn btn-action btn-success btn-lg s-circle"
        :class="cardIndex === 0 ? 'disabled' : ''"
      > <i class="icon icon-arrow-left"></i>
      </button>
      <div class="flashcard-container">
        <flashcard
          class="flashcard"
          :style="{backgroundColor: cardColor}"
          :pose="isFlipping ? 'shrink' : 'grow' "
          @click.native="flipcard"
        >
          <flashcardContent
            class="flashcard-content"
            :pose="isFlipping ? 'shrinkContent' : 'growContent' "
          >
            {{currentContent}}
          </flashcardContent>
        </flashcard>
      </div>
      <button
        @click="nextCard"
        class="btn btn-action btn-success btn-lg s-circle"
        :class="cardIndex === 4 ? 'disabled' : ''"
      >
        <i class="icon icon-arrow-right"></i>
      </button>
    </div>
  </div>

</template>

<script>
// import firebase, { db, FirebaseConsts } from "@/firebaseConfig";
import PageTitle from "../components/PageTitle";
import posed from "vue-pose";
import { setTimeout } from "timers";

export default {
  name: "flashcardStudy",
  components: {
    PageTitle,
    flashcard: posed.div({
      shrink: {
        height: 0,
        transition: { duration: 200 }
      },
      grow: {
        height: 300,
        transition: { duration: 200 }
      }
    }),
    flashcardContent: posed.h1({
      shrinkContent: {
        opacity: 0,
        transition: { duration: 10 }
      },
      growContent: {
        opacity: 1,
        transition: { delay: 100 }
      }
    })
  },
  data: function() {
    return {
      isFlipping: false,
      user: null,
      currentContent: String,
      cardIndex: 0,
      flipped: false,
      termList: [],
      definitionList: [],
      cardColor: "#E7E7E7",

      // hard-coded flashcard deck for testing
      flashcardDeck: [
        { term: "WBS", definition: "Work Breakdown Structure" },
        {
          term: "Risk",
          definition: "Unwanted event that has negative consequences usually"
        },
        {
          term: "Functional Requirements",
          definition: "Statements of services the system should provide"
        },
        { term: "SDLC", definition: "Systems Development Lifecycle" },
        { term: "<<include>>", definition: "Relationship always required" }
      ]
    };
  },
  methods: {
    //flips the current card
    flipcard() {
      this.isFlipping = true;
      const self = this;
      setTimeout(function() {
        self.isFlipping = false;
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
        this.cardIndex++;
        this.currentContent = this.termList[this.cardIndex];
        this.flipped = false;
        this.cardColor = "#E7E7E7";
      }
    },
    //decrements the current card index and updates the displayed info
    prevCard() {
      if (this.cardIndex > 0) {
        this.cardIndex--;
        this.flipped = false;
        this.currentContent = this.termList[this.cardIndex];
        this.cardColor = "#E7E7E7";
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
  },
  //load all the data from the flashcard deck into arrays
  //set the first card's content
  created() {
    for (var cards in this.flashcardDeck) {
      this.termList.push(this.flashcardDeck[cards].term);
      this.definitionList.push(this.flashcardDeck[cards].definition);
    }
    this.currentContent = this.termList[this.cardIndex];
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
  height: 300;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #c5c5c5;
  border-radius: 10px;
  width: 500px;
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
</style>
