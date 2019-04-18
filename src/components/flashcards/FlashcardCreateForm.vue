<!-- SCI ID: 035 -->
<!-- Name: FlashcardCreateForm -->
<!-- Version: 1.0 -->
<template>
  <div id="container">
    <div class="term-container">
      <label id="label-term" class="form-label">
        Term
      </label>
      <!-- <i id="delete" class="fas fa-minus" @click="$emit('delete')"></i> -->
    <input
      id="input-term"
      v-model.trim="data.term"
      type="text"
      maxlength="30"
      autofocus
      @input="termUpdated"
    />
    </div>
    <div class="def-container">
      <label id="label-def" class="form-label">
        Definition
      </label>
      <textarea
        id="input-def"
        v-model.trim="data.def"
        type="text"
        rows="3"
        maxlength="150"
        @input="defUpdated"
        @keydown.ctrl.enter="$emit('addNew')"
        @keydown.tab.exact="$emit('addNew')"
      >
      </textarea>
    </div>
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


#container {
  display:flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  margin: 10px;
  width: 50%;
  width: 500px;
  background-color: white;

  .form-label {
    color: $secondary;
  }

  text-align: left;

  &:hover {
    box-shadow: $shadow-hovered;
  }

  .term-container{
    text-align: center;
    margin: 10px;

  }
  #input-term, #input-def{
    color: $dark;
    margin: auto;
    width: 50%;
  }


  .def-container{
    text-align: center;
    float:right;
  }
}

input, textarea{
  border: none;
  background-color: $light;

  &:focus{
    outline: none;
  }
}
textarea {
  width: 75%;
  resize: none;
}
</style>
