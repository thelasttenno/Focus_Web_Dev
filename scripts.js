(function() {
  var burger = document.querySelector('.burger-container'),
    header = document.querySelector('.header'),
    menu = document.querySelector('.menu');

  burger.onclick = function() {
    header.classList.toggle('menu-opened'), menu.classList.toggle('menu-opened');

  }
}());
// if no Webkit browser
(function() {
  let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  let isSafari = /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor);
  let scrollbarDiv = document.querySelector('.scrollbar');
  if (!isChrome && !isSafari) {
    scrollbarDiv.innerHTML = 'You need Webkit browser to run this code';
  }
})();