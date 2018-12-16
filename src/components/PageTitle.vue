<template>
  <h1 class="page-title"><slot></slot></h1>
</template>

<script>
export default {
  name: "PageTitle"
};
</script>

<style lang="scss" scoped>
.page-title {
  user-select: none;
  padding: 8px 0px;
  background-color: #c4c4c4;
  max-height: 6vh;
  min-height: 6vh;
  width: 100%;
  margin: 0;
}
</style>
