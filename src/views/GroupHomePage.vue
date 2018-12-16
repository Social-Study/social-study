<template>
  <page-title v-if=" $store.getters.activeGroup.details.className !== null">
    {{ $store.getters.activeGroup.details.className }} Home
  </page-title>
</template>

<script>
import { checkAccess } from "../scripts/groupFuncs";
import PageTitle from "../components/PageTitle";

export default {
  name: "GroupHomePage",
  components: {
    PageTitle
  }
};
</script>
<style lang="scss" scoped>
.error-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
