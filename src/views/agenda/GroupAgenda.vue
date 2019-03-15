<template>
  <!-- <h1>Quiz Creation</h1> -->
  <div>
    <page-title>
      <template slot="center">
        Group Agenda
      </template>
    </page-title>
    <div class="content-container">
      This is the page content.
    </div>
  </div>
</template>

<script>
import PageTitle from "@/components/navigation/PageTitle";

export default {
  name: "GroupAgenda",
  components: {
    PageTitle
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

.content-container {
  height: $page-with-header-height;
}
</style>
