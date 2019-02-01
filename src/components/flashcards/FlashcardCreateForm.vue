<template>
  <div id="container">
    <div id="card-header">
      <label
        class="form-label"
        id="label-term"
      >
        Term
      </label>
      <i
        id="delete"
        class="fas fa-minus"
        @click="$emit('delete')"
      ></i>
    </div>
    <input
      type="text"
      class="form-input"
      id="input-term"
      maxlength="30"
      v-model="data.term"
      v-on:input="TermUpdated"
      autofocus
    >
    <label
      class="form-label"
      id="label-def"
    >
      Definition
    </label>
    <textarea
      type="text"
      class="form-input"
      id="input-def"
      rows="3"
      maxlength="150"
      v-model="data.def"
      v-on:input="DefUpdated"
      @keydown.ctrl.enter="$emit('addNew')"
      @keydown.tab="$emit('addNew')"
    >
  </textarea>
  </div>
</template>

<script>
export default {
  name: "flashcardCreateForm",
  props: {
    initTerm: {
      type: String,
      default: "",
      required: false
    },
    initDef: {
      type: String,
      default: "",
      required: false
    }
  },
  data() {
    return {
      data: {
        index: 0,
        term: this.initTerm,
        def: this.initDef
      }
    };
  },
  created() {},
  methods: {
    debug() {
      console.log("clicked");
    },
    TermUpdated(event) {
      this.$emit("termUpdated", this.data);
    },
    DefUpdated(event) {
      this.$emit("defUpdated", this.data);
    },
    ErrorCheck() {}
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#card-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;

  #label-term {
    flex: 2;
  }

  #delete {
    cursor: pointer;
    flex: 0;

    position: relative;

    color: red;
    font-size: 20px;

    &:hover {
      color: lighten(red, 20);
    }
  }
}

#container {
  // margin: 25px;
  // margin-top: 30px;
  // background-image: $orange-gradient;
  padding: 10px;
  height: 250px;
  width: 250px;
  border-radius: 10px;
  margin: 0 40px 40px 0;
  // box-shadow: $shadow-hovered;
  border: 1px solid $secondary-light;

  .form-label {
    color: $secondary;
  }

  &:hover {
    box-shadow: $shadow-heavy;
  }
}
#input-term {
  text-align: center;
}

#label-def {
  margin-top: 10px;
}
label {
  color: white;
}
textarea {
  resize: none;
  border-radius: 5px;
}
input {
  border-radius: 5px;
}
</style>
