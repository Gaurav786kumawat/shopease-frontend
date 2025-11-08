// js/checkout.js
// CHECKOUT PAGE BEHAVIOR — append to js/script.js or include as separate file
// - Enhances checkout flow: validates, simulates payment, stores order in localStorage (shop_orders)
// - Hooks: replace mock payment block with real API call when backend available

(function (window, document) {
    'use strict';

    const LS_ORDERS = 'shop_orders';
    const LS_CART = 'shop_cart';
    const LS_USER = 'shop_user';

    // helper to generate simple order id
    function generateOrderId() {
        const t = Date.now().toString(36).toUpperCase();
        const r = Math.random().toString(36).slice(2, 6).toUpperCase();
        return `OD-${t}-${r}`;
    }

    // Save order to localStorage (demo)
    function saveOrder(order) {
        const orders = JSON.parse(localStorage.getItem(LS_ORDERS) || '[]');
        orders.unshift(order);
        localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
    }

    // Prefill address if user stored addresses in localStorage (basic)
    function prefillAddress() {
        try {
            const user = JSON.parse(localStorage.getItem(LS_USER) || 'null');
            if (!user) return;
            if (user.addresses && user.addresses.length) {
                const addr = user.addresses[0];
                document.getElementById('fullName').value = addr.name || '';
                document.getElementById('phone').value = addr.phone || '';
                document.getElementById('addressLine').value = addr.line || '';
                document.getElementById('city').value = addr.city || '';
                document.getElementById('zip').value = addr.postal || '';
            }
        } catch (e) { /* no-op */ }
    }

    // Render summary snapshot (used to persist order details)
    function getCheckoutSnapshot() {
        const cart = JSON.parse(localStorage.getItem(LS_CART) || '[]');
        const products = window.products || [];
        const items = cart.map(ci => {
            const p = (products || []).find(x => x.id === ci.id) || {};
            return {
                id: p.id || ci.id,
                title: p.title || 'Product',
                qty: ci.qty || 1,
                price: p.price || 0,
            };
        });
        const subtotal = items.reduce((s, i) => s + (i.price * i.qty), 0);
        const shipping = subtotal > 500 ? 0 : 40;
        return { items, subtotal, shipping, total: subtotal + shipping };
    }

    // Bind form submit to create order
    function bindCheckoutForm() {
        const form = document.getElementById('checkoutForm');
        if (!form) return;

        // show/hide card fields handled in page script; here we validate card fields if visible
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.classList.add('was-validated');
                // focus first invalid
                const invalid = form.querySelector(':invalid');
                if (invalid) invalid.focus();
                return;
            }

            // build order object
            const snapshot = getCheckoutSnapshot();
            if (!snapshot.items.length) {
                alert('Your cart is empty.');
                return;
            }

            const delivery = document.querySelector('input[name="delivery"]:checked')?.id || 'standardDelivery';
            const payment = document.querySelector('input[name="payment"]:checked')?.id || 'cod';

            const order = {
                id: generateOrderId(),
                createdAt: new Date().toISOString(),
                customer: {
                    name: document.getElementById('fullName').value,
                    phone: document.getElementById('phone').value,
                    address: {
                        line: document.getElementById('addressLine').value,
                        city: document.getElementById('city').value,
                        postal: document.getElementById('zip').value
                    }
                },
                deliveryMethod: delivery,
                paymentMethod: payment,
                items: snapshot.items,
                subtotal: snapshot.subtotal,
                shipping: snapshot.shipping,
                total: snapshot.total,
                status: (payment === 'cod') ? 'Confirmed' : 'Payment Pending'
            };

            // Simulate payment if card chosen (mock)
            const isCard = payment === 'card';
            const submitBtn = form.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Placing order...';
            }

            // Mock async (replace below with real payment API call)
            setTimeout(function () {
                // On payment success or COD confirmation
                if (isCard) {
                    order.status = 'Confirmed'; // in real app, set after gateway callback
                }

                // Save order
                saveOrder(order);

                // Clear cart
                localStorage.removeItem(LS_CART);

                // Add a 'last_order' snapshot for confirmation page
                localStorage.setItem('shop_last_order', JSON.stringify(order));

                // Show confirmation UI on the same page (we already have area in checkout.html)
                const row = document.querySelector('.row.g-4');
                if (row) row.classList.add('d-none');
                const orderConfirm = document.getElementById('orderConfirm');
                if (orderConfirm) orderConfirm.classList.remove('d-none');

                // Optionally, push to analytics or backend here.

                // restore button state after short delay
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.innerHTML = 'Place Order';
                    }
                }, 500);
            }, 1300);
        }, false);
    }

    // Populate order summary aside on load
    function populateSummaryAside() {
        const snapshot = getCheckoutSnapshot();
        const listRoot = document.getElementById('summaryItems');
        if (!listRoot) return;
        listRoot.innerHTML = '';
        snapshot.items.forEach(it => {
            const div = document.createElement('div');
            div.className = 'd-flex justify-content-between small';
            div.innerHTML = `<span>${it.title} × ${it.qty}</span><span>₹${(it.price * it.qty).toLocaleString('en-IN')}</span>`;
            listRoot.appendChild(div);
        });
        document.getElementById('summarySubtotal').textContent = '₹' + snapshot.subtotal.toLocaleString('en-IN');
        document.getElementById('summaryShipping').textContent = '₹' + snapshot.shipping.toLocaleString('en-IN');
        document.getElementById('summaryTotal').textContent = '₹' + snapshot.total.toLocaleString('en-IN');
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        prefillAddress();
        populateSummaryAside();
        bindCheckoutForm();
    });

    // expose for debugging
    if (!window.ShopApp) window.ShopApp = {};
    window.ShopApp.checkout = { getCheckoutSnapshot, saveOrder };

})(window, document);
