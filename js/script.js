// script.js
/* Shared JavaScript for ShopEase
   - Renders product cards for sections (Trending, Recommended)
   - Implements cart (localStorage), wishlist, quick view, and search binding
   - Provides utility helpers and safe guards if data.js isn't loaded yet
   - Structure: IIFE exposing minimal ShopApp for debugging
*/

(function (window, document) {
    'use strict';

    /* ---------- LocalStorage keys ---------- */
    const LS_CART = 'shop_cart';
    const LS_WISHLIST = 'shop_wishlist';
    const LS_USER = 'shop_user'; // mock login

    /* ---------- Utilities ---------- */
    const Utils = {
        formatCurrency: (v) => {
            if (typeof v !== 'number') v = Number(v) || 0;
            return '₹' + v.toLocaleString('en-IN');
        },
        save: (key, val) => localStorage.setItem(key, JSON.stringify(val)),
        load: (key, fallback) => {
            const raw = localStorage.getItem(key);
            if (!raw) return fallback === undefined ? null : fallback;
            try { return JSON.parse(raw); } catch (e) { return fallback === undefined ? null : fallback; }
        },
        debounce(fn, ms = 300) {
            let t;
            return function (...args) {
                clearTimeout(t);
                t = setTimeout(() => fn.apply(this, args), ms);
            };
        },
        getById(arr, id) { return (arr || []).find(x => x.id === id) || null; }
    };

    /* ---------- State ---------- */
    let state = {
        products: window.products || [], // from data.js (injected before script.js)
        cart: Utils.load(LS_CART, []),
        wishlist: Utils.load(LS_WISHLIST, []),
        user: Utils.load(LS_USER, null),
    };

    /* ---------- DOM Roots ---------- */
    const roots = {
        trending: document.getElementById('trendingProducts'),
        recommended: document.getElementById('recommendedProducts'),
        cartCount: document.querySelectorAll('.cart-count'),
        cartDrawerBody: document.getElementById('cartItemsContainer'),
        cartTotal: document.getElementById('cartTotal'),
        quickViewModal: document.getElementById('quickViewModal'),
        quickViewContent: document.getElementById('quickViewContent'),
        searchForm: document.querySelector('.search-form'),
    };

    /* ---------- Renderers ---------- */

    // Render a product card DOM node (returns element)
    function renderProductCard(product) {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';

        const card = document.createElement('article');
        card.className = 'pcard';
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'article');
        card.dataset.id = product.id;

        // image wrapper
        const imgWrap = document.createElement('div');
        imgWrap.className = 'pcard__img';
        const img = document.createElement('img');
        img.alt = product.title || product.brand || 'product';
        img.loading = 'lazy';
        // srcset/responsive: if product.images available, use them; otherwise placeholder
        const src = (product.images && product.images[0]) ? product.images[0] : `https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=60`;
        img.src = src;
        imgWrap.appendChild(img);

        // badge
        if (product.discount) {
            const badge = document.createElement('div');
            badge.className = 'pcard__badge';
            badge.innerText = product.discount + '% OFF';
            imgWrap.appendChild(badge);
        }

        // body
        const body = document.createElement('div');
        body.className = 'pcard__body';

        const brand = document.createElement('div');
        brand.className = 'pcard__brand';
        brand.innerText = product.brand || 'Unknown';

        const title = document.createElement('div');
        title.className = 'pcard__title';
        title.innerText = product.title || 'Product title';

        const meta = document.createElement('div');
        meta.className = 'pcard__meta';
        meta.innerHTML = `<span class="rating" aria-label="rating ${product.rating || 0}">${renderStars(product.rating || 0)}</span>
                      <small class="text-muted">(${product.reviewsCount || 0})</small>`;

        const priceRow = document.createElement('div');
        priceRow.className = 'd-flex align-items-baseline gap-2';
        const price = document.createElement('div');
        price.className = 'pcard__price';
        price.innerText = Utils.formatCurrency(product.price || 0);
        priceRow.appendChild(price);
        if (product.mrp && product.mrp > product.price) {
            const mrp = document.createElement('div');
            mrp.className = 'pcard__mrp';
            mrp.innerText = Utils.formatCurrency(product.mrp);
            priceRow.appendChild(mrp);
        }

        const actions = document.createElement('div');
        actions.className = 'pcard__actions';
        const addBtn = document.createElement('button');
        addBtn.className = 'btn btn-outline-primary btn-sm';
        addBtn.innerHTML = '<i class="bi bi-cart-plus"></i> Add';
        addBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            addToCart(product.id, 1);
        });

        const wishBtn = document.createElement('button');
        wishBtn.className = 'btn btn-outline-secondary btn-sm';
        wishBtn.innerHTML = '<i class="bi bi-heart"></i>';
        wishBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
            wishBtn.classList.toggle('active');
        });

        const quickBtn = document.createElement('button');
        quickBtn.className = 'btn btn-light btn-sm';
        quickBtn.innerHTML = '<i class="bi bi-eye"></i>';
        quickBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openQuickView(product.id);
        });

        actions.appendChild(addBtn);
        actions.appendChild(wishBtn);
        actions.appendChild(quickBtn);

        // assemble
        body.appendChild(brand);
        body.appendChild(title);
        body.appendChild(meta);
        body.appendChild(priceRow);
        body.appendChild(actions);

        card.appendChild(imgWrap);
        card.appendChild(body);

        // clicking card opens quick view
        card.addEventListener('click', () => openQuickView(product.id));

        col.appendChild(card);
        return col;
    }

    function renderStars(rating) {
        const full = Math.floor(rating);
        let html = '';
        for (let i = 0; i < 5; i++) {
            if (i < full) html += '<i class="bi bi-star-fill"></i>';
            else html += '<i class="bi bi-star"></i>';
        }
        return html;
    }

    // render a list into a container element (clears first)
    function renderList(container, list, limit = 8) {
        if (!container) return;
        container.innerHTML = '';
        const frag = document.createDocumentFragment();
        (list.slice(0, limit)).forEach(p => frag.appendChild(renderProductCard(p)));
        container.appendChild(frag);
    }

    /* ---------- Data / Derived lists ---------- */
    function getTrending() {
        // sort by popularity then rating
        return (state.products || []).slice().sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    function getRecommended() {
        // simple: recommend by popularity + randomness
        const shuffled = (state.products || []).slice().sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 8);
    }

    /* ---------- Cart & Wishlist ---------- */
    function addToCart(productId, qty = 1) {
        const existing = state.cart.find(ci => ci.id === productId);
        if (existing) existing.qty = Math.min((existing.qty || 0) + qty, 99);
        else state.cart.push({ id: productId, qty });
        Utils.save(LS_CART, state.cart);
        updateCartUI();
        showToast('Added to cart');
    }

    function removeFromCart(productId) {
        state.cart = state.cart.filter(ci => ci.id !== productId);
        Utils.save(LS_CART, state.cart);
        updateCartUI();
    }

    function updateCartQty(productId, qty) {
        const item = state.cart.find(ci => ci.id === productId);
        if (!item) return;
        item.qty = qty;
        if (item.qty <= 0) removeFromCart(productId);
        Utils.save(LS_CART, state.cart);
        updateCartUI();
    }

    function toggleWishlist(productId) {
        const idx = state.wishlist.indexOf(productId);
        if (idx === -1) state.wishlist.push(productId);
        else state.wishlist.splice(idx, 1);
        Utils.save(LS_WISHLIST, state.wishlist);
        showToast('Wishlist updated');
    }

    function getCartDetails() {
        // returns array of {product, qty, subtotal}
        const details = state.cart.map(ci => {
            const p = Utils.getById(state.products, ci.id) || {};
            return { product: p, qty: ci.qty, subtotal: (p.price || 0) * (ci.qty || 1) };
        });
        const total = details.reduce((s, d) => s + d.subtotal, 0);
        return { items: details, total };
    }

    /* ---------- UI updates ---------- */
    function updateCartUI() {
        const { items, total } = getCartDetails();
        // update count badges
        const count = state.cart.reduce((s, c) => s + (c.qty || 0), 0);
        roots.cartCount.forEach(n => n.textContent = count);

        // update drawer content
        if (roots.cartDrawerBody) {
            roots.cartDrawerBody.innerHTML = '';
            if (!items.length) {
                const p = document.createElement('p');
                p.className = 'text-muted small';
                p.innerText = 'Your cart is empty.';
                roots.cartDrawerBody.appendChild(p);
            } else {
                const frag = document.createDocumentFragment();
                items.forEach(({ product, qty }) => {
                    const div = document.createElement('div');
                    div.className = 'cart-item';
                    div.innerHTML = `
            <img src="${(product.images && product.images[0]) || 'https://via.placeholder.com/80'}" alt="${product.title}">
            <div class="flex-grow-1">
              <div class="fw-semibold">${product.title}</div>
              <div class="small text-muted">${product.brand || ''}</div>
              <div class="mt-1 d-flex gap-2 align-items-center">
                <button class="btn btn-sm btn-outline-secondary decrease" aria-label="Decrease">-</button>
                <div class="px-2">${qty}</div>
                <button class="btn btn-sm btn-outline-secondary increase" aria-label="Increase">+</button>
              </div>
            </div>
            <div class="text-end">
              <div class="fw-bold">${Utils.formatCurrency(product.price * qty)}</div>
              <button class="btn btn-link text-danger btn-sm remove">Remove</button>
            </div>
          `;
                    // events
                    div.querySelector('.increase').addEventListener('click', () => updateCartQty(product.id, qty + 1));
                    div.querySelector('.decrease').addEventListener('click', () => updateCartQty(product.id, qty - 1));
                    div.querySelector('.remove').addEventListener('click', () => removeFromCart(product.id));
                    frag.appendChild(div);
                });
                roots.cartDrawerBody.appendChild(frag);
            }
        }

        // update total
        if (roots.cartTotal) roots.cartTotal.textContent = Utils.formatCurrency(total);
    }

    /* ---------- Quick View ---------- */
    function openQuickView(productId) {
        const p = Utils.getById(state.products, productId);
        if (!p) return;
        if (!roots.quickViewContent) return;

        // Build quick view content
        roots.quickViewContent.innerHTML = `
      <div class="row gx-4">
        <div class="col-md-6">
          <div class="quickview-gallery">
            <div class="main-img">
              <img src="${p.images?.[0] || 'https://via.placeholder.com/600'}" alt="${p.title}" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:8px">
            </div>
            <div class="thumbs d-none d-md-flex flex-column">
              ${(p.images || []).slice(0, 4).map(src => `<img src="${src}" alt="${p.title}" loading="lazy" style="width:100%;height:72px;object-fit:cover;border-radius:6px">`).join('')}
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <h5 class="fw-semibold">${p.title}</h5>
          <div class="mb-2 text-muted">${p.brand || ''}</div>
          <div class="mb-2">${renderStars(p.rating || 0)} <small class="text-muted">(${p.reviewsCount || 0})</small></div>
          <div class="mb-3"><span class="h5 text-primary">${Utils.formatCurrency(p.price)}</span>
            ${p.mrp ? `<small class="text-muted ms-2 text-decoration-line-through">${Utils.formatCurrency(p.mrp)}</small>` : ''}
          </div>
          <p class="small text-muted">${(p.description || '').slice(0, 200)}...</p>

          <div class="d-flex gap-2 mt-3">
            <button class="btn btn-primary" id="qvAddCart">Add to Cart</button>
            <a href="product.html?id=${p.id}" class="btn btn-outline-secondary">View Details</a>
          </div>
        </div>
      </div>
    `;

        // attach event
        const btn = document.getElementById('qvAddCart');
        if (btn) {
            btn.addEventListener('click', () => {
                addToCart(p.id, 1);
                const modalEl = document.getElementById('quickViewModal');
                const modal = bootstrap.Modal.getInstance(modalEl);
                modal.hide();
            });
        }

        // show modal
        const modalEl = document.getElementById('quickViewModal');
        const modal = new bootstrap.Modal(modalEl, { keyboard: true });
        modal.show();
    }

    /* ---------- Search binding ---------- */
    function bindSearch() {
        if (!roots.searchForm) return;
        roots.searchForm.addEventListener('submit', function (e) {
            // default form action will handle redirect to search.html?q=...
            // add a small debounce protection
        });
    }

    /* ---------- Toast (simple) ---------- */
    function showToast(msg, timeout = 1500) {
        // simple transient toast using element
        const t = document.createElement('div');
        t.className = 'position-fixed top-0 end-0 m-3 p-2 rounded shadow';
        t.style.background = '#111'; t.style.color = '#fff'; t.style.zIndex = 11000;
        t.innerText = msg;
        document.body.appendChild(t);
        setTimeout(() => t.style.opacity = '0.9', 10);
        setTimeout(() => { t.style.transition = '200ms ease'; t.style.opacity = '0'; }, timeout);
        setTimeout(() => document.body.removeChild(t), timeout + 300);
    }
    // Global toast helper (for consistent success/error messages)
    (function () {
        if (!window.ShopApp) window.ShopApp = {};
        window.ShopApp.toast = function (msg, type = 'info') {
            const t = document.createElement('div');
            t.className = 'toast-lite';
            t.style.background = type === 'error' ? 'crimson' : '#0b1220';
            t.textContent = msg;
            document.body.appendChild(t);
            setTimeout(() => t.remove(), 1800);
        };
    })();



    // Smooth fade animation when new items load
    (function () {
        const grid = document.getElementById('resultsGrid');
        if (!grid) return;
        const observer = new MutationObserver(() => {
            grid.style.opacity = '0';
            setTimeout(() => grid.style.opacity = '1', 100);
        });
        observer.observe(grid, { childList: true });
    })();



    /* ---------- Init ---------- */
    function init() {
        // Safety: if products missing, show friendly message in product sections
        if (!Array.isArray(state.products) || !state.products.length) {
            console.warn('No product data found. Make sure js/data.js is loaded before script.js');
            if (roots.trending) roots.trending.innerHTML = `<div class="col-12"><div class="alert alert-warning">No products available. Load <code>js/data.js</code>.</div></div>`;
            if (roots.recommended) roots.recommended.innerHTML = `<div class="col-12"><div class="alert alert-warning">No products available. Load <code>js/data.js</code>.</div></div>`;
        } else {
            renderList(roots.trending, getTrending(), 8);
            renderList(roots.recommended, getRecommended(), 8);
        }

        updateCartUI();
        bindSearch();

        // Keyboard accessible: open cart with 'c'
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'c' && !e.metaKey && !e.ctrlKey) {
                const el = document.getElementById('cartDrawer');
                if (el) new bootstrap.Offcanvas(el).show();
            }
        });
    }

    // expose minimal API for debugging / admin
    window.ShopApp = {
        init,
        state,
        addToCart,
        removeFromCart,
        toggleWishlist,
        getCartDetails,
        Utils
    };

    // Auto init on DOMContentLoaded
    document.addEventListener('DOMContentLoaded', init);

})(window, document);
