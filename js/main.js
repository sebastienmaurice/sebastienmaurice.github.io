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

/* ── Hero : parallaxe legere entre le texte et la photo au scroll ──
   Meme principe que la parallaxe de cine-delices.js (rAF, compositor-only,
   easing, arret hors viewport) mais ecrite pour ce DOM. Utilise la
   propriete CSS `translate` (independante de `transform`) pour ne jamais
   entrer en conflit avec l'animation d'entree de .hero-photo. */
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // sous 1100px le hero passe en colonne (photo au-dessus du texte) : la
  // parallaxe ne cree plus de relation de profondeur entre les deux, elle
  // ajouterait juste du mouvement gratuit sur mobile/tablette
  if (window.matchMedia('(max-width: 1100px)').matches) return;
  const heroSection = document.getElementById('top');
  const heroText = heroSection && heroSection.querySelector('.hero-l');
  const heroPhoto = heroSection && heroSection.querySelector('.hero-photo');
  if (!heroSection || !heroText || !heroPhoto) return;

  const layers = [
    { el: heroText, speed: 8 },
    { el: heroPhoto, speed: 22 },
  ];
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  let raf = null;
  let inView = true;

  function apply() {
    const rect = heroSection.getBoundingClientRect();
    const progress = Math.min(Math.max(-rect.top / (rect.height || 1), 0), 1);
    const eased = easeOut(progress);
    layers.forEach(l => { l.el.style.translate = `0 ${(eased * l.speed).toFixed(2)}px`; });
    raf = null;
  }
  function requestTick() {
    if (raf === null) raf = requestAnimationFrame(apply);
  }

  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting;
    if (inView) requestTick();
  }, { threshold: 0 }).observe(heroSection);

  window.addEventListener('scroll', () => { if (inView) requestTick(); }, { passive: true });
}());

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
document.querySelectorAll('a[href], button, .b-card, .b-card-proj, .b-btn-accent, .va-case-card, .prest-card-flip').forEach(el => {
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

/* ── Nav burger (mobile) ── */
(function () {
  const burger = document.getElementById('navBurger');
  const links = document.getElementById('navLinks');
  if (!burger || !links || !nav) return;

  function closeMenu() {
    nav.classList.remove('nav-open');
    burger.setAttribute('aria-expanded', 'false');
  }
  function toggleMenu() {
    const open = nav.classList.toggle('nav-open');
    burger.setAttribute('aria-expanded', String(open));
  }

  burger.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMenu));
  document.addEventListener('click', (e) => {
    if (nav.classList.contains('nav-open') && !nav.contains(e.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 1100) closeMenu();
  });
}());

/* ── Nav : lien actif selon section visible ── */
(function(){
  const navEl = document.getElementById('nav');
  const navLinks = document.getElementById('navLinks');
  if (!navEl || !navLinks) return;
  // toutes les sections du site etant desormais claires (paper/mint), la nav n'a plus
  // besoin de basculer de theme par section — seul le lien de la section visible
  // se souligne en corail (recette v4)
  const order = ['top','profil','projets','prestations','stack','ia','parcours','contact'];
  const links = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(a => { links[a.getAttribute('href').slice(1)] = a; });
  const visible = {};
  function applyCurrent() {
    const activeId = [...order].reverse().find(id => visible[id]);
    Object.entries(links).forEach(([id, a]) => a.classList.toggle('current', id === activeId));
  }
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { visible[e.target.id] = e.isIntersecting; });
    applyCurrent();
  }, { threshold: 0.3 });
  order.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
  visible['top'] = true;
  applyCurrent();
}());

