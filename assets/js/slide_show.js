(function () {
    'use strict';

    const slidesData = [
        {
            image: 'assets/images/slides/5.jpg',
            title: {
                en: 'AI Achievers of 2025: Symbolic Beginnings and Special Occasions - Art Theater, UoP',
                si: 'AI Achievers 2025: සංකේතාත්මක ආරම්භය සහ විශේෂ අවස්ථා - කලා රඟහල, UoP',
                ta: '2025 ஆம் ஆண்டின் AI சாதனையாளர்கள்: அடையாளப்பூர்வ தொடக்க மற்றும் சிறப்பு நிகழ்வுகள், கலை அரங்கு, பேராதனைப் பல்கலைக்கழகம்'
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        },
        {
            image: 'assets/images/slides/6.jpg',
            title: {
                en: 'AI Achievers of 2025: Highlights of the First Certificate Awarding Ceremony - Art Theater, UoP',
                si: 'AI Achievers 2025: පළමු සහතික ප්‍රදානෝත්සවයේ විශේෂ අවස්ථා - කලා රඟහල, UoP',
                ta: '2025 ஆம் ஆண்டின் AI சாதனையாளர்கள்: முதலாவது சான்றிதழ் வழங்கும் விழாவின் முக்கிய நிகழ்வுகள் '
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        },
        {
            image: 'assets/images/slides/7.jpg',
            title: {
                en: 'Special Moments from the First Certificate Awarding Ceremony',
                si: 'පළමු සහතික ප්‍රදානෝත්සවයේ විශේෂ අවස්ථා',
                ta: 'முதலாவது சான்றிதழ் வழங்கும் விழாவின் சிறப்புத் தருணங்கள்'
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        },
        {
            image: 'assets/images/slides/1.jpg',
            title: {
                en: '1st Certificate Awarding Ceremony',
                si: 'සම්මාන ප්‍රදානෝත්සවය 1',
                ta: 'முதலாவது சான்றிதழ் வழங்கும் விழா '
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        },
        {
            image: 'assets/images/slides/2.jpg',
            title: {
                en: 'AI4All - AI4All – Workshop at Sabaragamuwa University',
                si: 'AI4All - AI4All - වැඩමුළුව, සබරගමුව විශ්වවිද්‍යාලය',
                ta: 'AI4All - AI அடிப்படை திட்டம் @ ICARC 2026, சப்ரகமுவ பல்கலைக்கழகம்'
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        },
        {
            image: 'assets/images/slides/3.jpg',
            title: {
                en: 'AI4All - Symbolic Launch',
                si: 'AI4All - සංකේතාත්මක ආරම්භය',
                ta: 'AI4All - அடையாளப்பூர்வ அறிமுகம்'
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        },
        {
            image: 'assets/images/slides/4.jpg',
            title: {
                en: 'Certificate awarding ceremony 2',
                si: 'සම්මාන ප්‍රදානෝත්සවය 2',
                ta: 'இரண்டாவது  சான்றிதழ் வழங்கும் விழா'
            },
            subtitle: {
                en: '2025',
                si: '2025',
                ta: '2025'
            }
        }
    ];

    const container = document.getElementById('slideshowContainer');
    const slidesWrapper = document.getElementById('slidesWrapper');
    const counter = document.getElementById('slideCounter');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    if (!container || !slidesWrapper || !counter || !prevBtn || !nextBtn) return;

let currentSlide = 0;
let timer = null;
const SLIDE_DURATION = 3000;
let timeLeft = SLIDE_DURATION;
let isHovering = false;

    function getCurrentLang() {
        if (typeof window.ai4allGetLanguage === 'function') {
            return window.ai4allGetLanguage();
        }
        return 'en';
    }

    function getText(valueObj) {
        const lang = getCurrentLang();
        if (!valueObj) return '';
        return valueObj[lang] || valueObj.en || '';
    }

    function initializeSlides() {
        if (slidesData.length > 0) {
            startSlideshow();
        }
    }

    function startSlideshow() {
        createSlides();
        showSlide(currentSlide);
        startTimer();
    }

    function createSlides() {
        slidesWrapper.innerHTML = '';

        slidesData.forEach((slideData, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide' + (index === currentSlide ? ' active' : '');

            slide.innerHTML = `
                <div class="slide-content" style="background-image: url('${slideData.image}')">
                    <div class="slide-overlay"></div>
                    <div class="slide-text">
                        <div class="slide-title">${getText(slideData.title)}</div>
                        <div class="slide-subtitle">${getText(slideData.subtitle)}</div>
                    </div>
                </div>
                <div class="progress-bar"></div>
            `;

            slidesWrapper.appendChild(slide);
        });
    }

    function getSlides() {
        return document.querySelectorAll('.slide');
    }

    function showSlide(index) {
        const slides = getSlides();
        if (slides.length === 0) return;

        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
        counter.textContent = `${index + 1}/${slides.length}`;
        updateProgressBar();
    }

    function updateProgressBar() {
        const slides = getSlides();
        if (!slides[currentSlide]) return;

        const progressBar = slides[currentSlide].querySelector('.progress-bar');
        const progress = ((SLIDE_DURATION - timeLeft) / SLIDE_DURATION) * 100;
        progressBar.style.width = progress + '%';
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
            timer = null;
        }
    }

    function startTimer() {
        if (isHovering || slidesData.length === 0) return;

        stopTimer();
        timeLeft = SLIDE_DURATION;
        updateProgressBar();

        timer = setInterval(() => {
            timeLeft -= 50;

            if (timeLeft <= 0) {
                nextSlide();
            } else {
                updateProgressBar();
            }
        }, 50);
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slidesData.length;
        timeLeft = SLIDE_DURATION;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slidesData.length) % slidesData.length;
        timeLeft = SLIDE_DURATION;
        showSlide(currentSlide);
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        startTimer();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        startTimer();
    });

    container.addEventListener('mouseenter', () => {
        isHovering = true;
        stopTimer();
    });

    container.addEventListener('mouseleave', () => {
        isHovering = false;
        startTimer();
    });

    window.addEventListener('ai4all:languageChanged', () => {
        createSlides();
        showSlide(currentSlide);
    });

    initializeSlides();
})();