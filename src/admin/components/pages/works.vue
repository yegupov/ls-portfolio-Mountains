<template lang="pug">
  .tabs__tab-content
    .tabs__tab-content-header
      h2.tabs__tab-headline Блок «Работы»
    works-form(
      :work="work"
      :editMode="editMode"
      :editedWork="editedWork"
      :visibleEditForm="visibleEditForm"
      @exitEditMode="editModeOut"
      @hideWorkForm="hideForm"
    )

    ul.tabs__list-items
      li.work.card.card-add(v-if="visibleEditForm === false")
        a(href="#work-form" @click.prevent="visibleEditForm = true").card-add__link
          .icon-plus
            span.icon-plus__rect
          .card-add__text Добавить работу

      li.work.card(v-for="work in works" :key="work.id" :class="{editable: work.id === editedWorkId}")
        works-card(
          :work="work"
          @editWork="editWork"
        )
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";

export default {
  components: {
    worksForm: () => import("../works-form"),
    worksCard: () => import("../works-card")
  },

  data: () => ({
    visibleEditForm: false,
    editMode: false,
    editedWorkId: 0,
    editedWork: {},
    work: {
      title: "",
      link: "",
      description: "",
      techs: "",
      photo: ""
    }
  }),

  created() {
    this.fetchWorks();
  },

  computed: {
    ...mapState("works", {
      works: state => state.works
    })
  },

  methods: {
    ...mapActions("works", ["addWork", "fetchWorks"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editWork(work) {
      this.visibleEditForm = true;
      this.editMode = true;
      this.editedWork = work;
      console.log('Работа, которую начинаем редактировать: ', this.editedWork);
      this.editedWorkId = work.id;
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    },

    editModeOut() {
      this.editMode = false;
    },

    hideForm() {
      this.visibleEditForm = false;
      this.editMode = false;
      this.editedWorkId = 0;
      
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
  }
};
</script>

<style lang="postcss">
  @import "../../../styles/mixins.pcss";

  .work {
    position: relative;
    width: calc( (100% - 54px) / 3);
    padding-bottom: 100px;
    margin: 0 27px 27px 0;
    @include tablets() {
      width: calc( (100% - 27px) / 2);
    }
    @include phones() {
      width: 100%;
      margin: 0 0 27px 0;
    }
    &:nth-child(3n) {
      margin: 0 0 27px 0;
      @include tablets() {
        margin: 0 27px 27px 0;
      }
      @include phones() {
        margin: 0 0 27px 0;
      }
    }
    &:nth-child(2n) {
      @include tablets() {
        margin: 0 0 27px 0;
      }
    }
  }

  .work__tags-list {
    margin: 0 5px 4px 0;
    text-align: right;
    .work__tags-item {
      display: inline-block;
      margin: 0 4px;
      padding: 5px 12px;
      background-color: #fff;
      border-radius: 15px;
      font-size: 14px;
    }
  }
</style>
