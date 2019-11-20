import Vue from "vue";
import axios from "axios";

const skill = {
  template: "#skill",
  props: ["skillPercent", "skillTitle"],
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
    axios
      .get("https://webdev-api.loftschool.com/categories/198")
      .then(response => {
        const data = response.data;
        this.skills = data;
        //-console.log('Категории и Навыки из стейта: ', data);
      })
      .catch(error => console.error(error.message));
    //-this.skills = require("../data/skills.json");
  }
});
