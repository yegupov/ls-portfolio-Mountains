<template lang="pug">
  .tabs__tab-content
    .tabs__tab-content-header
      h2.tabs__tab-headline Блок «Отзывы»
    reviews-form(
      :review="review"
      :editMode="editMode"
      :editedReview="editedReview"
      :visibleEditForm="visibleEditForm"
      @exitEditMode="editModeOut"
      @hideReviewForm="hideForm"
    )

    ul.tabs__list-items
      li.reviews.card.card-add(v-if="visibleEditForm === false")
        a(href="#review-form" @click.prevent="visibleEditForm = true").card-add__link
          .icon-plus
            span.icon-plus__rect
          .card-add__text Добавить отзыв

      li.reviews.card(v-for="review in reviews" :key="review.id" :class="{editable: review.id === editedReviewId}")
        reviews-card(
          :review="review"
          @editReview="editReview"
        )      
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  components: {
    reviewsForm: () => import("../reviews-form"),
    reviewsCard: () => import("../reviews-card")
  },

  data: () => ({
    visibleEditForm: false,
    editMode: false,
    editedReviewId: 0,
    editedReview: {},
    review: {
      photo: "",
      author: "",
      occ: "",
      text: ""
    }
  }),

  created() {
    this.fetchReviews();
  },

  computed: {
    ...mapState("reviews", {
      reviews: state => state.reviews
    })
  },

  methods: {
    ...mapActions("reviews", ["addReview", "fetchReviews"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editReview(review) {
      this.visibleEditForm = true;
      this.editMode = true;
      this.editedReview = review;
      console.log('Отзыв, который начинаем редактировать: ', this.editedReview);
      this.editedReviewId = review.id;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    editModeOut() {
      this.editMode = false;
    },

    hideForm() {
      this.visibleEditForm = false;
      this.editMode = false;
      this.editedReviewId = 0;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="postcss">
  @import "../../../styles/mixins.pcss";

  .reviews {
    position: relative;
    width: calc( (100% - 54px) / 3);
    padding: 35px 35px 100px;
    margin: 0 27px 27px 0;
    @include tablets() {
      width: calc( (100% - 27px) / 2);
    }
    @include phones() {
      width: 100%;
      margin: 0 0 27px 0 !important;
    }
    &:nth-child(3n) {
      margin: 0 0 27px 0;
      @include tablets() {
        margin: 0 27px 27px 0;
      }
    }
    &:nth-child(2n) {
      @include tablets() {
        margin: 0 0 27px 0;
      }
    }
    .reviews__header {
      display: flex;
      align-items: center;
      padding-bottom: 30px;
      margin-bottom: 30px;
      .reviews__photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 15px;
        .reviews__img {
          width: 100%;
        }
      }
      .reviews__author {
        font-weight: 600;
        .reviews__author-title {
          display: block;
          margin-top: 5px;
          font-weight: 300;
          color: #b0b3ba;
        }
      }
    }
    .reviews__desc {
      line-height: 1.8;
    }
  }
</style>
