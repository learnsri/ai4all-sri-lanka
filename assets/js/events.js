(function () {
    'use strict';

    function activateEventsTitle() {
        const title = document.getElementById('title_events');
        if (!title) return;

        title.classList.remove('active');

        setTimeout(function () {
            title.classList.add('active');
        }, 100);
    }

    function initEventsPage() {
        activateEventsTitle();
    }

    if (typeof waitForElement === 'function') {
        waitForElement('#title_events', function () {
            initEventsPage();
        });
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initEventsPage);
    } else {
        initEventsPage();
    }

    window.addEventListener('ai4all:languageChanged', function () {
        activateEventsTitle();
    });
})();