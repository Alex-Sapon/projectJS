require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs from './modules/tabs';
import modal from './modules/modal';
import forms from './modules/forms';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 500000);

    tabs('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    modal('[data-modal]', '.modal', modalTimer);
    forms('form', modalTimer);
    timer('.timer', '2022-11-30');
    cards();
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner'
    });
    calculator();
});
