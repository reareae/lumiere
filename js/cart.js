

const Cart = {
  items: JSON.parse(localStorage.getItem('lumiere_cart') || '[]'),

  save() {
    localStorage.setItem('lumiere_cart', JSON.stringify(this.items));
    this.updateBadge();
    this.renderSidebar();
  },

  add(product, qty = 1) {
    const existing = this.items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += qty;
    } else {
      this.items.push({ ...product, qty });
    }
    this.save();
    this.openSidebar();
    this.showToast(product.name);
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  updateQty(id, delta) {
    const item = this.items.find(i => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) this.remove(id);
    else this.save();
  },

  total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },

  updateBadge() {
    const badge = document.getElementById('cart-badge');
    if (!badge) return;
    const c = this.count();
    badge.textContent = c;
    badge.style.display = c > 0 ? 'flex' : 'none';
  },

  openSidebar() {
    document.getElementById('cartSidebar')?.classList.add('open');
    document.getElementById('cartOverlay')?.classList.add('open');
    document.body.style.overflow = 'hidden';
  },

  closeSidebar() {
    document.getElementById('cartSidebar')?.classList.remove('open');
    document.getElementById('cartOverlay')?.classList.remove('open');
    document.body.style.overflow = '';
  },

  renderSidebar() {
    const container = document.getElementById('cartItems');
    const totalEl   = document.getElementById('cartTotal');
    if (!container) return;

    if (this.items.length === 0) {
      container.innerHTML = '';
      if (totalEl) totalEl.textContent = '0 L';
      return;
    }

    container.innerHTML = this.items.map(item => `
      <div class="cart-item" data-id="${item.id}">
        ${item.image
          ? `<img class="cart-item-img" src="${item.image}" alt="${item.name}"/>`
          : `<div class="cart-item-img-placeholder"><i class="ti ti-flame"></i></div>`
        }
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-tag">${item.tag || ''}</p>
          <div class="cart-item-qty">
            <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', -1)">−</button>
            <span class="cart-qty-num">${item.qty}</span>
            <button class="cart-qty-btn" onclick="Cart.updateQty('${item.id}', 1)">+</button>
          </div>
        </div>
        <div class="cart-item-right">
          <span class="cart-item-price">${(item.price * item.qty).toLocaleString('sq-AL')} L</span>
          <button class="cart-item-remove" onclick="Cart.remove('${item.id}')">
            <i class="ti ti-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    if (totalEl) totalEl.textContent = this.total().toLocaleString('sq-AL') + ' L';
  },

  showToast(name) {
    const toast = document.getElementById('cartToast');
    const msg   = document.getElementById('toastMsg');
    if (!toast) return;
    if (msg) msg.textContent = `"${name}" u shtua në shportë!`;
    toast.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  },

  init() {
    this.updateBadge();
    this.renderSidebar();

    // Close events
    document.getElementById('cartClose')?.addEventListener('click', () => this.closeSidebar());
    document.getElementById('cartOverlay')?.addEventListener('click', () => this.closeSidebar());

    // Cart icon opens sidebar
    document.getElementById('cartIconNav')?.addEventListener('click', () => this.openSidebar());
    document.querySelector('.ti-shopping-bag')?.closest('.cart-wrap')
      ?.addEventListener('click', () => this.openSidebar());
  }
};

document.addEventListener('DOMContentLoaded', () => Cart.init());