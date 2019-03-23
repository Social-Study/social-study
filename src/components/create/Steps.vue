<template>
  <!-- Bottom Of Page Steps Indicator -->
  <ul class="step">
    <li
      :class="active === 0 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Group Name"
      >Step 1</a>
    </li>
    <li
      :class="active === 1 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Instructor's Name"
      >Step 2</a>
    </li>
    <li
      :class="active === 2 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Meeting Times"
      >Step 3</a>
    </li>
    <li
      :class="active === 3 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Meeting Location"
      >Step 4</a>
    </li>
    <li
      :class="active === 4 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Instructor Website"
      >Step 5</a>
    </li>
    <li
      :class="active === 5 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Additional Information"
      >Step 6</a>
    </li>
    <li
      :class="active === 6 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Confirm Creation"
      >Step 7</a>
    </li>
    <li
      :class="active === 7 ? 'active' : ''"
      class="step-item"
    >
      <a
        class="tooltip"
        data-tooltip="Success"
      >Done</a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "Steps",
  props: {
    active: {
      type: Number,
      required: true
    }
  }
};
</script>


<style lang="scss" scoped>
@import "@/styles.scss";

.step {
  box-shadow: $shadow;
  position: fixed;
  bottom: 0;
  padding: 5px 10px;
  margin: 30px auto;
  width: 80%;
  border-radius: 10px;
}
</style>
