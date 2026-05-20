waitForElement('#title_news', function(element) {
    setTimeout(function() {
        element.classList.add("active");
        console.log("Element found and class added after 2 seconds");
    }, 100);
});

const newsGrid = document.getElementById('newsGrid');
const noNews = document.getElementById('noNews');

document.addEventListener('DOMContentLoaded', () => {
    fetchNews();
});

function fetchNews() {
    fetch('php/get_news.php')
    .then(res => res.json())
    .then(data => {
        if(data.length === 0){
            newsGrid.innerHTML = '';
            noNews.style.display = 'block';
        } else {
            noNews.style.display = 'none';
            newsGrid.innerHTML = '';
            data.forEach(item => newsGrid.appendChild(createNewsCard(item)));
        }
    }).catch(err => {
        console.error(err);
        noNews.style.display = 'block';
    });
}

function createNewsCard(news){
    const card = document.createElement('div');
    card.className = 'scholarship-card';
    
    const slides = news.images.map((img, i) => 
        `<img src="admin/uploads/news/${img}" class="slide ${i === 0 ? 'active' : ''}">`
    ).join('');

    card.innerHTML = `
        <div class="scholarship-image slideshow">
            ${slides}
            <button class="prev">&#10094;</button>
            <button class="next">&#10095;</button>
        </div>
        <div class="scholarship-content">
            <h3 class="scholarship-title">${news.title}</h3>
            <p class="scholarship-description">${news.content}</p>
        </div><br><br>
    `;

    const slideContainer = card.querySelector('.slideshow');
    let current = 0;
    const slideEls = slideContainer.querySelectorAll('.slide');
    const prev = slideContainer.querySelector('.prev');
    const next = slideContainer.querySelector('.next');

    prev.addEventListener('click', () => {
        slideEls[current].classList.remove('active');
        current = (current - 1 + slideEls.length) % slideEls.length;
        slideEls[current].classList.add('active');
    });

    next.addEventListener('click', () => {
        slideEls[current].classList.remove('active');
        current = (current + 1) % slideEls.length;
        slideEls[current].classList.add('active');
    });

    return card;
}
