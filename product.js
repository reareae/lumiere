document.addEventListener('DOMContentLoaded', async () => {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 50));

  const id = new URLSearchParams(window.location.search).get('id');
  if (!id) { location.href = 'shop.html'; return; }

  let products = [];
  if (typeof PRODUCTS_DATA !== 'undefined') {
    products = PRODUCTS_DATA;
  } else {
    try {
      const r = await fetch('products.json');
      products = await r.json();
    } catch(e) {
      console.error('products.json nuk u ngarkua');
      return;
    }
  }

  const p = products.find(x => x.id === id);
  if (!p) { location.href = 'shop.html'; return; }

  
  document.title = p.name + ' — Lumière';
  document.getElementById('breadcrumb-name').textContent = p.name;


const breadcrumbParent = document.getElementById('breadcrumb-parent');
if (breadcrumbParent) {
  if (p.category === 'gift') {
    breadcrumbParent.textContent = 'Dhurata';
    breadcrumbParent.href = 'gift.html';
  } else {
    breadcrumbParent.textContent = 'Shop';
    breadcrumbParent.href = 'shop.html';
  }
}

  // Foto
  document.getElementById('mainPhoto').src = p.image;
  document.getElementById('mainPhoto').alt = p.name;

  // Info
  document.getElementById('prodTag').textContent          = p.tag;
  document.getElementById('prodName').textContent         = p.name;
  document.getElementById('prodPrice').textContent        = p.price.toLocaleString('sq') + ' L';
  document.getElementById('prodDesc').textContent         = p.description;
  document.getElementById('metaBurn').textContent         = p.hours;
  document.getElementById('metaWax').textContent          = p.wax;
  document.getElementById('metaSize').textContent         = p.size;
  document.getElementById('prodScent').textContent        = p.scent;
  document.getElementById('prodIngredients').textContent  = p.ingredients;

  // Sasia
  let qty = 1;
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; document.getElementById('qtyNum').textContent = qty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty++; document.getElementById('qtyNum').textContent = qty;
  });

  // Shto ne shporte
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    for (let i = 0; i < qty; i++) Cart.add(p.id, p.name, p.price, p.tag, p.image);
    const btn = document.getElementById('addToCartBtn');
    btn.innerHTML = '<i class="ti ti-check"></i> U shtua!';
    btn.style.background = '#357A39';
    setTimeout(() => {
      btn.innerHTML = '<i class="ti ti-shopping-bag"></i> Shto në shportë';
      btn.style.background = '';
    }, 1800);
  });

  // Wishlist
  document.getElementById('wishlistBtn')?.addEventListener('click', function() {
    this.classList.toggle('active');
    this.querySelector('i').style.color = this.classList.contains('active') ? '#c0392b' : '';
  });

  
  // Related
  const related = products.filter(x => x.id !== id && x.category === p.category).slice(0, 4);
  const rg = document.getElementById('relatedGrid');
  if (related.length > 0 && rg) {
    rg.innerHTML = related.map(r => `
      <a href="product.html?id=${r.id}" class="related-card">
        <div class="related-card-img"><img src="${r.image}" alt="${r.name}"/></div>
        <div class="related-card-body">
          <p class="related-card-tag">${r.tag}</p>
          <p class="related-card-name">${r.name}</p>
          <p class="related-card-price">${r.price.toLocaleString('sq')} L</p>
        </div>
      </a>`).join('');
  } else {
    const rw = document.querySelector('.related-wrap');
    if (rw) rw.style.display = 'none';
    }
});