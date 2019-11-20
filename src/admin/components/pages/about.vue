<template lang="pug">
  .tabs__tab-content
    .tabs__tab-content-header
      h1.tabs__tab-headline Блок «Обо мне»
      .tabs__tab-addgroup
        a(href="#" @click.prevent="showFormAdd").tabs__tab-addgroup-link
          span.add-btn.tabs__tab-addgroup-add
          | Добавить группу

    ul.tabs__list-items.tabs__list-skills
      //-   S K I L L S   A D D  -----------------------------------------------------------------
      li.skills.card.skills-add(v-if="formAddVisible")
        form(@submit.prevent="addNewCategory").form-skills-add
          .skills__header.bottom-line
            input(type='text' v-model="title" placeholder='Название новой группы').card__input.card__input-add.card__input-active
            .skills__btns
              button(type="submit" data-tooltip="Добавить").skills__btn.tick-btn
              button(@click.prevent="hideFormAdd" data-tooltip="Отменить").skills__btn.remove-btn

      //-   S K I L L S  -------------------------------------------------------------------------
      li.skills.card(v-for="category in categories" :key="category.id")
        skills-group(
          :category="category"
        )
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    skillsGroup: () => import("../skills-group")
  },
  data: () => ({
    formAddVisible: false,
    title: ""
  }),
  created() {
    this.fetchCategories();
  },
  computed: {
    ...mapState("categories", {
      categories: state => state.categories
    })
  },
  methods: {
    ...mapActions("categories", ["addCategory", "fetchCategories"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async addNewCategory() {
      try {
        await this.addCategory(this.title);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Группа добавлена!'
        });

        this.formAddVisible = false;
      } catch (error) {
        //-alert(error.message);
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: 'Заполните поле!'
        });
      }
    },
    showFormAdd() {
      this.formAddVisible = true;
    },
    hideFormAdd() {
      this.formAddVisible = false;
    }
  }
};

</script>

<style lang="postcss">
  @import "../../../styles/mixins.pcss";

  .tabs__list-skills {
    justify-content: space-between;
  }

  .skills {
    position: relative;
    width: calc(50% - 20px);
    padding: 30px 35px 140px 35px;
    margin: 0 0 40px 0;
    @include phones() {
      width: 100%;
      margin: 0 0 30px 0;
    }
  }

  .skills__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
    margin-bottom: 25px;
    .card__input {
      width: 60%;
      font-weight: 600;
    }
    .skills__btns {
      margin-right: 2%;
      text-align: right;
      .skills__btn {
        margin-left: 15px;
      }
    }
  }

  .skills__footer {
    position: absolute;
    left: 0;
    bottom: 40px;
    width: 97%;
    @include tablets() {
      width: 94%;
    }
    @include phones() {
      width: 97%;
    }
    .skills__footer-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .skills__footer-cell {
        text-align: center;
        &:nth-child(1) {
          width: 61%;
          padding-bottom: 8px;
          margin: 0 3% 0 25%;
          text-align: left;
          @include tablets() {
            width: 45%;
            margin: 0 3% 0 35px;
          }
          .card__input-active {
            &::-webkit-input-placeholder {
              color: rgba(65,76,99,0.5);
            }
            &:-moz-placeholder {
              color: rgba(65,76,99,0.5);
            }
            &::-moz-placeholder {
              color: rgba(65,76,99,0.5);
            }
            &:-ms-input-placeholder {
              color: rgba(65,76,99,0.5);
            }
          }
        }
        &:nth-child(2) {
          position: relative;
          width: 20%;
          padding-bottom: 8px;
          margin-right: 1%;
          @include tablets() {
            width: 25%;
          }
          &:after {
            position: absolute;
            right: 20px;
            top: 5px;
            content: '%';
            color: #9da9c3;
            font-size: 16px;
            @include tablets() {
              top: 6px;
            }
          }
        }
        &:nth-child(3) {
          width: 15%;
        }
        .card__input-active {
          padding: 9px 20px;
          &.card__input-percentage {
            border-bottom: 1px solid rgba(65,76,99,1);
          }
        }
      }
    }
  }

</style>
