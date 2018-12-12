<template>
  <div>
    <page-title>
      {{$store.getters.activeGroup.details.className}} Flashcards
    </page-title>
    <div class="content-container">
      <div class="page-content">
        <button
          @click="prevCard"
          class="btn btn-action btn-success btn-lg s-circle"
        > <i class="icon icon-arrow-left"></i>
        </button>
        <div class="flashcard-container">
          <div
            class="flashcard"
            @click="flipcard"
          >
            <h1 class="flashcard-term">{{currentContent}}</h1>
          </div>
        </div>
        <button
          @click="nextCard"
          class="btn btn-action btn-success btn-lg s-circle"
        > <i class="icon icon-arrow-right"></i>
        </button>
      </div>
      <h1> {{cardIndex + 1}} / 5</h1>
    </div>
  </div>

</template>

<script>
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";

export default {
  name: "FlashcardStudy",
  components: {
    SideBar,
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
      if (this.flipped) {
        this.getCurrentContent();
        this.flipped = false;
      } else {
        this.getCurrentContent();
        this.flipped = true;
      }
    },
    //incrases the current card index and updates the displayed content
    nextCard() {
      if (this.cardIndex < this.termList.length - 1) {
        this.cardIndex++;
        this.currentContent = this.termList[this.cardIndex];
      }
    },
    prevCard() {
      if (this.cardIndex > 0) {
        this.cardIndex--;
        this.currentContent = this.termList[this.cardIndex];
      }
    },
    //loads the content that should be shown into the currentContent variable
    getCurrentContent() {
      if (this.flipped) {
        this.currentContent = this.termList[this.cardIndex];
      } else {
        this.currentContent = this.definitionList[this.cardIndex];
      }
    }
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
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e7e7e7;
  border-radius: 10px;
  width: 500px;
  box-shadow: $shadow-heavy;
}

.flashcard-term {
  font-size: 50px;
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
