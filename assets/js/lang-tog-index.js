(function () {
    'use strict';

    const DEFAULT_LANG = 'en';
    const STORAGE_KEY = 'ai4all_lang';
    const SUPPORTED = ['en', 'si', 'ta'];

    function normalizeLang(value) {
        if (!value) return DEFAULT_LANG;
        const lang = value.toLowerCase().trim();
        return SUPPORTED.includes(lang) ? lang : DEFAULT_LANG;
    }

    function getSavedLang() {
        return normalizeLang(localStorage.getItem(STORAGE_KEY) || DEFAULT_LANG);
    }

    function saveLang(lang) {
        localStorage.setItem(STORAGE_KEY, normalizeLang(lang));
    }

    function detectButtonLang(button) {
        const explicit = button.getAttribute('data-lang');
        if (explicit) return normalizeLang(explicit);

        const text = button.textContent.trim().toLowerCase();

        if (text.includes('english')) return 'en';
        if (text.includes('සිං')) return 'si';
        if (text.includes('தமிழ')) return 'ta';

        return DEFAULT_LANG;
    }

    function setActiveButtons(lang) {
        const buttons = document.querySelectorAll('.lang-btn');

        buttons.forEach(button => {
            const buttonLang = detectButtonLang(button);
            button.classList.toggle('active', buttonLang === lang);
        });
    }

    function translateElement(el, lang) {
        const value = el.getAttribute(`data-${lang}`);
        if (value == null) return;

        if (el.tagName.toLowerCase() === 'title') {
            document.title = value;
            return;
        }

        if (el.hasAttribute('data-i18n-html')) {
            el.innerHTML = value;
        } else {
            el.textContent = value;
        }
    }

    function applyLanguage(lang) {
        const resolvedLang = normalizeLang(lang);

        document.documentElement.setAttribute('lang', resolvedLang);
        saveLang(resolvedLang);
        setActiveButtons(resolvedLang);

        const titleEl = document.querySelector('title');
        if (titleEl) {
            translateElement(titleEl, resolvedLang);
        }

        const translatable = document.querySelectorAll('[data-i18n]');
        translatable.forEach(el => translateElement(el, resolvedLang));

        const translatableHtml = document.querySelectorAll('[data-i18n-html]');
        translatableHtml.forEach(el => translateElement(el, resolvedLang));

        window.dispatchEvent(new CustomEvent('ai4all:languageChanged', {
            detail: { lang: resolvedLang }
        }));
    }

    function bindLanguageButtons(root = document) {
        const buttons = root.querySelectorAll('.lang-btn');

        buttons.forEach(button => {
            if (button.dataset.langBound === 'true') return;

            const lang = detectButtonLang(button);
            button.setAttribute('data-lang', lang);

            button.addEventListener('click', function () {
                applyLanguage(lang);
            });

            button.dataset.langBound = 'true';
        });
    }

    function initObserver() {
        const header = document.getElementById('header_main');
        const footer = document.getElementById('footer_main');

        const targets = [header, footer].filter(Boolean);
        if (!targets.length || !('MutationObserver' in window)) return;

        const observer = new MutationObserver(() => {
            bindLanguageButtons(document);
            applyLanguage(getSavedLang());
        });

        targets.forEach(target => {
            observer.observe(target, {
                childList: true,
                subtree: true
            });
        });
    }

    function init() {
        bindLanguageButtons(document);
        applyLanguage(getSavedLang());
        initObserver();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    window.ai4allSetLanguage = applyLanguage;
    window.ai4allGetLanguage = getSavedLang;
})();