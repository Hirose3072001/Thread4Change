/* ==========================================================================
   THREADS FOR CHANGE - Advanced Asset & Interface Protection
   ========================================================================== */
(function () {
    'use strict';

    // 1. Disable Right-Click Context Menu
    document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        return false;
    }, { capture: true });

    // 2. Disable Key Shortcuts (F12, View Source, DevTools, Save, Print)
    document.addEventListener('keydown', function (e) {
        const isCtrl = e.ctrlKey || e.metaKey;

        // F12 (Developer Tools)
        if (e.keyCode === 123 || e.key === 'F12') {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl+Shift+I / J / C (Inspect / Console / Element Picker)
        if (isCtrl && e.shiftKey && (
            e.keyCode === 73 || e.key === 'I' || e.key === 'i' ||
            e.keyCode === 74 || e.key === 'J' || e.key === 'j' ||
            e.keyCode === 67 || e.key === 'C' || e.key === 'c'
        )) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl+U (View Page Source)
        if (isCtrl && (e.keyCode === 85 || e.key === 'u' || e.key === 'U')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl+S (Save Webpage)
        if (isCtrl && (e.keyCode === 83 || e.key === 's' || e.key === 'S')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl+P (Print Page)
        if (isCtrl && (e.keyCode === 80 || e.key === 'p' || e.key === 'P')) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }

        // Ctrl+A (Select All - allow only inside inputs)
        if (isCtrl && (e.keyCode === 65 || e.key === 'a' || e.key === 'A')) {
            const tag = (e.target.tagName || '').toLowerCase();
            if (tag !== 'input' && tag !== 'textarea') {
                e.preventDefault();
                return false;
            }
        }
    }, { capture: true });

    // 3. Disable Drag & Drop on Images and Media
    document.addEventListener('dragstart', function (e) {
        e.preventDefault();
        return false;
    });

    // 4. Disable Long-Press Save Image on Mobile Devices
    window.addEventListener('touchstart', function (e) {
        if (e.target.tagName === 'IMG') {
            e.target.style.webkitTouchCallout = 'none';
        }
    }, { passive: true });

    // 5. Active Anti-DevTools Inspection Trap (Freezes inspector if opened)
    function antiInspection() {
        const threshold = 160;
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;

        if (widthDiff || heightDiff) {
            // Trigger debugger loop to halt scraping/inspecting
            (function () {
                Function('debugger')();
            })();
        }
    }

    // Run periodic inspection check safely
    setInterval(antiInspection, 600);

    // 6. Disable console methods in production
    if (typeof window.console === 'object') {
        const methods = ['log', 'debug', 'info', 'dir', 'table'];
        methods.forEach(function (method) {
            window.console[method] = function () { };
        });
    }
})();
