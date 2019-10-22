import Vue from "vue";

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
      return this.currentWork.skills.split(',');
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
      console.log(work);
      this.currentIndex = work - 1;
    }
  },
  created() {
    const data = require("../data/works.json");
    this.works = this.makeArrWithRequiredImages(data);
  }
});
