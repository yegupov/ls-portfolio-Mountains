<template lang="pug">
  li.skills__list-item(v-if="editMode === false")
    ul.skills__list-row
      li.skills__list-cell
        input(type='text' :placeholder="skill.title").card__input
      li.skills__list-cell
        input(type='text' :placeholder="skill.percent").card__input.card__input-percentage
      li.skills__list-cell
        button(type="button" data-tooltip="Редактировать" @click="editMode = true").skills__btn.pencil-btn
      li.skills__list-cell
        button(type="button" data-tooltip="Удалить" @click="removeExistedSkill").skills__btn.trash-btn

  li.skills__list-item(v-else)
    ul.skills__list-row
      li.skills__list-cell
        input(type="text" v-model="editedSkill.title").card__input.card__input-active
      li.skills__list-cell
        input(type="text" v-model="editedSkill.percent").card__input.card__input-percentage.card__input-active
      li.skills__list-cell
        button(type="button" data-tooltip="Сохранить" @click="editExistedSkill").skills__btn.tick-btn
      li.skills__list-cell
        button(type="button" data-tooltip="Отменить" @click="editMode = false").skills__btn.remove-btn

</template>

<script>
import { mapActions, mapMutations } from "vuex";

export default {
  props: {
    skill: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },
  data() {
    return {
      editMode: false,
      editedSkill: {...this.skill}
    }
  },
  methods: {
    ...mapActions("skills", ["removeSkill", "editSkill"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async editExistedSkill() {
      try {
        await this.editSkill(this.editedSkill);
        this.editMode = false;
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Навык отредактирован!'
        });
      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    },
    async removeExistedSkill() {
      try {
        await this.removeSkill({
          id: this.skill.id,
          category: this.skill.category
        });

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Навык удалён!'
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

<style lang="postcss">
@import "../../styles/mixins.pcss";

.skills__list-item {
  margin: 0;
  padding: 0;
  .skills__list-row {
    display: flex;
    justify-content: space-between;
    margin: 0;
    padding: 0;
    .skills__list-cell {
      text-align: center;
      padding: 6px 0;
      &:nth-child(1) {
        width: 62%;
        margin-right: 3%;
        text-align: left;
        @include tablets() {
          width: 50%;
        }
      }
      &:nth-child(2) {
        position: relative;
        width: 16%;
        margin-right: 5%;
        @include tablets() {
          width: 28%;
        }
        &:after {
          position: absolute;
          right: 20px;
          top: 9px;
          content: '%';
          color: #9da9c3;
          font-size: 18px;
          @include tablets() {
            top: 11px;
          }
        }
      }
      &:nth-child(3) {
        width: 7%;
        min-width: 20px;
      }
      &:nth-child(4) {
        width: 7%;
        min-width: 20px;
      }
    }
  }
  .skills__list-row-active {
    .skills__list-cell:nth-child(1) {
      border-bottom: 1px solid #000;
    }
    .skills__list-cell:nth-child(2) {
      border-bottom: 1px solid #373bd0;
    }
  }
}

</style>
