'use strict';
const headerCityButton = document.querySelector('.header__city-button');
//if (localStorage.getItem('lomoda-location')){}
let hash = location.hash.substring(1);
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
    }    );
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

//запрос данных из бд
const getData = async () => {
    const data = await fetch('db.json');
    if (data.ok){
        return data.json();
    } else {
        throw new Error(`Данные небыли получены, ошибка ${data.status} ${data.statysText}`);
    }
};
const getGoods = (callback, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item.category === value));
            } else {
            callback(data);}
        })
        .catch( err => {
            console.error(err);
        });
};

subheaderCart.addEventListener('click',cartModalOpen);

cartOverlay.addEventListener('click',event => {
    const target = event.target;
    if (target.matches('.cart__btn-close')||target.matches('.cart-overlay')){ 
        // if (target.classList.contains('cart__btn-close')){
        cartModalClose();
    }

} );

try {
    
    const goodsTitle = document.querySelector('.goods__title'); 
    const navigationLink = document.querySelector(".navigation__link").innerHTML;
    const navigationLink2 = document.querySelector('.navigation__list').getElementsByTagName('a');
    console.log(navigationLink2); 
    for (let i = 0; i < navigationLink2.length ; i++){
        const cheingTitle = [navigationLink2[i].hash,navigationLink2[i].innerHTML];
        console.log(cheingTitle);
    }
   

        const goodsList = document.querySelector('.goods__list');
            if (!goodsList ) {
                throw 'this is not a goods page!' ;
        }
        const createCard = ({ id, preview, cost, brand, name, sizes }) => {
            const li = document.createElement('li');
            li.classList.add('goods__item');

            li.innerHTML = `
            <article class="good">
                <a class="good__link-img" href="card-good.html#${id}">
                    <img class="good__img" src="goods-image/${preview}" alt="">
                </a>
                <div class="good__description">
                    <p class="good__price">${cost} &#8381;</p>
                    <h3 class="good__title">${brand} <span class="good__title__grey">/ ${name}</span></h3>
                    ${sizes ? `
                    <p class="good__sizes">Размеры (RUS): <span class="good__sizes-list">${sizes.join(' ')}</span></p>
                    ` : '' }
                     <a class="good__link" href="card-good.html#id56454">Подробнее</a>
                </div>
            </article>
            `;
            //const li: HTMLElement

            return li;
        };
        const renderGoodsList = data => {
            goodsList.textContent = '';
          /*  console.log('figa',data);
            for (let i = 0; i < data.length ; i++){
                console.log(data[i]);
                console.log('----');
            }
            for (const item of data){
                console.log('for/of',item);
            }
           */ 
          //console.log('figa',data)
                data.forEach((item) => {
                const card = createCard(item);
                goodsList.append(card);
            });
        };
        window.addEventListener('hashchange', () => {
            hash = location.hash.substring(1);
            getGoods(renderGoodsList, hash);
            goodsTitle.textContent = hash;
        });
        getGoods(renderGoodsList, hash);
    
}catch (err) {
        console.warn(err);
}

/*выводит в консоль все товары 
    getGoods((data) => {
        console.warn(data);
    });
*/

/* метод асиннхронного позволяет с помощью await загрузить после загрузки данных
console.log(getData());
const getData2 =  async () => {
    const data = await fetch('db.json');
        console.log(data);
};*/



/*данный метод позволяет работать с ошибками в ерр может вывести сообщение или подгрузить из другой бд данные
            .then(data => {
            console.log(data);
        }, err => {
            console.error(err);
        })
*/