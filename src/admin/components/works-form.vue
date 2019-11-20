<template lang="pug">
.form-container#work-form
  .card-edit.card(v-if="editMode === false && visibleEditForm === true")
    form.edit-form
      .card-edit__headline.bottom-line Создание работы
      .card-edit__container
        .card-edit__img-load.card-edit__work
          svg(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 300 200').card-edit__work-border
            rect#strokedrect(x='0', y='0', width='100%', height='100%')
          label.card-edit__pic
            p Перетащите или загрузите изображения
            input(
              type="file"
              @change="appendFileAndRenderPhoto"
            ).card-edit__file-input
            .btn.btn-secondary Загрузить
            .card-edit__pic-container(
              :class="{filled: renderedPhoto.length}"
              :style="{'backgroundImage' : `url(${renderedPhoto})`}"
            )
        .card-edit__content.card-edit__work-content
            .edit-form__input-fields
              .edit-form__group(:class="{'error' : validation.firstError('work.title')}")
                label.edit-form__group-label Название
                input(type='text' placeholder='Дизайн сайта для авто-салона' v-model='work.title').edit-form__group-control
                .contact__group-error
                  error-tooltip( :errorText="validation.firstError('work.title')" )
              .edit-form__group(:class="{'error' : validation.firstError('work.link')}")
                label.edit-form__group-label Ссылка
                input(type='text' placeholder='https://app.slack.com/' v-model='work.link').edit-form__group-control
                .contact__group-error
                  error-tooltip( :errorText="validation.firstError('work.link')" )
            .edit-form__group(:class="{'error' : validation.firstError('work.description')}")
              label.edit-form__group-label Описание
              textarea(
                v-model='work.description'
                rows='4'
                placeholder='Порше Центр Москва - единственный дилер в России, принадлежащий Порше АГ, предоставляет полный набор услуг по продаже и сервисному обслуживанию автомобилей Porsche.'
              ).edit-form__group-control.contact__group-control_desc
              .contact__group-error
                error-tooltip( :errorText="validation.firstError('work.description')" )
            .edit-form__input-fields
              .edit-form__group(:class="{'error' : validation.firstError('work.techs')}")
                label.edit-form__group-label Теги (введите через запятую)
                input(
                  type='text'
                  placeholder='Jquery, Vue.js, HTML5'
                  v-model='work.techs'
                ).edit-form__group-control
                .contact__group-error
                  error-tooltip( :errorText="validation.firstError('work.techs')" )
              ul.work__tags-list
                li(v-for="(item, idx) in list" :key="idx" @click="deleteTag(item)").work__tags-item {{ item }}
            .edit-form__btns
              a.form-link(href="#" @click.prevent="hideWorkForm") Отмена
              button(type='submit' :disabled="disableSubmit" @click="addNewWork").btn.btn-secondary Сохранить

  .card-edit.card(v-if="editMode === true && visibleEditForm === true")
    form.edit-form(@submit="editThisWork")
      .card-edit__headline.bottom-line Редактирование работы
      .card-edit__container
        .card-edit__img-load.card-edit__work(:style="{'backgroundImage' : `url(https://webdev-api.loftschool.com/${editExistedWork.photo})`}")
          svg(xmlns='http://www.w3.org/2000/svg', viewbox='0 0 300 200').card-edit__work-border
            rect#strokedrect(x='0', y='0', width='100%', height='100%')
          label.card-edit__pic
            input(
              type="file"
              @change="appendFileAndRenderPhoto"
            ).card-edit__file-input
            .btn.btn-secondary Другое фото
            .card-edit__pic-container(
              :class="{filled: renderedPhoto.length}"
              :style="{'backgroundImage' : `url(${renderedPhoto})`}"
            )
        .card-edit__content.card-edit__work-content
            .edit-form__input-fields
              .edit-form__group
                label.edit-form__group-label Название
                input(type='text' v-model='editExistedWork.title' value='editExistedWork.title').edit-form__group-control
                span.edit-form__group-error
              .edit-form__group
                label.edit-form__group-label Ссылка
                input(type='text' v-model='editExistedWork.link' value='editExistedWork.link').edit-form__group-control
                span.edit-form__group-error
            .edit-form__group
              label.edit-form__group-label Описание
              textarea(
                v-model='editExistedWork.description'
                value='editExistedWork.description'
                rows='4'
              ).edit-form__group-control.contact__group-control_desc
              span.edit-form__group-error
            .edit-form__input-fields
              .edit-form__group
                label.edit-form__group-label Теги (введите через запятую)
                input(
                  type='text'
                  v-model='editExistedWork.techs'
                  value='editExistedWork.techs'
                ).edit-form__group-control
                span.edit-form__group-error
              ul.work__tags-list
                li(v-for="(item, idx) in list" :key="idx" @click="deleteTag(item)").work__tags-item {{ item }}
            .edit-form__btns
              a(href="#" @click.prevent="hideWorkForm").form-link Отмена
              button(type='submit').btn.btn-secondary Сохранить
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
import { Validator } from 'simple-vue-validator';

export default {
  mixins: [require('simple-vue-validator').mixin],

  props: {
    editMode: Boolean,
    visibleEditForm: Boolean,
    editedWork: {
      type: Object,
      default: () => ({}),
      required: true
    },
    work: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      disableSubmit: false,
      renderedPhoto: "",
      editExistedWork: {}
    }
  },

  components: {
    errorTooltip: () => import('../../scripts/common/errorTooltip.vue')
  },

  validators: {
    'work.title': (value) => {
      return Validator.value(value).required('Введите название работы');
    },
    'work.link': (value) => {
      return Validator.value(value).required('Введите ссылку');
    },
    'work.description': (value) => {
      return Validator.value(value).required('Введите описание');
    },
    'work.techs': (value) => {
      return Validator.value(value).required('Введите теги');
    }
  },

  computed: {
  	list() {
      if (this.editMode) {
        return this.editExistedWork.techs.trim().split(",");
      } else {
        return this.work.techs.trim().split(",");
      }
    }
  },

  watch: {
    editedWork() {
      this.editExistedWork = {...this.editedWork};
      //-console.log('this.editExistedWork: ', this.editExistedWork);
    }
  },

  methods: {
    ...mapActions("works", ["addWork", "editWork"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async editThisWork() {
      try {
        await this.editWork(this.editExistedWork);
        console.log('Работа, которую редактируем: ', this.editExistedWork);

        this.$emit("exitEditMode");
        this.hideWorkForm();
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Работа отредактирована!'
        });
      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      }
    },

    addNewWork() {
      this.$validate().then(success => {
        if (!success) {
          this.disableSubmit = true;
          //-console.log('Не пройдена валидация!');

          this["SHOW_TOOLTIP"]({
            type: "error",
            text: error.response.data.error
          });
          return;
        }

        this.addWork(this.work);
        this.disableSubmit = false;
        this.validation.reset();
        this.hideWorkForm();

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Работа добавлена!'
        });

      });
    },

    appendFileAndRenderPhoto(e) {
      const file = e.target.files[0];
      if (this.editMode) {
        this.editExistedWork.photo = file;
      } else {
        this.work.photo = file;
      }

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

    deleteTag(tag) {
      let tagsInput;
      if (this.editMode) {
        tagsInput = this.editExistedWork.techs;
      } else {
        tagsInput = this.work.techs;
      }
      tagsInput = tagsInput.replace(tag,'');
      tagsInput = tagsInput.replace(',,',',');
      tagsInput = tagsInput.trim();
      if (tagsInput[0] === ',') {
        tagsInput = tagsInput.slice(1);
      }
      if (tagsInput[tagsInput.length - 1] === ',') {
        tagsInput = tagsInput.slice(0,-1);
      }
      tagsInput = tagsInput.trim();
      //-console.log('Получилась this.work.techs: ', this.work.techs);
      if (this.editMode) {
        this.editExistedWork.techs = tagsInput;
      } else {
        this.work.techs = tagsInput;
      }
    },

    hideWorkForm() {
      this.disableSubmit = false;
      this.validation.reset();
      this.renderedPhoto = "";
      this.$emit("hideWorkForm");
    }
  }
};
</script>

<style lang="postcss" scoped>

@import "../../styles/mixins.pcss";

.card-edit__work {
  position: relative;
  padding: 0;
  background-color: #c0ccde;
  background-size: 100% auto;
  @include tablets() {
    width: 80%;
    margin: 0 10% 50px;
  }
  @include phones() {
    width: 100%;
    margin: 0 0 50px;
  }
}

.card-edit__work-border {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

rect#strokedrect {
 stroke: $text-color;
 fill: transparent;
 stroke-width: 1;
 stroke-dasharray: 10;
}

.work__tags-list {
  margin: -12px 0 35px 0;
  text-align: left;
  .work__tags-item {
    display: inline-block;
    vertical-align: top;
    margin: 0 3px 0 0;
    min-height: 29px;
    padding: 5px 32px 5px 12px;
    background-color: #e9e9e9;
    background-image: svg-load('remove.svg', fill=$text-color, width=11, height=11);
    background-repeat: no-repeat;
    background-position: right 10px top 9px;
    cursor: pointer;
  }
}

.edit-form__group {
  position: relative;
}

.contact__group-control_desc + .contact__group-error {
  bottom: 2Px;
}

.btn {
  position: relative;
  z-index: 10;
}
</style>
