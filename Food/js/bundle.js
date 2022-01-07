/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator() {
    const result = document.querySelector('.calculating__result span');
    let sex, age, weight, height, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')) {
        ratio = +localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }   

    function calcTotal() {
        if (!sex || !age || !weight || !height || !ratio) {
            result.textContent = `____`;
            return;
        }

        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    calcTotal();

    function initLocalSettings(selector, classActive) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(classActive);

            if (elem.getAttribute('id') === localStorage.getItem('sex')) {
                sex = localStorage.getItem('sex');
                elem.classList.add(classActive);
            }

            if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                ratio = +localStorage.getItem('ratio');
                elem.classList.add(classActive);
            }


        });
    }

    initLocalSettings('#gender div', 'calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    function setStaticInfo(selector, classActive) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e) => {
                elements.forEach(item => item.classList.remove(classActive));
                e.target.classList.add(classActive);
    
                if (e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }

                calcTotal();
            });

        });
    }

    setStaticInfo('#gender div', 'calculating__choose-item_active');
    setStaticInfo('.calculating__choose_big div', 'calculating__choose-item_active');

    function setDinamicInfo(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {
            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            if (input.value.match(/\D/g)) {
                input.style.border = 'solid 2px red';
            } else {
                input.style.border = 'none';
            }

            calcTotal();
        });
    }

    setDinamicInfo('#height');
    setDinamicInfo('#weight');
    setDinamicInfo('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    class CardItem {
        constructor(img, alt, subtitle, descr, price, parentSelector, ...classes) {
            this.img = img;
            this.alt = alt;
            this.subtitle = subtitle;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.classes = classes;
            this.transfer = 27;
            this.converter();
        }

        converter() {
            this.price = this.price * this.transfer;
        }

        card() {
            const div = document.createElement('div');

            if (this.classes.length === 0) {
                this.classes = 'menu__item';
                div.classList.add(this.classes);
            } else {
                this.classes.forEach(className => div.classList.add(className));
            }
            
            div.innerHTML = `
                <img src="${this.img}" alt="${this.alt}">
                <h3 class="menu__item-subtitle">Меню "${this.subtitle}"</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total">
                        <span>${this.price}</span> грн/день
                    </div>
                </div>
            `;
            this.parent.append(div);
        }
    }

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResource)('http://localhost:3000/menu')
    .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
            new CardItem(img, altimg, title, descr, price, '.menu .container').card();
        });
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(form, modalTimer) {
    const forms = document.querySelectorAll(form);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => bindPostData(item));

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', message.loading);
            statusMessage.style.cssText = 'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');
        prevModalDialog.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimer);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
        document.querySelector('.modal').append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
const openModal = (modalSelector, modalTimer) => {
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    if (modalTimer) {
        clearTimeout(modalTimer);
    }
};

const closeModal = (modalSelector) => {
    const modal = document.querySelector(modalSelector); 
    modal.classList.remove('show');
    document.body.style.overflow = '';
};
 
