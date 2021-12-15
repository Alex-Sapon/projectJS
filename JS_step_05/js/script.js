/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};

const divAdv = document.querySelector('.promo__adv');
const genre = document.querySelector('.promo__genre');
const promoBg = document.querySelector('.promo__bg');
const ulList = document.querySelectorAll('.promo__interactive-item');

divAdv.innerHTML = '';
// divAdv.children[0].remove();
// divAdv.children[0].remove();
// divAdv.children[0].remove();
// divAdv.children[0].remove();

genre.textContent = 'драма';

promoBg.style.cssText = 'background-image: url(./img/bg.jpg)';
// promoBg.style.backgroundImage = 'url(./img/bg.jpg)';

movieDB.movies.sort();

ulList.forEach((item, index) => {
    item.textContent = `№${index + 1} ${movieDB.movies[index]}`;
});