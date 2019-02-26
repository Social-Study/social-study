<template>
  <div id="question">
    <h1>3. Match each term to its definition</h1>
    <div id="terms-holder">
      <drag
        class="drag"
        key="term1"
        :transfer-data="{ term: 'term1' }"
      >Term1</drag>
      <drag
        class="drag"
        key="term2"
        :transfer-data="{ term: 'term2' }"
      >Term2</drag>
      <drag
        class="drag"
        key="term3"
        :transfer-data="{ term: 'term3' }"
      >Term3</drag>
      <drag
        class="drag"
        key="term4"
        :transfer-data="{ term: 'term4' }"
      >Term4</drag>
    </div>

    <div id="defs-holder">
      <div class="drop-container">
        <drop
          class="drop"
          key="def1"
          :class="{ over: over.zone1 }"
          @dragover="over.zone1 = true"
          @dragleave="over.zone1 = false"
          @drop="handleDrop(over.zone1, ...arguments)"
        >
          Def1
        </drop>
        <h2>Brazil</h2>
      </div>
      <div class="drop-container">
        <drop
          key="def2"
          class="drop"
          :class="{ over: over.zone2 }"
          @dragover="over.zone2 = true"
          @dragleave="over.zone2 = false"
          @drop="handleDrop(over.zone2, ...arguments)"
        >
          Def2
        </drop>
        <h2>England</h2>
      </div>
      <div class="drop-container">
        <drop
          key="def3"
          class="drop"
          :class="{ over: over.zone3 }"
          @dragover="over.zone3 = true"
          @dragleave="over.zone3 = false"
          @drop="handleDrop(over.zone3, ...arguments)"
        >
          Def3
        </drop>
        <h2>Canada</h2>
      </div>
      <div class="drop-container">
        <drop
          key="def4"
          class="drop"
          :class="{ over: over.zone4 }"
          @dragover="over.zone4 = true"
          @dragleave="over.zone4 = false"
          @drop="handleDrop(over.zone4, ...arguments)"
        >
          Def4
        </drop>
        <h2>China</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
export default {
  name: "DragDropComponent",
  components: { Drag, Drop },
  data: function() {
    return {
      over: {
        zone1: false,
        zone2: false,
        zone3: false,
        zone4: false
      }
    };
  },
  methods: {
    handleDrop(dropZone, data) {
      console.log(JSON.stringify(data));
      console.log(dropZone);
      dropZone = true;
      // TODO: This is where you implement the logic I think
      // alert(`You dropped with data: ${JSON.stringify(data)}`);
    }
  }
};
</script>

<style <style lang="scss" scoped>
@import "@/styles.scss";

h1 {
  margin: 0;
  font-size: 28px;
}

#terms-holder {
  border-radius: 26px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);
  padding: 10px;
  margin-top: 10px;

  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  background-color: #e7e7e7;
}

#defs-holder {
  border-radius: 26px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);
  padding: 10px;
  margin-top: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;

  background-color: #e7e7e7;

  .drop-container {
    width: 60%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
  }
}

.drag,
.drop {
  cursor: pointer;

  height: 50px;
  padding: 0 20px 0 20px;
  margin: 5px;

  display: flex;
  flex-flow: row nowrap;
  place-items: center;

  background-color: #c4c4c4;
  border-radius: 18px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);
}

.drop {
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.35);
}

.drop.over {
  border-color: #aaa;
  // background: #ccc;
  background-image: $green-gradient;
}
</style>
