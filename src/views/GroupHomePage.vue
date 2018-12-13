<template>
  <page-title>{{ $store.getters.activeGroup.details.className }} Home</page-title>
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
