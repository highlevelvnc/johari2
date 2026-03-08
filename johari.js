/* ═══ JOHARI Wellness – Shared JS ═══ */
'use strict';

// ── LOADER
window.addEventListener('load', () => {
  const ld = document.getElementById('ld');
  if (!ld) return;
  setTimeout(() => {
    ld.classList.add('out');
    if (typeof heroReveal === 'function') heroReveal();
    initRv();
  }, 2200);
});

// ── CURSOR (desktop only)
const cd = document.getElementById('cd'), cr = document.getElementById('cr');
if (cd && cr && window.matchMedia('(pointer:fine)').matches) {
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  (function tick() {
    rx += (mx - rx) * .13; ry += (my - ry) * .13;
    cd.style.cssText = `left:${mx}px;top:${my}px`;
    cr.style.cssText = `left:${rx}px;top:${ry}px`;
    requestAnimationFrame(tick);
  })();
  document.querySelectorAll('a,button,.pc,.fq,.hc,.flow-card,.tech-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cr.style.width = '42px'; cr.style.height = '42px'; });
    el.addEventListener('mouseleave', () => { cr.style.width = '28px'; cr.style.height = '28px'; });
  });
} else if (cd) { cd.style.display = 'none'; if (cr) cr.style.display = 'none'; }

// ── NAV
const nav = document.getElementById('nav');
if (nav) {
  window.addEventListener('scroll', () => nav.classList.toggle('on', scrollY > 55), { passive: true });
  // Active page link
  const cp = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nlinks a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === cp || (cp === '' && href === 'index.html') || (cp === 'index.html' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });
}

// ── MOBILE MENU
const hbg = document.getElementById('hbg'), mm = document.getElementById('mm'), mc = document.getElementById('mc');
if (hbg && mm) {
  hbg.addEventListener('click', () => { mm.classList.add('open'); hbg.classList.add('open'); document.body.style.overflow = 'hidden'; });
  mc && mc.addEventListener('click', closeMenu);
  mm.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  function closeMenu() { mm.classList.remove('open'); hbg.classList.remove('open'); document.body.style.overflow = ''; }
}

// ── SCROLL REVEAL
function initRv() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.style.transition = 'opacity .85s ease, transform .85s ease';
      e.target.style.opacity = '1';
      e.target.style.transform = 'none';
      io.unobserve(e.target);
    });
  }, { threshold: .09, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.rv').forEach(el => io.observe(el));
}
// Call immediately if loader not present
if (!document.getElementById('ld')) { document.addEventListener('DOMContentLoaded', initRv); }

// ── FAQ
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.fq').forEach(q => {
    q.addEventListener('click', () => {
      const fi = q.closest('.fi');
      const was = fi.classList.contains('open');
      document.querySelectorAll('.fi.open').forEach(i => i.classList.remove('open'));
      if (!was) fi.classList.add('open');
    });
  });
});

// ── SMOOTH SCROLL
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href'); if (id === '#') return;
      const t = document.querySelector(id);
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
});

// ── LANGUAGE TOGGLE (PT/EN)
let lang = localStorage.getItem('johari_lang') || 'pt';
function applyLang() {
  const lb = document.getElementById('lb');
  if (lb) lb.textContent = lang === 'pt' ? 'EN' : 'PT';
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.querySelectorAll('[data-pt]').forEach(el => {
    const v = el.getAttribute('data-' + lang);
    if (!v) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') el.placeholder = v;
    else el.innerHTML = v;
  });
}
document.addEventListener('DOMContentLoaded', () => {
  applyLang();
  const lb = document.getElementById('lb');
  if (lb) lb.addEventListener('click', () => {
    lang = lang === 'pt' ? 'en' : 'pt';
    localStorage.setItem('johari_lang', lang);
    applyLang();
  });
});

// ── PARALLAX HERO
window.addEventListener('scroll', () => {
  const hbg2 = document.getElementById('hbg2');
  if (hbg2) hbg2.style.transform = `translateY(${scrollY * .28}px)`;
}, { passive: true });

// ── LINHAS NAV ACTIVE (protocols page)
(function () {
  const secs = ['linha-flow', 'afrodite', 'linha-neuro', 'linha-lumiere', 'rituais-comp'];
  const links = document.querySelectorAll('.lnav-link');
  if (!links.length) return;
  window.addEventListener('scroll', () => {
    let cur = '';
    secs.forEach(id => {
      const el = document.getElementById(id);
      if (el && scrollY >= el.offsetTop - 180) cur = id;
    });
    links.forEach(l => {
      const href = l.getAttribute('href').replace('#', '');
      l.classList.toggle('active', href === cur);
    });
  }, { passive: true });
})();

// ── PROTOCOL TABS FILTER (protocols page)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.pr-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.pr-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.filter;
      document.querySelectorAll('#prGrid .pc').forEach(card => {
        card.style.display = (filter === 'all' || card.dataset.cat === filter) ? '' : 'none';
      });
      const sig = document.querySelector('.pc.featured');
      if (sig) sig.style.gridColumn = filter === 'all' ? '1 / -1' : 'auto';
    });
  });
});
