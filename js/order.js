/* ==========================================================================
   Order Redirection & Handler - Threads for Change
   ========================================================================== */

const FANPAGE_URL = 'https://www.facebook.com/profile.php?id=61585160090855&locale=vi_VN';

// Redirect directly to Facebook Fanpage on Order
function redirectToFanpage() {
    window.open(FANPAGE_URL, '_blank', 'noopener,noreferrer');
}

function openOrderModal(productTitle) {
    redirectToFanpage();
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.classList.add('opacity-0', 'pointer-events-none');
    }
}

function handleOrderSubmit(e) {
    if (e) e.preventDefault();
    redirectToFanpage();
}

window.redirectToFanpage = redirectToFanpage;
window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.handleOrderSubmit = handleOrderSubmit;
