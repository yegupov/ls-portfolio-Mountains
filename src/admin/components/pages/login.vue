<template lang="pug">
  .modal-window
    .modal-window__body
      //-button(type="button" data-modal-close="auth").modal-window__close-btn
      h3.modal-window__headline Авторизация

      form#login_form.contact__form(@submit.prevent="login")
        .contact__input-fields
          .contact__group(:class="{'error' : validation.firstError('user.name')}")
            label.contact__group-label(for='user') Логин
            input.contact__group-control.contact__group-control_user#user(type='text' name='user' placeholder='Terminator_2000' v-model="user.name")
            .contact__group-error
              error-tooltip( :errorText="validation.firstError('user.name')" )
          .contact__group(:class="{'error' : validation.firstError('user.password')}")
            label.contact__group-label(for='password') Пароль
            input.contact__group-control.contact__group-control_password#password(type='password' name='password' placeholder='● ● ● ● ● ● ● ● ●' v-model="user.password")
            .contact__group-error
              error-tooltip( :errorText="validation.firstError('user.password')" )
        .contact__btn
          button(type='submit' :disabled="disableSubmit").btn.btn-primary Отправить
    .modal-window__overlay
</template>

<script>
import $axios from "@/requests";
import { Validator } from 'simple-vue-validator';
import { mapMutations } from "vuex";

export default {
  mixins: [require('simple-vue-validator').mixin],

  data() {
    return {
      disableSubmit: false,
      user: {
        name: "",
        password: ""
      }
    }
  },

  components: {
    errorTooltip: () => import('../../../scripts/common/errorTooltip.vue')
  },

  validators: {
    'user.name': (value) => {
      return Validator.value(value).required('Введите логин')
    },
    'user.password': (value) => {
      return Validator.value(value).required('Введите пароль')
    }
  },

  methods: {
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    async login() {
      if ((await this.$validate()) === false) return;
      this.disableSubmit = true;
      try {
        const response = await $axios.post("/login", this.user);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: "Добро пожаловать в Админпанель!"
        });

        const token = response.data.token;
        localStorage.setItem("token", token);
        $axios.defaults.headers["Authorization"] = `Bearer ${token}`;

        this.$router.replace("/");
      } catch (error) {
        //-alert('Такой пользователь не найден!');
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: error.response.data.error
        });
      } finally {
        this.disableSubmit = false;
      }
    }
  }
}
</script>

<style lang="postcss">
  @import "../../../styles/mixins.pcss";
  @import "../../../styles/components/contact-form.pcss";

  .modal-window {
    position: fixed;
    z-index: 9997;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  }

  .modal-window__body {
    position: relative;
    z-index: 9999;
    width: 60%;
    max-width: 570px;
    min-width: 280px;
    height: auto;
    margin: 0;
    padding: 30px 4%;
    background-color: #fff;
    .modal-window__headline {
      text-align: center;
      font-size: 28px;
      font-weight: 600;
      margin-bottom: 40px;
    }
    .modal-window__close-btn {
      position: absolute;
      right: 20px;
      top: 20px;
      width: 23px;
      height: 23px;
      &:after {
        position: absolute;
        content: '×';
        top: -8px;
        left: 0;
        font-size: 40px;
        line-height: 1;
      }
      &:hover {
        opacity: 0.7;
      }
    }
    .contact__input-fields {
      flex-wrap: wrap;
      & > div {
        flex-basis: 100%;
      }
    }
    .contact__group-control_password {
      background: svg-load('key.svg', fill=#c6c8d0, width=26, height=30);
      background-repeat: no-repeat;
      background-position: left top 2px;
      &:focus {
        background: svg-load('key.svg', fill=$decor-color-1, width=26, height=30);
        background-repeat: no-repeat;
        background-position: left top 2px;
      }
      @include 375px() {
        background: none;
      }
    }

    .contact__group-control:-webkit-autofill {
      //- -webkit-box-shadow:0 0 0px 1000px #fff inset;
    }

    .contact__group.error {
      .contact__group-control_password {
        background: svg-load('key.svg', fill=$errors-color, width=26, height=30);
        background-repeat: no-repeat;
      }
    }

    .contact__btn {
      margin: 15px 0;
      text-align: center;
    }
  }

  .modal-window__overlay {
    position: fixed;
    z-index: 9998;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(65,76,99,0.85);
  }
</style>
