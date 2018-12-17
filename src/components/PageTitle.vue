<template>
  <h1 class="page-title text-ellipsis">
    <slot></slot>
  </h1>
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
  width: 100%;
  margin: 0;
}
</style>
