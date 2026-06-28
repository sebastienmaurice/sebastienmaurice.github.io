/* =============================================
   PORTFOLIO - Sébastien Maurice
   js/main.js - v7.3 - 2026
============================================= */

/* ── Tech Bar ── */
(function(){
  const techs = [
    { name:'HTML5', svg:`<svg viewBox="0 0 24 24"><path fill="#E44D26" d="M4 2l1.5 16.5L12 21l6.5-2.5L20 2z"/><path fill="#F16529" d="M12 19.5V4.5H4.5L5.8 18z"/><path fill="#ebebeb" d="M12 8.5H8l.3 3H12v-3z"/><path fill="#fff" d="M12 14.5l-3-.8-.2-2H7.5l.4 4 4.1 1.1z"/><path fill="#ebebeb" d="M12 11.5h3.5l-.3 3-3.2.8V14l3-.8.2-2H12z"/></svg>` },
    { name:'CSS3', svg:`<svg viewBox="0 0 24 24"><path fill="#1572B6" d="M4 2l1.5 16.5L12 21l6.5-2.5L20 2z"/><path fill="#33A9DC" d="M12 19.5V4.5h7.5L18.2 18z"/><path fill="#fff" d="M12 8.5H8l.3 3H12v-3z"/><path fill="#ebebeb" d="M12 14.5l3-.8.2-2h-3.2v-1.2h3.5l.3-3H12V4.5l6 .5-1.8 14-4.2 1.5z"/></svg>` },
    { name:'JavaScript', svg:`<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="4" fill="#F7DF1E"/><path d="M6 17.5c.4.7 1 1.2 2 1.2 1.1 0 1.8-.5 1.8-1.7V11h2v6.1c0 2.4-1.4 3.5-3.4 3.5-1.7 0-2.8-.9-3.3-2z" fill="#323330"/><path d="M13 17.3c.5.8 1.3 1.4 2.5 1.4 1.2 0 2-.6 2-1.5 0-1-.8-1.4-2-2l-.7-.3c-2-.8-3.3-1.9-3.3-4 0-2 1.6-3.5 4-3.5 1.7 0 2.9.6 3.8 2.2l-2 1.3c-.4-.8-.9-1.1-1.7-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.7 1.6l.7.3c2.3 1 3.6 2 3.6 4.2 0 2.4-1.9 3.7-4.5 3.7-2.4 0-4-1.2-4.8-2.7z" fill="#323330"/></svg>` },
    { name:'Node.js', svg:`<svg viewBox="0 0 24 24"><path fill="#339933" d="M12 2L3 7v10l9 5 9-5V7z"/><path fill="#fff" d="M12 4.5L5 8.5v7l7 3.9 7-3.9v-7z" opacity=".25"/><path fill="#fff" d="M12 7a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" opacity=".7"/></svg>` },
    { name:'Svelte', svg:`<svg viewBox="0 0 24 24"><path fill="#FF3E00" d="M20.3 5.6c-2-2.9-6-3.7-8.9-1.8L6.8 7.2a5.7 5.7 0 0 0-2.6 4.8 5.7 5.7 0 0 0-1.9 3.5 5.9 5.9 0 0 0 1 4.3c2 2.9 6 3.7 8.9 1.8l4.6-2.9a5.7 5.7 0 0 0 2.6-4.8 5.8 5.8 0 0 0 .9-7.3"/></svg>` },
    { name:'Express.js', svg:`<svg viewBox="0 0 24 24"><rect width="24" height="24" rx="3" fill="#000"/><path d="M4 15.5c2.5 0 3.7-1.2 3.7-2.8 0-1.3-.7-2-2.3-2.5l-1-.3c-.8-.2-1.1-.5-1.1-1 0-.6.5-1 1.3-1 .8 0 1.3.3 1.7.9l1-.6c-.5-.9-1.4-1.4-2.7-1.4-1.5 0-2.6.9-2.6 2.1 0 1.1.7 1.8 2.1 2.2l1 .3c.8.2 1.2.6 1.2 1.2 0 .7-.6 1.2-1.6 1.2-1 0-1.7-.4-2.1-1.2L3 13c.5 1 1.4 1.6 2.9 1.6zm7-8.6H9.5v8.4h1.4v-3h1.6c1.7 0 2.8-1 2.8-2.7s-1.1-2.7-2.8-2.7zm0 4.3h-1.6V8h1.6c1 0 1.5.5 1.5 1.6s-.5 1.6-1.5 1.6zm5.9 4.4c1.2 0 2-.5 2.5-1.4v1.2H21V10h-1.4v1.2c-.5-.9-1.3-1.4-2.5-1.4-1.8 0-3 1.3-3 3.2s1.2 3.1 3 3.1zm.3-1.2c-1.1 0-1.8-.8-1.8-2s.7-2 1.8-2 1.8.8 1.8 2-.7 2-1.8 2z" fill="#fff"/></svg>` },
    { name:'Git', svg:`<svg viewBox="0 0 24 24"><path fill="#F05032" d="M23.1 11.6 12.4.9a1.5 1.5 0 0 0-2.1 0L8.1 3.1l2.6 2.6a1.8 1.8 0 0 1 2.2 2.3L15.4 10.5a1.8 1.8 0 1 1-1.1 1.7l-2.4-2.4v6a1.8 1.8 0 1 1-1.5 0V9.6a1.8 1.8 0 0 1-1-2.4L7 4.6.9 10.6a1.5 1.5 0 0 0 0 2.1l10.7 10.7a1.5 1.5 0 0 0 2.1 0l9.4-9.4a1.5 1.5 0 0 0 0-2.4"/></svg>` },
    { name:'PostgreSQL', svg:`<svg viewBox="0 0 24 24"><ellipse cx="12" cy="6" rx="7" ry="3.5" fill="none" stroke="#336791" stroke-width="1.5"/><path d="M5 6v8c0 1.9 3.1 3.5 7 3.5s7-1.6 7-3.5V6" fill="none" stroke="#336791" stroke-width="1.5"/><path d="M5 10c0 1.9 3.1 3.5 7 3.5S19 11.9 19 10" fill="none" stroke="#336791" stroke-width="1.5"/></svg>` },
    { name:'Figma', svg:`<svg viewBox="0 0 24 24"><path fill="#F24E1E" d="M8.5 3H8a3 3 0 0 0 0 6h3V3z"/><path fill="#FF7262" d="M8 9h3v6H8a3 3 0 0 1 0-6z"/><path fill="#A259FF" d="M8 15h3v3a3 3 0 0 1-3-3z"/><path fill="#1ABCFE" d="M11 3h3.5A3 3 0 0 1 14.5 9H11z"/><circle cx="14.5" cy="12" r="3" fill="#0ACF83"/></svg>` },
    { name:'WordPress', svg:`<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#21759B"/><path fill="#fff" d="M12 6.5c-3 0-5.5 2.5-5.5 5.5s2.5 5.5 5.5 5.5 5.5-2.5 5.5-5.5S15 6.5 12 6.5z"/><path fill="#21759B" d="M12 9c1.6 0 3 1.3 3 3s-1.4 3-3 3-3-1.3-3-3 1.4-3 3-3z"/></svg>` },
  ];

  const track = document.getElementById('techbarTrack');
  if (!track) return;
  const all = [...techs, ...techs];
  all.forEach(t => {
    const sep = document.createElement('span');
    sep.className = 'techbar-sep';
    const item = document.createElement('div');
    item.className = 'techbar-item';
    item.innerHTML = t.svg + `<span class="techbar-item-name">${t.name}</span>`;
    track.appendChild(item);
    track.appendChild(sep);
  });
})();

