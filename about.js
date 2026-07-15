document.addEventListener('DOMContentLoaded', () => {
if (window.location.hash) {
  const target = document.querySelector(window.location.hash);
  if (target) {
    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
}

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── SCROLL TO CONTENT on hero arrow ── */
  const scrollBtn = document.querySelector('.about-hero-scroll');
  scrollBtn?.addEventListener('click', () => {
    document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' });
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll(
    '.value-card, .team-card, .stat-item, .process-step, .story-grid, .sustain-grid'
  );
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (i % 4) * 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealEls.forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  
  document.querySelectorAll('a[href^="about.html#"], a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const hash = href.includes('#') ? '#' + href.split('#')[1] : href;
      if (hash && hash !== '#') {
        const target = document.querySelector(hash);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

});