<template lang="pug">
  .admin__header
    .container.admin__header-content
      .user
        .user__photo
          img(src='../../images/content/my-pic.jpg' alt='Аватар').user__photo-pic
        .user__name Геннадий Егупов
        h1.admin__header-headline Панель администрирования
      .logout
        a(href="#" @click.prevent="logout").logout__link Выйти
</template>

<script>
export default {
  methods: {
    logout() {
      localStorage.setItem("token", null);
      this.$router.replace("/login");
    }
  }
}
</script>

<style lang="postcss">
  @import "../../styles/mixins.pcss";

  .admin__header {
    padding: 20px 0;
    color:#fff;
    background: rgba(62,62,90,1);
    background: linear-gradient(to right, rgba(62,62,90,1) 0%, rgba(68,69,115,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#3e3e5a', endColorstr='#444573', GradientType=1 );
    .admin__header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @include phones() {
        display: block;
        position: relative;
      }
    }
  }

  .user {
    display: inline-block;
    .user__photo {
      display: inline-block;
      margin-right: 8px;
      width: 45px;
      height: 45px;
      border-radius: 50%;
      overflow: hidden;
      vertical-align: middle;
      @include phones() {
        vertical-align: top;
      }
      .user__photo-pic {
        width: 100%;
      }
    }
    .user__name {
      display: inline-block;
      margin-right: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .admin__header-headline {
      display: inline-block;
      font-size: 16px;
      font-weight: 300;
      @include phones() {
        display: none;
      }
    }
  }

  .logout {
    text-align: right;
    @include phones() {
      display: inline-block;
      text-align: left;
      position: absolute;
      left: 53px;
      top: 25px;
    }
    .logout__link {
      text-decoration: underline;
      color:#fff;
    }
  }
</style>
