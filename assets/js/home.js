(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', function () {
    initFocusMatrixBackground();
    initSmoothAnchorScroll();
    initRevealOnScroll();
    initHeroButtons();
    initImpactStatAnimation();
    initMatrixBackground();
    initLeadershipNetworkBackground();
    initHeroAiBackground();
});

    function getNavbarHeight() {
        const navbar =
            document.querySelector('.navbar') ||
            document.querySelector('#header_main .navbar') ||
            document.querySelector('header .navbar');

        return navbar ? navbar.offsetHeight : 0;
    }

    function initSmoothAnchorScroll() {
        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(link => {
            link.addEventListener('click', function (event) {
                const href = this.getAttribute('href');

                if (!href || href === '#') return;

                const target = document.querySelector(href);
                if (!target) return;

                event.preventDefault();

                const offset = getNavbarHeight() + 18;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top,
                    behavior: 'smooth'
                });
            });
        });
    }

    function initRevealOnScroll() {
        const revealTargets = document.querySelectorAll([
            '.hero-intro',
            '.hero-showcase',
            '.hero-impact-bar',
            '.section-heading',
            '.about-program-main',
            '.info-card',
            '.feature-item',
            '.journey-step',
            '.registration-card',
            '.highlight-card',
            '.message-card',
            '.contact-strip-content'
        ].join(','));

        if (!revealTargets.length) return;

        revealTargets.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(28px)';
            element.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            element.style.transitionDelay = `${Math.min(index * 50, 250)}ms`;
        });

        if (!('IntersectionObserver' in window)) {
            revealTargets.forEach(showElement);
            return;
        }

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                showElement(entry.target);
                obs.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        revealTargets.forEach(element => observer.observe(element));
    }

    function showElement(element) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    }

    function initHeroButtons() {
        const buttons = document.querySelectorAll('.hero-btn, .btn-form-link');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', function () {
                this.style.willChange = 'transform';
            });

            button.addEventListener('mouseleave', function () {
                this.style.willChange = 'auto';
            });
        });
    }

    function initImpactStatAnimation() {
        const statElements = document.querySelectorAll('.impact-stat-item h3');
        if (!statElements.length) return;

        const animated = new WeakSet();

        if (!('IntersectionObserver' in window)) {
            statElements.forEach(el => {
                if (hasNumber(el.textContent.trim())) animateNumber(el);
            });
            return;
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting || animated.has(entry.target)) return;

                animated.add(entry.target);
                animateNumber(entry.target);
            });
        }, {
            threshold: 0.4
        });

        statElements.forEach(el => {
            if (hasNumber(el.textContent.trim())) {
                observer.observe(el);
            }
        });
    }

    function hasNumber(text) {
        return /\d/.test(text);
    }

    function animateNumber(element) {
        const originalText = element.textContent.trim();
        const numericValue = parseFloat(originalText.replace(/[^0-9.]/g, ''));

        if (isNaN(numericValue)) return;

        const hasPlus = originalText.includes('+');
        const hasPercent = originalText.includes('%');
        const decimals = originalText.includes('.') ? 1 : 0;

        const duration = 1400;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = easeOutCubic(progress);
            const currentValue = numericValue * eased;

            let formattedValue;

            if (decimals > 0) {
                formattedValue = currentValue.toFixed(decimals);
            } else {
                formattedValue = Math.round(currentValue).toString();
            }

            if (hasPercent) formattedValue += '%';
            if (hasPlus) formattedValue += '+';

            element.textContent = formattedValue;

            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = originalText;
            }
        }

        requestAnimationFrame(update);
    }

    function easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    }
})();


function initMatrixBackground() {
    const canvas = document.getElementById('matrixBgCanvas');
    const targetSection = document.querySelector('.impact-section');

    if (!canvas || !targetSection) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let columns = [];
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ';
    const fontSize = 16;

    function resizeCanvas() {
        canvas.width = targetSection.offsetWidth;
        canvas.height = targetSection.offsetHeight;

        const totalColumns = Math.floor(canvas.width / fontSize);
        columns = [];

        for (let i = 0; i < totalColumns; i++) {
            columns.push({
                y: Math.random() * -canvas.height,
                speed: 0.6 + Math.random() * 0.6,
                length: 10 + Math.floor(Math.random() * 18)
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < columns.length; i++) {
            const x = i * fontSize;
            const col = columns[i];

            for (let j = 0; j < col.length; j++) {
                const y = col.y - j * fontSize;

                if (y < 0 || y > canvas.height) continue;

                const char = chars[Math.floor(Math.random() * chars.length)];
                const alpha = Math.max(0.08, 0.30 - j * 0.014);

                ctx.font = `${fontSize}px monospace`;
                ctx.fillStyle = `rgba(55, 130, 220, ${alpha})`;
                ctx.fillText(char, x, y);
            }

            col.y += col.speed;

            if (col.y - col.length * fontSize > canvas.height + 40) {
                col.y = -Math.random() * 300 - 40;
                col.speed = 0.6 + Math.random() * 0.6;
                col.length = 10 + Math.floor(Math.random() * 18);
            }
        }

        animationId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 120);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            draw();
        }
    });
}



















