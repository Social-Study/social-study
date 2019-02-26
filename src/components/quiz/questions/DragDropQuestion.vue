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
          :class="{ over: zone1.over }"
          @dragover="zone1.over = true"
          @dragleave="zone1.over = false"
          @drop="handleDrop(zone1, ...arguments)"
        >
          {{zone1.text}}
        </drop>
        <h2>Brazil</h2>
      </div>
      <div class="drop-container">
        <drop
          key="def2"
          class="drop"
          :class="{ over: zone2.over}"
          @dragover="zone2.over = true"
          @dragleave="zone2.over = false"
          @drop="handleDrop(zone2, ...arguments)"
        >
          {{zone2.text}}
        </drop>
        <h2>England</h2>
      </div>
      <div class="drop-container">
        <drop
          key="def3"
          class="drop"
          :class="{ over: zone3.over }"
          @dragover="zone3.over = true"
          @dragleave="zone3.over= false"
          @drop="handleDrop(zone3, ...arguments)"
        >
          {{zone3.text}}
        </drop>
        <h2>Canada</h2>
      </div>
      <div class="drop-container">
        <drop
          key="def4"
          class="drop"
          :class="{ over: zone4.over }"
          @dragover="zone4.over = true"
          @dragleave="zone4.over = false"
          @drop="handleDrop(zone4, ...arguments)"
        >
          {{zone4.text}}
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
      // over: {
      //   zone1: false,
      //   zone2: false,
      //   zone3: false,
      //   zone4: false
      // },
      // zoneText: {
      //   zone1: "Def1",
      //   zone2: "Def2",
      //   zone3: "Def3",
      //   zone4: "Def4"
      // },
      zone1: {
        over: false,
        text: "Def1"
      },
      zone2: {
        over: false,
        text: "Def2"
      },
      zone3: {
        over: false,
        text: "Def3"
      },
      zone4: {
        over: false,
        text: "Def4"
      }
    };
  },
  methods: {
    handleDrop(dropZone, data) {
      console.log(JSON.stringify(data));
      console.log(dropZone);
      dropZone.over = true;
      dropZone.text = data.term;
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
