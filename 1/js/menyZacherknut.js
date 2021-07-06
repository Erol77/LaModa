'use strict';
const list = document.querySelector('ul');//присвоили через тег весь список
const li = list.querySelectorAll('li');//выбрали у присвоенного эл-та с помощью стандартной функции по ид и т.п.
console.log(li);

for (let i = 0; i < li.length; i++ ){
    console.log(li[i]);//так мы перебрали все события и развернули их
}
for (let i = 0; i < li.length; i++ ) {
    li[i].addEventListener('click', ()=> {//метод слушает, присвоили ему слушать событие клик
        li[i].classList.toggle('through');//когда оно наступает присваиваем класс
    }
    );

}
function closeMenu(){
    let menu=document.getElementById('nav');
    let subm=document.getElementsByClassName('submenu');
    for (let i=0; i<subm.length; i++) {
        subm[i].style.display="none";
    }
document.getElementById('nav').onmouseover= function(event) {
    let target = event.target; // где был клик?
    if (target.className === 'menu-item') {
        var s=target.getElementsByClassName('submenu');
        closeMenu();
        s[0].style.display='block';
    }
};
}
document.onmousemove=function(event) {
    let target = event.target; // где был клик?
    console.log(event.target);
    if (target.className!=='menu-item' && target.className!=='submenu') {
        closeMenu();
    }
};