function modal(triggerSelector, modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    const openBtn = document.querySelectorAll(triggerSelector);

    openBtn.forEach(button => {
        button.addEventListener('click', () => openModal(modalSelector, modalTimer));
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    const scrollToOpenModal = () => {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', scrollToOpenModal);
        }
    };

    window.addEventListener('scroll', scrollToOpenModal);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, inner}) {
    const slides = document.querySelectorAll(slide);
    const slider = document.querySelector(container);
    const leftButton = document.querySelector(prevArrow);
    const rightButton = document.querySelector(nextArrow);
    const slidesInner = document.querySelector(inner);
    const slidesWrapper = document.querySelector(wrapper);
    const current = document.querySelector(currentCounter);
    const total = document.querySelector(totalCounter);
    const width = window.getComputedStyle(slidesWrapper).width;

    let currentSlide = 1;
    let offset = 0;

    function setZeroSlide() {
        if (slides.length < 10) {
            current.textContent = `0${currentSlide}`;
            total.textContent = `0${slides.length}`;
        } else {
            current.textContent = currentSlide;
            total.textContent = slides.length;
        }
    }

    slidesInner.style.cssText = `
        width: ${100 * slides.length}%;
        display: flex;
        transition: 0.5s all;
    `;

    slidesWrapper.style.overflow = 'hidden';
    
    slides.forEach(slide => slide.style.width = width);

    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.style.cssText =`
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 15;
        display: flex;
        justify-content: center;
        margin-right: 15%;
        margin-left: 15%;
        list-style: none;
    `;

    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-dot-to', i + 1);
        dot.style.cssText = `
            box-sizing: content-box;
            flex: 0 1 auto;
            width: 30px;
            height: 6px;
            margin-right: 3px;
            margin-left: 3px;
            cursor: pointer;
            background-color: #fff;
            background-clip: padding-box;
            border-top: 10px solid transparent;
            border-bottom: 10px solid transparent;
            opacity: .5;
            transition: opacity .6s ease;
        `;

        indicators.append(dot);
        dots.push(dot);
    }

    dots.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const dataAttr = e.target.getAttribute('data-dot-to');
            offset = +width.replace(/\D/g, '') * (dataAttr - 1);
            slidesInner.style.transform = `translateX(-${offset}px)`;
            currentSlide = dataAttr;

            setDefaultDot();
            setZeroSlide();
        });
    });

    function setDefaultDot() {
        dots.forEach(dot => dot.style.opacity = '.5');
        dots[currentSlide - 1].style.opacity = 1;
    }
    
    rightButton.addEventListener('click', () => {
        if (offset == +width.replace(/\D/g, '') * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += +width.replace(/\D/g, '');
        }
        
        if (currentSlide == slides.length) {
            currentSlide = 1;
        } else {
            currentSlide++;
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        setDefaultDot();
        setZeroSlide();
    });

    leftButton.addEventListener('click', () => {
        if (offset == 0) {
            offset = `${+width.replace(/\D/g, '') * (slides.length - 1)}`;
        } else {
            offset -= +width.replace(/\D/g, '');
        }

        if (currentSlide == 1) {
            currentSlide = slides.length;
        } else {
            currentSlide--;
        }

        slidesInner.style.transform = `translateX(-${offset}px)`;

        setDefaultDot();
        setZeroSlide();
    });

    setDefaultDot();
    setZeroSlide();
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, classActive) {
    const tabContent = document.querySelectorAll(tabsSelector);
    const tabs = document.querySelectorAll(tabsContentSelector);
    const tabHeader = document.querySelector(tabsParentSelector);

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove(classActive);
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add(classActive);
    }

    hideTabContent();
    showTabContent();

    tabHeader.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsContentSelector.slice(1))) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer(id, deadline) {

    function getTimeRemaining(endtime) {
        const total = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(total / (1000 * 60 * 60 * 24));
        const hours = Math.floor(total / (1000 * 60 * 60) % 24);
        const minutes = Math.floor(total / (1000 * 60) % 60);
        const seconds = Math.floor((total / 1000) % 60);
        
        return {
            'total': total,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function setZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days');
        const hours = timer.querySelector('#hours');
        const minutes = timer.querySelector('#minutes');
        const seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);
        updateClock();

        function updateClock() {
            const total = getTimeRemaining(endtime);
            
            days.innerHTML = setZero(total.days);
            hours.innerHTML = setZero(total.hours);
            minutes.innerHTML = setZero(total.minutes);
            seconds.innerHTML = setZero(total.seconds);

            if (total.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResource": () => (/* binding */ getResource)
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: data
    });

    return await result.json(); 
};

const getResource = async (url) => {
    const result = await fetch(url);

    if (!result.ok) {
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");









window.addEventListener('DOMContentLoaded', () => {
    const modalTimer = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimer), 500000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabcontent', '.tabheader__item', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]', '.modal', modalTimer);
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_2__["default"])('form', modalTimer);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_3__["default"])('.timer', '2022-11-30');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_4__["default"])();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        inner: '.offer__slider-inner'
    });
    (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

























// window.addEventListener('DOMContentLoaded', function() {

//     // Tabs
    
// 	let tabs = document.querySelectorAll('.tabheader__item'),
// 		tabsContent = document.querySelectorAll('.tabcontent'),
// 		tabsParent = document.querySelector('.tabheader__items');

// 	function hideTabContent() {
        
//         tabsContent.forEach(item => {
//             item.classList.add('hide');
//             item.classList.remove('show', 'fade');
//         });

//         tabs.forEach(item => {
//             item.classList.remove('tabheader__item_active');
//         });
// 	}

// 	function showTabContent(i = 0) {
//         tabsContent[i].classList.add('show', 'fade');
//         tabsContent[i].classList.remove('hide');
//         tabs[i].classList.add('tabheader__item_active');
//     }
    
//     hideTabContent();
//     showTabContent();

// 	tabsParent.addEventListener('click', function(event) {
// 		const target = event.target;
// 		if(target && target.classList.contains('tabheader__item')) {
//             tabs.forEach((item, i) => {
//                 if (target == item) {
//                     hideTabContent();
//                     showTabContent(i);
//                 }
//             });
// 		}
//     });
    
//     // Timer

//     const deadline = '2020-05-11';

//     function getTimeRemaining(endtime) {
//         const t = Date.parse(endtime) - Date.parse(new Date()),
//             days = Math.floor( (t/(1000*60*60*24)) ),
//             seconds = Math.floor( (t/1000) % 60 ),
//             minutes = Math.floor( (t/1000/60) % 60 ),
//             hours = Math.floor( (t/(1000*60*60) % 24) );

//         return {
//             'total': t,
//             'days': days,
//             'hours': hours,
//             'minutes': minutes,
//             'seconds': seconds
//         };
//     }

//     function getZero(num){
//         if (num >= 0 && num < 10) { 
//             return '0' + num;
//         } else {
//             return num;
//         }
//     }

//     function setClock(selector, endtime) {

//         const timer = document.querySelector(selector),
//             days = timer.querySelector("#days"),
//             hours = timer.querySelector('#hours'),
//             minutes = timer.querySelector('#minutes'),
//             seconds = timer.querySelector('#seconds'),
//             timeInterval = setInterval(updateClock, 1000);

//         updateClock();

//         function updateClock() {
//             const t = getTimeRemaining(endtime);

//             days.innerHTML = getZero(t.days);
//             hours.innerHTML = getZero(t.hours);
//             minutes.innerHTML = getZero(t.minutes);
//             seconds.innerHTML = getZero(t.seconds);

//             if (t.total <= 0) {
//                 clearInterval(timeInterval);
//             }
//         }
//     }

//     setClock('.timer', deadline);

//     // Modal

//     const modalTrigger = document.querySelectorAll('[data-modal]'),
//         modal = document.querySelector('.modal');

//     modalTrigger.forEach(btn => {
//         btn.addEventListener('click', openModal);
//     });

//     function closeModal() {
//         modal.classList.add('hide');
//         modal.classList.remove('show');
//         document.body.style.overflow = '';
//     }

//     function openModal() {
//         modal.classList.add('show');
//         modal.classList.remove('hide');
//         document.body.style.overflow = 'hidden';
//         clearInterval(modalTimerId);
//     }

//     modal.addEventListener('click', (e) => {
//         if (e.target === modal || e.target.getAttribute('data-close') == "") {
//             closeModal();
//         }
//     });

//     document.addEventListener('keydown', (e) => {
//         if (e.code === "Escape" && modal.classList.contains('show')) { 
//             closeModal();
//         }
//     });

//     const modalTimerId = setTimeout(openModal, 300000);
//     // Изменил значение, чтобы не отвлекало

//     function showModalByScroll() {
//         if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
//             openModal();
//             window.removeEventListener('scroll', showModalByScroll);
//         }
//     }
//     window.addEventListener('scroll', showModalByScroll);

//     // Используем классы для создание карточек меню

//     class MenuCard {
//         constructor(src, alt, title, descr, price, parentSelector, ...classes) {
//             this.src = src;
//             this.alt = alt;
//             this.title = title;
//             this.descr = descr;
//             this.price = price;
//             this.classes = classes;
//             this.parent = document.querySelector(parentSelector);
//             this.transfer = 27;
//             this.changeToUAH(); 
//         }

//         changeToUAH() {
//             this.price = this.price * this.transfer; 
//         }

//         render() {
//             const element = document.createElement('div');

//             if (this.classes.length === 0) {
//                 this.classes = "menu__item";
//                 element.classList.add(this.classes);
//             } else {
//                 this.classes.forEach(className => element.classList.add(className));
//             }

//             element.innerHTML = `
//                 <img src=${this.src} alt=${this.alt}>
//                 <h3 class="menu__item-subtitle">${this.title}</h3>
//                 <div class="menu__item-descr">${this.descr}</div>
//                 <div class="menu__item-divider"></div>
//                 <div class="menu__item-price">
//                     <div class="menu__item-cost">Цена:</div>
//                     <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
//                 </div>
//             `;
//             this.parent.append(element);
//         }
//     }

//     getResource('http://localhost:3000/menu')
//         .then(data => {
//             data.forEach(({img, altimg, title, descr, price}) => {
//                 new MenuCard(img, altimg, title, descr, price, ".menu .container").render();
//             });
//         });

//     // Forms

//     const forms = document.querySelectorAll('form');
//     const message = {
//         loading: 'img/form/spinner.svg',
//         success: 'Спасибо! Скоро мы с вами свяжемся',
//         failure: 'Что-то пошло не так...'
//     };

//     forms.forEach(item => {
//         bindPostData(item);
//     });

//     const postData = async (url, data) => {
//         let res = await fetch(url, {
//             method: "POST",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: data
//         });
    
//         return await res.json();
//     };

//     async function getResource(url) {
//         let res = await fetch(url);
    
//         if (!res.ok) {
//             throw new Error(`Could not fetch ${url}, status: ${res.status}`);
//         }
    
//         return await res.json();
//     }

//     function bindPostData(form) {
//         form.addEventListener('submit', (e) => {
//             e.preventDefault();

//             let statusMessage = document.createElement('img');
//             statusMessage.src = message.loading;
//             statusMessage.style.cssText = `
//                 display: block;
//                 margin: 0 auto;
//             `;
//             form.insertAdjacentElement('afterend', statusMessage);
        
//             const formData = new FormData(form);

//             const json = JSON.stringify(Object.fromEntries(formData.entries()));

//             postData('http://localhost:3000/requests', json)
//             .then(data => {
//                 console.log(data);
//                 showThanksModal(message.success);
//                 statusMessage.remove();
//             }).catch(() => {
//                 showThanksModal(message.failure);
//             }).finally(() => {
//                 form.reset();
//             });
//         });
//     }

//     function showThanksModal(message) {
//         const prevModalDialog = document.querySelector('.modal__dialog');

//         prevModalDialog.classList.add('hide');
//         openModal();

//         const thanksModal = document.createElement('div');
//         thanksModal.classList.add('modal__dialog');
//         thanksModal.innerHTML = `
//             <div class="modal__content">
//                 <div class="modal__close" data-close>×</div>
//                 <div class="modal__title">${message}</div>
//             </div>
//         `;
//         document.querySelector('.modal').append(thanksModal);
//         setTimeout(() => {
//             thanksModal.remove();
//             prevModalDialog.classList.add('show');
//             prevModalDialog.classList.remove('hide');
//             closeModal();
//         }, 4000);
//     }

//     // Slider

//     let offset = 0;
//     let slideIndex = 1;

//     const slides = document.querySelectorAll('.offer__slide'),
//         slider = document.querySelector('.offer__slider'),
//         prev = document.querySelector('.offer__slider-prev'),
//         next = document.querySelector('.offer__slider-next'),
//         total = document.querySelector('#total'),
//         current = document.querySelector('#current'),
//         slidesWrapper = document.querySelector('.offer__slider-wrapper'),
//         width = window.getComputedStyle(slidesWrapper).width,
//         slidesField = document.querySelector('.offer__slider-inner');

//     if (slides.length < 10) {
//         total.textContent = `0${slides.length}`;
//         current.textContent =  `0${slideIndex}`;
//     } else {
//         total.textContent = slides.length;
//         current.textContent =  slideIndex;
//     }
    
//     slidesField.style.width = 100 * slides.length + '%';
//     slidesField.style.display = 'flex';
//     slidesField.style.transition = '0.5s all';

//     slidesWrapper.style.overflow = 'hidden';

//     slides.forEach(slide => {
//         slide.style.width = width;
//     });

//     slider.style.position = 'relative';

//     const indicators = document.createElement('ol'),
//           dots = [];
//     indicators.classList.add('carousel-indicators');
//     indicators.style.cssText = `
//         position: absolute;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         z-index: 15;
//         display: flex;
//         justify-content: center;
//         margin-right: 15%;
//         margin-left: 15%;
//         list-style: none;
//     `; // Если хотите - добавьте в стили, но иногда у нас нет доступа к стилям
//     slider.append(indicators);

//     for (let i = 0; i < slides.length; i++) {
//         const dot = document.createElement('li');
//         dot.setAttribute('data-slide-to', i + 1);
//         dot.style.cssText = `
//             box-sizing: content-box;
//             flex: 0 1 auto;
//             width: 30px;
//             height: 6px;
//             margin-right: 3px;
//             margin-left: 3px;
//             cursor: pointer;
//             background-color: #fff;
//             background-clip: padding-box;
//             border-top: 10px solid transparent;
//             border-bottom: 10px solid transparent;
//             opacity: .5;
//             transition: opacity .6s ease;
//         `;
//         if (i == 0) {
//             dot.style.opacity = 1;
//         }
//         indicators.append(dot);
//         dots.push(dot);
//     }

//     next.addEventListener('click', () => {
//         if (offset == (deleteNotDigits(width) * (slides.length - 1))) {
//             offset = 0;
//         } else {
//             offset += deleteNotDigits(width); 
//         }

//         slidesField.style.transform = `translateX(-${offset}px)`;

//         if (slideIndex == slides.length) {
//             slideIndex = 1;
//         } else {
//             slideIndex++;
//         }

//         if (slides.length < 10) {
//             current.textContent =  `0${slideIndex}`;
//         } else {
//             current.textContent =  slideIndex;
//         }

//         dots.forEach(dot => dot.style.opacity = ".5");
//         dots[slideIndex-1].style.opacity = 1;
//     });

//     prev.addEventListener('click', () => {
//         if (offset == 0) {
//             offset = deleteNotDigits(width) * (slides.length - 1);
//         } else {
//             offset -= deleteNotDigits(width);
//         }

//         slidesField.style.transform = `translateX(-${offset}px)`;

//         if (slideIndex == 1) {
//             slideIndex = slides.length;
//         } else {
//             slideIndex--;
//         }

//         if (slides.length < 10) {
//             current.textContent =  `0${slideIndex}`;
//         } else {
//             current.textContent =  slideIndex;
//         }

//         dots.forEach(dot => dot.style.opacity = ".5");
//         dots[slideIndex-1].style.opacity = 1;
//     });

//     dots.forEach(dot => {
//         dot.addEventListener('click', (e) => {
//             const slideTo = e.target.getAttribute('data-slide-to');

//             slideIndex = slideTo;
//             offset = deleteNotDigits(width) * (slideTo - 1);

//             slidesField.style.transform = `translateX(-${offset}px)`;

//             if (slides.length < 10) {
//                 current.textContent =  `0${slideIndex}`;
//             } else {
//                 current.textContent =  slideIndex;
//             }

//             dots.forEach(dot => dot.style.opacity = ".5");
//             dots[slideIndex-1].style.opacity = 1;
//         });
//     });

//     function deleteNotDigits(str) {
//         return +str.replace(/\D/g, '');
//     }

//     // Calculator

//     const result = document.querySelector('.calculating__result span');
//     let sex = 'female',
//         height, weight, age,
//         ratio = 1.375;

//     function calcTotal() {
//         if (!sex || !height || !weight || !age || !ratio) {
//             result.textContent = '____'; // Можете придумать что угодно
//             return;
//         }
//         if (sex === 'female') {
//             result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
//         } else {
//             result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
//         }
//     }

//     calcTotal();

//     function getStaticInformation(parentSelector, activeClass) {
//         const elements = document.querySelectorAll(`${parentSelector} div`);

//         elements.forEach(elem => {
//             elem.addEventListener('click', (e) => {
//                 if (e.target.getAttribute('data-ratio')) {
//                     ratio = +e.target.getAttribute('data-ratio');
//                 } else {
//                     sex = e.target.getAttribute('id');
//                 }
    
//                 elements.forEach(elem => {
//                     elem.classList.remove(activeClass);
//                 });
    
//                 e.target.classList.add(activeClass);
    
//                 calcTotal();
//             });
//         });
//     }

//     getStaticInformation('#gender', 'calculating__choose-item_active');
//     getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');

//     function getDynamicInformation(selector) {
//         const input = document.querySelector(selector);

//         input.addEventListener('input', () => {
//             switch(input.getAttribute('id')) {
//                 case "height":
//                     height = +input.value;
//                     break;
//                 case "weight":
//                     weight = +input.value;
//                     break;
//                 case "age":
//                     age = +input.value;
//                     break;
//             }

//             calcTotal();
//         });
//     }

//     getDynamicInformation('#height');
//     getDynamicInformation('#weight');
//     getDynamicInformation('#age');

// });












    
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map