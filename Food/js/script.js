document.addEventListener('DOMContentLoaded', function() {

    // Tabs
    const tabContent = document.querySelectorAll('.tabcontent');
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabHeader = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabContent[i].classList.add('show', 'fade');
        tabContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabHeader.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, index) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(index);
                }
            });
        }
    });

    // Timer
    const deadline = '2022-01-01';

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

    setClock('.timer', deadline);

    // Modal
    const modal = document.querySelector('.modal');
    const openBtn = document.querySelectorAll('[data-modal]');

    const openModal = () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearTimeout(modalTimer);
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    openBtn.forEach(button => {
        button.addEventListener('click', openModal);
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') == '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimer = setTimeout(openModal, 50000);

    const scrollToOpenModal = () => {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', scrollToOpenModal);
        }
    };

    window.addEventListener('scroll', scrollToOpenModal);

    // Class for cards -----------------------------------------

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

    const getResource = async (url) => {
        const result = await fetch(url);

        if (!result.ok) {
            throw new Error(`Could not fetch ${url}, status: ${result.status}`);
        }

        return await result.json();
    };
    // getResource('http://localhost:3000/menu')
    // .then(data => {
    //     data.forEach(({img, altimg, title, descr, price}) => {
    //         new CardItem(img, altimg, title, descr, price, '.menu .container').card();
    //     });
    // });

    axios.get('http://localhost:3000/menu')
    .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
            new CardItem(img, altimg, title, descr, price, '.menu .container').card();
        });
    });

    // Forms --------------------------------------------
    
    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => bindPostData(item));
    
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

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.setAttribute('src', message.loading);
            statusMessage.style.cssText = 'display: block; margin: 0 auto;';
            form.insertAdjacentElement('afterend', statusMessage);

            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
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
        openModal();

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
            closeModal();
        }, 4000);
    }

    // Slider ---------------------------------------

    const slides = document.querySelectorAll('.offer__slide');
    const slider = document.querySelector('.offer__slider');
    const leftButton = document.querySelector('.offer__slider-prev');
    const rightButton = document.querySelector('.offer__slider-next');
    const slidesInner = document.querySelector('.offer__slider-inner');
    const slidesWrapper = document.querySelector('.offer__slider-wrapper');
    const current = document.querySelector('#current');
    const total = document.querySelector('#total');
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
});
























    // window.addEventListener('DOMContentLoaded', function() {

    //     // Tabs
        
    //     let tabs = document.querySelectorAll('.tabheader__item'),
    //         tabsContent = document.querySelectorAll('.tabcontent'),
    //         tabsParent = document.querySelector('.tabheader__items');
    
    //     function hideTabContent() {
            
    //         tabsContent.forEach(item => {
    //             item.classList.add('hide');
    //             item.classList.remove('show', 'fade');
    //         });
    
    //         tabs.forEach(item => {
    //             item.classList.remove('tabheader__item_active');
    //         });
    //     }
    
    //     function showTabContent(i = 0) {
    //         tabsContent[i].classList.add('show', 'fade');
    //         tabsContent[i].classList.remove('hide');
    //         tabs[i].classList.add('tabheader__item_active');
    //     }
        
    //     hideTabContent();
    //     showTabContent();
    
    //     tabsParent.addEventListener('click', function(event) {
    //         const target = event.target;
    //         if(target && target.classList.contains('tabheader__item')) {
    //             tabs.forEach((item, i) => {
    //                 if (target == item) {
    //                     hideTabContent();
    //                     showTabContent(i);
    //                 }
    //             });
    //         }
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
    
    //     next.addEventListener('click', () => {
    //         if (offset == (+width.slice(0, width.length - 2) * (slides.length - 1))) {
    //             offset = 0;
    //         } else {
    //             offset += +width.slice(0, width.length - 2); 
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
    //     });
    
    //     prev.addEventListener('click', () => {
    //         if (offset == 0) {
    //             offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    //         } else {
    //             offset -= +width.slice(0, width.length - 2);
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
    //     });