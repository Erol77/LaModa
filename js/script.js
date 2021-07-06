'use strict';
const headerCityButton = document.querySelector('.header__city-button');
//if (localStorage.getItem('lomoda-location')){}
headerCityButton.textContent = localStorage.getItem('lomoda-location') || 'Ваш город?';
headerCityButton.addEventListener('click', () => {
    const city = prompt('Укажите ваш город!');
    headerCityButton.textContent = city;
    localStorage.setItem('lomoda-location', city);
    console.log(city);
});
//блокировка скрола
const disableScroll = () => {
    const widthSqrll = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY= window.scrollY;

    document.body.style.cssText = `
    posihion: fixed;
    top: ${-window.scrollY};
    left: 0;
    width: 100%;
    height: 100vh;
    overflow: hidden;
    padding-right: ${widthSqrll}px`;
};
const enableScroll = () => {
    document.body.style.cssText = '';//document.body.style.overflow = '';hidden
    window.scroll({
        top: window.scrollY,
    }    )
};
//модальное окно
const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};
const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
};
subheaderCart.addEventListener('click',cartModalOpen);

cartOverlay.addEventListener('click',event => {
    const target = event.target;
    if (target.matches('.cart__btn-close')||target.matches('.cart-overlay')){ // if (target.classList.contains('cart__btn-close')){
        cartModalClose();
    }

} );