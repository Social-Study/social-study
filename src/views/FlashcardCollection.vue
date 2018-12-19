<template>
  <div>
    <page-title>Flashcard Collection</page-title>
    <button 
      class="btn btn-primary" 
      id="new-btn"
      @click="$router.push(`/${$route.params.groupID}/flashcards/create`)"
    >New Flashcard Deck
    </button>
    <div
      @click="$router.push(`/${$route.params.groupID}/flashcards/study`)"
      class="content-container"
    >
    <div class="outer-container">
      <div class="content-container">
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
        <flashcard-deck></flashcard-deck>
      </div>
    </div>

  </div>
</template>

<script>
import FlashcardDeck from "@/components/FlashcardDeck";
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";

export default {
  name: "FlashcardCollection",
  components: {
    SideBar,
    PageTitle,
    FlashcardDeck
  }
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
