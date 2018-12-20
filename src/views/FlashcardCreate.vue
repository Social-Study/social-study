<template>
    <div class="content-container">
        <page-title>New Flashcard Deck</page-title>
        <input class="form-input" 
        type="text" 
        id="deck-title" 
        v-model="deckTitle"
        maxlength="30"
        placeholder="Untitled Flashcard Deck">
        <div class="toast toast-error" v-if="noTitle">
            <button class="btn btn-clear float-right" @click="noTitle = false"></button>
            Please Enter a title for the flashcard deck
        </div>
        <div class="toast toast-error" v-if="!contentFilled">
            <button class="btn btn-clear float-right" @click="contentFilled = true"></button>
            Please Enter term and definition for each flashcard
        </div>
        <div class="divider"></div>
        <div  class="page-content">
            <flashcardCreateForm 
                v-for="(term, index) in terms"
                :key="index" 
                :index="index"
                maxlength="100"
                v-on:termUpdated="termUpdated"
                v-on:defUpdated="defUpdated"
            />
            <div class="addCard" @click="addCard">
                <h2>Add Card</h2>
                <div class="gradient-border add">
                <div class="add-button">
                    <h1 class="button-icon">+</h1>
                </div>
                </div>  
            </div>
        </div>
        <div class="saveDeck">
            <button @click="saveDeck" class="save-deck-button"> Save Deck</button>
        </div>
     
    </div>
</template>

<script>
import PageTitle from "../components/PageTitle";
import flashcardCreateForm from "../components/FlashcardCreateForm";
import firebase, { db } from "../firebaseConfig";

export default {
    name: "flashcardCreate",
    components: {
        PageTitle,
        flashcardCreateForm
    },
    data: function()  {
        return {
            terms: [null],
            definitions: [null],
            deckTitle: '',
            noTitle: false,
            contentFilled : true
        };
    },
    created(){

    },
    methods:{
        termUpdated(value) {
            this.terms[value.index] = value.term;
        },
        defUpdated(value) {
            this.definitions[value.index] = value.def;
        },
        addCard(){
            this.terms.push(null);
            this.definitions.push(null);
        },
        //saves the current deck and pushes it to firebase
        saveDeck(){
            for (let i = 0; i < this.terms.length; i++) { 
                if(this.terms[i] === null){
                    console.log("term null Term Found");
                    this.contentFilled = false;
                }
            }
            for (let i = 0; i < this.definitions.length; i++) { 
                if(this.definitions[i] === null){
                    console.log("def null Term Found");
                    this.contentFilled = false;
                }
            }            
            if(this.deckTitle !== '' && this.contentFilled){
                const self = this;
                const groupID = this.$route.params.groupID;
                const flashcardCollection = db.collection('study-groups').doc(groupID).collection('flashcardDecks');
                let user = firebase.auth().currentUser;
                flashcardCollection.add({
                    title: this.deckTitle,
                    terms: this.terms,
                    definitions: this.definitions,
                    creatorUID: this.$store.getters.uid,
                    creatorName: user.displayName
                })
                .then(function(docRef) {
                    console.log("Flashcard Deck created with doc id: ", docRef.id);
                    db.collection('study-groups').doc(groupID).collection('flashcardDecks').doc(docRef.id).update({
                        documentID: docRef.id
                    })
                    .then(function(){
                        self.$router.push(`/${self.$route.params.groupID}/flashcards`);
                    })
                })
                .catch(function(error) {
                    console.error("Error adding document: ", error);
                });
            }else{
                console.log("noTitle");
                this.noTitle = true;
            }  
        }
     
    }
}
</script>


<style lang="scss" scoped>
@import "../styleVariables.scss";

.page-content{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: left;
    align-items: center; 
}
.form-title{
    margin-top: 2%;
}

#deck-title{
    width: 30%;
    height: 60%;
    font-size: 100%;
    margin: 0 auto;
    text-align: center;
    border-radius: 5px;
    margin-top: 30px;
}
.addCard{
  position: relative;
  box-shadow: $shadow;
  top: 10px;
  left: 10px;
  width: 240px;
  height: 250px;
  border-radius: 10px;
  background-color: $light-grey;
  user-select: none;

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
  // TODO: Add gradient button later, not working on chrome because the -webkit-text-fill-color
  // background: $nav-gradient;
  // color: transparent;
  // -webkit-text-fill-color: transparent;
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