function initFocusMatrixBackground() {
    const canvas = document.getElementById('focusMatrixCanvas');
    const targetSection = document.querySelector('.focus-section');

    if (!canvas || !targetSection) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let columns = [];
    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZアイウエオカキクケコ';
    const fontSize = 16;

    function resizeCanvas() {
        canvas.width = targetSection.offsetWidth;
        canvas.height = targetSection.offsetHeight;

        const totalColumns = Math.floor(canvas.width / fontSize);
        columns = [];

        for (let i = 0; i < totalColumns; i++) {
            columns.push({
                y: Math.random() * -canvas.height,
                speed: 0.55 + Math.random() * 0.5,
                length: 10 + Math.floor(Math.random() * 16)
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < columns.length; i++) {
            const x = i * fontSize;
            const col = columns[i];

            for (let j = 0; j < col.length; j++) {
                const y = col.y - j * fontSize;

                if (y < 0 || y > canvas.height) continue;

                const char = chars[Math.floor(Math.random() * chars.length)];
                const alpha = Math.max(0.05, 0.20 - j * 0.01);

                ctx.font = `${fontSize}px monospace`;
                ctx.fillStyle = `rgba(55, 130, 220, ${alpha})`;
                ctx.fillText(char, x, y);
            }

            col.y += col.speed;

            if (col.y - col.length * fontSize > canvas.height + 40) {
                col.y = -Math.random() * 300 - 40;
                col.speed = 0.55 + Math.random() * 0.5;
                col.length = 10 + Math.floor(Math.random() * 16);
            }
        }

        animationId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 120);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            draw();
        }
    });
}










function initLeadershipNetworkBackground() {
    const canvas = document.getElementById('leadershipNetworkCanvas');
    const targetSection = document.querySelector('.leadership-refined-section');

    if (!canvas || !targetSection) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let nodes = [];
    const nodeCount = window.innerWidth < 768 ? 24 : 40;
    const maxDistance = window.innerWidth < 768 ? 120 : 170;

    function resizeCanvas() {
        canvas.width = targetSection.offsetWidth;
        canvas.height = targetSection.offsetHeight;
        createNodes();
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                r: Math.random() * 1.8 + 1.1
            });
        }
    }

    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const alpha = (1 - distance / maxDistance) * 0.94;
                    ctx.strokeStyle = `rgba(70, 145, 230, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function drawNodes() {
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(90, 170, 255, 0.22)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r + 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(90, 170, 255, 0.05)';
            ctx.fill();
        });
    }

    function updateNodes() {
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawConnections();
        drawNodes();
        updateNodes();
        animationId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 120);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            draw();
        }
    });
}








function initHeroAiBackground() {
    const canvas = document.getElementById('heroAiCanvas');
    const shell = document.querySelector('.hero-ai-shell');

    if (!canvas || !shell) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId;
    let nodes = [];
    let waves = [];
    const nodeCount = window.innerWidth < 768 ? 22 : 36;
    const maxDistance = window.innerWidth < 768 ? 110 : 150;

    function resizeCanvas() {
        canvas.width = shell.offsetWidth;
        canvas.height = shell.offsetHeight;
        createNodes();
        createWaves();
    }

    function createNodes() {
        nodes = [];
        for (let i = 0; i < nodeCount; i++) {
            nodes.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.18,
                vy: (Math.random() - 0.5) * 0.18,
                r: Math.random() * 1.4 + 0.8
            });
        }
    }

    function createWaves() {
        waves = [
            { amp: 18, len: 0.010, speed: 0.0009, offset: Math.random() * 1000, y: canvas.height * 0.18 },
            { amp: 24, len: 0.008, speed: 0.0007, offset: Math.random() * 1000, y: canvas.height * 0.48 },
            { amp: 20, len: 0.009, speed: 0.0008, offset: Math.random() * 1000, y: canvas.height * 0.76 }
        ];
    }

    function drawWaves(time) {
        waves.forEach((wave, index) => {
            ctx.beginPath();

            for (let x = 0; x <= canvas.width; x += 6) {
                const y =
                    wave.y +
                    Math.sin(x * wave.len + time * wave.speed + wave.offset) * wave.amp;

                if (x === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }

            const alpha = index === 1 ? 0.26 : 0.18;
            ctx.strokeStyle = `rgba(70, 145, 230, ${alpha})`;
            ctx.lineWidth = index === 1 ? 1.5 : 1;
            ctx.stroke();
        });
    }

    function drawConnections() {
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    const alpha = (1 - distance / maxDistance) * 0.22;
                    ctx.strokeStyle = `rgba(90, 170, 255, ${alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    function drawNodes() {
        nodes.forEach(node => {
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(35, 110, 205, 0.30)';
            ctx.fill();

            ctx.beginPath();
            ctx.arc(node.x, node.y, node.r + 2, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(35, 110, 205, 0.08)';
            ctx.fill();
        });
    }

    function updateNodes() {
        nodes.forEach(node => {
            node.x += node.vx;
            node.y += node.vy;

            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });
    }

    function draw(time = 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawWaves(time);
        drawConnections();
        drawNodes();
        updateNodes();
        animationId = requestAnimationFrame(draw);
    }

    resizeCanvas();
    draw();

    let resizeTimer;
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resizeCanvas, 120);
    });

    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            cancelAnimationFrame(animationId);
        } else {
            draw();
        }
    });
}