/* ── Email obfuscation ── */
(function(){ const u='overseb75',d='gmail',t='com'; window._em=u+'@'+d+'.'+t; })();
function revealEmail(btnEl, displayEl){
  if(displayEl) displayEl.textContent = window._em;
  btnEl.href = 'mailto:' + window._em;
  btnEl.onclick = null;
}

/* ── Cursor · compositor-only rAF ── */
const cur = document.getElementById('cur'), cring = document.getElementById('cring');
let mx = -200, my = -200, rx = -200, ry = -200, raf = 0;
let magX = 0, magY = 0; /* pull magnétique sur l'anneau (mis à jour par l'IIFE magnet) */
const tick = () => {
  const tx = mx + magX, ty = my + magY;
  rx += (tx - rx) * .18; ry += (ty - ry) * .18;
  cur.style.transform  = `translate3d(${mx}px,${my}px,0)`;
  cring.style.transform = `translate3d(${rx}px,${ry}px,0)`;
  raf = (Math.hypot(tx - rx, ty - ry) > .4) ? requestAnimationFrame(tick) : 0;
};
addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  if (!raf) raf = requestAnimationFrame(tick);
}, { passive: true });

/* ── in-bento IntersectionObserver ── */
const bentoSec = document.querySelector('.bento-section');
if (bentoSec) {
  new IntersectionObserver(([e]) => {
    document.body.classList.toggle('in-bento', e.isIntersecting);
  }, { threshold: 0, rootMargin: '-30% 0px -30% 0px' }).observe(bentoSec);
}

