// ── Cinematic Slider
(function(){
  const INTERVAL = 5000;
  const slides   = document.querySelectorAll('.slide');
  const track    = document.getElementById('sliderTrack');
  const dotsWrap = document.getElementById('sliderDots');
  const numEl    = document.getElementById('slideNum');
  const bar      = document.getElementById('sliderBar');
  let current = 0;
  let timer, barTimer, startTs;

  slides.forEach((slide, i) => {
    const d = document.createElement('button');
    d.className = 'slider-dot' + (i === 0 ? ' is-active' : '');
    d.setAttribute('aria-label', `Slide ${i+1}`);
    d.addEventListener('click', () => goTo(i, true));
    dotsWrap.appendChild(d);
    // le texte/CTA des slides hors-champ ne doit pas rester focusable au clavier
    slide.inert = i !== 0;
  });

  function getDots(){ return dotsWrap.querySelectorAll('.slider-dot'); }

  function goTo(idx, fast = false){
    slides[current].classList.remove('is-active');
    slides[current].inert = true;
    getDots()[current].classList.remove('is-active');
    current = (idx + slides.length) % slides.length;
    slides[current].classList.add('is-active');
    slides[current].inert = false;
    getDots()[current].classList.add('is-active');
    // fondu plus court en navigation manuelle, plus posé en défilement auto
    track.style.setProperty('--slide-fade', fast ? '0.85s' : '1.3s');
    numEl.textContent = String(current + 1).padStart(2,'0');
    resetBar();
    resetTimer();
  }

  function resetBar(){
    bar.style.transition = 'none';
    bar.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        bar.style.transition = `width ${INTERVAL}ms linear`;
        bar.style.width = '100%';
      });
    });
  }

  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  document.getElementById('sliderViewport').addEventListener('keydown', e => {
    if(e.key === 'ArrowLeft') goTo(current - 1, true);
    if(e.key === 'ArrowRight') goTo(current + 1, true);
  });

  let touchStartX = 0;
  const vp = document.getElementById('sliderViewport');
  vp.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, {passive:true});
  vp.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(dx) > 40) goTo(current + (dx < 0 ? 1 : -1), true);
  }, {passive:true});

  vp.addEventListener('mouseenter', () => { clearInterval(timer); bar.style.animationPlayState='paused'; });
  vp.addEventListener('mouseleave', () => { resetTimer(); resetBar(); });

  resetBar();
  resetTimer();
})();

// ── Scroll indicator du slider
const sliderScroll = document.getElementById('sliderScroll');
if (sliderScroll) {
  sliderScroll.addEventListener('click', () => {
    const next = document.querySelector('.section-defi');
    if (next) next.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

// ── Nav solid on scroll
const nav = document.getElementById('nav');
addEventListener('scroll', () => nav.classList.toggle('solid', scrollY > 30), { passive: true });

// ── Tabs
(function(){
  const btns   = document.querySelectorAll('.tab');
  const panels = document.querySelectorAll('.tab-panel');

  function activateTab(tab){
    btns.forEach(b => {
      const isActive = b.dataset.tab === tab;
      b.classList.toggle('active', isActive);
      b.setAttribute('aria-selected', isActive);
    });
    panels.forEach(p => {
      const isActive = p.id === tab;
      p.style.display = isActive ? 'grid' : 'none';
      p.classList.toggle('active', isActive);
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => activateTab(btn.dataset.tab));
  });
})();

// ── Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
document.querySelectorAll('.slide').forEach(slide => {
  slide.style.cursor = 'zoom-in';
  slide.addEventListener('click', (e) => {
    if (e.target.closest('a, button')) return;
    lbImg.src = slide.querySelector('img').src;
    lb.classList.add('open');
  });
});
lb.addEventListener('click', () => lb.classList.remove('open'));
addEventListener('keydown', e => { if (e.key === 'Escape') lb.classList.remove('open'); });

// ── Code copy
document.querySelectorAll('.code-copy').forEach(btn => {
  btn.addEventListener('click', async () => {
    const id = btn.dataset.copy;
    const pre = document.querySelector(`#${id} pre`);
    if (!pre) return;
    try {
      await navigator.clipboard.writeText(pre.innerText);
      const orig = btn.textContent;
      btn.textContent = 'Copied ✓';
      setTimeout(() => { btn.textContent = orig; }, 1400);
    } catch {}
  });
});
