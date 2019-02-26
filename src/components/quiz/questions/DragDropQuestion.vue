<template>
  <div id="question">
    <h1>3. Match each term to its definition</h1>
    <div id="terms-holder">
      <drag
        v-for="(term, index) in drag"
        :key="term.term"
        class="drag"
        :draggable="term.draggable"
        :class="{ placed: !term.draggable }"
        :transfer-data="{ from: index, term: term.term }"
      >{{term.term}}</drag>
    </div>

    <div id="defs-holder">
      <div id="left">
        <drop
          v-for="slot in drop"
          class="drop"
          :key="slot.hash"
          :class="{ over: slot.over, filled: slot.filled }"
          @click.native="resetDrop(slot)"
          @dragover="handleDragOver(slot)"
          @dragleave="handleDragLeave(slot)"
          @drop="handleDrop(slot, ...arguments)"
        >
          {{slot.text}}
        </drop>
      </div>
      <div id="right">
        <h2>Brazil</h2>
        <h2>England</h2>
        <h2>Canada</h2>
        <h2>China</h2>
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, Drop } from "vue-drag-drop";
export default {
  name: "DragDropQuestion",
  components: { Drag, Drop },
  data: function() {
    return {
      drag: [
        {
          term: "Brazilia",
          draggable: true
        },
        {
          term: "London",
          draggable: true
        },
        {
          term: "Ottowa",
          draggable: true
        },
        {
          term: "Beijing",
          draggable: true
        }
      ],
      drop: [
        {
          hash: 1,
          over: false,
          filled: false,
          text: "",
          from: null
        },
        {
          hash: 2,
          over: false,
          filled: false,
          text: "",
          from: null
        },
        {
          hash: 3,
          over: false,
          filled: false,
          text: "",
          from: null
        },
        {
          hash: 4,
          over: false,
          filled: false,
          text: "",
          from: null
        }
      ]
    };
  },
  methods: {
    handleDrop(drop, data) {
      drop.over = true;
      drop.filled = true;
      drop.text = data.term;
      drop.from = data.from;
      // Get the drag index from data and make drag item not draggable
      this.drag[data.from].draggable = false;
    },
    handleDragOver(drop) {
      if (drop.text === "") {
        drop.over = true;
      }
    },
    handleDragLeave(drop) {
      if (drop.text === "") {
        drop.over = false;
      }
    },
    resetDrop(drop) {
      if (drop.from !== null) {
        drop.text = "";
        drop.filled = false;
        drop.over = false;
        this.drag[drop.from].draggable = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;

  background-color: #e7e7e7;
  #left {
    // Nothing for now
  }
  #right {
    flex: 6;
    text-align: center;
  }
}

.drag,
.drop {
  cursor: pointer;
  user-select: none;

  height: 50px;
  padding: 0 20px 0 20px;
  margin: 5px;
  min-width: 86px;

  display: flex;
  flex-flow: row nowrap;
  place-items: center;

  background-color: #c4c4c4;
  border-radius: 18px;
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.35);
}

.drag.placed {
  cursor: default;
  box-shadow: none;
  background-color: lighten(#c4c4c4, 10);
}

.drop {
  cursor: default;
  box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.35);
}

.drop.over {
  border-color: #aaa;
  background-image: $green-gradient;
}

.drop.filled {
  box-shadow: none;
  cursor: pointer;
}
</style>
