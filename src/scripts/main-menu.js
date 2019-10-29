// Adaptive Mobile menu
const linkMobileMenu = document.querySelector('.menu-mobile-link'),
      menuMobile = document.querySelector('.menu'),
      menuLinks = document.querySelectorAll('.menu__link'),
      menuActiveLink = document.querySelector('.menu__item_active');

function showHideMobileMenu() {
  linkMobileMenu.classList.toggle('menu-mobile-link_active');
	menuMobile.classList.toggle('menu_mobile');
  menuMobile.nextSibling.classList.toggle('display-none');
}

function hideMobileMenu() {
  menuMobile.classList.remove('menu_mobile');
  menuMobile.nextSibling.classList.add('display-none');
  linkMobileMenu.classList.remove('menu-mobile-link_active');
}

// Highlight Active item on click
menuLinks.forEach(function(item) {
  item.addEventListener('click', function(event) {
    let target = event.target;
    menuLinks.forEach(function(link) {
      link.parentNode.classList.remove('menu__item_active');
    });
    target.parentNode.classList.add('menu__item_active');
  });
});

// Highlight Menu item while scrolling
window.addEventListener('scroll', function() {
  // Перебрать секции
});


// Mobile menu
let widthWindow = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if (widthWindow <= 768) {
  let layerOverlay = document.createElement('div');
  layerOverlay.classList.add('overlay-mob','display-none');

  menuMobile.after(layerOverlay);

  linkMobileMenu.addEventListener('click', (event) => {
    //-console.log('Clickkkk');
    event.preventDefault();
    showHideMobileMenu();
  });

  menuLinks.forEach(function(item) {
    item.addEventListener('click', function(event) {
      hideMobileMenu();
    });
  });

  layerOverlay.addEventListener('click', (event) => {
    hideMobileMenu()
  });

  if (widthWindow <= 480) {
    const socialBtnsHeader = document.querySelector('.header__socials');
    let socialBtnsMobileMenu = document.createElement('div');
    socialBtnsMobileMenu.classList.add('socials-mobmenu');
    socialBtnsMobileMenu.innerHTML = socialBtnsHeader.innerHTML;
    menuMobile.append(socialBtnsMobileMenu);
    socialBtnsHeader.innerHTML = '';
  }
}
