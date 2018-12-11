<template>
<div class="content-container">

  <h1>CSS-354 Flashcards</h1>
  <div class="page-content">
    <button class="btn btn-action"><i class="icon icon-arrow-left" @click="prevCard"></i></button>
    <div class = "flashcard-container">
        <div class = "flashcard"  @click="flipcard">
          <h1 class = "flashcard-term">{{currentContent}}</h1>
        </div>    
    </div>
    <button class="btn btn-action"><i class="icon icon-arrow-right" @click="nextCard"></i></button>
  </div>
  
</div>

</template>

<script>
import firebase, { db, FirebaseConsts } from "@/firebaseConfig";

export default {
  name: "dashboard",
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
        {term: "one", definition: "1"},
        {term: "two", definition: "2"},
        {term: "three", definition: "3"},
        {term: "four", definition: "4"},
        {term: "five", definition: "5"},
      ]
    
    };
  },
  methods: {
    //flips the current card
    flipcard(){
      if(this.flipped){
        this.getCurrentContent();
        this.flipped = false;
      }else{
        this.getCurrentContent();
        this.flipped = true;
      }
    },
    //incrases the current card index and updates the displayed content
    nextCard(){
      if(this.cardIndex < this.termList.length - 1) {this.cardIndex ++;}
      this.getCurrentContent(); 
    },
    prevCard(){
      if(this.cardIndex > 0) {this.cardIndex --;}
      this.getCurrentContent();   
    },
    //loads the content that should be shown into the currentContent variable
    getCurrentContent(){
      if(this.flipped){
        this.currentContent = this.termList[this.cardIndex];
      }else{
        this.currentContent = this.definitionList[this.cardIndex];
      }     
    }
  },
  //load all the data from the flashcard deck into arrays
  //set the first card's content
  created() {
    for(var cards in this.flashcardDeck){
      this.termList.push(this.flashcardDeck[cards].term);
      this.definitionList.push(this.flashcardDeck[cards].definition);
    }
    this.currentContent = this.termList[this.cardIndex];

  }
};
</script>

<style lang="scss" scoped>

.page-content{
  display:flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.flashcard-container{
  min-height: 64vh;
  align-items: baseline;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.flashcard{
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #E7E7E7;
  border-radius: 10px;
  width: 500px;


}

.flashcard-term{
  font-size: 55px;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.btn{
  margin: 10px;
}
</style>