/* ── Hover curseur · toutes zones cliquables ── */
document.querySelectorAll('a[href], button, .b-card, .b-card-proj, .b-btn-accent, .va-case-card, .prest-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cring.classList.add('lg', 'on-btn');
    cur.classList.add('on-btn');
  });
  el.addEventListener('mouseleave', () => {
    cring.classList.remove('lg', 'on-btn');
    cur.classList.remove('on-btn');
  });
});
document.querySelectorAll('.b-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100) + '%');
    card.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100) + '%');
  });
});
document.querySelectorAll('.b-btn-accent').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r = btn.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) * .22;
    const dy = (e.clientY - (r.top + r.height / 2)) * .22;
    btn.style.transform = `translate(${dx}px,${dy}px) scale(1.05)`;
  });
  btn.addEventListener('mouseleave', () => btn.style.transform = '');
});
document.querySelectorAll('.b-card-proj').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) / r.width * 8;
    const y = (e.clientY - r.top - r.height / 2) / r.height * 8;
    card.style.transform = `translateY(-6px) scale(1.016) rotateY(${x}deg) rotateX(${-y}deg)`;
  });
  card.addEventListener('mouseleave', () => card.style.transform = '');
});

/* ── Curseur magnétique · anneau attiré vers le bouton le plus proche ── */
(function(){
  if (window.matchMedia('(pointer: coarse)').matches) return;
  const RADIUS = 130; /* px depuis le centre du bouton */
  const FORCE  = 0.5; /* force d'attraction max */
  const SEL = '.btn-dark,.btn-outline-dark,.btn-dark-sm,.btn-mint,.btn-ghost-sm,.btn-ghost-mint,.nav-cta,.b-btn-link,.b-btn-accent';
  let els = [], rafId = 0;
  function refreshEls() { els = Array.from(document.querySelectorAll(SEL)); }
  function frame() {
    rafId = 0;
    let pullX = 0, pullY = 0, minD = Infinity, anyNear = false;
    els.forEach(el => {
      const r  = el.getBoundingClientRect();
      const cx = r.left + r.width  / 2;
      const cy = r.top  + r.height / 2;
      const dx = cx - mx, dy = cy - my; /* vecteur curseur → centre bouton */
      const d  = Math.hypot(dx, dy);
      if (d < RADIUS && d < minD) {
        minD = d;
        const t = (1 - d / RADIUS) * FORCE;
        pullX = dx * t;
        pullY = dy * t;
        anyNear = true;
      }
    });
    magX = pullX;
    magY = pullY;
    if (!raf) raf = requestAnimationFrame(tick);
    cring.classList.toggle('near', anyNear);
  }
  addEventListener('mousemove', () => {
    if (!rafId) rafId = requestAnimationFrame(frame);
  }, { passive: true });
  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', refreshEls)
    : refreshEls();
  window.addEventListener('resize', refreshEls);
}());

/* ── Nav scroll ── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => nav.classList.toggle('solid', window.scrollY > 30));

/* ── Nav adaptive bg selon section ── */
(function(){
  const navEl = document.getElementById('nav');
  if (!navEl) return;
  const darkIds = ['projets','prestations','stack','parcours'];
  const order   = ['top','profil','projets','prestations','stack','ia','parcours','contact'];
  const visible  = {};
  let current = '';
  function applyNavTheme() {
    const activeId = [...order].reverse().find(id => visible[id]);
    const cls = darkIds.includes(activeId) ? 'nav-on-dark' : '';
    if (cls === current) return;
    navEl.classList.remove('nav-on-dark');
    if (cls) navEl.classList.add(cls);
    current = cls;
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { visible[e.target.id] = e.isIntersecting; });
    applyNavTheme();
  }, { threshold: 0.3 });
  order.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
  visible['top'] = true;
  applyNavTheme();
}());

