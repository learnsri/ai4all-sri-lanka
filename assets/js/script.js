function load_header_footer() {
    const header = document.getElementById("header_main");
    const footer = document.getElementById("footer_main");

    const xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "templates/header.php", true);
    xhr1.onload = function () {
        if (xhr1.status === 200) {
            header.innerHTML = xhr1.responseText;
            initHeaderInteractions();
        }
    };
    xhr1.send();

    function loadFooter(retries = 5, delay = 1000) {
        const xhr2 = new XMLHttpRequest();
        xhr2.open("GET", "templates/footer.php", true);
        xhr2.onload = function () {
            if (xhr2.status === 200) {
                footer.innerHTML = xhr2.responseText;
            } else if (retries > 0) {
                setTimeout(() => loadFooter(retries - 1, delay), delay);
            }
        };
        xhr2.onerror = function () {
            if (retries > 0) {
                setTimeout(() => loadFooter(retries - 1, delay), delay);
            }
        };
        xhr2.send();
    }

    loadFooter();
}

function initHeaderInteractions() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navbar = document.querySelector('.navbar');
    const langButtons = document.querySelectorAll('.lang-btn');
    const searchButton = document.querySelector('.search-bar button');
    const searchInput = document.querySelector('.search-bar input');

    if (!hamburger || !navMenu) return;

    function closeMenu() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }

    function handleResize() {
        const isDesktopLarge = window.innerWidth >= 1366;
        const isTabletOrSmallDesktop = window.innerWidth >= 769 && window.innerWidth < 1366;
        const isMobile = window.innerWidth <= 768;

        if (isDesktopLarge) {
            closeMenu();
            navMenu.style.removeProperty('opacity');
            navMenu.style.removeProperty('visibility');
            navMenu.style.removeProperty('pointer-events');
            navMenu.style.removeProperty('transform');
        }

        if (isTabletOrSmallDesktop || isMobile) {
            closeMenu();
        }
    }

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    document.addEventListener('click', function (e) {
        const clickedInsideNav = navbar && navbar.contains(e.target);
        if (!clickedInsideNav) {
            closeMenu();
        }
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth < 1200) {
                closeMenu();
            }
        });
    });

    window.addEventListener('resize', handleResize);
    handleResize();

    if (langButtons.length > 0) {
        langButtons.forEach(button => {
            button.addEventListener('click', function () {
                langButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 40) {
                navbar.style.boxShadow = '0 10px 24px rgba(10, 31, 54, 0.07)';
                navbar.style.borderBottomColor = 'rgba(15, 31, 52, 0.10)';
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            } else {
                navbar.style.boxShadow = '0 6px 18px rgba(10, 31, 54, 0.04)';
                navbar.style.borderBottomColor = 'rgba(15, 31, 52, 0.08)';
                navbar.style.background = 'rgba(255, 255, 255, 0.97)';
            }
        }
    });

    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function () {
            if (searchInput.value.trim() !== '') {
                alert('Searching for: ' + searchInput.value);
                searchInput.value = '';
            }
        });
    }
}

load_header_footer();