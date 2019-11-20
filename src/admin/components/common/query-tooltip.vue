<template lang="pug">
  .query-tooltip(
    v-if="show"
    :class="{'success': type === 'success', 'error': type === 'error'}"
  )
    span.query-tooltip__text {{text}}
    button(
      type="button"
      @click="CLOSE_TOOLTIP"
    ).btn.query-tooltip__close

  .query-tooltip(v-else)
    span.query-tooltip__text {{text}}
    button(
      type="button"
      @click="CLOSE_TOOLTIP"
    ).btn.query-tooltip__close

</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      timeout: 4000
    }
  },

  computed: {
    ...mapState("tooltip", {
      show: state => state.show,
      type: state => state.type,
      text: state => state.text
    })
  },

  methods: {
    ...mapMutations("tooltip", ["CLOSE_TOOLTIP"])
  },

  updated() {
    setTimeout(this["CLOSE_TOOLTIP"], this.timeout);
  }
};

</script>

<style lang="postcss" scoped>
@import "../../../styles/mixins.pcss";

.query-tooltip {
  position: fixed;
  z-index: 10000;
  width: auto;
  height: auto;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 45px 20px 30px;
  transition: all 0.7s ease;
}

.query-tooltip__text {
  color: #fff;
}

.query-tooltip__close {
  float: right;
  width: 14Px;
  height: 14Px;
  padding: 0;
  margin: 5px 0 0 35px;
  background: svg-load('cross.svg', fill=#ffffff, width=14Px, height=14Px);
  background-repeat: no-repeat;
  background-position: left top;
  cursor: pointer;
}

.query-tooltip.success {
  transform: translateX(-50%) translateY(-100px);
  background-color: #4bb133;
}

.query-tooltip.warning {
  transform: translateX(-50%) translateY(-100px);
  background-color: #b18333;
}

.query-tooltip.error {
  transform: translateX(-50%) translateY(-100px);
  background-color: #b13333;
}

</style>
