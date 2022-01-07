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

export default modal;
export {closeModal};
export {openModal};