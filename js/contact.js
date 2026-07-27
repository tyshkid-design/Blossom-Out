/* ============================================================
   contact.js — Contact page logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── CONTACT FORM ── */
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>Sending…</span>';
      btn.disabled  = true;
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.disabled  = false;
        form.reset();
        success.classList.add('show');
        setTimeout(() => success.classList.remove('show'), 6000);
      }, 1800);
    });
  }

  /* ── FAQ ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

});
