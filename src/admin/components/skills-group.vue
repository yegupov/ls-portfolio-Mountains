<template lang="pug">
  .skill-container
    skills-header(
      :category="category"
    )
    ul.skills__list
      skills-item(
        v-for="skill in category.skills"
        :key="skill.id"
        :skill="skill"
      )
    .skills__footer
      form(
        @submit.prevent="addNewSkill"
        :class={blocked: formBlocked}
      ).form-skill-add
        ul.skills__footer-row
          li.skills__footer-cell(:class="{'error' : validation.firstError('skill.title')}")
            input(type='text' placeholder='Новый навык' v-model="skill.title").card__input.card__input-active
          li.skills__footer-cell(:class="{'error' : validation.firstError('skill.percent')}")
            input(type='text' placeholder='100' v-model="skill.percent").card__input.card__input-percentage.card__input-active
          li.skills__footer-cell
            button(type="submit").add-btn

</template>

<script>
import { mapActions, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {
  mixins: [require('simple-vue-validator').mixin],

  components: {
    skillsHeader: () => import("./skills-header"),
    skillsItem: () => import("./skills-item")
  },
  props: {
    category: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      formBlocked: false,
      skill: {
        title: "",
        percent: "",
        category: this.category.id
      }
    };
  },

  validators: {
    'skill.title': (value) => {
      return Validator.value(value).required('Введите название навыка');
    },
    'skill.percent': (value) => {
      return Validator.value(value).required('Введите проценты');
    }
  },

  methods: {
    ...mapActions("skills", ["addSkill"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async addNewSkill() {
      this.formBlocked = true;

      if ((await this.$validate()) === false) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: 'Заполните оба поля!'
        });
        this.removeErrorStyle();
        return;
      }

      try {
        await this.addSkill(this.skill);
        this.skill.title = "";
        this.skill.percent = "";

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Навык добавлен!'
        });
        this.validation.reset();
      } catch (error) {
        alert(error.response.data.error);

      } finally {
        this.formBlocked = false;
      }
    },

    removeErrorStyle() {
      function errorStyleReset() {
        let errorFields = document.querySelectorAll('.skills__footer-cell.error');
        errorFields.forEach(function(item) {
          item.classList.remove('error');
        });
      }
      setTimeout(errorStyleReset, 8000);
    }
  }
};
</script>

<style lang="postcss">

.skills__footer-cell.error {
  .card__input {
    border-bottom: 1px solid $errors-color !important;
  }
}

</style>

<style lang="postcss" scoped>

.blocked {
  opacity: 0.5;
  filter: grayscale(100%);
  pointer-events: none;
  user-select: none;
  .add-btn {
    pointer: default;
  }
}
</style>
