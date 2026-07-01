document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── CART ── */
  let cartCount = 0;
  const badge = document.getElementById('cart-badge');
  const toast = document.getElementById('cartToast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  function showToast(name) {
    toastMsg.textContent = `"${name}" u shtua në shportë!`;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
  }

  document.querySelectorAll('.add-btn, .quick-add').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.shop-card');
      const name = card?.dataset.name || btn.dataset.name || 'Produkti';
      cartCount++;
      badge.textContent = cartCount;
      badge.style.display = 'flex';
      showToast(name);

      const addBtn = card?.querySelector('.add-btn');
      if (addBtn) {
        addBtn.textContent = '✓ Shtuar';
        addBtn.style.cssText = 'background:#013220;color:#F5EFD6;border-color:#013220;';
        setTimeout(() => {
          addBtn.textContent = '+ Shto';
          addBtn.style.cssText = '';
        }, 1400);
      }
    });
  });

  /* ── FILTER BY CATEGORY ── */
  const allCards = document.querySelectorAll('.shop-card');
  const countNum = document.getElementById('countNum');
  const noResults = document.getElementById('noResults');
  const activeTags = document.getElementById('activeTags');

  let activeFilters = { cat: 'all', priceMax: 5000, aromas: [], burn: [] };

  function applyFilters() {
    let visible = 0;
    allCards.forEach(card => {
      const cat = card.dataset.cat;
      const price = parseInt(card.dataset.price);
      const catMatch = activeFilters.cat === 'all' || cat === activeFilters.cat;
      const priceMatch = price <= activeFilters.priceMax;
      if (catMatch && priceMatch) {
        card.classList.remove('hidden');
        visible++;
      } else {
        card.classList.add('hidden');
      }
    });
    countNum.textContent = visible;
    noResults.style.display = visible === 0 ? 'block' : 'none';
  }

  /* Category radio */
  document.querySelectorAll('.filter-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.filter-item').forEach(i => i.classList.remove('active-filter'));
      item.classList.add('active-filter');
      const radio = item.querySelector('input[type="radio"]');
      activeFilters.cat = radio.value;
      applyFilters();
      updateTags();
    });
  });

  /* Price slider */
  const priceSlider = document.getElementById('priceSlider');
  const priceMax = document.getElementById('priceMax');
  priceSlider?.addEventListener('input', () => {
    priceMax.value = priceSlider.value;
    activeFilters.priceMax = parseInt(priceSlider.value);
    applyFilters();
    updateTags();
  });
  priceMax?.addEventListener('input', () => {
    priceSlider.value = priceMax.value;
    activeFilters.priceMax = parseInt(priceMax.value);
    applyFilters();
    updateTags();
  });

  /* Active tags */
  function updateTags() {
    activeTags.innerHTML = '';
    if (activeFilters.cat !== 'all') {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.innerHTML = `${activeFilters.cat} <i class="ti ti-x"></i>`;
      pill.addEventListener('click', () => {
        activeFilters.cat = 'all';
        document.querySelectorAll('.filter-item').forEach(i => i.classList.remove('active-filter'));
        document.querySelector('.filter-item:first-child').classList.add('active-filter');
        applyFilters(); updateTags();
      });
      activeTags.appendChild(pill);
    }
    if (activeFilters.priceMax < 5000) {
      const pill = document.createElement('span');
      pill.className = 'tag-pill';
      pill.innerHTML = `Maks: ${activeFilters.priceMax} L <i class="ti ti-x"></i>`;
      pill.addEventListener('click', () => {
        activeFilters.priceMax = 5000;
        priceSlider.value = 5000;
        priceMax.value = 5000;
        applyFilters(); updateTags();
      });
      activeTags.appendChild(pill);
    }
  }

  /* Clear filters */
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    activeFilters = { cat: 'all', priceMax: 5000 };
    document.querySelectorAll('.filter-item').forEach(i => i.classList.remove('active-filter'));
    document.querySelector('.filter-item:first-child').classList.add('active-filter');
    if (priceSlider) priceSlider.value = 5000;
    if (priceMax) priceMax.value = 5000;
    document.querySelectorAll('.filter-check input').forEach(cb => cb.checked = false);
    applyFilters();
    updateTags();
  });

  /* ── SORT ── */
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    const grid = document.getElementById('productsGrid');
    const cards = [...grid.querySelectorAll('.shop-card')];
    cards.sort((a, b) => {
      const aPrice = parseInt(a.dataset.price);
      const bPrice = parseInt(b.dataset.price);
      const aName  = a.dataset.name;
      const bName  = b.dataset.name;
      switch (e.target.value) {
        case 'price-asc':  return aPrice - bPrice;
        case 'price-desc': return bPrice - aPrice;
        case 'name-asc':   return aName.localeCompare(bName);
        case 'name-desc':  return bName.localeCompare(aName);
        default: return 0;
      }
    });
    cards.forEach(c => grid.appendChild(c));
  });

  /* ── VIEW TOGGLE (grid / list) ── */
  const grid = document.getElementById('productsGrid');
  document.getElementById('gridView')?.addEventListener('click', () => {
    grid.classList.remove('list-view');
    document.getElementById('gridView').classList.add('active');
    document.getElementById('listView').classList.remove('active');
  });
  document.getElementById('listView')?.addEventListener('click', () => {
    grid.classList.add('list-view');
    document.getElementById('listView').classList.add('active');
    document.getElementById('gridView').classList.remove('active');
  });

  /* ── PAGINATION ── */
  document.querySelectorAll('.page-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.page-btn').forEach(b => b.classList.remove('active'));
      if (!btn.classList.contains('page-next')) btn.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

});