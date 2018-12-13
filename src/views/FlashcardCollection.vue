<template>
  <div>
    <page-title>Flashcard Collection</page-title>
    <div
      @click="$router.push(`/${$route.params.groupID}/flashcards/study`)"
      class="content-container"
    >
      <div class="flashcard-deck">
        <h1 class="deck-title">Software Engineering Terms</h1>
        <h3 class="card-count">5 Cards</h3>
        <h5 class="deck-creator text-gray">Evan Buss</h5>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from "../components/SideBar";
import PageTitle from "../components/PageTitle";

export default {
  name: "FlashcardCollection",
  components: {
    SideBar,
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

.content-container {
  margin: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.flashcard-deck {
  cursor: pointer;
  padding: 40px 0px;
  border: 1px solid grey;
  border-radius: 10px;
  width: 400px;
  height: 240px;
  background-color: #e7e7e7;
  box-shadow: $shadow;

  &:hover {
    box-shadow: $shadow-hovered;
  }

  display: flex;
  flex-direction: column;
}

.deck-title {
  flex: 8;
}

.card-count {
  flex: 1;
}

.deck-creator {
  flex: 1;
}
</style>
