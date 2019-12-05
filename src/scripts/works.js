import Vue from "vue";
import axios from "axios";

const thumbs = {
  template: "#slider-thumbs",
  props: [ "works", "currentWork" ],
  computed: {
    previewWorks() {
      return this.resortWorksToLastActive(this.works, this.currentWork);
    }
  },
  methods: {
    resortWorksToLastActive(works, active) {
      return works[works.length - 1] === active ? works : [...works.slice(works.indexOf(active) + 1), ...works.slice(0, works.indexOf(active)), ...[active]];
    }
  }

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
  props: [ "works", "currentWork", "currentIndex"]
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
      for(let i = 0; i < this.works.length; i += 1) {
        if (this.works[i].id === work) {
          this.currentIndex = i;
        }
      }
    }
  },

  created() {
    axios
      .get("https://webdev-api.loftschool.com/works/198")
      .then(response => {
        const data = response.data;
        this.works = data;
      })
      .catch(error => console.error(error.message));
  }
});
