/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';


document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const divAdv = document.querySelectorAll('.promo__adv img');
    const genre = document.querySelector('.promo__genre');
    const promoBg = document.querySelector('.promo__bg');
    const ulList = document.querySelector('.promo__interactive-list');
    const form = document.querySelector('form.add');
    const input = form.querySelector('.adding__input');
    const checkbox = form.querySelector('[type="checkbox"]');


    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const inputVal = input.value;
        if (inputVal) {
            if (inputVal.length > 21) {
                movieDB.movies.push(`${inputVal.substring(0, 21)}...`);
            } else {
               movieDB.movies.push(input.value);
            }
            if (checkbox) {
                console.log('Добавляем любимый фильм');
            }
        }

        createMovieList(movieDB.movies, ulList);
        e.target.reset();
    });

    const deleteAdv = (arr) => {
        arr.forEach(item => {
            item.remove();
        });
    };
   
    const changeContent = () => {
        genre.textContent = 'драма';
        promoBg.style.cssText = 'background-image: url(./img/bg.jpg)';
    };

    const sortArr = (arr) => {
        arr.sort();
    };
 
    function createMovieList(base, parent) {
        parent.innerHTML = '';
        sortArr(base);
        base.forEach((item, index) => {
            parent.innerHTML += `
                <li class="promo__interactive-item">${index + 1} ${item}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((button, index) => {
            button.addEventListener('click', (e) => {
                const currentButton = e.currentTarget;
                currentButton.closest('.promo__interactive-item').remove();
                base.splice(index, 1);
                
                createMovieList(base, parent);
            });
        });
    }


    changeContent();
    deleteAdv(divAdv);
    createMovieList(movieDB.movies, ulList);
});








































// document.addEventListener('DOMContentLoaded', () => {

//     const movieDB = {
//         movies: [
//             "Логан",
//             "Лига справедливости",
//             "Ла-ла лэнд",
//             "Одержимость",
//             "Скотт Пилигрим против..."
//         ]
//     };

//     const adv = document.querySelectorAll('.promo__adv img'),
//         poster = document.querySelector('.promo__bg'),
//         genre = poster.querySelector('.promo__genre'),
//         movieList = document.querySelector('.promo__interactive-list'),
//         addForm = document.querySelector('form.add'),
//         addInput = addForm.querySelector('.adding__input'),
//         checkbox = addForm.querySelector('[type="checkbox"]');

//     addForm.addEventListener('submit', (event) => {
//         event.preventDefault();

//         let newFilm = addInput.value;
//         const favorite = checkbox.checked;

//         if (newFilm) {

//             if (newFilm.length > 21) {
//                 newFilm = `${newFilm.substring(0, 22)}...`;
//             }

//             if (favorite) {
//                 console.log("Добавляем любимый фильм");
//             }

//             movieDB.movies.push(newFilm);
//             sortArr(movieDB.movies);
    
//             createMovieList(movieDB.movies, movieList);
//         }

//         event.target.reset();

//     });

//     const deleteAdv = (arr) => {
//         arr.forEach(item => {
//             item.remove();
//         });
//     };

//     const makeChanges = () => {
//         genre.textContent = 'драма';

//         poster.style.backgroundImage = 'url("img/bg.jpg")';
//     };

//     const sortArr = (arr) => {
//         arr.sort();
//     };

//     function createMovieList(films, parent) {
//         parent.innerHTML = "";
//         sortArr(films);
    
//         films.forEach((film, i) => {
//             parent.innerHTML += `
//                 <li class="promo__interactive-item">${i + 1} ${film}
//                     <div class="delete"></div>
//                 </li>
//             `;
//         });

//         document.querySelectorAll('.delete').forEach((btn, i) => {
//             btn.addEventListener('click', () => {
//                 btn.parentElement.remove();
//                 movieDB.movies.splice(i, 1);

//                 createMovieList(films, parent);
//             });
//         });
//     }

//     deleteAdv(adv);
//     makeChanges();
//     createMovieList(movieDB.movies, movieList);

// });