<template lang="pug">
  .admin
    template
      app-header(v-if="isLogged === true")
      .admin__tabs
        nav-tabs(v-if="isLogged === true")
        .tabs__container
          .container
            router-view
    query-tooltip

</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  name: 'app',

  components: {
    appHeader: () => import("./components/header"),
    navTabs: () => import("./components/nav-tabs"),
    queryTooltip: () => import("./components/common/query-tooltip")
  },

  data() {
    return {
      isLogged: false
    }
  },

  updated() {
    if(localStorage.getItem('token') !== null) {
      this.isLogged = true;
    }
    //-console.log('token updated: ', localStorage.getItem('token'));
  }
}

</script>

<style lang="postcss">
@import "../styles/mixins.pcss";
@import "../styles/layout/base.pcss";
@import "../styles/components/contact-form.pcss";
@import "./admin.pcss";

</style>
