// script.js (product-page additions)
// Append this to js/script.js OR save as js/product.js and include on product.html
// Responsibilities:
// - Share button (copy link or use Web Share API)
// - Compare button (simple client-side set; stored in localStorage 'shop_compare')
// - Smooth related-products horizontal scroll controls (if added later)
// - Simple review submission handler (client-only, appended to product.reviews in localStorage snapshot)
// - Ensure ShopApp.updateCartUI run after interactions

(function (window, document) {
    'use strict';

    // small helpers
    const LS_COMPARE = 'shop_compare';
    const safeGet = (k, def) => {
        try { return JSON.parse(localStorage.getItem(k)) || def; } catch (e) { return def; }
    };

    function initProductHelpers() {
        const shareBtn = document.getElementById('shareBtn');
        const compareBtn = document.getElementById('compareBtn');
        const relatedWrap = document.getElementById('relatedProducts');

        // Share: try Web Share API, else fallback to copy link
        if (shareBtn) {
            shareBtn.addEventListener('click', async () => {
                const url = window.location.href;
                const title = document.getElementById('prodTitle')?.textContent || document.title;
                if (navigator.share) {
                    try {
                        await navigator.share({ title, url });
                        showTinyToast('Shared');
                    } catch (err) {
                        showTinyToast('Share cancelled');
                    }
                } else {
                    // copy to clipboard
                    try {
                        await navigator.clipboard.writeText(url);
                        showTinyToast('Product link copied to clipboard');
                    } catch (err) {
                        showTinyToast('Unable to copy link');
                    }
                }
            });
        }

        // Compare: toggles product in compare list stored in localStorage and shows a small toast
        if (compareBtn) {
            compareBtn.addEventListener('click', () => {
                const pid = new URL(window.location.href).searchParams.get('id');
                if (!pid) return;
                const list = safeGet(LS_COMPARE, []);
                const idx = list.indexOf(pid);
                if (idx === -1) {
                    list.push(pid);
                    compareBtn.classList.add('active');
                    showTinyToast('Added to compare');
                } else {
                    list.splice(idx, 1);
                    compareBtn.classList.remove('active');
                    showTinyToast('Removed from compare');
                }
                localStorage.setItem(LS_COMPARE, JSON.stringify(list));
            });
        }

        // Related products drag / mouse-wheel to scroll horizontally on desktop
        if (relatedWrap) {
            relatedWrap.addEventListener('wheel', (e) => {
                if (Math.abs(e.deltaY) > 0) {
                    e.preventDefault();
                    relatedWrap.scrollLeft += e.deltaY;
                }
            }, { passive: false });

            // touch swipe is natural for mobiles; we don't override it
        }

        // Review submission (if a review form existed — graceful no-op otherwise)
        const reviewForm = document.getElementById('reviewForm'); // optional
        if (reviewForm) {
            reviewForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const name = reviewForm.querySelector('[name="name"]').value || 'Anonymous';
                const rating = Number(reviewForm.querySelector('[name="rating"]').value || 5);
                const comment = reviewForm.querySelector('[name="comment"]').value || '';
                const pid = new URL(window.location.href).searchParams.get('id');
                const products = window.products || [];
                const prod = products.find(p => p.id === pid);
                if (!prod) return showTinyToast('Product not found');
                prod.reviews = prod.reviews || [];
                prod.reviews.unshift({ user: name, rating, comment, date: new Date().toISOString() });

                // persist snapshot to localStorage for demo so reviews stay on refresh (non-persistent in real backend)
                const snapshot = safeGet('shop_data_snapshot', {});
                snapshot[pid] = prod;
                localStorage.setItem('shop_data_snapshot', JSON.stringify(snapshot));

                // re-render reviews area (simple append)
                const reviewsRoot = document.getElementById('prodReviews');
                if (reviewsRoot) {
                    const div = document.createElement('div');
                    div.className = 'mb-3';
                    div.innerHTML = `<div class="d-flex gap-3"><div class="fw-semibold">${name}</div><div class="small text-muted">${new Date().toLocaleDateString()}</div></div>
                           <div class="small">${comment}</div>`;
                    reviewsRoot.insertBefore(div, reviewsRoot.firstChild);
                }
                reviewForm.reset();
                showTinyToast('Thanks for your review!');
            });
        }

        // Ensure cart UI is fresh
        if (window.ShopApp && typeof window.ShopApp.updateCartUI === 'function') {
            window.ShopApp.updateCartUI();
        }
    }

    // small transient toast for the product page (non-blocking)
    function showTinyToast(msg, duration = 1400) {
        const t = document.createElement('div');
        t.className = 'position-fixed top-0 end-0 m-3 p-2 rounded shadow-sm';
        t.style.background = '#0b1220'; t.style.color = '#fff'; t.style.zIndex = 12000; t.style.opacity = '0.98';
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.style.opacity = '0.6', duration - 300);
        setTimeout(() => document.body.removeChild(t), duration);
    }

    // Run on DOM ready
    document.addEventListener('DOMContentLoaded', initProductHelpers);

    // Expose small helpers for debugging
    if (!window.ShopApp) window.ShopApp = {};
    window.ShopApp._productHelpers = { init: initProductHelpers };

})(window, document);
