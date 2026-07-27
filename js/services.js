/* ============================================================
   services.js — Services page tab logic
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const pkgTabs   = document.querySelectorAll('.pkg-tab');
  const tabPanels = document.querySelectorAll('.tab-panel');

  function animateCards(panel) {
    panel.querySelectorAll('.pkg-card, .price-card').forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(18px)';
      setTimeout(() => {
        card.style.transition = 'opacity 0.35s ease, transform 0.35s ease';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0)';
      }, i * 55);
    });
  }

  function switchTab(key) {
    pkgTabs.forEach(t => {
      const on = t.dataset.tab === key;
      t.classList.toggle('active', on);
      t.setAttribute('aria-selected', on);
    });
    tabPanels.forEach(p => {
      const on = p.id === 'tab-' + key;
      p.classList.toggle('active', on);
      if (on) animateCards(p);
    });
  }

  pkgTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      switchTab(tab.dataset.tab);
      tab.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    });
  });

  /* keyboard arrows */
  document.getElementById('pkgNav')?.addEventListener('keydown', e => {
    const tabs = [...pkgTabs];
    const cur  = tabs.findIndex(t => t.classList.contains('active'));
    let next = cur;
    if (e.key === 'ArrowRight') next = (cur + 1) % tabs.length;
    if (e.key === 'ArrowLeft')  next = (cur - 1 + tabs.length) % tabs.length;
    if (next !== cur) { tabs[next].focus(); switchTab(tabs[next].dataset.tab); }
  });

  /* deep-link via URL hash: services.html#corporate */
  const hash = window.location.hash.replace('#', '');
  const validTabs = ['school','growing','journey','transition','corporate'];
  switchTab(validTabs.includes(hash) ? hash : 'school');

  /* FAQ accordion */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const open = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });
});