/* ── Scroll Reveal (+ count-up discret sur les stats reveleés) ── */
function animateCount(el) {
  const target = parseInt(el.dataset.countTo, 10);
  if (isNaN(target)) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.textContent = target;
    return;
  }
  const duration = 1200;
  const start = performance.now();
  const easeOutCubic = t => 1 - Math.pow(1 - t, 3);
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(easeOutCubic(p) * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
document.addEventListener('DOMContentLoaded', () => {
  document.body.style.opacity = '1';
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        revObs.unobserve(e.target);
        e.target.querySelectorAll('.count-num[data-count-to]').forEach(animateCount);
      }
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

  function activateTab(tab) {
    btns.forEach(b => {
      const isActive = b.dataset.tab === tab;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive);
    });
    panels.forEach(p => {
      p.style.display = p.dataset.panel === tab ? 'grid' : 'none';
    });
  }

  btns.forEach(btn => btn.addEventListener('click', () => activateTab(btn.dataset.tab)));
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
      this.href = 'mailto:' + window._em;
      this.setAttribute('aria-label', window._em);
      this.title = window._em;
      this.onclick = null;
    }
  });
});

/* ── Prestations : reveal au tap sur tactile (pas de hover fiable) ── */
(function () {
  if (!window.matchMedia('(hover: none)').matches) return;
  const cards = document.querySelectorAll('.prest-card-flip');
  cards.forEach(card => {
    card.addEventListener('click', (e) => {
      // le lien CTA (face reveal) doit continuer a naviguer normalement
      if (e.target.closest('a')) return;
      cards.forEach(other => { if (other !== card) other.classList.remove('is-revealed'); });
      card.classList.toggle('is-revealed');
    });
  });
}());

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
  const carousel = document.getElementById('bCarousel');
  if (!track) return;

  const AUTOPLAY_DELAY = 3500;
  const TRANSITION_MS  = 500;
  let visibleCount = 5, current = 0, isTransitioning = false, autoTimer = null;

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

  /* lit le gap flex reellement applique (var(--gap-bento), qui change selon le breakpoint —
     16px en desktop, 10px sous 768px) plutot que de le fixer en dur : un ecart entre cette
     valeur et le gap CSS reel derive au fil des cartes (translateX cumulatif) et finit par
     desaligner la fenetre visible du carrousel */
  function currentGap() {
    return parseFloat(getComputedStyle(track).columnGap) || 16;
  }

  function setCardWidths() {
    const gap = currentGap();
    allCards().forEach(c => {
      const pct = 100 / visibleCount;
      const gs  = (visibleCount - 1) * gap / visibleCount;
      c.style.flex     = `0 0 calc(${pct}% - ${gs}px)`;
      c.style.minWidth = `calc(${pct}% - ${gs}px)`;
    });
  }

  function getOffset(idx) {
    const gap   = currentGap();
    const wrapW = track.parentElement.offsetWidth;
    const cardW = (wrapW - gap * (visibleCount - 1)) / visibleCount;
    return idx * (cardW + gap);
  }

  function setTr(on) {
    track.style.transition = on ? `transform ${TRANSITION_MS}ms cubic-bezier(.16,1,.3,1)` : 'none';
  }

  function goTo(idx, withTr = true) {
    if (isTransitioning) return;
    isTransitioning = true;
    current = idx;
    setTr(withTr);
    track.style.transform = `translateX(-${getOffset(current)}px)`;
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
  function scheduleReinit() {
    clearTimeout(resizeTO);
    resizeTO = setTimeout(() => { stopAutoplay(); init(); }, 150);
  }
  /* ResizeObserver plutot que le seul 'resize' de window : plus fiable pour capter
     un changement de largeur du carrousel quel qu'en soit le declencheur (bascule
     responsive DevTools, rotation d'ecran...) — 'resize' seul pouvait laisser
     visibleCount fige sur la valeur calculee au premier chargement */
  if (window.ResizeObserver) {
    new ResizeObserver(scheduleReinit).observe(carousel);
  } else {
    window.addEventListener('resize', scheduleReinit);
  }
})();

