<template lang="pug">
.review-container
  .reviews__header.bottom-line
    .reviews__photo
      img(:src="`https://webdev-api.loftschool.com/${review.photo}`" :alt='review.author').reviews__img
    .reviews__author {{review.author}}
      span.reviews__author-title {{review.occ}}
  .reviews__desc {{review.text}}
  .card-footer
    button(@click="editReview").card-footer__btn.pencil-btn Править
    button(@click="removeExistedReview").card-footer__btn.remove-btn Удалить
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    review: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      deletedReview: {...this.review}
    }
  },

  methods: {
    ...mapActions("reviews", ["removeReview"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editReview() {
      this.$emit("editReview", this.review);
    },

    async removeExistedReview() {
      try {
        await this.removeReview(this.deletedReview);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Отзыв удалён!'
        });

      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    }
  }
};
</script>

<style lang="postcss" scoped>
.card-footer__btn {
  padding: 0;
  text-align: left;
  background-position: right top 3Px !important;
  background-repeat: no-repeat !important;
  background-size: 17px 17px !important;
}

.pencil-btn {
  background: svg-load('pencil.svg', fill=#373bd0, width=100%, height=100%);
}

.remove-btn {
  background: svg-load('cross.svg', fill=red, width=100%, height=100%);
}
</style>
