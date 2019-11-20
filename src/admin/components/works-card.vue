<template lang="pug">
.work-container
  .work__header
    .work__photo
      img(:src="`https://webdev-api.loftschool.com/${work.photo}`" :alt='work.title').work__img
    .work__tags
      ul.work__tags-list
        li.work__tags-item(v-for="tech in work.techs.split(', ')") {{tech}}
  .work__caption {{work.title}}
  .work__desc {{work.description}}
  .work__link
    a(href="work.link" target="_blank").work__link-site {{work.link}}
  .card-footer
    button(@click="editWork").card-footer__btn.pencil-btn Править
    button(@click="removeExistedWork").card-footer__btn.remove-btn Удалить
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  props: {
    work: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  data() {
    return {
      deletedWork: {...this.work}
    }
  },

  methods: {
    ...mapActions("works", ["removeWork"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    editWork() {
      this.$emit("editWork", this.work);
    },

    async removeExistedWork() {
      try {
        await this.removeWork(this.deletedWork);

        this["SHOW_TOOLTIP"]({
          type: "success",
          text: 'Работа удалена!'
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
.work__header {
  position: relative;
  .work__photo {
    .work__img {
      width: 100%;
    }
  }
  .work__tags {
    position: absolute;
    left: 0;
    bottom: 10px;
    width: 100%;
  }
}
.work__caption {
  font-size: 18px;
  font-weight: 600;
  padding: 15px 7%;
}
.work__desc {
  padding: 0 7% 15px;
}
.work__link {
  padding-left: 7%;
  .work__link-site {
    font-weight: 600;
    text-decoration: none;
  }
}

.card-footer__btn {
  padding: 0;
  text-align: left;
  background-position: right top 3Px !important;
  background-repeat: no-repeat !important;
  background-size: 17px 17px !important;
}

.pencil-btn {
  background: svg-load('pencil.svg', fill=#373bd0, width=100%, height=100%);
}

.remove-btn {
  background: svg-load('cross.svg', fill=red, width=100%, height=100%);
}
</style>
