(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{418:function(e,t,i){},433:function(e,t,i){"use strict";var r=i(418);i.n(r).a},444:function(e,t,i){"use strict";i.r(t);var r=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"tabs__tab-content"},[e._m(0),i("reviews-form",{attrs:{review:e.review,editMode:e.editMode,editedReview:e.editedReview,visibleEditForm:e.visibleEditForm},on:{exitEditMode:e.editModeOut,hideReviewForm:e.hideForm}}),i("ul",{staticClass:"tabs__list-items"},[!1===e.visibleEditForm?i("li",{staticClass:"reviews card card-add"},[i("a",{staticClass:"card-add__link",attrs:{href:"#review-form"},on:{click:function(t){t.preventDefault(),e.visibleEditForm=!0}}},[e._m(1),i("div",{staticClass:"card-add__text"},[e._v("Добавить отзыв")])])]):e._e(),e._l(e.reviews,(function(t){return i("li",{key:t.id,staticClass:"reviews card",class:{editable:t.id===e.editedReviewId}},[i("reviews-card",{attrs:{review:t},on:{editReview:e.editReview}})],1)}))],2)],1)};r._withStripped=!0;var n=i(142);function s(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),i.push.apply(i,r)}return i}function o(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?s(i,!0).forEach((function(t){d(e,t,i[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):s(i).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))}))}return e}function d(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var c={components:{reviewsForm:function(){return i.e(12).then(i.bind(null,452))},reviewsCard:function(){return i.e(11).then(i.bind(null,451))}},data:function(){return{visibleEditForm:!1,editMode:!1,editedReviewId:0,editedReview:{},review:{photo:"",author:"",occ:"",text:""}}},created:function(){this.fetchReviews()},computed:o({},Object(n.d)("reviews",{reviews:function(e){return e.reviews}})),methods:o({},Object(n.b)("reviews",["addReview","fetchReviews"]),{},Object(n.c)("tooltip",["SHOW_TOOLTIP"]),{editReview:function(e){this.visibleEditForm=!0,this.editMode=!0,this.editedReview=e,console.log("Отзыв, который начинаем редактировать: ",this.editedReview),this.editedReviewId=e.id,document.body.scrollTop=document.documentElement.scrollTop=0},editModeOut:function(){this.editMode=!1},hideForm:function(){this.visibleEditForm=!1,this.editMode=!1,this.editedReviewId=0,document.body.scrollTop=document.documentElement.scrollTop=0}})},a=(i(433),i(97)),l=Object(a.a)(c,r,[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"tabs__tab-content-header"},[t("h2",{staticClass:"tabs__tab-headline"},[this._v("Блок «Отзывы»")])])},function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"icon-plus"},[t("span",{staticClass:"icon-plus__rect"})])}],!1,null,null,null);l.options.__file="src/admin/components/pages/reviews.vue";t.default=l.exports}}]);