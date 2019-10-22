let parallax = (function () {
  return {
    move: function (block, windowScroll, strageAmount) {
      let strafe = windowScroll / -strageAmount + '%',
          transformString = 'translate3d(0,' + strafe + ', 0)',
          style = block.style;
      // style.top = strafe;
      style.transform = transformString;
      style.webkitTransform = transformString;
    },

    init: function (wScroll) {
      if (window.screen.width >= 768 && window.screen.width <= 1024) {
        this.move(parallaxLayers[1], wScroll, 130);
        this.move(parallaxLayers[2], wScroll, 70);
        this.move(parallaxLayers[3], wScroll, 105);
        this.move(parallaxLayers[4], wScroll, 185);
        this.move(parallaxLayers[5], wScroll, 200);
      } else if (window.screen.width > 1024) {
        this.move(parallaxLayers[1], wScroll, 75);
        this.move(parallaxLayers[2], wScroll, 30);
        this.move(parallaxLayers[3], wScroll, 50);
        this.move(parallaxLayers[4], wScroll, 130);
        this.move(parallaxLayers[5], wScroll, 145);
      }
    }
  }
}());

const parallaxLayers = document.querySelectorAll('.wrapper-top__bg');

window.onscroll = function () {
  let wScroll = window.pageYOffset;
  parallax.init(wScroll);
}

if (window.screen.width <= 767) {
  parallaxLayers.forEach(function (item) {
    item.innerHTML = "";
  })
}
