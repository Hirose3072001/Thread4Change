/* ==========================================================================
   Main Application Script: Navigation, Smooth Scroll & Mobile Menu
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
    const mobileMenuBackdrop = document.getElementById('mobileMenuBackdrop');
    const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function openMobileMenu() {
        if (!mobileMenuDrawer || !mobileMenuBackdrop) return;
        mobileMenuBackdrop.classList.remove('opacity-0', 'pointer-events-none');
        mobileMenuBackdrop.classList.add('opacity-100');
        mobileMenuDrawer.classList.remove('translate-x-full');
        mobileMenuDrawer.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
    }

    function closeMobileMenu() {
        if (!mobileMenuDrawer || !mobileMenuBackdrop) return;
        mobileMenuDrawer.classList.remove('translate-x-0');
        mobileMenuDrawer.classList.add('translate-x-full');
        mobileMenuBackdrop.classList.remove('opacity-100');
        mobileMenuBackdrop.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu);
    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
    if (mobileMenuBackdrop) mobileMenuBackdrop.addEventListener('click', closeMobileMenu);

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // 2. Smooth Scrolling with Sticky Header Offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href && href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerOffset = 85;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 3. Active Nav Link on Scroll (ScrollSpy)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('header nav a[data-path]');

    function highlightCurrentSection() {
        const scrollY = window.pageYOffset;
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('bg-surface-container-high', 'text-on-surface');
                        link.classList.remove('text-on-surface-variant');
                    } else {
                        link.classList.remove('bg-surface-container-high', 'text-on-surface');
                        link.classList.add('text-on-surface-variant');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightCurrentSection, { passive: true });
});
