<template lang="pug">
  .skills__header.bottom-line(v-if="editMode === false")
    input(type='text' :placeholder="category.category").card__input
    .skills__btns
      button(type="button" data-tooltip="Редактировать название" @click="editMode = true").skills__btn.pencil-btn
      button(type="button" data-tooltip="Удалить группу" @click="deleteSelectedCategory").skills__btn.trash-btn

  .skills__header.bottom-line(v-else)
    input(type='text' v-model="editedCategory.category").card__input.card__input-active
    .skills__btns
      button(type="button" data-tooltip="Переименовать" @click="editExistedNameCategory").skills__btn.tick-btn
      button(type="button" data-tooltip="Отменить" @click="editMode = false").skills__btn.remove-btn
</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    category: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      editedCategory: {...this.category},
      deletedCategory: this.category.id
    }
  },
  methods: {
    ...mapActions("categories", ["editNameCategory", "deleteCategory"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async editExistedNameCategory() {
      try {
        await this.editNameCategory(this.editedCategory);

        this.editMode = false;
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Наименование отредактировано!'
        });
      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    },

    async deleteSelectedCategory() {
      try {
        await this.deleteCategory(this.deletedCategory);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Группа удалена!'
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


</style>
