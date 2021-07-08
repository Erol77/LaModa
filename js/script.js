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
const getGoods = (callback, prop, value) => {
    getData()
        .then(data => {
            if (value) {
                callback(data.filter(item => item[prop] === value));
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
// страница товара
try {
    
        const goodsList = document.querySelector('.goods__list');
            if (!goodsList ) {
                throw 'this is not a goods page!' ;
        }

        const goodsTitle = document.querySelector('.goods__title'); 
        const cheingTitle = () => {
            goodsTitle.textContent = document.querySelector(`[href*="#${hash}"]`).textContent ;
        };
        const navigationLink2 = document.querySelector('.navigation__list').getElementsByTagName('a');
        const abeytTitle =() =>{ for (let i = 0; i < navigationLink2.length ; i++){
        //    const cheingTitle = [navigationLink2[i].hash,navigationLink2[i].innerHTML];
            if (navigationLink2[i].hash.substring(1) === hash){goodsTitle.textContent = navigationLink2[i].innerHTML;}
        }};
      //  abeytTitle();

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
            getGoods(renderGoodsList,'category', hash);
           // abeytTitle();
           cheingTitle();
        });
        getGoods(renderGoodsList, 'category', hash);
        cheingTitle();
    
}catch (err) {
        console.warn(err);
}

//
try {

}catch (err) {
    console.warn(err);
}

//
try {
    if (!document.querySelector('.card-good')){ 
        //зддесь мы проевряем на нужной ли мы странице, если да то все ок иначе выводится сообщение в консоли что это не та страница
        throw 'This is not card-cood page!';
    }
    const cardGoodImage = document.querySelector('.card-good__image');
    const cardGoodBrand = document.querySelector('.card-good__brand');
    const cardGoodTitle = document.querySelector('.card-good__title');
    const cardGoodPrice = document.querySelector('.card-good__price');
    const cardGoodColor = document.querySelector('.card-good__color');
    const cardGoodColorList = document.querySelector('.card-good__color-list');
    const cardGoodSizes = document.querySelector('.card-good__sizes');
    const cardGoodSizesList = document.querySelector('.card-good__sizes-list');
    const cardGoodBuy = document.querySelector('.card-good__buy');
    const cardGoodSelectWrapper= document.querySelectorAll('.card-good__select__wrapper');

    const cenerateList = (data) => data.reduce((html, item, i) =>
    html + `<li class="card-good__select-item" data-id="${i}">${item}</li>`,
    '');

    const renderCardGood = ([{id, cost, brand, name, sizes, photo, color}]) => {
        //здесь мы деструктурировали объект, т.е. поставив кв скобки с наружи мы разложили обыект на элементы
        cardGoodImage.src = `goods-image/${photo}` ;
        cardGoodBrand.textContent = `${brand} ${name}` ;
        cardGoodTitle.textContent =  name;
        cardGoodPrice.textContent = `${cost}  ₽`;
        if (color) {cardGoodColor.textContent = color[0];
            cardGoodColor.dataset.id = 0;
            cardGoodColorList.innerHTML = cenerateList(color);
        } else { cardGoodColor.style.display = 'none'; 
        
    }
        if (sizes) {
        cardGoodSizes.textContent = sizes[0] ;
        cardGoodSizes.dataset.id = 0 ;
        cardGoodSizesList.innerHTML = cenerateList(sizes);
        } else { cardGoodSizes.style.display = 'none';}
        //cardGoodBuy.textContent = ;
        cardGoodSelectWrapper.forEach((item) => {
            item.addEventListener('click', e => {
                const target = e.target;
                if (target.closest('.card-good__select')){
                    target.classList.toggle('card-good__select__open');
                }
                if (target.closest('.card-good__select-item')){
                    const  cardGoodSelect = item.querySelector('.card-good__select');
                    cardGoodSelect.textContent = target.textContent;
                    cardGoodSelect.dataset.id = target.dataset.id ;
                    cardGoodSelect.classList.remove('card-good__select__open');
                }

            });
        });
    };

    getGoods(renderCardGood, 'id', hash);

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