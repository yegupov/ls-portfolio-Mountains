export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
      console.log('Список отзывов => ',state.reviews);
    },

    ADD_REVIEW(state, review) {
      state.reviews.unshift(review);
    },

    EDIT_REVIEW(state, editedReview) {
      console.log('editedReview в Мутации: ',editedReview);
      console.log('editedReview.id: ', editedReview.id);
      state.reviews = state.reviews.map(review => {
        return review.id === editedReview.id ? editedReview : review;
      });
      console.log('Новый список отзывов => ', state.reviews);
    },

    DELETE_REVIEW(state, deletedReview) {
      console.log('Приходит в мутацию: ',deletedReview);
      console.log('deletedReview.id: ',deletedReview.id);
      state.reviews = state.reviews.filter(
        review => review.id !== deletedReview.id
      );
    }
  },
  actions: {
    async addReview({ commit }, review) {
      console.log('Добавляемый отзыв: ', review);
      try {
        const formData = new FormData();

        Object.keys(review).forEach(key => {
          formData.append(key, review[key]);
        })

        console.log('formData: ',formData);
        const { data } = await this.$axios.post('/reviews', formData);

        console.log('data, передаваемая в Коммит: ',data);
        commit("ADD_REVIEW", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    async editReview({ commit }, editedReview) {
      console.log('Редактируемая отзыв: ',editedReview);
      try {
        const formData = new FormData();

        Object.keys(editedReview).forEach(key => {
          formData.append(key, editedReview[key]);
          console.log('editedReview[key] = ', editedReview[key]);
        })

        console.log('formData: ',formData);
        const { data } = await this.$axios.post(`/reviews/${editedReview.id}`, formData);

        console.log('Дата, передаваемая в Коммит: ',data.review);
        commit("EDIT_REVIEW", data.review);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    async removeReview({ commit }, deletedReview) {
      try {
        console.log('Приходит в экшн: ',deletedReview);
        const { data } = await this.$axios.delete(`/reviews/${deletedReview.id}`);
        commit("DELETE_REVIEW", deletedReview);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    async fetchReviews({ commit }) {
      try {
        const { data } = await this.$axios.get("/reviews/198");
        commit("SET_REVIEWS", data);
      } catch (error) {}
    }
  }
};
