function modal() {
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
}

module.exports = modal;