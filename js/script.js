document.addEventListener('DOMContentLoaded', () => {

  /* ══ NAV SCROLL ══ */
  const nav = document.querySelector('.nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  /* ══ KRIJO cart-wrap / cart-badge (index.html s'i ka ende në HTML) ══ */
  const icon = document.querySelector('.ti-shopping-bag');
if (icon && !icon.closest('.cart-wrap')) {
  const wrap = document.createElement('span');
  wrap.className = 'cart-wrap';
  const badge = document.createElement('span');
  badge.id = 'cart-badge';

  icon.parentElement.replaceChild(wrap, icon);
  wrap.appendChild(icon);
  wrap.appendChild(badge);

  wrap.addEventListener('click', () => Cart.open());
}

  /* ══ KLIKIMI MBI KARTËN → SHKO TE PRODUKTI ══ */
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.add-btn')) return;
      const id = card.dataset.id;
      if (id) window.location.href = 'product.html?id=' + id;
    });
  });

  /* ══ ADD TO CART ══ */
  const toast = document.getElementById('cartToast');
  const toastMsg = document.getElementById('toastMsg');
  let toastTimer;

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const card = btn.closest('.card');
      if (!card) return;

      Cart.add(
        card.dataset.id,
        card.dataset.name,
        Number(card.dataset.price),
        card.dataset.tag,
        card.dataset.image
      );

      const name = card.dataset.name || 'Produkti';

      btn.textContent = '✓ Shtuar';
      btn.style.cssText = 'background:#013220;color:#F5EFD6;border-color:#013220;';
      setTimeout(() => {
        btn.textContent = '+ Shto në shportë';
        btn.style.cssText = '';
      }, 1400);

      if (toast && toastMsg) {
        toastMsg.textContent = `"${name}" u shtua në shportë!`;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => toast.classList.remove('show'), 3000);
      }
    });
  });

  /* ══ NEWSLETTER ══ */
  const nlBtn = document.querySelector('.nl-btn');
  const nlInput = document.querySelector('.nl-input');
  if (nlBtn && nlInput) {
    nlBtn.addEventListener('click', () => {
      const email = nlInput.value.trim();
      if (!email || !email.includes('@')) {
        nlInput.style.borderColor = '#c0392b';
        nlInput.placeholder = 'Shkruaj email të vlefshëm!';
        setTimeout(() => {
          nlInput.style.borderColor = '';
          nlInput.placeholder = 'email@juaj.com';
        }, 2200);
        return;
      }
      nlBtn.textContent = '✓ Faleminderit!';
      nlBtn.style.background = '#357A39';
      nlInput.value = '';
      nlInput.placeholder = 'U regjistruat me sukses!';
      setTimeout(() => {
        nlBtn.textContent = 'Regjistrohu';
        nlBtn.style.background = '';
        nlInput.placeholder = 'email@juaj.com';
      }, 3500);
    });
    nlInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') nlBtn.click();
    });
  }

  /* ══ SCROLL REVEAL ══ */
  const revealEls = document.querySelectorAll(
    '.card, .val-item, .cat-card, .testi-card, .strip-item, .how-grid, .how-img-wrap'
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, entry.target.dataset.delay || 0);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });

  revealEls.forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = (i % 4) * 100;
    observer.observe(el);
  });

  /* ══ CATEGORY HOVER SCALE ══ */
  document.querySelectorAll('.cat-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.4s ease';
      card.style.transform = 'scale(1.025)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'scale(1)';
    });
  });

});