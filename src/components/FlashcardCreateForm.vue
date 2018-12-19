<template>
<div id="container">
  <label class="form-label" id="label-term"> 
    Term 
  </label>
  <input 
    type="text" 
    class="form-input" 
    id="input-term"
    maxlength="15"
    v-model="data.term"
    v-on:input="TermUpdated"

  >
  <label class="form-label" id="label-def"> 
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

  > 
  </textarea>
</div>
</template>

<script>
export default {
  name: "flashcardCreateForm",
  props: {
    index: Number
  },
  data(){
    return {
      data:{
        index: 0,
        term: '',
        def: ''
      }

    };
  },
  created(){
    this.data.index = this.index;
  },
  methods:{
    TermUpdated(event){
      this.$emit('termUpdated', this.data);
    },
    DefUpdated(event){
      this.$emit('defUpdated', this.data);
    },
    ErrorCheck(){

    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables.scss";

#container{
  margin: 25px;
  margin-top: 30px;
  background-image: $orange-gradient;
  padding: 10px;
  height: 250px;
  width: 240px;
  border-radius: 10px;
  box-shadow: $shadow;
  &:hover {
    box-shadow: $shadow-hovered;
  }
}
#input-term{
  text-align: center;
}

#label-def{
  margin-top: 10px;
}
label{
  color:white;
}
textarea{
  resize: none;
  border-radius: 5px;
}
input{
  border-radius: 5px;
}
</style>
