document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV SCROLL ── */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  /* ── OPEN/CLOSED STATUS ── */
  const dot = document.querySelector('.open-dot');
  const status = document.getElementById('openStatus');
  if (dot && status) {
    const now = new Date();
    const day = now.getDay(); // 0=Sun, 6=Sat
    const hour = now.getHours();
    const min = now.getMinutes();
    const time = hour + min / 60;

    let isOpen = false;
    if (day >= 1 && day <= 5 && time >= 9 && time < 19) isOpen = true;
    if (day === 6 && time >= 10 && time < 17) isOpen = true;

    if (isOpen) {
      dot.classList.add('open');
      status.textContent = 'Hapur tani';
      status.style.color = '#357A39';
    } else {
      dot.classList.add('closed-dot');
      status.textContent = 'Mbyllur tani';
      status.style.color = '#999';
    }
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-q').forEach(b => {
        b.classList.remove('open');
        b.nextElementSibling.classList.remove('open');
      });

      if (!isOpen) {
        btn.classList.add('open');
        answer.classList.add('open');
      }
    });
  });

  /* ── FORM VALIDATION & SUBMIT ── */
  const form = document.getElementById('contactForm');
  const successDiv = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  function validateField(id, errId, check, msg) {
    const el = document.getElementById(id);
    const err = document.getElementById(errId);
    if (!check(el.value)) {
      el.classList.add('error');
      err.textContent = msg;
      return false;
    }
    el.classList.remove('error');
    err.textContent = '';
    return true;
  }

  // Live clear errors on input
  ['fname','lname','email','subject','message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => {
      el.classList.remove('error');
      const err = document.getElementById('err-' + id);
      if (err) err.textContent = '';
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    let valid = true;

    valid = validateField('fname',   'err-fname',   v => v.trim().length >= 2,     'Emri duhet të ketë të paktën 2 karaktere.') && valid;
    valid = validateField('lname',   'err-lname',   v => v.trim().length >= 2,     'Mbiemri duhet të ketë të paktën 2 karaktere.') && valid;
    valid = validateField('email',   'err-email',   v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v), 'Ju lutem shkruani një email të vlefshëm.') && valid;
    valid = validateField('subject', 'err-subject', v => v !== '',                 'Ju lutem zgjidhni temën.') && valid;
    valid = validateField('message', 'err-message', v => v.trim().length >= 10,    'Mesazhi duhet të ketë të paktën 10 karaktere.') && valid;

    const privacy = document.getElementById('privacy');
    const privErr = document.getElementById('err-privacy');
    if (!privacy.checked) {
      privErr.textContent = 'Duhet të pranoni politikën e privatësisë.';
      valid = false;
    } else {
      privErr.textContent = '';
    }

    if (!valid) return;

    // Simulate sending
    submitBtn.classList.add('loading');
    submitBtn.querySelector('.btn-text').textContent = 'Duke dërguar...';

    setTimeout(() => {
      form.classList.add('hidden');
      successDiv.classList.add('show');
    }, 1400);
  });

  /* ── SCROLL REVEAL ── */
  const revealEls = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.10 });
  revealEls.forEach(el => observer.observe(el));

});

/* ── RESET FORM ── */
function resetForm() {
  const form = document.getElementById('contactForm');
  const successDiv = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');

  form.reset();
  form.classList.remove('hidden');
  successDiv.classList.remove('show');
  submitBtn.classList.remove('loading');
  submitBtn.querySelector('.btn-text').textContent = 'Dërgo mesazhin';
}