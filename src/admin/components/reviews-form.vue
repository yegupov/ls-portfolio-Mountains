<template lang="pug">
.card-edit.card#review-form(v-if="visibleEditForm === true")
  .card-edit__headline.bottom-line(v-if="editMode === false") Новый отзыв
  .card-edit__headline.bottom-line(v-else) Редактирование отзыва
  .card-edit__container.card-edit__reviews
    .card-edit__img-load.card-edit__review(v-if="editMode === false")
      .icon-user.card-edit__pic-container(
        :class="{filled: renderedPhoto.length}"
        :style="{'backgroundImage' : `url(${renderedPhoto})`}"
      )
      label.card-edit__link
        input(
          type="file"
          @change="appendFileAndRenderPhoto"
        ).card-edit__file-input
        | Добавить фото
    .card-edit__img-load.card-edit__review.card-edit__review-edited(v-else)
      .card-edit__review-photo(:style="{'backgroundImage' : `url(https://webdev-api.loftschool.com/${formReview.photo})`}")
      .icon-user.card-edit__pic-container(
        :class="{filled: renderedPhoto.length}"
        :style="{'backgroundImage' : `url(${renderedPhoto})`}"
      )
      label.card-edit__link
        input(
          type="file"
          @change="appendFileAndRenderPhoto"
        ).card-edit__file-input
        | Изменить фото

    .card-edit__content.card-edit__review-content
      form.edit-form
        .edit-form__input-fields.edit-form__input-reviews
          .edit-form__group(:class="{'error' : validation.firstError('formReview.author')}")
            label.edit-form__group-label Имя автора
            input(
              v-if="editMode === false"
              type='text'
              placeholder='Ковальчук Дмитрий'
              v-model='formReview.author'
            ).edit-form__group-control.contact__group-control_user
            input(
              v-else
              type='text'
              value='formReview.author'
              v-model='formReview.author'
            ).edit-form__group-control.contact__group-control_user
            .contact__group-error
              error-tooltip( :errorText="validation.firstError('formReview.author')" )
          .edit-form__group(:class="{'error' : validation.firstError('formReview.occ')}")
            label.edit-form__group-label Титул автора
            input(
              v-if="editMode === false"
              type='text'
              placeholder='Основатель Loftschool'
              v-model='formReview.occ'
            ).edit-form__group-control.contact__group-control_email
            input(
              v-else
              type='text'
              value='formReview.occ'
              v-model='formReview.occ'
            ).edit-form__group-control.contact__group-control_email
            .contact__group-error
              error-tooltip( :errorText="validation.firstError('formReview.occ')" )
        .edit-form__group(:class="{'error' : validation.firstError('formReview.text')}")
          label.edit-form__group-label Отзыв
          textarea(
            v-if="editMode === false"
            rows='4'
            placeholder='Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!'
            v-model='formReview.text'
          ).edit-form__group-control.contact__group-control_desc
          textarea(
            v-else
            rows='4'
            value='formReview.text'
            v-model='formReview.text'
          ).edit-form__group-control.contact__group-control_desc
          .contact__group-error
            error-tooltip( :errorText="validation.firstError('formReview.text')" )
        .edit-form__btns
          a.form-link(href="#" @click.prevent="hideReviewForm") Отмена
          button(
            v-if="editMode === false"
            type='submit'
            :disabled="disableSubmit"
            @click="addNewReview"
          ).btn.btn-secondary Сохранить
          button(
            v-else
            type='submit'
            @click="editThisReview"
          ).btn.btn-secondary Сохранить
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {
  mixins: [require('simple-vue-validator').mixin],

  props: {
    editMode: Boolean,
    visibleEditForm: Boolean,
    editedReview: {
      type: Object,
      default: () => ({}),
      required: true
    },
    review: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      disableSubmit: false,
      renderedPhoto: "",
      formReview: {...this.review}
    }
  },

  components: {
    errorTooltip: () => import('../../scripts/common/errorTooltip.vue')
  },

  watch: {
    editedReview() {
      this.formReview = {...this.editedReview};
      //-console.log('this.editExistedWork: ', this.editExistedWork);
    }
  },

  validators: {
    'formReview.author': (value) => {
      return Validator.value(value).required('Введите название работы');
    },
    'formReview.occ': (value) => {
      return Validator.value(value).required('Введите ссылку');
    },
    'formReview.text': (value) => {
      return Validator.value(value).required('Введите описание');
    }
  },

  methods: {
    ...mapActions("reviews", ["addReview", "editReview"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async editThisReview() {
      try {
        await this.editReview(this.formReview);
        console.log('Отзыв, который редактируем async: ', this.formReview);

        this.$emit("exitEditMode");
        this.hideReviewForm();
        document.body.scrollTop = document.documentElement.scrollTop = 0;

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Отзыв отредактирован!'
        });
      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    },

    addNewReview() {
      this.$validate().then(success => {
        if (!success) {
          this.disableSubmit = true;

          this["SHOW_TOOLTIP"]({
            type: "error",
            text: error.response.data.error
          });
          return;
        }

        this.addReview(this.formReview);

        this.disableSubmit = false;
        this.validation.reset();
        this.hideReviewForm();

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Отзыв добавлен!'
        });

      });
    },

    appendFileAndRenderPhoto(e) {
      const file = e.target.files[0];
      //-console.log('file: ',file);
      /*if (this.editMode) {
        this.editedReview.photo = file;
      } else {
        this.review.photo = file;
      }*/
      this.formReview.photo = file;
      //-console.log('this.formReview.photo: ',this.formReview.photo);

      const reader = new FileReader();

      try {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.renderedPhoto = reader.result;
        };

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Фото загружено!'
        });
      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    },

    hideReviewForm() {
      for (var key in this.formReview) {
        this.formReview[key] = "";
      }
      this.disableSubmit = false;
      this.validation.reset();
      this.renderedPhoto = "";
      this.$emit("hideReviewForm");
    }
  }
};
</script>

<style lang="postcss" scoped>
@import "../../styles/mixins.pcss";

.card-edit__review {
  width: 200px;
  margin-right: 35px;
  padding: 20px 0 0;
  @include phones() {
    width: 100%;
    margin: 0 0 50px 0;
  }
}

.icon-user.filled {
  &:before {
    background: none;
  }
}

.card-edit__review-edited {
  position: relative;
  .card-edit__review-photo {
    position: absolute;
    left: 0;
    top: 20px;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-repeat: no-repeat;
    background-size: 100% 100%;
  }
  .icon-user {
    background-color: transparent;
    &:before {
      background: none;
    }
  }
}

.card-edit__link {
  cursor: pointer;
}

.edit-form__group {
  position: relative;
}

.contact__group-control_desc + .contact__group-error {
  bottom: 2Px;
}
</style>
