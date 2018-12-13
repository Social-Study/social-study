<template>
  <!-- FIXME: If the user reloads the page an error is displayed in the console but it works fine -->
  <page-title v-if=" $store.getters.activeGroup.details.className !== null">
    {{ $store.getters.activeGroup.details.className }} Home
  </page-title>
</template>

<script>
import PageTitle from "../components/PageTitle";

export default {
  name: "GroupHomePage",
  components: {
    PageTitle
  }
};
</script>
