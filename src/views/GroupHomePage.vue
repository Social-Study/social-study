<template>
  <div :class="isActive ? 'chat-active' : 'chat-inactive'">

    <page-title v-if=" $store.getters.activeGroup.details.className !== null">
      {{ $store.getters.activeGroup.details.className }} Home
    </page-title>
    <button @click="isActive = !isActive">X</button>
    <chat :show="isActive" />
  </div>
</template>

<script>
import { checkAccess } from "@/scripts/groupFuncs";
import PageTitle from "@/components/PageTitle";
import Chat from "@/components/Chat";

export default {
  name: "GroupHomePage",
  components: {
    Chat,
    PageTitle
  },
  data() {
    return {
      isActive: true
    };
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

.chat-active {
  margin-right: 300px;
  transition: 1s;
}

.chat-inactive {
  margin-right: 0px;
  transition: 1s;
}
</style>
