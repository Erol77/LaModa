//dom=>applicationCache;
console.log(document);
const head = document.getElementsByTagName('h1');
console.log(head[0]);

const head1 = document.getElementsByClassName('head');
console.log(head1[0]);

const head2 = document.getElementById('element1');
console.log(head2);

const head11 = document.querySelector('li');
const head12 = document.querySelector('.head');
const head13 = document.querySelector('#element1');
const title = document.querySelector('[title="javascript"]');
console.log(head11 , 'получили по тэгу');
console.log(head12, "получили по классу");
console.log(head13 , " получили по ид");
console.log(head13 , " получили по атрибуту");
const head15 = document.querySelectorAll('li');
console.log(head15 , 'получили по тэгу vse');

head11.className = 'red';//переписывает старый класс
head13.classList.add('blue');//добавляет класс и у кого больше вес тот сработает
head13.classList.remove('head');//удаляет класс

console.log(head11.className);
console.log(head13.className);
const blue = document.querySelector('#spis3');
blue.classList.toggle('green');//проверяет если есть такой класс удаляет его , а если нет то добавляет
console.log(blue);
console.log(blue.classList.contains('blue'));//покажет есть ли такой класс
title.style.textDecoration = 'line-through';

const list = document.querySelector('ul');//присвоили через тег весь список
console.log(list);

const li = list.querySelector('#spis3');//выбрали у присвоенного эл-та с помощью стандартной функции по ид и т.п.
console.log(li);