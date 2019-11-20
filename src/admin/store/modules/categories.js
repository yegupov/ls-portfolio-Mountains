const findRequiredCategory = (category, skill, cb) => {
  if (category.id === skill.category) {
    cb(category);
  }

  return category;
};

export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
      console.log('state.categories => ',state.categories);
    },
    ADD_CATEGORY(state, category) {
      state.categories.unshift(category);
    },
    EDIT_NAME_CATEGORY(state, editedCategory) {
      //-console.log('editedCategory: ',editedCategory);
      //-console.log('New name: ',editedCategory.category.category);
      state.categories = state.categories.map(category => {
        if (category.id === editedCategory.category.id) {
          category.category = editedCategory.category.category;
        }
        return category;
      });
      //-console.log('Новый state => ',state.categories);
    },
    DELETE_CATEGORY(state, deletedCategory) {
      //-console.log('Приходит в мутацию: ',deletedCategory);
      state.categories = state.categories.filter(
        category => category.id !== deletedCategory
      );
    },
    ADD_SKILL(state, newSkill) {
      state.categories = state.categories.map(category => {
        if (category.id === newSkill.category) {
          category.skills.push(newSkill);
        }

        return category;
      });
    },
    REMOVE_SKILL(state, deletedSkill) {
      const removeSkill = category => {
        category.skills = category.skills.filter(
          skill => skill.id !== deletedSkill.id
        );
      };

      const findRequiredCategory = category => {
        if (category.id === deletedSkill.category) {
          removeSkill(category);
        }

        return category;
      };

      state.categories = state.categories.map(findRequiredCategory);
    },
    EDIT_SKILL(state, editedSkill) {
      const editSkill = category => {
        category.skills = category.skills.map(skill =>
          skill.id === editedSkill.id ? editedSkill : skill
        );
      };

      state.categories = state.categories.map(category =>
        findRequiredCategory(category, editedSkill, editSkill(category))
      );
    }
  },
  actions: {
    async addCategory({ commit }, title) {
      try {
        const { data } = await this.$axios.post("/categories", { title });
        commit("ADD_CATEGORY", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async editNameCategory({ commit }, editedCategory) {
      try {
        //-console.log('ИД измененной категории: ',editedCategory.id);
        //-console.log('Новое имя: ',editedCategory.category);

        const { data } = await this.$axios.post(`/categories/${editedCategory.id}`, { title: editedCategory.category});

        //-console.log('Дата, передаваемая в Коммит: ',data);
        commit("EDIT_NAME_CATEGORY", data);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async deleteCategory({ commit }, deletedCategory) {
      try {
        //-console.log('Приходит в экшн: ',deletedCategory);
        const { data } = await this.$axios.delete(`/categories/${deletedCategory}`);
        commit("DELETE_CATEGORY", deletedCategory);
      } catch (error) {
        throw new Error(
          error.response.data.error || error.response.data.message
        );
      }
    },
    async fetchCategories({ commit }) {
      try {
        const { data } = await this.$axios.get("/categories/198");
        commit("SET_CATEGORIES", data);
      } catch (error) {}
    }
  }
};
