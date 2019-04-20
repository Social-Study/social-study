<!-- SCI ID: 035 -->
<!-- Name: FlashcardCreateForm -->
<!-- Version: 1.1 -->
<template>
  <div id="form">
    <span
      id="deleteBtn"
      class="icon icon-delete"
      @click="$emit('delete')"
    ></span> 
    <div id="container">
      <div class="term-container">
        <label id="label-term" class="form-label">
          Front Side
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
      <div class="center">
          {{initNum + 1}}          
      </div>
      <div class="def-container">
        <label id="label-def" class="form-label">
          Back Side
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
  width: 90%;
  margin: 10px;
  &:hover {
    box-shadow: $shadow-hovered;
  }
}

.center{
  color: $secondary-light;
  font-size: 30px;
  text-align: center;
  margin: auto;
  padding: 0px;
  height: 100%;
  float:left;
  width: 100px;
}

#deleteBtn{

  padding: 0px;
  margin: 2px;
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
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  text-align: left;
  #input-term, #input-def{
    color:$secondary;
    background-color: transparent;
    border-bottom: 1px solid black;
  }
}


.def-container{
  float:right;
}
.term-container, .def-container{
  width: 30%;
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