/* ── Scroll Reveal ── */
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); revObs.unobserve(e.target); }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('[data-reveal]').forEach(el => revObs.observe(el));
});
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(() => document.body.style.opacity = '1');
}

/* ── Skill Tabs ── */
(function(){
  const btns   = document.querySelectorAll('.skill-tab-btn');
  const panels = document.querySelectorAll('.skill-tabs-panel');

  /* Anime les anneaux SVG (jauges %) du panneau : trace l'arc en
     animant stroke-dashoffset depuis sa longueur (caché) vers 0 (plein).
     Cible le cercle de progression (celui qui porte stroke-dasharray),
     pas le cercle de fond. */
  function animateRings(panel) {
    panel.querySelectorAll('.sk-ring circle[stroke-dasharray], .skill-tab-widget-ring circle[stroke-dasharray]').forEach(circle => {
      const len = parseFloat(circle.getAttribute('stroke-dasharray')) || 0;
      circle.style.transition = 'none';
      circle.style.strokeDashoffset = len;
      requestAnimationFrame(() => requestAnimationFrame(() => {
        circle.style.transition = 'stroke-dashoffset 0.9s cubic-bezier(.16,1,.3,1)';
        circle.style.strokeDashoffset = '0';
      }));
    });
  }

  function activateTab(tab) {
    btns.forEach(b => {
      const isActive = b.dataset.tab === tab;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive);
    });
    panels.forEach(p => {
      const isActive = p.dataset.panel === tab;
      p.style.display = isActive ? 'grid' : 'none';
      if (isActive) animateRings(p);
    });
  }

  btns.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));

  function initBars() {
    const fp = document.querySelector('.skill-tabs-panel[data-panel="front"]');
    if (fp) animateRings(fp);
  }
  document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', initBars) : initBars();
})();

/* ── Email reveal ── */
document.addEventListener('DOMContentLoaded', () => {
  const emailBtn     = document.getElementById('emailBtn');
  const emailDisplay = document.getElementById('emailDisplay');
  const ftEmailBtn   = document.getElementById('ftEmailBtn');
  if (emailBtn) emailBtn.addEventListener('click', function(e) {
    if (this.href === '#' || this.getAttribute('href') === '#') {
      e.preventDefault();
      revealEmail(this, emailDisplay);
    }
  });
  if (ftEmailBtn) ftEmailBtn.addEventListener('click', function(e) {
    if (this.href === '#' || this.getAttribute('href') === '#') {
      e.preventDefault();
      this.textContent = '✉ ' + window._em;
      this.href = 'mailto:' + window._em;
      this.onclick = null;
    }
  });
});

