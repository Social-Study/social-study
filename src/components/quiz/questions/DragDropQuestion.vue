<template>
  <div id="question">
    <h1>Match each term to its definition</h1>
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
          :class="{correct: slot.isCorrect}"
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
  props: {
    terms: {
      type: Array,
      required: true
    },
    defs: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      // Drag zone data
      drag: [],
      // Drop zone data
      drop: []
    };
  },
  created() {
    // Create the drag and drop data objects
    for (let i = 0; i < this.terms.length; i++) {
      this.drag.push({
        term: this.terms[i],
        draggable: true
      });

      this.drop.push({
        definition: this.defs[i],
        correctTerm: this.terms[i],
        isCorrect: false,
        text: "", // Drop Zone text (set to the term when dropped)
        over: false, // Hovering over drop zone?
        filled: false, // Drop zone filled with term?
        from: null // Index of the drag term dropped in the zone
      });
    }

    // Shuffle the array of term objects so it is difficult to match to their defs
    for (let i = this.drop.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.drop[i], this.drop[j]] = [this.drop[j], this.drop[i]];
    }
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
        this.$emit("answered", true);
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
      this.checkCorrect(drop);
    },
    checkCorrect(drop) {
      if (drop.text === drop.correctTerm) {
        this.$emit("correct", true);
        drop.isCorrect = true;
      } else {
        drop.isCorrect = false;
        this.$emit("correct", false);
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
        drop.isCorrect = false;
        this.$emit("answered", false);
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
  justify-content: space-evenly;
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
  justify-content: center;
  align-items: center;

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

.correct {
  color: green;
}
</style>
