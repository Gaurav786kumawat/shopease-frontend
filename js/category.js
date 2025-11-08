// script.js (category-page additions)
// Save as js/category.js OR append to the bottom of js/script.js (after ShopApp definition)
// This file:
//  - Provides a safe `openQuickView` method on window.ShopApp if not present
//  - Provides small helpers used by category.html for star rendering and accessible filters
//  - Enhances mobile filter cloning by wiring unique IDs and aria attributes

(function (window, document) {
    'use strict';

    const products = window.products || [];

    // Small star renderer used by category page (duplicate safe)
    function renderStarsInline(rating) {
        const full = Math.floor(rating || 0);
        let html = '';
        for (let i = 0; i < 5; i++) {
            if (i < full) html += '<i class="bi bi-star-fill" aria-hidden="true"></i>';
            else html += '<i class="bi bi-star" aria-hidden="true"></i>';
        }
        return `<span class="rating" aria-hidden="true">${html}</span>`;
    }

    // Provide an openQuickView if ShopApp doesn't have it (some pages call it)
    if (!window.ShopApp) window.ShopApp = {};
    if (!window.ShopApp.openQuickView) {
        window.ShopApp.openQuickView = function (productId) {
            const p = products.find(pp => pp.id === productId);
            if (!p) {
                console.warn('Product not found for quick view:', productId);
                return;
            }
            const modalContent = document.getElementById('quickViewContent');
            if (!modalContent) return;

            modalContent.innerHTML = `
        <div class="row gx-4">
          <div class="col-md-6">
            <div class="quickview-gallery">
              <div class="main-img">
                <img src="${p.images?.[0] || 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60'}" alt="${p.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:8px">
              </div>
              <div class="thumbs d-none d-md-flex flex-column">
                ${(p.images || []).slice(0, 4).map(src => `<img src="${src}" alt="${p.title}" loading="lazy" style="width:100%;height:72px;object-fit:cover;border-radius:6px">`).join('')}
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <h5 class="fw-semibold">${p.title}</h5>
            <div class="mb-2 text-muted">${p.brand || ''}</div>
            <div class="mb-2">${renderStarsInline(p.rating || 0)} <small class="text-muted">(${p.reviewsCount || 0})</small></div>
            <div class="mb-3"><span class="h5 text-primary">${window.ShopApp && window.ShopApp.Utils ? window.ShopApp.Utils.formatCurrency(p.price) : '₹' + p.price}</span>
              ${p.mrp ? `<small class="text-muted ms-2 text-decoration-line-through">${window.ShopApp && window.ShopApp.Utils ? window.ShopApp.Utils.formatCurrency(p.mrp) : '₹' + p.mrp}</small>` : ''}
            </div>
            <p class="small text-muted">${(p.description || '').slice(0, 200)}...</p>

            <div class="d-flex gap-2 mt-3">
              <button class="btn btn-primary" id="qvAddCart">Add to Cart</button>
              <a href="product.html?id=${p.id}" class="btn btn-outline-secondary">View Details</a>
            </div>
          </div>
        </div>
      `;
            // Add event for add to cart
            const btn = document.getElementById('qvAddCart');
            if (btn) {
                btn.addEventListener('click', function () {
                    if (window.ShopApp && window.ShopApp.addToCart) {
                        window.ShopApp.addToCart(p.id, 1);
                    } else {
                        // fallback: simple localStorage add
                        const cart = JSON.parse(localStorage.getItem('shop_cart') || '[]');
                        const existing = cart.find(c => c.id === p.id);
                        if (existing) existing.qty = (existing.qty || 0) + 1;
                        else cart.push({ id: p.id, qty: 1 });
                        localStorage.setItem('shop_cart', JSON.stringify(cart));
                    }
                    const modalEl = document.getElementById('quickViewModal');
                    const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                    modal.hide();
                });
            }

            // show modal
            const modalEl = document.getElementById('quickViewModal');
            const modal = bootstrap.Modal.getOrCreateInstance(modalEl, { keyboard: true });
            modal.show();
        };
    }

    // Accessibility helper: ensure cloned mobile filters have unique input ids and aria labels
    function sanitizeMobileFilters() {
        const mobileContainer = document.getElementById('mobileFiltersContainer');
        if (!mobileContainer) return;
        const inputs = mobileContainer.querySelectorAll('input, select, textarea');
        inputs.forEach((inp, idx) => {
            if (inp.id) {
                inp.id = inp.id + '_mob';
                // update corresponding labels
                const lab = mobileContainer.querySelector(`label[for="${inp.id.replace('_mob', '')}"]`);
                if (lab) lab.setAttribute('for', inp.id);
            } else {
                // ensure it has an accessible name
                if (!inp.getAttribute('aria-label') && !inp.getAttribute('aria-labelledby')) {
                    inp.setAttribute('aria-label', inp.name || 'filter-input-' + idx);
                }
            }
        });
    }

    // Run on DOM ready
    document.addEventListener('DOMContentLoaded', function () {
        sanitizeMobileFilters();

        // Enhance color buttons to reflect pressed state
        document.querySelectorAll('#filterColors .btn').forEach(btn => {
            btn.addEventListener('click', function (e) {
                // toggle aria-pressed for accessible state
                const pressed = btn.getAttribute('aria-pressed') === 'true';
                btn.setAttribute('aria-pressed', (!pressed).toString());
            });
        });
    });

})(window, document);
