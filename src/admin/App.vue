<template lang="pug">
  .admin
    .modal-window
      .modal-window__body
        button(type="button" data-modal-close="auth").modal-window__close-btn
        h3.modal-window__headline Авторизация

        form#login_form.contact__form(method='post')
          .contact__input-fields
            .contact__group
              label.contact__group-label(for='user') Логин
              input.contact__group-control.contact__group-control_user#user(type='text' name='user' placeholder='Terminator_2000')
              span.contact__group-error
            .contact__group
              label.contact__group-label(for='password') Пароль
              input.contact__group-control.contact__group-control_password#password(type='password' name='password' placeholder='● ● ● ● ● ● ● ● ●' required)
              span.contact__group-error
          .contact__btn
            input.btn.btn-primary#contact_form_submit(type='submit' value='Отправить')
      .modal-window__overlay

    .admin__header
      .container.admin__header-content
        .user
          .user__photo
            img(src='../images/content/my-pic.jpg' alt='Аватар').user__photo-pic
          .user__name Геннадий Егупов
          h1.admin__header-headline Панель администрирования
        .logout
          a(href="#").logout__link Выйти
    .admin__tabs
      .admin__nav
        .container
          ul.tabs__list
            li.tabs__item.tabs__item-active Обо мне
            li.tabs__item Работы
            li.tabs__item Отзывы

      .tabs__container
        .container
          //-   A B O U T --------------------------------------------------------------------------
          .tabs__tab-content
            .tabs__tab-content-header
              h2.tabs__tab-headline Блок «Обо мне»
              .tabs__tab-addgroup
                a.tabs__tab-addgroup-link(href="#")
                  button.add-btn.tabs__tab-addgroup-addbtn
                  | Добавить группу
            .tabs__list-items
              //-   S K I L L S   A D D  --------------------------------------------------------------------------
              .skills.card
                .skills__header.bottom-line
                  input(type='text' placeholder='Название новой группы').card__input.card__input-add
                  .skills__btns
                    button.skills__btn.pencil-btn
                    button.skills__btn.tick-btn
                    button.skills__btn.remove-btn
                ul.skills__list

                .skills__footer
                  ul.skills__footer-row
                    li.skills__footer-cell
                      input(type='text' placeholder='Новый навык').card__input.card__input-active
                    li.skills__footer-cell
                      input(type='text' placeholder='100').card__input.card__input-percentage.card__input-active
                    li.skills__footer-cell
                      button.add-btn

              //-   S K I L L S   1  --------------------------------------------------------------------------
              .skills.card
                .skills__header.bottom-line
                  input(type='text' placeholder='Frontend').card__input
                  .skills__btns
                    button.skills__btn.pencil-btn
                    button.skills__btn.tick-btn
                    button.skills__btn.remove-btn
                ul.skills__list
                  - var frontend = {'HTML5':'75', 'CSS3':'75', 'JavaScript':'50', 'Jquery и Vue.js':'15'}
                  each val, key in frontend
                    li.skills__list-item
                      ul.skills__list-row
                        li.skills__list-cell
                          input(type='text' placeholder=key).card__input
                        li.skills__list-cell
                          input(type='text' placeholder=val).card__input.card__input-percentage
                        li.skills__list-cell
                          button.skills__btn.pencil-btn
                          button.skills__btn.tick-btn
                        li.skills__list-cell
                          button.skills__btn.trash-btn
                          button.skills__btn.remove-btn
                .skills__footer
                  ul.skills__footer-row
                    li.skills__footer-cell
                      input(type='text' placeholder='Новый навык').card__input.card__input-active
                    li.skills__footer-cell
                      input(type='text' placeholder='100').card__input.card__input-percentage.card__input-active
                    li.skills__footer-cell
                      button.add-btn

              .skills.card
                .skills__header.bottom-line
                  input(type='text' placeholder='Workflow').card__input
                  .skills__btns
                    button.skills__btn.pencil-btn
                    button.skills__btn.tick-btn
                    button.skills__btn.remove-btn
                ul.skills__list
                  - var workflow = {'Git':'20', 'Terminal':'15', 'Gulp':'15', 'Webpack':'15'}
                  each val, key in workflow
                    li.skills__list-item
                      ul.skills__list-row
                        li.skills__list-cell
                          input(type='text' placeholder=key).card__input
                        li.skills__list-cell
                          input(type='text' placeholder=val).card__input.card__input-percentage
                        li.skills__list-cell
                          button.skills__btn.pencil-btn
                          button.skills__btn.tick-btn
                        li.skills__list-cell
                          button.skills__btn.trash-btn
                          button.skills__btn.remove-btn
                .skills__footer
                  ul.skills__footer-row
                    li.skills__footer-cell
                      input(type='text' placeholder='Новый навык').card__input.card__input-active
                    li.skills__footer-cell
                      input(type='text' placeholder='100').card__input.card__input-percentage.card__input-active
                    li.skills__footer-cell
                      button.add-btn

          //-   W O R K S  -----------------------------------------------------
          .tabs__tab-content
            .tabs__tab-content-header
              h2.tabs__tab-headline Блок «Работы»
            .card-edit.card
              .card-edit__headline.bottom-line Редактирование работы
              .card-edit__container
                .card-edit__img-load.card-edit__work
                  p Перетащите или загрузите изображения
                  button.btn.btn-secondary Загрузить
                .card-edit__content.card-edit__work-content
                  form#workedit_form.edit-form(method='post')
                    .edit-form__input-fields
                      .edit-form__group
                        label.edit-form__group-label(for='work_name') Название
                        input.edit-form__group-control.contact__group-control_user#work_name(type='text' name='work_name' placeholder='Дизайн сайта для авто-салона')
                        span.edit-form__group-error
                      .edit-form__group
                        label.edit-form__group-label(for='work_link') Ссылка
                        input.edit-form__group-control.contact__group-control_email#work_link(type='text' name='work_link' placeholder='https://app.slack.com/')
                        span.edit-form__group-error
                    .edit-form__group
                      label.edit-form__group-label(for='work_desc') Описание
                      textarea.edit-form__group-control.contact__group-control_desc#work_desc(name='work_desc' rows='4' placeholder='Порше Центр Москва - единственный дилер в России, принадлежащий Порше АГ, предоставляет полный набор услуг по продаже и сервисному обслуживанию автомобилей Porsche.')
                      span.edit-form__group-error
                    .edit-form__input-fields
                      .edit-form__group
                        label.edit-form__group-label(for='work_tags') Добавление тега
                        input.edit-form__group-control.contact__group-control_user#work_tags(type='text' name='work_tags' placeholder='Jquery, Vue.js, HTML5')
                        span.edit-form__group-error
                      ul.work__tags-list
                        li.work__tags-item HTML
                        li.work__tags-item CSS
                        li.work__tags-item Javascript
                    .edit-form__btns
                      a.form-link(href="#") Отмена
                      input.btn.btn-secondary#work-edit_form_submit(type='submit' value='Сохранить')

            .tabs__list-items
              .work.card.card-add
                a(href="#").card-add__link
                  .icon-plus
                    span.icon-plus__rect
                  .card-add__text Добавить работу
              .work.card.editable
                .work__header
                  .work__photo
                    img(src='../images/content/work-1.jpg' alt='Работа 1').work__img
                  .work__tags
                    ul.work__tags-list
                      li.work__tags-item HTML
                      li.work__tags-item CSS
                      li.work__tags-item Javascript
                .work__caption Сайт школы образования
                .work__desc Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!
                .work__link
                  a(href="//loftschool.com/" target="_blank").work__link-site loftschool.com
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')
              //- W O R K  2
              .work.card
                .work__header
                  .work__photo
                    img(src='../images/content/work-2.jpg' alt='Работа 2').work__img
                  .work__tags
                    ul.work__tags-list
                      li.work__tags-item HTML
                      li.work__tags-item CSS
                      li.work__tags-item jQuery
                .work__caption Сайт строительной компании
                .work__desc Идейные соображения высшего порядка, а также консультация с широким активом в значительной степени обуславливает создание дальнейших направлений развития.
                .work__link
                  a(href="//google.ru/" target="_blank").work__link-site google.ru
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')
              //- W O R K  3
              .work.card
                .work__header
                  .work__photo
                    img(src='../images/content/work-3.jpg' alt='Работа 3').work__img
                  .work__tags
                    ul.work__tags-list
                      li.work__tags-item HTML
                      li.work__tags-item CSS
                      li.work__tags-item Javascript
                .work__caption Интернет-магазин пластиковых окон
                .work__desc Дальнейшее развитие различных форм деятельности играет важную роль в формировании направлений прогрессивного развития.
                .work__link
                  a(href="//rambler.ru/" target="_blank").work__link-site rambler.ru
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')
              //- W O R K  4
              .work.card
                .work__header
                  .work__photo
                    img(src='../images/content/work-4.jpg' alt='Работа 4').work__img
                  .work__tags
                    ul.work__tags-list
                      li.work__tags-item HTML
                      li.work__tags-item CSS
                      li.work__tags-item Javascript
                .work__caption Новостной портал Екатеринбурга
                .work__desc Идейные соображения высшего порядка, а также рамки и место обучения кадров позволяет оценить значение форм развития.
                .work__link
                  a(href="//mail.ru/" target="_blank").work__link-site mail.ru
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')

          //-   R E V I E W S --------------------------------------------------
          .tabs__tab-content
            .tabs__tab-content-header
              h2.tabs__tab-headline Блок «Отзывы»
            .card-edit.card
              .card-edit__headline.bottom-line Новый отзыв
              .card-edit__container.card-edit__reviews
                .card-edit__img-load.card-edit__review
                  .icon-user
                  a.card-edit__link(href="#") Добавить фото
                .card-edit__content.card-edit__review-content
                  form#workedit_form.edit-form(method='post')
                    .edit-form__input-fields.edit-form__input-reviews
                      .edit-form__group
                        label.edit-form__group-label(for='review_name') Имя автора
                        input.edit-form__group-control.contact__group-control_user#review_name(type='text' name='review_name' placeholder='Ковальчук Дмитрий')
                        span.edit-form__group-error
                      .edit-form__group
                        label.edit-form__group-label(for='work_link') Титул автора
                        input.edit-form__group-control.contact__group-control_email#work_link(type='text' name='work_link' placeholder='Основатель Loftschool')
                        span.edit-form__group-error
                    .edit-form__group
                      label.edit-form__group-label(for='work_desc') Отзыв
                      textarea.edit-form__group-control.contact__group-control_desc#work_desc(name='work_desc' rows='4' placeholder='Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 4,5 месяца только самых тяжелых испытаний и бессонных ночей!')
                      span.edit-form__group-error
                    .edit-form__btns
                      a.form-link(href="#") Отмена
                      input.btn.btn-secondary#work-edit_form_submit(type='submit' value='Сохранить')

            .tabs__list-items
              .reviews.card.card-add
                a(href="#").card-add__link
                  .icon-plus
                    span.icon-plus__rect
                  .card-add__text Добавить отзыв
              .reviews.card
                .reviews__header.bottom-line
                  .reviews__photo
                    img(src='../images/content/review-1.jpg' alt='Отзыв 1').reviews__img
                  .reviews__author Дмитрий Ковальчук
                    span.reviews__author-title Основатель Loftschool
                .reviews__desc Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')

              //- R E V I E W   2
              .reviews.card
                .reviews__header.bottom-line
                  .reviews__photo
                    img(src='../images/content/review-2.jpg' alt='Отзыв 2').reviews__img
                  .reviews__author Владимир Сабанцев
                    span.reviews__author-title Преподаватель
                .reviews__desc Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах.
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')

              //- R E V I E W   3
              .reviews.card
                .reviews__header.bottom-line
                  .reviews__photo
                    img(src='../images/content/review-1.jpg' alt='Отзыв 1').reviews__img
                  .reviews__author Дмитрий Ковальчук
                    span.reviews__author-title Основатель Loftschool
                .reviews__desc Этот парень проходил обучение веб-разработке не где-то, а в LoftSchool! 2 месяца только самых тяжелых испытаний и бессонных ночей!
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')

              //- R E V I E W   4
              .reviews.card
                .reviews__header.bottom-line
                  .reviews__photo
                    img(src='../images/content/review-2.jpg' alt='Отзыв 2').reviews__img
                  .reviews__author Владимир Сабанцев
                    span.reviews__author-title Преподаватель
                .reviews__desc Этот код выдержит любые испытания. Только пожалуйста, не загружайте сайт на слишком старых браузерах.
                .card-footer
                  button.card-footer__btn Править
                    svg.icon.pencil(viewBox='0 0 528.899 528.899', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#pencil')
                  button.card-footer__btn Удалить
                    svg.icon.remove(viewBox='0 0 174.239 174.239', preserveAspectRatio='none')
                      use(xlink:href='sprite.svg#cross')

</template>

<style lang="postcss">
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
  @import "../styles/components/contact-form.pcss";
  @import "./admin.pcss";
</style>
