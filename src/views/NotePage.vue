<template>
  <div>
    <page-title class="text-left"> TITLE HERE</page-title>
    <div class="content-container">
      <textarea
        v-model="userText"
        class="page-edit"
      >
      </textarea>
      <div
        v-html="render"
        class="page-view markdown-body"
      ></div>
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/PageTitle";
let marked = require("marked");

export default {
  name: "NotePage",
  components: {
    PageTitle
  },
  data() {
    return {
      userText: ""
    };
  },
  computed: {
    render() {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: true,
        smartLists: false,
        smartypants: false
      });
      return marked(this.userText);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styleVariables";
@import "../../node_modules/spectre-markdown.css/dist/markdown.min.css";
@import "../../node_modules/github-markdown-css/github-markdown.css";

.content-container {
  display: inline-block;
  // height: 100%;
  margin: 40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
}

.page-edit {
  padding: 10px;
  box-shadow: $shadow;
  border: none;
  display: inline-block;
  min-height: 800px;
  width: 50%;
  margin-right: 40px;
  background-color: white;
  color: black;
  text-align: left;
  resize: none;
}

.page-view {
  padding: 10px !important;
  box-shadow: $shadow;
  font-family: "Inter UI";
  background-color: white;
  padding: 0;
  overflow-y: auto;
  text-align: left;
  min-height: 800px;
  max-height: 800px;
  width: 50%;
}
</style>
