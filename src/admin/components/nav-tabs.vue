<template lang="pug">
  .admin__nav
    .container
      ul.tabs__list
        li.tabs__item(v-for="tab in tabs")
          router-link(
            :data-text="tab.title"
            :to="tab.href"
            exact-active-class="active"
          ).tabs__link
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        { title: "Обо мне", href: "/" },
        { title: "Работы", href: "/works" },
        { title: "Отзывы", href: "/reviews" }
      ]
    };
  }
};
</script>

<style lang="postcss">
@import "../../styles/mixins.pcss";

.admin__tabs {
  padding: 0 0 50px;
}

.admin__nav {
  background-color: #fff;
}

.tabs__list {
  .tabs__item {
    display: inline-block;
    margin: 0;
    padding: 0;    
  }
}

  .tabs__link {
  vertical-align: middle;
  white-space: nowrap;
  display: flex;
  height: 100%;
  align-items: center;
  cursor: pointer;
  //-width: 125px;
  padding: 25px;
  font-size: 16px;
  font-weight: 400;
  justify-content: center;
  border-bottom: 3px solid transparent;
  text-decoration: none;

  @include phones {
    //-width: 100px;
  }

  &:before {
    content: attr(data-text);
  }

  &:hover,
  &.active {
    color: #373bd0;
    border-color: rgba(55,59,208,1);
  }
}
</style>
