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

export default slider;