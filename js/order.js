/* ==========================================================================
   Order Modal, Quantity Calculator, & Order Handling
   ========================================================================== */

const TOTE_PRICE_VND = 70000;

// Open the interactive order modal
function openOrderModal(productTitle) {
    const modal = document.getElementById('orderModal');
    const card = document.getElementById('modalCard');
    const titleEl = document.getElementById('modalProductTitle');

    if (productTitle && titleEl) {
        titleEl.innerText = productTitle;
        // Also keep a hidden reference if needed
        const hiddenInput = document.getElementById('selectedProductInput');
        if (hiddenInput) hiddenInput.value = productTitle;
    }

    if (modal && card) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
        document.body.style.overflow = 'hidden';
    }
}

// Close the order modal
function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    const card = document.getElementById('modalCard');

    if (modal && card) {
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
        modal.classList.add('opacity-0', 'pointer-events-none');
        document.body.style.overflow = '';
    }
}

// Recalculate total donation amount based on quantity
function updateTotalAmount() {
    const qtyInput = document.getElementById('orderQuantity');
    const displayEl = document.getElementById('totalDisplay');
    if (!qtyInput || !displayEl) return;

    let qty = parseInt(qtyInput.value, 10);
    if (isNaN(qty) || qty < 1) {
        qty = 1;
        qtyInput.value = 1;
    }

    const total = qty * TOTE_PRICE_VND;
    displayEl.innerText = total.toLocaleString('vi-VN') + ' VND';
}

// Form submission handler
async function handleOrderSubmit(e) {
    e.preventDefault();

    const form = e.target || document.getElementById('orderForm');
    const submitBtn = form.querySelector('button[type="submit"]');

    // Collect order details
    const orderData = {
        fullName: document.getElementById('orderFullName')?.value?.trim() || '',
        phone: document.getElementById('orderPhone')?.value?.trim() || '',
        quantity: parseInt(document.getElementById('orderQuantity')?.value, 10) || 1,
        address: document.getElementById('orderAddress')?.value?.trim() || '',
        message: document.getElementById('orderMessage')?.value?.trim() || '',
        product: document.getElementById('modalProductTitle')?.innerText || 'Tote Bag',
        totalVND: (parseInt(document.getElementById('orderQuantity')?.value, 10) || 1) * TOTE_PRICE_VND,
        createdAt: new Date().toISOString()
    };

    // Backup order to localStorage so it is never lost even offline
    try {
        const existingOrders = JSON.parse(localStorage.getItem('threads_orders') || '[]');
        existingOrders.push(orderData);
        localStorage.setItem('threads_orders', JSON.stringify(existingOrders));
        console.log('[ThreadsForChange] New Order recorded locally:', orderData);
    } catch (err) {
        console.warn('[ThreadsForChange] Local storage save failed:', err);
    }

    // Optional: If you connect a Google Sheet / Webhook endpoint:
    /*
    const GOOGLE_SCRIPT_WEBHOOK_URL = '';
    if (GOOGLE_SCRIPT_WEBHOOK_URL) {
        fetch(GOOGLE_SCRIPT_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        }).catch(console.error);
    }
    */

    // Close modal and show success toast
    closeOrderModal();
    showToastNotification();

    // Reset form
    form.reset();
    updateTotalAmount();
}

// Display toast notification
function showToastNotification() {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    toast.classList.remove('opacity-0', 'translate-y-8', 'pointer-events-none');

    setTimeout(() => {
        toast.classList.add('opacity-0', 'translate-y-8', 'pointer-events-none');
    }, 4500);
}

// Close modal when clicking outside (on backdrop) or pressing Escape
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('orderModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeOrderModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeOrderModal();
        }
    });
});

window.openOrderModal = openOrderModal;
window.closeOrderModal = closeOrderModal;
window.updateTotalAmount = updateTotalAmount;
window.handleOrderSubmit = handleOrderSubmit;
