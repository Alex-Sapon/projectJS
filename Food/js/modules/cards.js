import {getResource} from '../services/services';

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

    getResource('http://localhost:3000/menu')
    .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
            new CardItem(img, altimg, title, descr, price, '.menu .container').card();
        });
    });
}

export default cards;