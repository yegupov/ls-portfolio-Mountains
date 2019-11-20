import Vue from "vue";
import axios from "axios";

const thumbs = {
  template: "#slider-thumbs",
  props: [ "works", "currentWork" ]
};

const btns = {
  template: "#slider-btns"
};

const display = {
  template: "#slider-display",
  components: {
    btns,
    thumbs
  },
  props: [ "works", "currentWork", "currentIndex" ],
  computed: {
    reversedWorks() {
      const works = [...this.works];
      return works.reverse();
    }
  }
};

const tags = {
  template: "#slider-tags",
  props: [ "tagsArray" ]
};

const info = {
  template: "#slider-info",
  components: {
    tags
  },
  props: [ "currentWork" ],
  computed: {
    tagsArray() {
      //-console.log('Теги currentWork: ', this.currentWork.techs.split(','));
      return this.currentWork.techs.split(',');
    }
  }
};

new Vue({
  el: "#works-component",
  template: "#slider-container",
  components: {
    display,
    info
  },

  data: () => ({
    works: [],
    currentIndex: 0
  }),

  computed: {
    currentWork() {
      console.log('currentWork: ', this.works[this.currentIndex]);
      return this.works[this.currentIndex];
    }
  },

  watch: {
    currentIndex(value) {
      this.makeInfiniteLoopForCurIndex(value);
    }
  },

  methods: {
    makeInfiniteLoopForCurIndex(value) {
      const worksAmount = this.works.length - 1;
      if (value > worksAmount) this.currentIndex = 0;
      if (value < 0) this.currentIndex = worksAmount;
    },

    makeArrWithRequiredImages(data) {
      return data.map(item => {
        const requiredPic = require(`../images/content/${item.photo}`);
        item.photo = requiredPic;

        return item;
      });
    },

    handleSlide(direction) {
      switch (direction) {
        case "next":
          this.currentIndex++;
          break;
        case "prev":
          this.currentIndex--;
          break;
      }
    },

    setSlide(work) {
      this.currentIndex = work - 1;
    }
  },

  created() {
    axios
      .get("https://webdev-api.loftschool.com/works/198")
      .then(response => {
        const data = response.data;
        //-this.works = this.makeArrWithRequiredImages(data);
        this.works = data;
        console.log('Дата из стейта: ', data);
        console.log('Работы из стейта: ', this.works);
      })
      .catch(error => console.error(error.message));
    //-const data = require("../data/works.json");
    //-this.works = this.makeArrWithRequiredImages(data);
  }
});
