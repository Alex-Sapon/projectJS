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

export default calculator;