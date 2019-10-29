import Vue from 'vue';
import App from './App.vue'

new Vue({
  el: "#app-root",
  render: h => h(App)
});

// Tabs
let tabItems = document.querySelectorAll('.tabs__item'),
  tabContents = document.querySelectorAll('.tabs__tab-content');
tabItems.forEach(function(item, index) {
  item.addEventListener('click', function(event) {
    let numberTab = index;
    //console.log(numberTab);
    tabItems.forEach(function(tab) {
      tab.classList.remove('tabs__item-active');
    });
    this.classList.add('tabs__item-active');
    tabContents.forEach(function(content, ndx) {
      content.style.display = 'none';
      if(ndx === numberTab) {
        //console.log('numberTab=',numberTab);
        //console.log('ndx=',ndx);
        content.style.display = 'block';
      }
    });
  });
});

// Close Modal Window
let btnCloseModal = document.querySelector('[data-modal-close="auth"]'),
    modalWindow = document.querySelector('.modal-window'),
    modalWindowOverlay = document.querySelector('.modal-window__overlay');
btnCloseModal.addEventListener('click', function(event) {
  modalWindow.style.display = 'none';
});
modalWindowOverlay.addEventListener('click', function(event) {
  modalWindow.style.display = 'none';
});

// Skills
let listRowsSkills = document.querySelectorAll('.skills__list-row, .skills__header');
for (let i = 0, listRow; listRow = listRowsSkills[i]; i++) {
  listRow.addEventListener('click', function(event) {
    let inputsRowsSkills = listRow.querySelectorAll('.card__input'),
        pencilBtn = listRow.querySelector('.pencil-btn'),
        trashBtn = listRow.querySelector('.trash-btn'),
        removeBtn = listRow.querySelector('.remove-btn'),
        tickBtn = listRow.querySelector('.tick-btn');
    if (event.target.classList.contains('pencil-btn')) {
      inputsRowsSkills.forEach(function (input) {
        input.classList.add('card__input-active');
      })
      if (trashBtn) {
        trashBtn.style.display = 'none';
      }
      removeBtn.style.display = 'inline-block';
      tickBtn.style.display = 'inline-block';
      event.target.style.display = 'none';
    }
    if (event.target.classList.contains('tick-btn')) {
      inputsRowsSkills.forEach(function (input) {
        input.classList.remove('card__input-active');
      })
      if (trashBtn) {
        trashBtn.style.display = 'inline-block';
      }      
      removeBtn.style.display = 'none';
      pencilBtn.style.display = 'inline-block';
      event.target.style.display = 'none';
    }
  });
}
