
'use strict';
//модальное окно
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');
subheaderCart.addEventListener('click',() => {
    cartOverlay.classList.add('cart-overlay-open');
});

cartOverlay.addEventListener('click',event => {
console.log(event.target);
} );//метод позволяет прямо тыкать по окну и видеть в консоле что ты ткнул, теги классы 