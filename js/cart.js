// cart.js (optional)
// Adds smooth animations for item removal, cart badge updates, and coupon toast

(function () {
    'use strict';

    const Utils = window.ShopApp && window.ShopApp.Utils ? window.ShopApp.Utils : {
        formatCurrency: v => '₹' + (Number(v) || 0).toLocaleString('en-IN')
    };

    // Animate remove button
    document.addEventListener('click', function (e) {
        if (e.target.closest('.remove-item')) {
            const row = e.target.closest('.d-flex');
            if (row) {
                row.style.transition = 'all 0.3s ease';
                row.style.opacity = '0';
                row.style.transform = 'translateX(-20px)';
                setTimeout(() => {
                    row.remove();
                }, 280);
            }
        }
    });

    // Simple coupon success toast
    const couponBtn = document.getElementById('applyCouponBtn');
    if (couponBtn) {
        couponBtn.addEventListener('click', () => {
            const toast = document.createElement('div');
            toast.textContent = 'Coupon checked!';
            toast.className = 'position-fixed bottom-0 end-0 m-3 bg-dark text-white px-3 py-2 rounded shadow';
            toast.style.zIndex = 2000;
            document.body.appendChild(toast);
            setTimeout(() => {
                toast.style.opacity = '0';
            }, 1200);
            setTimeout(() => toast.remove(), 1500);
        });
    }

    // Ensure cart badge update globally
    if (window.ShopApp && typeof window.ShopApp.updateCartUI === 'function') {
        window.ShopApp.updateCartUI();
    }

})();
