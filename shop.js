document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── DROPDOWN ACCORDION ── */
  document.querySelectorAll('.dropdown-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.dataset.target;
      const list = document.getElementById(targetId);
      const isOpen = !list.classList.contains('closed');
      list.classList.toggle('closed', isOpen);
      btn.classList.toggle('closed', isOpen);
    });
  });

  /* ── FILTERS ── */
  const allCards = document.querySelectorAll('.shop-card');
  const countNum  = document.getElementById('countNum');
  const noResults = document.getElementById('noResults');
  const activeTags = document.getElementById('activeTags');

  let activeFilters = {
    category: "all",
    priceMin: 0,
    priceMax: 5000,
    scents: [],
    hours: []
  };

  /* ── NUMRAT E KATEGORIVE ── */
  function updateCategoryCounts() {
    document.querySelectorAll('input[name="cat"]').forEach(radio => {
      const val = radio.value;
      const countEl = radio.closest('.filter-item')?.querySelector('.filter-count');
      if (!countEl) return;
      countEl.textContent = val === 'all'
        ? allCards.length
        : [...allCards].filter(c => c.dataset.cat === val).length;
    });
  }
  updateCategoryCounts();

  /* ── LEXO KATEGORINË NGA URL ── */
  const urlParams = new URLSearchParams(window.location.search);
  const urlCategory = urlParams.get('category');
  if (urlCategory) {
    activeFilters.category = urlCategory;
    const matchingRadio = document.querySelector(`input[name="cat"][value="${urlCategory}"]`);
    if (matchingRadio) {
      matchingRadio.checked = true;
      document.querySelectorAll(".filter-item").forEach(item => item.classList.remove("active-filter"));
      matchingRadio.closest(".filter-item").classList.add("active-filter");
    }
  }

  /* Kategoritë */
  document.querySelectorAll('input[name="cat"]').forEach(radio => {
    radio.addEventListener("change", () => {
      activeFilters.category = radio.value;
      document.querySelectorAll(".filter-item").forEach(item => item.classList.remove("active-filter"));
      radio.closest(".filter-item").classList.add("active-filter");
      applyFilters();
    });
  });

  /* ── APLIKO FILTRAT ── */
  function applyFilters() {
    let visible = 0;

    allCards.forEach(card => {
      const price = parseInt(card.dataset.price || 0);
      const category = card.dataset.cat;
      const scent = card.dataset.scent || "";
      const hours = card.dataset.hours || "";

      const priceOk = price >= activeFilters.priceMin && price <= activeFilters.priceMax;
      const categoryOk = activeFilters.category === "all" || category === activeFilters.category;
      const scentOk = activeFilters.scents.length === 0 || activeFilters.scents.includes(scent);
      const hoursOk = activeFilters.hours.length === 0 || activeFilters.hours.includes(hours);

      const show = priceOk && categoryOk && scentOk && hoursOk;
      card.classList.toggle("hidden", !show);
      if (show) visible++;
    });

    countNum.textContent = visible;
    noResults.style.display = visible === 0 ? "block" : "none";

    updateTags();
    showPage(1);
  }

  /* ── PRICE (Min + Max) ── */
  const priceSlider = document.getElementById('priceSlider');
  const priceMinEl  = document.getElementById('priceMin');
  const priceMaxEl  = document.getElementById('priceMax');

  priceSlider?.addEventListener('input', () => {
    priceMaxEl.value = priceSlider.value;
    activeFilters.priceMax = parseInt(priceSlider.value);
    applyFilters();
  });
  priceMaxEl?.addEventListener('input', () => {
    const val = parseInt(priceMaxEl.value) || 5000;
    priceSlider.value = val;
    activeFilters.priceMax = val;
    applyFilters();
  });
  priceMinEl?.addEventListener('input', () => {
    activeFilters.priceMin = parseInt(priceMinEl.value) || 0;
    applyFilters();
  });

  /* ── AROMA (checkbox-a) ── */
  const scentChecks = document.querySelectorAll('.sidebar-block:nth-of-type(3) .filter-check input[type="checkbox"]');
  scentChecks.forEach(cb => {
    cb.addEventListener('change', () => {
      activeFilters.scents = [...scentChecks].filter(c => c.checked).map(c => c.value);
      applyFilters();
    });
  });

  /* ── KOHA E DJEGIES (checkbox-a) ── */
  const hoursChecks = document.querySelectorAll('.sidebar-block:nth-of-type(4) .filter-check input[type="checkbox"]');
  hoursChecks.forEach(cb => {
    cb.addEventListener('change', () => {
      activeFilters.hours = [...hoursChecks].filter(c => c.checked).map(c => c.value);
      applyFilters();
    });
  });

  /* ── ACTIVE TAGS ── */
  function updateTags() {
    activeTags.innerHTML = '';

    if (activeFilters.priceMax < 5000 || activeFilters.priceMin > 0) {
      const pill = makePill(`Çmimi: ${activeFilters.priceMin}–${activeFilters.priceMax} L`, () => {
        activeFilters.priceMin = 0;
        activeFilters.priceMax = 5000;
        if (priceMinEl) priceMinEl.value = 0;
        if (priceMaxEl) priceMaxEl.value = 5000;
        if (priceSlider) priceSlider.value = 5000;
        applyFilters();
      });
      activeTags.appendChild(pill);
    }

    activeFilters.scents.forEach(scent => {
      const label = document.querySelector(`.filter-check input[value="${scent}"]`)?.parentElement.textContent.trim();
      const pill = makePill(label || scent, () => {
        activeFilters.scents = activeFilters.scents.filter(s => s !== scent);
        const cb = document.querySelector(`.filter-check input[value="${scent}"]`);
        if (cb) cb.checked = false;
        applyFilters();
      });
      activeTags.appendChild(pill);
    });

    activeFilters.hours.forEach(h => {
      const label = document.querySelector(`.filter-check input[value="${h}"]`)?.parentElement.textContent.trim();
      const pill = makePill(label || h, () => {
        activeFilters.hours = activeFilters.hours.filter(x => x !== h);
        const cb = document.querySelector(`.filter-check input[value="${h}"]`);
        if (cb) cb.checked = false;
        applyFilters();
      });
      activeTags.appendChild(pill);
    });
  }

  function makePill(label, onRemove) {
    const pill = document.createElement('span');
    pill.className = 'tag-pill';
    pill.innerHTML = `${label} <i class="ti ti-x"></i>`;
    pill.addEventListener('click', onRemove);
    return pill;
  }

  /* ── CLEAR ALL ── */
  document.getElementById('clearFilters')?.addEventListener('click', () => {
    activeFilters = { category: "all", priceMin: 0, priceMax: 5000, scents: [], hours: [] };

    document.querySelectorAll('input[name="cat"]').forEach(r => r.checked = (r.value === "all"));
    document.querySelectorAll(".filter-item").forEach(item => item.classList.remove("active-filter"));
    document.querySelector('input[name="cat"][value="all"]')?.closest('.filter-item')?.classList.add('active-filter');

    if (priceMinEl) priceMinEl.value = 0;
    if (priceMaxEl) priceMaxEl.value = 5000;
    if (priceSlider) priceSlider.value = 5000;

    scentChecks.forEach(cb => cb.checked = false);
    hoursChecks.forEach(cb => cb.checked = false);

    applyFilters();
  });

  /* ── SORT ── */
  document.getElementById('sortSelect')?.addEventListener('change', (e) => {
    const grid  = document.getElementById('productsGrid');
    const cards = [...grid.querySelectorAll('.shop-card')];
    cards.sort((a, b) => {
      const ap = parseInt(a.dataset.price), bp = parseInt(b.dataset.price);
      const an = a.dataset.name, bn = b.dataset.name;
      switch (e.target.value) {
        case 'price-asc':  return ap - bp;
        case 'price-desc': return bp - ap;
        case 'name-asc':   return an.localeCompare(bn);
        case 'name-desc':  return bn.localeCompare(an);
        default: return 0;
      }
    });
    cards.forEach(c => grid.appendChild(c));
    showPage(1);
  });

  /* ── VIEW TOGGLE ── */
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
  const PER_PAGE = 12;
  let currentPage = 1;

  function getVisibleCards() {
    return [...document.querySelectorAll('.shop-card:not(.hidden)')];
  }

  function showPage(page) {
    const cards = getVisibleCards();
    const total = cards.length;
    const totalPages = Math.ceil(total / PER_PAGE);
    currentPage = Math.min(Math.max(page, 1), totalPages || 1);

    cards.forEach((card, i) => {
      const start = (currentPage - 1) * PER_PAGE;
      const end   = start + PER_PAGE;
      card.style.display = (i >= start && i < end) ? '' : 'none';
    });

    const pagination = document.getElementById('pagination');
    if (!pagination) return;
    pagination.innerHTML = '';

    if (currentPage > 1) {
      const prev = document.createElement('button');
      prev.className = 'page-btn page-next';
      prev.innerHTML = '<i class="ti ti-chevron-left"></i>';
      prev.addEventListener('click', () => { showPage(currentPage - 1); window.scrollTo({top:0,behavior:'smooth'}); });
      pagination.appendChild(prev);
    }

    for (let p = 1; p <= totalPages; p++) {
      const btn = document.createElement('button');
      btn.className = 'page-btn' + (p === currentPage ? ' active' : '');
      btn.textContent = p;
      btn.addEventListener('click', () => { showPage(p); window.scrollTo({top:0,behavior:'smooth'}); });
      pagination.appendChild(btn);
    }

    if (currentPage < totalPages) {
      const next = document.createElement('button');
      next.className = 'page-btn page-next';
      next.innerHTML = '<i class="ti ti-chevron-right"></i>';
      next.addEventListener('click', () => { showPage(currentPage + 1); window.scrollTo({top:0,behavior:'smooth'}); });
      pagination.appendChild(next);
    }
  }

  /* ── FILLIMI ── */
  if (urlCategory) {
    applyFilters();
  } else {
    showPage(1);
  }

});