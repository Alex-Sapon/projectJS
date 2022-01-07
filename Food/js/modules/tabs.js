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

export default tabs;