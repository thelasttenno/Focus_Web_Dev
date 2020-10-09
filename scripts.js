(function() {
  var burger = document.querySelector('.burger-container'),
    header = document.querySelector('.header'),
    menu = document.querySelector('.menu');

  burger.onclick = function() {
    header.classList.toggle('menu-opened'), menu.classList.toggle('menu-opened');

  }
}());