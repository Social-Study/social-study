<template>
  <div>
    <!-- <page-title v-if=" $store.getters.activeGroup.details.className !== null">
      {{ $store.getters.activeGroup.details.className }} Home
    </page-title> -->
    <page-title>Home</page-title>
  </div>
</template>

<script>
import { checkAccess } from "@/scripts/groupFuncs";
import PageTitle from "@/components/PageTitle";

export default {
  name: "GroupHomePage",
  components: {
    PageTitle
  }
};
</script>
<style lang="scss" scoped>
</style>