/* ── Carte Maxilou : fenetre "Safari" a profondeur 3D multi-couches ──
   Chaque plan (fond, contenu, image, chrome) lit les memes variables CSS
   (--mx/--my/--lift/--card-scale/--img-scale, posees sur .b-hero-card-slot et
   heritees) avec sa propre amplitude definie cote CSS. Le JS se contente de
   suivre la souris et d'amortir (lerp) la valeur cible vers la valeur courante
   a chaque frame : c'est cet amortissement continu qui donne la sensation
   "physique" (impulsion + retard), a l'entree comme a la sortie — jamais de
   saut instantane, meme au mouseleave. */
(function(){
  const slot = document.querySelector('.b-hero-card-slot');
  const card = document.querySelector('.b-card-project-hero');
  if (!slot || !card) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (window.matchMedia('(hover: none)').matches) return; /* pas de survol fiable au tactile */

  const LERP = 0.09;         /* amortissement : plus petit = plus tardif/organique */
  const EPS_POS = 0.0008;    /* seuil de stabilisation pour --mx/--my */
  const EPS_PX  = 0.02;      /* seuil de stabilisation pour --lift (px) */
  const EPS_SCALE = 0.0002;  /* seuil de stabilisation pour les scales */

  const target  = { mx: 0, my: 0, lift: 0, cardScale: 1, imgScale: 1 };
  const current = { mx: 0, my: 0, lift: 0, cardScale: 1, imgScale: 1 };
  let raf = null;
  let hovering = false;

  function amplitudeScale() {
    /* desktop large : amplitude pleine / tablette-petit-desktop : reduite /
       la mise en page bascule de toute facon en composition statique sous 1100px */
    const w = window.innerWidth;
    if (w <= 1100) return 0;
    if (w <= 1440) return 0.55;
    return 1;
  }

  function lerp(a, b, t) { return a + (b - a) * t; }

  function setVars() {
    slot.style.setProperty('--mx', current.mx.toFixed(4));
    slot.style.setProperty('--my', current.my.toFixed(4));
    slot.style.setProperty('--lift', current.lift.toFixed(2) + 'px');
    slot.style.setProperty('--card-scale', current.cardScale.toFixed(4));
    slot.style.setProperty('--img-scale', current.imgScale.toFixed(4));
  }

  function tick() {
    current.mx = lerp(current.mx, target.mx, LERP);
    current.my = lerp(current.my, target.my, LERP);
    current.lift = lerp(current.lift, target.lift, LERP);
    current.cardScale = lerp(current.cardScale, target.cardScale, LERP);
    current.imgScale = lerp(current.imgScale, target.imgScale, LERP);
    setVars();

    const settled =
      Math.abs(current.mx - target.mx) < EPS_POS &&
      Math.abs(current.my - target.my) < EPS_POS &&
      Math.abs(current.lift - target.lift) < EPS_PX &&
      Math.abs(current.cardScale - target.cardScale) < EPS_SCALE &&
      Math.abs(current.imgScale - target.imgScale) < EPS_SCALE;

    raf = (hovering || !settled) ? requestAnimationFrame(tick) : null;
  }

  function ensureLoop() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  function onMove(e) {
    const amp = amplitudeScale();
    if (amp === 0) { target.mx = 0; target.my = 0; ensureLoop(); return; }
    const rect = card.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;  /* -1..1 */
    const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;  /* -1..1 */
    target.mx = Math.max(-1, Math.min(1, nx)) * amp;
    target.my = Math.max(-1, Math.min(1, ny)) * amp;
    ensureLoop();
  }

  card.addEventListener('mouseenter', () => {
    hovering = true;
    const amp = amplitudeScale();
    target.lift = amp === 0 ? 0 : -6;
    target.cardScale = amp === 0 ? 1 : 1.006;
    target.imgScale = amp === 0 ? 1 : 1.035;
    ensureLoop();
  });
  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', () => {
    hovering = false;
    target.mx = 0;
    target.my = 0;
    target.lift = 0;
    target.cardScale = 1;
    target.imgScale = 1;
    ensureLoop();
  });
})();
