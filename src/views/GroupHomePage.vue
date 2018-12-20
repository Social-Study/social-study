<template>
  <div>
    <page-title>
      <template slot="center">
        Home
      </template>
    </page-title>
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
