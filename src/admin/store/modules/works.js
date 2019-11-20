export default {
  namespaced: true,
  state: {
    works: []
  },
  mutations: {
    SET_WORKS(state, works) {
      state.works = works;
      console.log('Список работ => ',state.works);
    },

    ADD_WORK(state, work) {
      state.works.unshift(work);
    },

    EDIT_WORK(state, editedWork) {
      console.log('editedWork в Мутации: ',editedWork);
      console.log('editedWork.id: ', editedWork.id);
      state.works = state.works.map(work => {
        return work.id === editedWork.id ? editedWork : work;
      });
      console.log('Новый список работ => ', state.works);
    },

    DELETE_WORK(state, deletedWork) {
      console.log('Приходит в мутацию: ',deletedWork);
      console.log('deletedWork.id: ',deletedWork.id);
      state.works = state.works.filter(
        work => work.id !== deletedWork.id
      );
    }
  },
  actions: {
    async addWork({ commit }, work) {
      console.log('Добавляемая работа: ', work);
      try {
        const formData = new FormData();

        Object.keys(work).forEach(key => {
          formData.append(key, work[key]);
        })

        console.log('formData: ',formData);
        const { data } = await this.$axios.post('/works', formData);

        console.log('data, передаваемая в Коммит: ',data);
        commit("ADD_WORK", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    async editWork({ commit }, editedWork) {
      console.log('Редактируемая работа: ',editedWork);
      try {
        const formData = new FormData();

        Object.keys(editedWork).forEach(key => {
          formData.append(key, editedWork[key]);
          console.log('editedWork[key] = ', editedWork[key]);
        })

        console.log('formData: ',formData);
        const { data } = await this.$axios.post(`/works/${editedWork.id}`, formData);

        console.log('Дата, передаваемая в Коммит: ',data.work);
        commit("EDIT_WORK", data.work);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    async removeWork({ commit }, deletedWork) {
      try {
        console.log('Приходит в экшн: ',deletedWork);
        const { data } = await this.$axios.delete(`/works/${deletedWork.id}`);
        commit("DELETE_WORK", deletedWork);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },

    async fetchWorks({ commit }) {
      try {
        const { data } = await this.$axios.get("/works/198");
        commit("SET_WORKS", data);
      } catch (error) {}
    }
  }
};
