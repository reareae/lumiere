const Cart = {
  items: [],

  load() {
    try { this.items = JSON.parse(localStorage.getItem('lumiere_cart') || '[]'); }
    catch(e) { this.items = []; }
  },

  save() {
    localStorage.setItem('lumiere_cart', JSON.stringify(this.items));
    this.renderBadge();
    this.renderSidebar();
  },

  add(id, name, price, tag, image) {
    price = parseInt(price);
    const found = this.items.find(i => i.id === id);
    if (found) found.qty++;
    else this.items.push({ id, name, price, tag, image, qty: 1 });
    this.save();
    this.open();
    this.toast(name);
  },

  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  },

  changeQty(id, delta) {
    const it = this.items.find(i => i.id === id);
    if (!it) return;
    it.qty += delta;
    if (it.qty <= 0) this.remove(id);
    else this.save();
  },

  clear() {
    this.items = [];
    this.save();
  },

  total() { return this.items.reduce((s,i) => s + i.price * i.qty, 0); },
  count() { return this.items.reduce((s,i) => s + i.qty, 0); },

  renderBadge() {
    document.querySelectorAll('#cart-badge').forEach(b => {
      const c = this.count();
      b.textContent = c;
      b.style.display = c > 0 ? 'flex' : 'none';
    });
  },

  open() {
    document.getElementById('lm-cart')?.classList.add('open');
    document.getElementById('lm-cart-overlay')?.classList.add('open');
    document.body.classList.add('cart-open');
  },

  close() {
    document.getElementById('lm-cart')?.classList.remove('open');
    document.getElementById('lm-cart-overlay')?.classList.remove('open');
    document.body.classList.remove('cart-open');
  },

  renderSidebar() {
    const el  = document.getElementById('lm-cart-items');
    const tot = document.getElementById('lm-cart-total');
    const cnt = document.getElementById('lm-cart-count');
    if (!el) return;

    if (cnt) cnt.textContent = this.count() > 0 ? '(' + this.count() + ')' : '';

    if (this.items.length === 0) {
      el.innerHTML = '<div class="lm-cart-empty"><i class="ti ti-shopping-bag"></i><p>Shporta juaj është bosh</p><a href="shop.html" class="lm-shop-link">Shiko shop-un</a></div>';
      if (tot) tot.textContent = '0 L';
      return;
    }

    el.innerHTML = this.items.map(it => `
      <div class="lm-ci">
        <div class="lm-ci-img">${it.image ? '<img src="' + it.image + '" alt="' + it.name + '"/>' : '<div class="lm-ci-ph"><i class="ti ti-flame"></i></div>'}</div>
        <div class="lm-ci-info">
          <p class="lm-ci-name">${it.name}</p>
          <p class="lm-ci-tag">${it.tag || ''}</p>
          <div class="lm-ci-row">
            <div class="lm-ci-qty">
              <button onclick="Cart.changeQty('${it.id}',-1)">−</button>
              <span>${it.qty}</span>
              <button onclick="Cart.changeQty('${it.id}',1)">+</button>
            </div>
            <span class="lm-ci-price">${(it.price * it.qty).toLocaleString('sq')} L</span>
          </div>
        </div>
        <button class="lm-ci-del" onclick="Cart.remove('${it.id}')"><i class="ti ti-x"></i></button>
      </div>`).join('');

    if (tot) tot.textContent = this.total().toLocaleString('sq') + ' L';
  },

  toast(name) {
    const t = document.getElementById('lm-toast');
    const m = document.getElementById('lm-toast-msg');
    if (!t) return;
    if (m) m.textContent = '"' + name + '" u shtua në shportë';
    t.classList.add('show');
    clearTimeout(this._tt);
    this._tt = setTimeout(() => t.classList.remove('show'), 2500);
  },

  inject() {
    if (document.getElementById('lm-cart')) return;
    document.body.insertAdjacentHTML('beforeend', `
      <div id="lm-cart-overlay"></div>
      <aside id="lm-cart">
        <div class="lm-cart-head">
          <div class="lm-cart-title"><span>Shporta</span><span id="lm-cart-count"></span></div>
          <button class="lm-cart-x" onclick="Cart.close()"><i class="ti ti-x"></i></button>
        </div>
        <div class="lm-cart-body" id="lm-cart-items"></div>
        <div class="lm-cart-foot">
          <div class="lm-cart-subtotal">
            <span>Nëntotali</span>
            <span id="lm-cart-total">0 L</span>
          </div>
          <p class="lm-cart-note">Dërgimi llogaritet në checkout</p>
          <button class="lm-cart-btn-primary" id="lm-checkout-btn">Vazhdo me blerjen</button>
          <button class="lm-cart-btn-secondary" onclick="Cart.close()">Vazhdo blerjet</button>
        </div>
      </aside>
      <div id="lm-toast"><i class="ti ti-check"></i><div><p id="lm-toast-msg"></p></div></div>
    `);

    document.getElementById('lm-cart-overlay').addEventListener('click', () => this.close());
    document.getElementById('lm-checkout-btn').addEventListener('click', () => {
      this.clear();
      this.close();
      alert('Faleminderit! Porosia juaj u regjistrua.');
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') this.close(); });
  },

  init() {
    this.inject();
    this.load();
    this.renderBadge();
    this.renderSidebar();

    
    document.querySelectorAll('.cart-wrap').forEach(el => {
      el.addEventListener('click', () => this.open());
    });

    
    document.addEventListener('click', (e) => {

      // 1. "Shiko produktin" → hap product page
      if (e.target.classList.contains('btn-view-prod') || e.target.closest('.btn-view-prod')) {
        e.stopPropagation();
        const card = e.target.closest('.shop-card');
        const id = card?.dataset.id;
        if (id) window.location.href = 'product.html?id=' + id;
        return;
      }

      
      if (e.target.classList.contains('add-btn') || e.target.closest('.add-btn')) {
        e.stopPropagation();
        const btn = e.target.classList.contains('add-btn') ? e.target : e.target.closest('.add-btn');
        const card = btn.closest('.shop-card');
        if (!card || !card.dataset.id || !card.dataset.price) return;
        const tag   = (card.querySelector('.shop-card-tag') || card.querySelector('.wc-tag') || card.querySelector('.gift-card-tag'))?.textContent || '';
        const image = card.querySelector('.prod-photo')?.getAttribute('src') || '';
        this.add(card.dataset.id, card.dataset.name, card.dataset.price, tag, image);
        btn.textContent = '✓ Shtuar';
        btn.classList.add('added');
        setTimeout(() => { btn.textContent = '+ Shto'; btn.classList.remove('added'); }, 1500);
        return;
      }

      
      const card = e.target.closest('.shop-card');
      if (card && !e.target.closest('.add-btn') && !e.target.closest('.btn-view-prod')) {
        const id = card.dataset.id;
        if (id) window.location.href = 'product.html?id=' + id;
      }
    });
  }
};

document.addEventListener('DOMContentLoaded', () => Cart.init());