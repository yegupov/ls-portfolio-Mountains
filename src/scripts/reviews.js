import Vue from 'vue'
import Flickity from 'vue-flickity'
import axios from "axios";

const slide = {
  template: '#reviews-slide',
  props: {
    review: Object
  }
}

new Vue({
  el: '#reviews-component',
  template: '#reviews-container',
  components: {
    Flickity,
    slide
  },
  data: {
    reviews: [],
    flickityOptions: {
      initialIndex: 0,
      prevNextButtons: true,
      pageDots: false,
      wrapAround: false,
      groupCells: true

      // any options from Flickity can be used
    },
    currentIndex: 0
  },
  methods: {
    onInit() {
      this.$refs.flickity.on('change', (event) => {
        this.currentIndex = event

        if (!this.$refs.flickity.$flickity.nextButton.isEnabled)
          this.currentIndex = this.reviews.length
      })
    },
    makeArrWithRequiredImages(data) {
      return data.map((item) => {
        const requiredPic = require(`../images/content/${item.avatar}`)
        item.avatar = requiredPic

        return item
      })
    }
  },

  created() {
    axios
      .get("https://webdev-api.loftschool.com/reviews/198")
      .then(response => {
        const data = response.data;
        //-this.works = this.makeArrWithRequiredImages(data);
        this.reviews = data;
        console.log('Дата из стейта: ', data);
        console.log('Отзывы из стейта: ', this.reviews);
      })
      .catch(error => console.error(error.message));
    //-const data = require('../data/reviews.json')
    //-this.reviews = this.makeArrWithRequiredImages(data)
  },

  mounted() {
    const items = document.querySelectorAll('.reviews__slider-item');
  }
})