/* ── Lightbox ── */
function openImgLightbox(el) {
  const img = el.querySelector('img');
  if (!img) return;
  document.getElementById('vaLightboxImg').src = img.src;
  document.getElementById('vaLightboxImg').alt = img.alt || 'Aperçu';
  const lb = document.getElementById('vaLightbox');
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
  lb.querySelector('.va-lightbox-close').focus();
}
function closeImgLightbox() {
  document.getElementById('vaLightbox').classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Bento Carousel (infinite loop card-by-card + autoplay) ── */
(function(){
  const track    = document.getElementById('bCarouselTrack');
  const prevBtn  = document.getElementById('bCarouselPrev');
  const nextBtn  = document.getElementById('bCarouselNext');
  const dotsWrap = document.getElementById('bCarouselDots');
  const carousel = document.getElementById('bCarousel');
  if (!track) return;

  const AUTOPLAY_DELAY = 3500;
  const TRANSITION_MS  = 500;
  let visibleCount = 4, current = 0, isTransitioning = false, autoTimer = null;

  /* origCards captured once, before any clones exist */
  const origCards = Array.from(track.querySelectorAll('.b-card-proj'));
  const origLen   = origCards.length;

  function getVisible() {
    const w = window.innerWidth;
    if (w <= 480) return 1;
    if (w <= 900) return 2;
    return 4;
  }

  function cloneCards() {
    track.querySelectorAll('.b-carousel-clone').forEach(c => c.remove());
    /* clone last visibleCount cards before first real card */
    origCards.slice(-visibleCount).forEach(c => {
      const cl = c.cloneNode(true); cl.classList.add('b-carousel-clone');
      track.insertBefore(cl, track.firstChild);
    });
    /* clone first visibleCount cards after last real card */
    origCards.slice(0, visibleCount).forEach(c => {
      const cl = c.cloneNode(true); cl.classList.add('b-carousel-clone');
      track.appendChild(cl);
    });
  }

  function allCards() { return Array.from(track.querySelectorAll('.b-card-proj')); }

  function setCardWidths() {
    const gap = 16;
    allCards().forEach(c => {
      const pct = 100 / visibleCount;
      const gs  = (visibleCount - 1) * gap / visibleCount;
      c.style.flex     = `0 0 calc(${pct}% - ${gs}px)`;
      c.style.minWidth = `calc(${pct}% - ${gs}px)`;
    });
  }

  function getOffset(idx) {
    const gap   = 16;
    const wrapW = track.parentElement.offsetWidth;
    const cardW = (wrapW - gap * (visibleCount - 1)) / visibleCount;
    return idx * (cardW + gap);
  }

  function setTr(on) {
    track.style.transition = on ? `transform ${TRANSITION_MS}ms cubic-bezier(.16,1,.3,1)` : 'none';
  }

  function buildDots() {
    dotsWrap.innerHTML = '';
    for (let i = 0; i < origLen; i++) {
      const d = document.createElement('button');
      d.className = 'b-carousel-dot';
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.addEventListener('click', () => { stopAutoplay(); goTo(visibleCount + i, true); startAutoplay(); });
      dotsWrap.appendChild(d);
    }
    updateDots();
  }

  function updateDots() {
    const ri = ((current - visibleCount) % origLen + origLen) % origLen;
    dotsWrap.querySelectorAll('.b-carousel-dot').forEach((d, i) => d.classList.toggle('active', i === ri));
  }

  function goTo(idx, withTr = true) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = idx;
    setTr(withTr);
    track.style.transform = `translateX(-${getOffset(current)}px)`;
    updateDots();
    if (!withTr) { isTransitioning = false; return; }
    setTimeout(() => {
      /* seamless loop: teleport from clone to real counterpart */
      if (current < visibleCount) {
        setTr(false);
        current += origLen;
        track.style.transform = `translateX(-${getOffset(current)}px)`;
      } else if (current >= visibleCount + origLen) {
        setTr(false);
        current -= origLen;
        track.style.transform = `translateX(-${getOffset(current)}px)`;
      }
      updateDots();
      isTransitioning = false;
    }, TRANSITION_MS + 20);
  }

  function next() { goTo(current + 1); }
  function prev() { goTo(current - 1); }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function startAutoplay() {
    if (prefersReducedMotion) return;   /* respecte l'accessibilité vestibulaire */
    stopAutoplay();
    autoTimer = setInterval(() => { if (!isTransitioning) next(); }, AUTOPLAY_DELAY);
  }
  function stopAutoplay() { clearInterval(autoTimer); autoTimer = null; }

  function init() {
    visibleCount = getVisible();
    cloneCards();
    setCardWidths();
    current = visibleCount;   /* start at real card 0 */
    setTr(false);
    track.style.transform = `translateX(-${getOffset(current)}px)`;
    buildDots();
    isTransitioning = false;
    startAutoplay();
  }

  prevBtn.addEventListener('click', () => { stopAutoplay(); prev(); startAutoplay(); });
  nextBtn.addEventListener('click', () => { stopAutoplay(); next(); startAutoplay(); });
  carousel.addEventListener('mouseenter', () => stopAutoplay());
  carousel.addEventListener('mouseleave', () => startAutoplay());

  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; stopAutoplay(); }, { passive: true });
  track.addEventListener('touchend',   e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    startAutoplay();
  }, { passive: true });

  init();
  let resizeTO;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => { stopAutoplay(); init(); }, 150);
  });
})();
