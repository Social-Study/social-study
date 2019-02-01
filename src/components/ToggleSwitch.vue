<template>
  <div id="switch-container">
    <input
      type="checkbox"
      id="switch"
      v-model="toggled"
      @change="$emit('toggle', toggled)"
    /><label for="switch">Toggle</label>

    <h4 v-if="values">{{status}}</h4>
  </div>
</template>

<script>
export default {
  name: "ToggleSwitch",
  props: {
    // Values are the strings that should be displayed when the switch is toggled on or off. Array should contain two strings (off val then on val)
    values: {
      type: Array,
      required: false
    },
    default: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      toggled: this.default
    };
  },
  computed: {
    status() {
      return this.toggled ? this.values[1] : this.values[0];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles.scss";

$switch-height: 36px;
$switch-width: 70px;
$toggle-size: 30px;

#switch-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
}

h4 {
  margin: 0;
  color: $secondary;
  font-family: $primary-font;
  font-weight: 400;
  font-size: 16px;
  text-align: right;
  max-width: 50px;
  min-width: 50px;
}

input[type="checkbox"] {
  height: 0;
  width: 0;
  visibility: hidden;
}

label {
  cursor: pointer;
  text-indent: -9999px;
  width: $switch-width;
  height: $switch-height;
  background: grey;
  display: block;
  border-radius: $switch-height;
  position: relative;
  margin: 0 10px;
}

label:after {
  content: "";
  position: absolute;
  top: 3px;
  left: 3px;
  width: $toggle-size;
  height: $toggle-size;
  background: #fff;
  border-radius: 30px;
  transition: 0.3s;
}

input:checked + label {
  background-image: $nav-gradient;
}

input:checked + label:after {
  left: calc(100% - 5px);
  transform: translateX(-100%);
}

label:active:after {
  width: 30px;
}
</style>
