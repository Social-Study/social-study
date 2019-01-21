<template>
  <div
    v-if="dataloaded"
    class="content-container"
    @keyup.space="flipCard()"
  >
    <!-- Page Title -->
    <page-title>
      <template slot="center">
        {{deckName}}
      </template>
      <template slot="left">
        <button
          @click="shuffleDeck"
          class="btn"
          :class="isShuffled ? 'btn-primary': 'btn-action'"
        >
          <!-- Icon flashes when shuffle enabled -->
          <i
            :class="isShuffled ? 'animated flash' : ''"
            class="fas fa-random"
          ></i></button>
      </template>
    </page-title>

    <!-- Main Content -->
    <div class="page-content">
      <div class="center-content">
        <button
          @click.prevent="prevCard"
          class="btn btn-action btn-primary btn-lg s-circle"
          :class="cardIndex === 0 ? 'disabled' : ''"
        > <i class="fas fa-arrow-left"></i>
        </button>
        <div class="flashcard-container">
          <div
            class="flashcard"
            :style="{backgroundColor: cardColor}"
            @click.prevent="flipCard"
          >
            <h1 class="flashcard-content">
              {{currentContent}}
            </h1>
          </div>
        </div>
        <!-- Button icon and color changes when user reaches the end -->
        <button
          @click.prevent="nextCard"
          class="btn btn-action btn-lg s-circle"
          style="transition: .5s;"
          :class="cardIndex === termList.length -1 ? 'btn-success btn-rotate' : 'btn-primary'"
        >
          <i
            :class="cardIndex === termList.length -1 ? 'fa-undo-alt' : 'fa-arrow-right'"
            class="fas fa-arrow-right"
          >
          </i>
        </button>
      </div>
      <h1 id="cardIndex">{{cardIndex + 1}} / {{termList.length}}</h1>
    </div>
  </div>
  <div
    v-else
    class="loading loading-lg"
  ></div>

</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";
import { setTimeout } from "timers";
import { db } from "@/firebaseConfig";
import anime from "animejs";

export default {
  name: "flashcardStudy",
  components: {
    PageTitle
  },
  data() {
    return {
      user: null,
      currentContent: String,
      cardIndex: 0,
      flipped: false,
      termList: [],
      isShuffled: false,
      definitionList: [],
      originalTermList: [],
      originalDefinitionList: [],
      cardColor: "#E7E7E7",
      deckName: "",
      dataloaded: false
    };
  },
  created() {
    const groupID = this.$route.params.groupID;
    const deckID = this.$route.params.deckID;
    // const self = this;
    let flashcardCollection = db
      .collection("study-groups")
      .doc(groupID)
      .collection("flashcards")
      .doc(deckID);
    flashcardCollection
      .get()
      .then(doc => {
        if (doc.exists) {
          // console.log("Document data:", doc.data());
          this.deckName = doc.data().title;
          // Original is the unmodified list. Other list is changed upon shuffle
          this.originalTermList = doc.data().terms;
          this.originalDefinitionList = doc.data().definitions;
          // Use slice to copy the array by value to avoid modification
          this.termList = this.originalTermList.slice();
          this.definitionList = this.originalDefinitionList.slice();

          this.currentContent = this.termList[0];
          this.dataloaded = true;
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch(error => {
        console.log("Error getting document:", error);
      });
  },
  methods: {
    shuffleDeck() {
      if (this.isShuffled) {
        // If shuffled, reload original, unmodified lists
        this.isShuffled = false;
        this.termList = this.originalTermList.slice();
        this.definitionList = this.originalDefinitionList.slice();
        console.log("back to original");
      } else {
        // Otherwise use a shuffle algorithm on the lists
        for (let i = this.termList.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.termList[i], this.termList[j]] = [
            this.termList[j],
            this.termList[i]
          ];
          [this.definitionList[i], this.definitionList[j]] = [
            this.definitionList[j],
            this.definitionList[i]
          ];
        }
        console.log("Shuffled");
        this.isShuffled = true;
      }
      // Reset the study position
      this.currentContent = this.termList[0];
      this.cardIndex = 0;
    },
    //flips the current card
    flipCard() {
      anime({
        targets: ".flashcard",
        height: [{ value: 0, duration: 150 }, { value: 300, duration: 150 }]
      });
      anime({
        targets: ".flashcard-content",
        opacity: [{ value: 0, duration: 150 }, { value: 1, duration: 150 }]
      });
      const self = this;
      setTimeout(() => {
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
        setTimeout(() => {
          self.currentContent = self.termList[self.cardIndex];
          self.flipped = false;
          self.cardColor = "#E7E7E7";
        }, 110);
      } else {
        this.cardIndex = 0;
        this.currentContent = this.termList[this.cardIndex];
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
        setTimeout(() => {
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
          this.flipCard();
          break;
        case 37:
          this.prevCard();
          break;
        case 39:
          this.nextCard();
          break;
        case 38:
          this.flipCard();
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
@import "@/styles.scss";

.page-content {
  height: $page-with-header-height;
  display: flex;
  flex-flow: column nowrap;
  place-content: center;
}

.center-content {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.btn-rotate {
  transform: rotate(360deg);
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
