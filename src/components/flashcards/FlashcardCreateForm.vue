<template>
  <div id="container">
    <div id="card-header">
      <label id="label-term" class="form-label">
        Term
      </label>
      <i id="delete" class="fas fa-minus" @click="$emit('delete')"></i>
    </div>
    <input
      id="input-term"
      v-model.trim="data.term"
      type="text"
      class="form-input"
      maxlength="30"
      autofocus
      @input="termUpdated"
    />
    <label id="label-def" class="form-label">
      Definition
    </label>
    <textarea
      id="input-def"
      v-model.trim="data.def"
      type="text"
      class="form-input"
      rows="3"
      maxlength="150"
      @input="defUpdated"
      @keydown.ctrl.enter="$emit('addNew')"
      @keydown.tab.exact="$emit('addNew')"
    >
    </textarea>
  </div>
</template>

<script>
export default {
  name: "FlashcardCreateForm",
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
    termUpdated() {
      this.$emit("termUpdated", this.data);
    },
    defUpdated() {
      this.$emit("defUpdated", this.data);
    }
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
  margin: 0 40px 40px 0;
  background-color: white;

  .form-label {
    color: $secondary;
  }

  &:hover {
    box-shadow: $shadow-hovered;
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
}
</style>
