import Vue from "vue";

const skill = {
  template: "#skill",
  props: ["skillPercent", "skillName"],
  methods: {
    drawColoredCircle() {
      const circle = this.$refs["color-circle"];
      circle.style.animationDelay = '-' + this.skillPercent + 's';
    }
  },
  mounted() {
    this.drawColoredCircle();
  }
};

const skillsRow = {
  template: "#skills-row",
  components: { skill },
  props: ["skill"]
};

new Vue({
  el: "#skills-component",
  template: "#skills-list",
  components: { skillsRow },
  data: () => ({
    skills: []
  }),
  created() {
    this.skills = require("../data/skills.json");
  }
});
