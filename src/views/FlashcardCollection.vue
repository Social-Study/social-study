<template>
  <div>
    <page-title>Flashcard Collection</page-title>
    <button 
      class="btn btn-primary" 
      id="new-btn"
      @click="$router.push(`/${$route.params.groupID}/flashcards/create`)"
    >New Flashcard Deck
    </button>
      <div class="content-container">
        <flashcard-deck
          v-for="(deck,index) in decks"
          :key="index"
          :title="deck.title"
          :cardNum="deck.cardNum"
          :creator="deck.creatorName"
          :creatorUid="deck.uid"
          :documentID="deck.documentID"
        ></flashcard-deck>
      </div>

  </div>
</template>

<script>
import FlashcardDeck from "@/components/FlashcardDeck";
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";
import firebase, { db } from "../firebaseConfig";

export default {
  name: "FlashcardCollection",
  components: {
    SideBar,
    PageTitle,
    FlashcardDeck
  },
  data(){
    return{
      decks:[]
    }
  },
  created(){
    const groupID = this.$route.params.groupID;
    const self = this;
    let flashcardCollection = db.collection('study-groups').doc(groupID).collection('flashcardDecks'); 
    flashcardCollection
    .get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data());
            const length = doc.data().terms.length;
            const user = doc.data().creator
            let newCard = {
              title: doc.data().title,
              creatorUID: doc.data().creatorUID,
              cardNum: length,
              uid: doc.data().creatorUID,
              creatorName: doc.data().creatorName,
              documentID: doc.data().documentID
            }
            self.decks.push(newCard);
        });
    });
  },

};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

// Flexbox container to hold all member cards
.content-container {
  margin-top: 40px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}
#new-btn{
  margin-top: 25px;
}
</style>
