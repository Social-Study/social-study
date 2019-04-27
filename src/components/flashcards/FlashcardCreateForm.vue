<!-- SCI ID: 035 -->
<!-- Name: FlashcardCreateForm -->
<!-- Version: 1.1 -->
<template>
  <div id="form">
    <span class="number">
        {{initNum + 1}}          
    </span>
    <span
      id="deleteBtn"
      class="icon icon-delete"
      @click="$emit('delete')"
    ></span>
    <div id="container">
      <div class="term-container">
        <label id="label-term" class="form-label">
          Term
        </label>
      <textarea
        id="input-term"
        v-model.trim="data.term"
        type="text"
        rows="1"
        cols="34"
        maxlength="150"
        ref="termText"
        autofocus
        placeholder="Enter Text"
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
          rows="1"
          maxlength="150"
          ref="definitionText"
          placeholder="Enter Text"
          @input="defUpdated"
          @keydown.ctrl.enter="$emit('addNew')"
          @keydown.tab.exact="$emit('addNew')"
        >
        </textarea>
      </div>
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
    },
    initNum: Number
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
  methods: {
    termUpdated() {
      this.$emit("termUpdated", this.data);
        const textBox = this.$refs.termText;
        textBox.style.height = "1px"
        textBox.style.height = (textBox.scrollHeight + 1) + "px";
        
    },
    defUpdated() {
      this.$emit("defUpdated", this.data);
      const textBox = this.$refs.definitionText;
      textBox.style.height = "1px"
      textBox.style.height = (textBox.scrollHeight + 1) + "px";
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

#form{
  background-color: white;
  width: 500px;
  margin: 10px;
  animation-name: grow;
  animation-duration: 0.25s;
  &:hover {
    box-shadow: $shadow-hovered;
  }
}

@keyframes grow {
  0% {  width:0; opacity: 0;  }
  100% {  width: 500px; opacity: 1; }
}

.number{
  color: $secondary-light;
  font-size: 20px;
  text-align: center;
  padding-left: 10px;
  float:left;
}

#deleteBtn{
  padding: 0px;
  margin-right: 5px;
  margin-top: 5px;
  float:right;
  color:$secondary-light;

  &:hover{
    color:red;
  }
}

#container {
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 100%;
  #input-term, #input-def{
    color:$secondary;
    background-color: transparent;
    border-bottom: 1px solid black;
  }
}

.term-container, .def-container{
  width: 90%;
  padding-top: 10px;
  padding-bottom: 30px;
}

label{
  margin-top: 0px;
  padding-top: 0px;
}

textarea{  
  border: none;
  resize:none;
  width:100%;
  &:focus{
    outline: none;
  }
}
</style>
