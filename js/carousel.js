/* ==========================================================================
   Hero 3D Coverflow Carousel with Touch Swipe Support
   ========================================================================== */
(function () {
    const cards = document.querySelectorAll('#deckContainer .stack-card');
    const thumbs = document.querySelectorAll('#heroThumbnailNav button');
    const bar = document.getElementById('heroSlideProgress');
    const wrapper = document.getElementById('heroCarouselWrapper');
    const deck = document.getElementById('deckContainer');
    if (!cards.length) return;

    let current = 0;
    const total = cards.length;
    let timer = null;
    let progressTimer = null;
    let progress = 0;
    const interval = 4200;

    function update() {
        cards.forEach((card, i) => {
            let diff = (i - current) % total;
            if (diff > total / 2) diff -= total;
            if (diff < -total / 2) diff += total;

            if (diff === 0) {
                card.style.transform = 'translateX(0) scale(1)';
                card.style.zIndex = '30';
                card.style.opacity = '1';
                card.style.filter = 'blur(0px)';
                card.style.pointerEvents = 'auto';
                card.style.boxShadow = '0 25px 50px -12px rgba(172, 51, 35, 0.28), 0 10px 20px -5px rgba(0, 0, 0, 0.15)';
            } else if (diff === -1) {
                card.style.transform = 'translateX(-58%) scale(0.85)';
                card.style.zIndex = '20';
                card.style.opacity = '0.55';
                card.style.filter = 'blur(1.5px)';
                card.style.pointerEvents = 'auto';
                card.style.boxShadow = '0 15px 30px -8px rgba(0, 0, 0, 0.2)';
            } else if (diff === 1) {
                card.style.transform = 'translateX(58%) scale(0.85)';
                card.style.zIndex = '20';
                card.style.opacity = '0.55';
                card.style.filter = 'blur(1.5px)';
                card.style.pointerEvents = 'auto';
                card.style.boxShadow = '0 15px 30px -8px rgba(0, 0, 0, 0.2)';
            } else {
                card.style.transform = 'translateX(0) scale(0.7)';
                card.style.zIndex = '10';
                card.style.opacity = '0';
                card.style.filter = 'blur(4px)';
                card.style.pointerEvents = 'none';
            }
        });

        thumbs.forEach((thumb, i) => {
            if (i === current) {
                thumb.className = 'group relative w-12 h-10 rounded-xl overflow-hidden ring-2 ring-primary transition-all duration-300 transform scale-105 flex-shrink-0 shadow-sm';
            } else {
                thumb.className = 'group relative w-12 h-10 rounded-xl overflow-hidden ring-1 ring-surface-container-highest hover:ring-primary/60 opacity-75 hover:opacity-100 transition-all duration-300 flex-shrink-0 shadow-sm';
            }
        });

        progress = 0;
        if (bar) bar.style.width = '0%';
    }

    function startProgress() {
        clearInterval(progressTimer);
        progress = 0;
        const step = 50;
        progressTimer = setInterval(() => {
            progress += (step / interval) * 100;
            if (bar) bar.style.width = Math.min(progress, 100) + '%';
        }, step);
    }

    function next() {
        current = (current + 1) % total;
        update();
        startProgress();
    }

    function prev() {
        current = (current - 1 + total) % total;
        update();
        startProgress();
    }

    function goTo(idx) {
        current = idx;
        update();
        startProgress();
    }

    window.heroDeckGoTo = goTo;
    window.heroDeckPrev = prev;
    window.heroDeckNext = next;

    cards.forEach((card) => {
        card.addEventListener('click', () => {
            const idx = parseInt(card.dataset.index, 10);
            goTo(idx);
        });
    });

    function startCycle() {
        clearInterval(timer);
        startProgress();
        timer = setInterval(next, interval);
    }

    function stopCycle() {
        clearInterval(timer);
        clearInterval(progressTimer);
    }

    if (wrapper) {
        wrapper.addEventListener('mouseenter', stopCycle);
        wrapper.addEventListener('mouseleave', startCycle);
    }

    // Touch Swipe Support for Mobile Devices
    let touchStartX = 0;
    let touchEndX = 0;
    const minSwipeDistance = 45;

    if (deck) {
        deck.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            stopCycle();
        }, { passive: true });

        deck.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            const distance = touchEndX - touchStartX;
            if (Math.abs(distance) > minSwipeDistance) {
                if (distance > 0) {
                    prev();
                } else {
                    next();
                }
            }
            startCycle();
        }, { passive: true });
    }

    update();
    startCycle();
})();
