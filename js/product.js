// ── product.js (vendose te js/product.js) ──
document.addEventListener('DOMContentLoaded', async () => {

  // Merr id nga URL: product.html?id=provence
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  // Ngarko products.json
  let products = [];
  try {
    const res = await fetch('./products.json');
    products = await res.json();
  } catch(e) {
    console.error('Nuk u ngarkua products.json', e);
    return;
  }

  const product = products.find(p => p.id === productId);
  if (!product) {
    document.querySelector('.product-section').innerHTML =
      '<p style="text-align:center;padding:80px;color:#7E8C54;font-family:Cinzel,serif">Produkti nuk u gjet.</p>';
    return;
  }

  // Breadcrumb
  document.getElementById('breadcrumb-name').textContent = product.name;
  document.title = product.name + ' — Lumière';

  // Main info
  document.getElementById('prodTag').textContent         = product.tag;
  document.getElementById('prodName').textContent        = product.name;
  document.getElementById('prodPrice').textContent       = product.price.toLocaleString('sq-AL') + ' L';
  document.getElementById('prodDesc').textContent        = product.description;
  document.getElementById('metaBurn').textContent        = product.burnTime;
  document.getElementById('metaWax').textContent         = product.wax;
  document.getElementById('metaSize').textContent        = product.size;
  document.getElementById('prodScent').textContent       = product.scent;
  document.getElementById('prodIngredients').textContent = product.ingredients;

  // Main photo
  const mainPhoto = document.getElementById('mainPhoto');
  mainPhoto.src = product.image;
  mainPhoto.alt = product.name;

  // Thumbs
  const thumbsEl = document.getElementById('thumbs');
  (product.gallery || [product.image]).forEach((src, i) => {
    const img = document.createElement('img');
    img.src = src; img.alt = product.name;
    img.className = 'thumb-img' + (i === 0 ? ' active' : '');
    img.addEventListener('click', () => {
      mainPhoto.src = src;
      document.querySelectorAll('.thumb-img').forEach(t => t.classList.remove('active'));
      img.classList.add('active');
    });
    thumbsEl.appendChild(img);
  });

  // Quantity
  let qty = 1;
  document.getElementById('qtyMinus').addEventListener('click', () => {
    if (qty > 1) { qty--; document.getElementById('qtyNum').textContent = qty; }
  });
  document.getElementById('qtyPlus').addEventListener('click', () => {
    qty++; document.getElementById('qtyNum').textContent = qty;
  });

  // Add to cart
  document.getElementById('addToCartBtn').addEventListener('click', () => {
    Cart.add(product, qty);
    const btn = document.getElementById('addToCartBtn');
    btn.classList.add('added');
    btn.innerHTML = '<i class="ti ti-check"></i> U shtua!';
    setTimeout(() => {
      btn.classList.remove('added');
      btn.innerHTML = '<i class="ti ti-shopping-bag"></i> Shto në shportë';
    }, 1800);
  });

  // Wishlist
  document.getElementById('wishlistBtn')?.addEventListener('click', function() {
    this.classList.toggle('active');
  });

  // Related products (same category, max 4)
  const related = products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, 4);

  const relatedGrid = document.getElementById('relatedGrid');
  if (related.length > 0) {
    relatedGrid.innerHTML = related.map(p => `
      <a href="product.html?id=${p.id}" class="related-card">
        <div class="related-card-img">
          <img src="${p.image}" alt="${p.name}"/>
        </div>
        <div class="related-card-body">
          <p class="related-card-tag">${p.tag}</p>
          <p class="related-card-name">${p.name}</p>
          <p class="related-card-price">${p.price.toLocaleString('sq-AL')} L</p>
        </div>
      </a>
    `).join('');
  } else {
    document.querySelector('.related-section').style.display = 'none';
  }

  // NAV scroll
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 50));
});