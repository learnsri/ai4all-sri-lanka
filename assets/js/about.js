(function () {
    'use strict';

    function activateAboutTitle() {
        const title = document.getElementById('title_about');
        if (!title) return;

        title.classList.remove('active');

        setTimeout(function () {
            title.classList.add('active');
        }, 100);
    }

    function initTabs() {
        const tabHeaders = document.querySelectorAll('.tab-header');
        const tabContents = document.querySelectorAll('.tab-content');

        if (!tabHeaders.length || !tabContents.length) return;

        tabHeaders.forEach(function (header) {
            header.addEventListener('click', function () {
                const tabId = this.dataset.tab;
                const targetTab = document.getElementById(tabId + '-tab');

                tabHeaders.forEach(function (item) {
                    item.classList.remove('active');
                });

                tabContents.forEach(function (item) {
                    item.classList.remove('active');
                });

                this.classList.add('active');

                if (targetTab) {
                    targetTab.classList.add('active');
                }
            });
        });
    }

    function animateStat(el) {
        const originalText = el.getAttribute('data-counted-value') || el.textContent.trim();

        if (!el.getAttribute('data-counted-value')) {
            el.setAttribute('data-counted-value', originalText);
        }

        const hasPlus = originalText.includes('+');
        const hasK = /k/i.test(originalText);
        const numericValue = parseFloat(originalText);

        if (isNaN(numericValue)) return;

        const duration = 2000;
        const steps = 60;
        const stepValue = numericValue / steps;
        let currentValue = 0;

        const timer = setInterval(function () {
            currentValue += stepValue;

            if (currentValue >= numericValue) {
                el.textContent = numericValue + (hasK ? 'k' : '') + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                el.textContent =
                    (hasK ? currentValue.toFixed(1) : Math.floor(currentValue)) +
                    (hasK ? 'k' : '') +
                    (hasPlus ? '+' : '');
            }
        }, duration / steps);
    }

    function initStatsAnimation() {
        const stats = document.querySelectorAll('.detail-number');
        if (!stats.length || typeof IntersectionObserver === 'undefined') return;

        const observer = new IntersectionObserver(function (entries, obs) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                animateStat(entry.target);
                obs.unobserve(entry.target);
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -50px 0px'
        });

        stats.forEach(function (stat) {
            observer.observe(stat);
        });
    }

    function initAboutPage() {
        activateAboutTitle();
        initTabs();
        initStatsAnimation();
    }

    if (typeof waitForElement === 'function') {
        waitForElement('#title_about', function () {
            initAboutPage();
        });
    } else if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAboutPage);
    } else {
        initAboutPage();
    }

    window.addEventListener('ai4all:languageChanged', function () {
        activateAboutTitle();
    });
})();