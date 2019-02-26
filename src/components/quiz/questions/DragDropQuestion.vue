<template>
  <div id="question">
    <h1>3. Match each term to its definition</h1>
    <div id="terms-holder">
      <!-- Create draggable component for each term -->
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
        <!-- Show a drop area for each term -->
        <drop
          v-for="slot in drop"
          class="drop"
          :key="slot.definition"
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
        <!-- Show all definitions -->
        <h2
          v-for="slot in drop"
          :key="slot.definition"
        >{{slot.definition}}</h2>
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
      // Drag zone data
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
      // Drop zone data
      drop: [
        {
          over: false,
          filled: false,
          text: "",
          from: null,
          definition: "Brazil"
        },
        {
          over: false,
          filled: false,
          text: "",
          from: null,
          definition: "England"
        },
        {
          over: false,
          filled: false,
          text: "",
          from: null,
          definition: "China"
        },
        {
          over: false,
          filled: false,
          text: "",
          from: null,
          definition: "Canada"
        }
      ]
    };
  },
  methods: {
    handleDrop(drop, data) {
      if (drop.from == null) {
        // Dropping to an unfilled area
        // Get the drag index from data and make drag item not draggable
        drop.from = data.from;
        this.drag[data.from].draggable = false;
        drop.over = true;
        drop.filled = true;
        drop.text = data.term;
      } else {
        // Dropping to a take drop zone
        // Replace existing term and enable its draggable property
        this.drag[drop.from].draggable = true;
        drop.from = data.from;
        this.drag[data.from].draggable = false;
        drop.over = true;
        drop.filled = true;
        drop.text = data.term;
      }
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
        drop.from = null;
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

// Change style when the term has already been placed
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
