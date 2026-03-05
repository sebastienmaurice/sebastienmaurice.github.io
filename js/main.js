/* =============================================
   PORTFOLIO — Sébastien Maurice
   js/main.js — v2.0 — 2026
============================================= */

/* =============================================
   1. CURSEUR PERSONNALISÉ + SPOTLIGHT
============================================= */
const cur = document.getElementById("cur");
const cring = document.getElementById("cring");
const spl = document.getElementById("spl");
let mx = 0,
  my = 0,
  rx = 0,
  ry = 0,
  mouseX = 0,
  mouseY = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (cur) {
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  }
  if (spl) {
    spl.style.setProperty("--sx", mx + "px");
    spl.style.setProperty("--sy", my + "px");
  }
  mouseX = mx;
  mouseY = my;
});
document.addEventListener("mousedown", () => cur && cur.classList.add("click"));
document.addEventListener(
  "mouseup",
  () => cur && cur.classList.remove("click"),
);
(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (cring) {
    cring.style.left = rx + "px";
    cring.style.top = ry + "px";
  }
  requestAnimationFrame(loop);
})();

document
  .querySelectorAll(
    "a,button,.card,.pill,.sk-card,.gal-it,.toolp,.tech-item,.stat,.dc,.wow-skill-card,.cv-sel-btn,.proj-desc-btn,.img-zoomable,.wow-photo-wrap",
  )
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cur && cur.classList.add("hov");
      cring && cring.classList.add("hov");
    });
    el.addEventListener("mouseleave", () => {
      cur && cur.classList.remove("hov");
      cring && cring.classList.remove("hov");
    });
  });

/* =============================================
   2. CANVAS PARTICULES
============================================= */
const canvas = document.getElementById("pc");
const ctx = canvas ? canvas.getContext("2d") : null;
let W,
  H,
  pts = [];
const MOUSE_RADIUS = 160,
  MOUSE_FORCE = 1.8;

function rsz() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
if (canvas) {
  rsz();
  window.addEventListener("resize", rsz);
}

class Pt {
  constructor() {
    this.res();
  }
  res() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.vx = (Math.random() - 0.5) * 0.28;
    this.vy = (Math.random() - 0.5) * 0.28;
    this.r = Math.random() * 1.5 + 0.3;
    this.baseAlpha = Math.random() * 0.35 + 0.06;
    this.a = this.baseAlpha;
    const c = ["#8A9463", "#B87333", "#C8C4B4", "#5C6340", "#EDE9DC"];
    this.c = c[Math.floor(Math.random() * c.length)];
    this.life = 0;
    this.ml = Math.random() * 500 + 250;
  }
  upd() {
    const dx = this.x - mouseX,
      dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MOUSE_RADIUS) {
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      const angle = Math.atan2(dy, dx);
      this.vx += Math.cos(angle) * force * 0.06;
      this.vy += Math.sin(angle) * force * 0.06;
      this.a = Math.min(1, this.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.6);
    } else {
      this.a += (this.baseAlpha - this.a) * 0.04;
    }
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > 2.5) {
      this.vx *= 2.5 / spd;
      this.vy *= 2.5 / spd;
    }
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.x += this.vx;
    this.y += this.vy;
    this.life++;
    if (
      this.x < -10 ||
      this.x > W + 10 ||
      this.y < -10 ||
      this.y > H + 10 ||
      this.life > this.ml
    )
      this.res();
  }
  drw() {
    const f =
      this.life < 60
        ? this.life / 60
        : this.life > this.ml - 60
          ? (this.ml - this.life) / 60
          : 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = this.c;
    ctx.globalAlpha = this.a * f;
    ctx.fill();
  }
}
if (ctx) {
  for (let i = 0; i < 130; i++) pts.push(new Pt());
}

function conn() {
  const md = 130;
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x,
        dy = pts[i].y - pts[j].y;
      const d = Math.sqrt(dx * dx + dy * dy);
      if (d < md) {
        ctx.beginPath();
        ctx.moveTo(pts[i].x, pts[i].y);
        ctx.lineTo(pts[j].x, pts[j].y);
        ctx.strokeStyle = "#8A9463";
        ctx.globalAlpha = (1 - d / md) * 0.055;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}
function animP() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H);
  conn();
  pts.forEach((p) => {
    p.upd();
    p.drw();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animP);
}
if (ctx) animP();

/* =============================================
   3. ONGLETS (TABS)
============================================= */
function st(id) {
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-pane")
    .forEach((p) => p.classList.remove("active"));
  const btn = document.querySelector('[data-tab="' + id + '"]');
  const panel = document.getElementById("panel-" + id);
  if (btn) btn.classList.add("active");
  if (panel) panel.classList.add("active");
  setTimeout(rvl, 60);
}

/* =============================================
   4. SCROLL HELPERS + NAVBAR
============================================= */
function gs(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}
window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  if (nav) {
    nav.classList.toggle("scrolled", window.scrollY > 60);
    document.documentElement.style.setProperty(
      "--nav-h",
      nav.getBoundingClientRect().height + "px",
    );
  }
});
(function () {
  const nav = document.getElementById("nav");
  if (nav) {
    document.documentElement.style.setProperty(
      "--nav-h",
      nav.getBoundingClientRect().height + "px",
    );
    nav.addEventListener("transitionrun", () => {
      let frames = 0;
      const loop = () => {
        document.documentElement.style.setProperty(
          "--nav-h",
          nav.getBoundingClientRect().height + "px",
        );
        if (++frames < 30) requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    });
  }
})();

/* =============================================
   5. MENU MOBILE (BURGER)
============================================= */
let menuOpen = false;
function tm() {
  menuOpen = !menuOpen;
  const mnav = document.getElementById("mnav");
  if (mnav) mnav.classList.toggle("open", menuOpen);
  const spans = document.querySelectorAll(".burger span");
  if (menuOpen) {
    if (spans[0]) spans[0].style.transform = "rotate(45deg) translate(5px,5px)";
    if (spans[1]) spans[1].style.opacity = "0";
    if (spans[2])
      spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans.forEach((s) => {
      s.style.transform = "";
      s.style.opacity = "";
    });
  }
}
function cm() {
  if (menuOpen) tm();
}

/* =============================================
   6. REVEAL ON SCROLL
============================================= */
function rvl() {
  document
    .querySelectorAll(".rv:not(.vis),.rv-stagger:not(.vis)")
    .forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) el.classList.add("vis");
    });
}
window.addEventListener("scroll", rvl, { passive: true });
setTimeout(rvl, 150);

/* =============================================
   7. CARD TILT 3D
============================================= */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".card").forEach((card) => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2,
      cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2),
      dy = (e.clientY - cy) / (r.height / 2);
    if (Math.abs(dx) < 1.8 && Math.abs(dy) < 1.8) {
      card.style.transform = `perspective(1000px) rotateY(${dx * 5}deg) rotateX(${-dy * 5}deg) translateY(-6px)`;
      card.style.boxShadow = `${-dx * 8}px ${dy * 8 + 24}px 64px rgba(27,25,20,.6)`;
    } else {
      card.style.transform = "";
      card.style.boxShadow = "";
    }
  });
});

/* =============================================
   8. HERO NAME SPLIT ANIMATION
============================================= */
function splitChars() {
  const el1 = document.querySelector(".hero-name .line1");
  if (el1) {
    el1.innerHTML = el1.textContent
      .split("")
      .map(
        (c, i) =>
          `<span class="char" style="animation-delay:${i * 0.04 + 0.3}s">${c === " " ? "&nbsp;" : c}</span>`,
      )
      .join("");
  }
  const el2 = document.querySelector(".hero-name .line2");
  if (el2) {
    el2.innerHTML = el2.textContent
      .split("")
      .map(
        (c, i) =>
          `<span class="char" style="animation-delay:${i * 0.04 + 0.6}s">${c === " " ? "&nbsp;" : c}</span>`,
      )
      .join("");
  }
}
splitChars();

/* =============================================
   9. MODALES PROJET
============================================= */
function openModal(id) {
  const modal = document.getElementById("modal-" + id);
  if (!modal) return;
  document.body.style.overflow = "hidden";
  modal.classList.add("open");
  const ss = modal.querySelector(".modal-slideshow");
  if (ss) startSlideshow(ss);
}
function closeModal(e, id) {
  if (e && e.target !== e.currentTarget) return;
  const targets = id
    ? [document.getElementById("modal-" + id)]
    : document.querySelectorAll(".proj-modal-bg.open");
  targets.forEach((m) => {
    if (m) m.classList.remove("open");
  });
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(null);
    closeZoom();
    closeAllDescPopups();
    closePhotoZoom();
  }
});

/* =============================================
   10. BLUR QUOTE EFFECT
============================================= */
(() => {
  const quoteEl = document.getElementById("blurQuote");
  if (!quoteEl) return;
  const words = quoteEl.querySelectorAll(".bw");
  const cite = quoteEl.querySelector("cite");
  if (!words.length) return;
  let isAnimating = false,
    restartTimeout = null;

  function animate() {
    if (isAnimating) return;
    isAnimating = true;
    let maxDelay = 0,
      maxDuration = 0;
    words.forEach((word) => {
      const duration = parseFloat(word.dataset.duration) || 1.2;
      const delay = parseFloat(word.dataset.delay) || 0.2;
      const blur = parseFloat(word.dataset.blur) || 4;
      maxDelay = Math.max(delay, maxDelay);
      maxDuration = Math.max(duration, maxDuration);
      word.style.filter = `blur(${blur}px)`;
      word.style.opacity = "0";
      word.style.transition = `filter ${duration}s ease-in ${delay}s, opacity ${duration}s ease-in ${delay}s`;
      setTimeout(() => {
        word.classList.add("animate");
        word.style.filter = "blur(0px)";
        word.style.opacity = "1";
      }, 30);
    });
    if (cite) {
      cite.style.transition = `opacity ${maxDuration}s ease-in ${maxDelay}s`;
      setTimeout(() => cite.classList.add("animate"), 30);
    }
    const totalTime = (maxDelay + maxDuration) * 1000;
    restartTimeout = setTimeout(() => {
      words.forEach((word) => {
        word.style.transition = `filter .8s ease-out, opacity .8s ease-out`;
        word.classList.remove("animate");
        word.style.filter = `blur(${word.dataset.blur || 4}px)`;
        word.style.opacity = "0";
      });
      if (cite) {
        cite.style.transition = "opacity .8s ease-out";
        cite.classList.remove("animate");
      }
      setTimeout(() => {
        isAnimating = false;
        animate();
      }, 3500);
    }, totalTime + 500);
  }

  quoteEl.addEventListener("click", () => {
    clearTimeout(restartTimeout);
    words.forEach((w) => {
      w.classList.remove("animate");
      w.style.filter = `blur(${w.dataset.blur || 4}px)`;
      w.style.opacity = "0";
    });
    if (cite) cite.classList.remove("animate");
    isAnimating = false;
    setTimeout(animate, 200);
  });

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(animate, 400);
          obs.disconnect();
        }
      });
    },
    { threshold: 0.5 },
  );
  const sec = document.getElementById("quote-sec");
  if (sec) obs.observe(sec);
  else animate();
})();

/* =============================================
   11. TERMINAL TYPEWRITER
============================================= */
(function () {
  const el = document.getElementById("termBody");
  if (!el) return;
  const cursor = document.createElement("span");
  cursor.className = "term-cursor";
  const lines = [
    { cls: "comment", txt: "// Sébastien Maurice — 2026" },
    { cls: "keyword", txt: "const dev = {" },
    { cls: "indent string", txt: "  role: 'Front-End / UX'," },
    { cls: "indent string", txt: "  stack: ['HTML','CSS','JS','Svelte']," },
    { cls: "indent func", txt: "  mission: () => buildUsefulUI()," },
    { cls: "keyword", txt: "};" },
    { cls: "", txt: "" },
    { cls: "func", txt: "function buildUsefulUI(idea) {" },
    { cls: "indent keyword", txt: "  if (!idea.userFirst)" },
    {
      cls: "indent indent string dramatic",
      txt: "    throw new Error('Fix UX.');",
    },
    { cls: "indent keyword", txt: "  return idea.optimize();" },
    { cls: "keyword", txt: "}" },
  ];
  let lineIndex = 0,
    charIndex = 0,
    lineEl,
    timer;
  function type() {
    if (lineIndex >= lines.length) return setTimeout(start, 4500);
    const { cls, txt } = lines[lineIndex];
    if (charIndex === 0) {
      lineEl = document.createElement("div");
      lineEl.className = "term-line" + (cls ? " " + cls : "");
      el.appendChild(lineEl);
    }
    if (charIndex <= txt.length) {
      lineEl.textContent = txt.slice(0, charIndex);
      lineEl.appendChild(cursor);
      charIndex++;
      timer = setTimeout(type, 55 + Math.random() * 35);
    } else {
      const delay = txt.includes("Error") ? 1200 : 180;
      lineIndex++;
      charIndex = 0;
      timer = setTimeout(type, delay);
    }
  }
  function start() {
    clearTimeout(timer);
    el.innerHTML = "";
    el.appendChild(cursor);
    lineIndex = 0;
    charIndex = 0;
    setTimeout(type, 800);
  }
  start();
})();

/* =============================================
   12. COMPTEUR ANIMÉ
============================================= */
function countUp() {
  document.querySelectorAll(".stat-v").forEach((el) => {
    if (el.dataset.counted) return;
    const match = el.textContent.match(/\d+/);
    if (!match) return;
    const target = parseInt(match[0]),
      suffix = el.textContent.replace(/\d+/, "");
    el.dataset.counted = "1";
    let current = 0;
    const dur = 1200,
      steps = 60,
      inc = target / steps;
    const tid = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(tid);
    }, dur / steps);
  });
}
window.addEventListener(
  "scroll",
  () => {
    document.querySelectorAll(".stat").forEach((el) => {
      if (el.getBoundingClientRect().top < window.innerHeight - 40) countUp();
    });
  },
  { passive: true },
);

/* =============================================
   13. SLIDESHOW IMAGES PROJETS
============================================= */
const slideshowTimers = new Map();

function initSlideshows() {
  document.querySelectorAll(".dc-slideshow").forEach((container) => {
    const slides = container.querySelectorAll(".slide");
    if (slides.length < 2) return;
    slides[0].classList.add("active");
    if (!container.querySelector(".slide-dots")) {
      const dotsWrap = document.createElement("div");
      dotsWrap.className = "slide-dots";
      slides.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.className = "slide-dot" + (idx === 0 ? " active" : "");
        dot.addEventListener("click", (e) => {
          e.stopPropagation();
          goToSlide(container, idx);
        });
        dotsWrap.appendChild(dot);
      });
      container.appendChild(dotsWrap);
    }
    startSlideshow(container);
  });
}
function startSlideshow(container) {
  stopSlideshow(container);
  let current = 0;
  const slides = container.querySelectorAll(".slide");
  if (slides.length < 2) return;
  const tid = setInterval(() => {
    current = (current + 1) % slides.length;
    goToSlide(container, current);
  }, 3000);
  slideshowTimers.set(container, tid);
}
function stopSlideshow(container) {
  const tid = slideshowTimers.get(container);
  if (tid) {
    clearInterval(tid);
    slideshowTimers.delete(container);
  }
}
function goToSlide(container, idx) {
  const slides = container.querySelectorAll(".slide");
  const dots = container.querySelectorAll(".slide-dot");
  slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}
initSlideshows();
document.querySelectorAll(".dc-slideshow").forEach((container) => {
  container.addEventListener("mouseenter", () => stopSlideshow(container));
  container.addEventListener("mouseleave", () => startSlideshow(container));
});

/* =============================================
   14. ZOOM IMAGE (LIGHTBOX)
============================================= */
let zoomImages = [],
  zoomIndex = 0;
const zoomOverlay = document.createElement("div");
zoomOverlay.id = "imgZoomOverlay";
zoomOverlay.className = "img-zoom-overlay";
zoomOverlay.innerHTML = `
  <div class="img-zoom-inner" id="imgZoomInner">
    <button class="img-zoom-close" id="imgZoomClose">✕</button>
    <button class="img-zoom-nav img-zoom-prev" id="imgZoomPrev">‹</button>
    <img src="" alt="Zoom" id="imgZoomImg"/>
    <button class="img-zoom-nav img-zoom-next" id="imgZoomNext">›</button>
    <div class="img-zoom-counter" id="imgZoomCounter"></div>
    <div class="img-zoom-caption" id="imgZoomCaption"></div>
  </div>`;
document.body.appendChild(zoomOverlay);
const zoomImg = document.getElementById("imgZoomImg");
const zoomCounter = document.getElementById("imgZoomCounter");

function openZoom(images, startIndex) {
  zoomImages = images;
  zoomIndex = startIndex || 0;
  updateZoomImg();
  zoomOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeZoom() {
  zoomOverlay.classList.remove("open");
  document.body.style.overflow = "";
}
function updateZoomImg() {
  zoomImg.src = zoomImages[zoomIndex];
  zoomCounter.textContent =
    zoomImages.length > 1 ? `${zoomIndex + 1} / ${zoomImages.length}` : "";
  document.getElementById("imgZoomPrev").style.visibility =
    zoomImages.length > 1 ? "visible" : "hidden";
  document.getElementById("imgZoomNext").style.visibility =
    zoomImages.length > 1 ? "visible" : "hidden";
}
function zoomPrev() {
  zoomIndex = (zoomIndex - 1 + zoomImages.length) % zoomImages.length;
  updateZoomImg();
}
function zoomNext() {
  zoomIndex = (zoomIndex + 1) % zoomImages.length;
  updateZoomImg();
}
document.getElementById("imgZoomClose").addEventListener("click", closeZoom);
document.getElementById("imgZoomPrev").addEventListener("click", (e) => {
  e.stopPropagation();
  zoomPrev();
});
document.getElementById("imgZoomNext").addEventListener("click", (e) => {
  e.stopPropagation();
  zoomNext();
});
zoomOverlay.addEventListener("click", (e) => {
  if (e.target === zoomOverlay) closeZoom();
});
document.addEventListener("keydown", (e) => {
  if (!zoomOverlay.classList.contains("open")) return;
  if (e.key === "ArrowLeft") zoomPrev();
  if (e.key === "ArrowRight") zoomNext();
});
let touchStartX = 0;
zoomOverlay.addEventListener(
  "touchstart",
  (e) => {
    touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);
zoomOverlay.addEventListener(
  "touchend",
  (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? zoomNext() : zoomPrev();
    }
  },
  { passive: true },
);

function attachZoom() {
  document
    .querySelectorAll(".dc-slideshow,.modal-slideshow")
    .forEach((container) => {
      const imgs = Array.from(container.querySelectorAll(".slide img"));
      imgs.forEach((img, idx) => {
        img.style.cursor = "zoom-in";
        img.addEventListener("click", (e) => {
          e.stopPropagation();
          openZoom(
            imgs.map((i) => i.src),
            idx,
          );
        });
      });
    });
  document
    .querySelectorAll(".cimg img,.dc-img img,.gal-it img")
    .forEach((img) => {
      if (img.closest(".dc-slideshow") || img.closest(".modal-slideshow"))
        return;
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        e.stopPropagation();
        openZoom([img.src], 0);
      });
    });
}
attachZoom();

/* =============================================
   15. LIGHTBOX PHOTO PROFIL (nouveau)
============================================= */
function openPhotoZoom() {
  const overlay = document.getElementById("photoZoomOverlay");
  if (overlay) {
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}
function closePhotoZoom() {
  const overlay = document.getElementById("photoZoomOverlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  }
}

/* =============================================
   16. POPUPS DESCRIPTION PROJET
============================================= */
const projectDescriptions = {
  "cine-delices": {
    title: "Ciné <em>Délices</em>",
    tag: "Plateforme immersive · Films & Gastronomie",
    desc: "Ciné Délices est une plateforme web immersive qui associe cinéma et gastronomie. Chaque film emblématique est accompagné de suggestions culinaires inspirées de son univers. Le projet propose une expérience originale où l'on peut regarder un film tout en dégustant un plat en lien avec celui-ci.",
    features: [
      "Fiches films détaillées via l'API TMDB",
      "Badges et catégories thématiques animés",
      "Carrousels interactifs et navigation intuitive",
      "Association film / expérience culinaire",
      "Interface immersive avec micro-animations UI",
      "Design moodboard sombre or/rouge, typographies soignées",
    ],
    chips: [
      { label: "Svelte", cls: "fe" },
      { label: "HTML5", cls: "fe" },
      { label: "CSS3", cls: "fe" },
      { label: "JavaScript ES6+", cls: "fe" },
      { label: "Node.js", cls: "be" },
      { label: "Express", cls: "be" },
      { label: "MongoDB", cls: "tool" },
      { label: "API TMDB", cls: "tool" },
      { label: "Figma", cls: "tool" },
    ],
  },
  "dev-ndumber": {
    title: "Dev <em>N'Dumber</em>",
    tag: "Agence Web fictive · Full-Stack collaboratif",
    desc: "Dev N'Dumber est un projet d'agence web fictive créé par une équipe de quatre développeurs afin de simuler un environnement professionnel réel. Inspirée de l'univers du film \"Dumb and Dumber\", l'agence adopte une identité fun et décalée incarnée par ses mascottes Git Dumber et Dev Lloyd.",
    features: [
      "Site vitrine d'agence digitale moderne et responsive",
      "Présentation des services : dev full-stack, audit SEO, CMS",
      "Identité visuelle originale avec mascottes",
      "Architecture MVC collaborative (équipe de 4)",
      "Accessibilité web et animations CSS",
      "Méthodologie Agile et gestion GitHub",
    ],
    chips: [
      { label: "HTML5", cls: "fe" },
      { label: "CSS3", cls: "fe" },
      { label: "JavaScript ES6+", cls: "fe" },
      { label: "Node.js", cls: "be" },
      { label: "Express", cls: "be" },
      { label: "PostgreSQL", cls: "tool" },
      { label: "WordPress", cls: "tool" },
      { label: "Git / GitHub", cls: "tool" },
    ],
  },
  "presents-angel": {
    title: "Les Présents <em>d'Ange'L</em>",
    tag: "E-commerce · Bijoux pierres naturelles",
    desc: "Les Présents d'Ange'L est une boutique en ligne dédiée aux bijoux et accessoires réalisés à partir de pierres naturelles. Le projet porte sur l'intégration front-end et l'amélioration de l'interface utilisateur pour proposer une expérience fluide, responsive et adaptée à un site e-commerce.",
    features: [
      "Présentation de collections de bijoux en pierres naturelles",
      "Mise en valeur visuelle des produits",
      "Navigation claire et intuitive",
      "Interface responsive adaptée mobile et desktop",
      "Ajustements UI/UX ciblés",
      "Cohérence visuelle de marque",
    ],
    chips: [
      { label: "HTML5", cls: "fe" },
      { label: "CSS3", cls: "fe" },
      { label: "JavaScript", cls: "fe" },
      { label: "Responsive Design", cls: "tool" },
    ],
  },
  palimpseste: {
    title: "Palimpseste <em>Urbain</em>",
    tag: "Architecture · Culture · WordPress",
    desc: "Refonte complète d'un site WordPress pour une structure spécialisée en architecture et urbanisme. Le projet a consisté à moderniser le site, améliorer l'expérience utilisateur et optimiser les performances. Plusieurs directions de webdesign ont été proposées avant validation client.",
    features: [
      "Proposition de plusieurs directions de webdesign",
      "Migration vers un nouvel hébergement OVH",
      "Intégration complète avec Elementor",
      "Optimisation SEO on-page",
      "Amélioration vitesse de chargement",
      "Site responsive, moderne et administrable",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "Elementor", cls: "fe" },
      { label: "SEO", cls: "tool" },
      { label: "Performance", cls: "tool" },
      { label: "OVH Migration", cls: "tool" },
    ],
  },
  "petit-chateau": {
    title: "Petit Château <em>Vercourt</em>",
    tag: "Tourisme · Hébergement · Booking",
    desc: "Création d'un site vitrine pour une activité liée au tourisme et à l'hébergement. Le projet a été développé sous WordPress avec Elementor afin de proposer une interface élégante, facile à administrer et optimisée pour le référencement local.",
    features: [
      "Développement selon le webdesign client",
      "Intégration des contenus éditoriaux",
      "Optimisation SEO local",
      "Amélioration de la vitesse du site",
      "Interface sobre et facilement administrable",
      "Système de réservation en ligne intégré",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "Elementor", cls: "fe" },
      { label: "WooCommerce", cls: "fe" },
      { label: "SEO Local", cls: "tool" },
      { label: "Performance", cls: "tool" },
    ],
  },
  gsti62: {
    title: "<em>GSTI62</em>",
    tag: "Industrie · B2B · Migration Wix → WordPress",
    desc: "Refonte complète du site d'une entreprise spécialisée dans l'usinage de haute précision. Le projet a consisté à migrer un site Wix vers WordPress et à fusionner deux entités dans un seul site avec mise en place d'un système de devis en ligne.",
    features: [
      "Migration complète Wix vers WordPress",
      "Fusion de deux entités en un seul site",
      "Création du webdesign sur mesure",
      "Mise en place d'un système de devis WooCommerce",
      "Formation du client au back-office",
      "Optimisation SEO et Core Web Vitals",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "Elementor", cls: "fe" },
      { label: "WooCommerce", cls: "fe" },
      { label: "SEO", cls: "tool" },
      { label: "Migration Wix", cls: "tool" },
    ],
  },
  alternativ: {
    title: "Alternativ' <em>Uniforme</em>",
    tag: "E-commerce · Vêtements professionnels",
    desc: "Gestion et développement des sites web d'une entreprise spécialisée dans la vente d'équipements professionnels. Création et maintenance de sites WordPress et e-commerce avec personnalisation produit sur mesure et SEO complet.",
    features: [
      "Création de sites vitrines WordPress",
      "Gestion e-commerce WooCommerce",
      "Personnalisation produit sur mesure",
      "Optimisation SEO complète",
      "Maintenance et support continu",
      "3 images slideshow pour illustrer les réalisations",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "WooCommerce", cls: "fe" },
      { label: "PrestaShop", cls: "fe" },
      { label: "SEO", cls: "tool" },
    ],
  },
  eloustick: {
    title: "<em>Eloustick</em>",
    tag: "Agence · Digital · PrestaShop",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sites web, identités visuelles et stratégie digitale pour PME locales. E-réputation 5/5 pendant 10 ans, spécialiste WordPress et PrestaShop.",
    features: [
      "Sites vitrine WordPress sur mesure",
      "Boutique PrestaShop personnalisée",
      "Identité visuelle et branding",
      "Stratégie de communication digitale",
      "SEO on-page et optimisation performances",
      "E-réputation et avis clients",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "PrestaShop", cls: "fe" },
      { label: "Branding", cls: "tool" },
      { label: "SEO", cls: "tool" },
    ],
  },
  geonomia: {
    title: "<em>Geonomia</em>",
    tag: "Environnement · Bureau d'études",
    desc: "Conception du site web pour un bureau d'études spécialisé en ingénierie environnementale. Étude de lumière du jour, acoustique, Bilan Carbone®, assistance à maîtrise d'ouvrage et plan de gestion des déchets. Design épuré, professionnel et orienté conversion B2B.",
    features: [
      "Design sur mesure pour bureau d'études",
      "Etude de lumière du jour",
      "Etude acoustique",
      "Bilan Carbone®",
      "Assistance à maîtrise d'ouvrage",
      "Plan de gestion des déchets",
      "SEO local et performances optimisées",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "Elementor", cls: "fe" },
      { label: "Performance", cls: "tool" },
      { label: "SEO", cls: "tool" },
    ],
  },
  semauri: {
    title: "<em>Semauri</em>",
    tag: "Agence · Communication visuelle &amp; Web",
    desc: "Agence de communication visuelle et graphique, prestation de conception web. Création de site WordPress sur mesure, identité visuelle complète, design print & digital. Accompagnement complet de A à Z — de la stratégie à la mise en ligne.",
    features: [
      "Site WordPress sur mesure",
      "Identité visuelle et charte graphique",
      "Design print & digital",
      "Stratégie de communication",
      "Accompagnement complet client",
      "SEO et performances",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "Branding", cls: "tool" },
      { label: "UX Design", cls: "tool" },
      { label: "SEO", cls: "tool" },
    ],
  },
  "semauri-com": {
    title: "<em>Semauri.com</em>",
    tag: "Agence Web · Prestations graphiques et web",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Site vitrine complet d'une agence de prestations graphiques et web. WordPress sur mesure, design éditorial et identitaire, référencement naturel, optimisation des performances et maintenance.",
    features: [
      "Site vitrine agence web",
      "Design éditorial sur mesure",
      "Référencement naturel complet",
      "Optimisation Core Web Vitals",
      "Maintenance et mises à jour",
      "Formation client back-office",
    ],
    chips: [
      { label: "WordPress", cls: "fe" },
      { label: "Webdesign", cls: "tool" },
      { label: "SEO", cls: "tool" },
      { label: "Performance", cls: "tool" },
    ],
  },
};

const descPopup = document.createElement("div");
descPopup.id = "projDescPopup";
descPopup.className = "proj-desc-popup";
document.body.appendChild(descPopup);
let activeDescBtn = null;

function buildPopupHTML(data) {
  const chips = data.chips
    .map((c) => `<span class="proj-desc-popup-chip ${c.cls}">${c.label}</span>`)
    .join("");
  const feats = data.features.map((f) => `<li>${f}</li>`).join("");
  return `<div class="proj-desc-popup-header"><div class="proj-desc-popup-title">${data.title}</div><button class="proj-desc-popup-close" onclick="closeAllDescPopups()">✕</button></div><div class="proj-desc-popup-tag">${data.tag}</div><div class="proj-desc-popup-body">${data.desc}</div><ul class="proj-desc-popup-features">${feats}</ul><div class="proj-desc-popup-chips">${chips}</div>`;
}
function openDescPopup(btn, projectId) {
  const data = projectDescriptions[projectId];
  if (!data) return;
  if (activeDescBtn === btn && descPopup.classList.contains("open")) {
    closeAllDescPopups();
    return;
  }
  activeDescBtn = btn;
  descPopup.innerHTML = buildPopupHTML(data);
  descPopup.classList.add("open");
  positionPopup(btn);
}
function positionPopup(btn) {
  const rect = btn.getBoundingClientRect();
  const pW = 440,
    pH = 380,
    vw = window.innerWidth,
    vh = window.innerHeight;
  let top = rect.bottom + 10,
    left = rect.left;
  if (left + pW > vw - 20) left = vw - pW - 20;
  if (left < 20) left = 20;
  if (top + pH > vh - 20) top = rect.top - pH - 10;
  if (top < 20) top = 20;
  descPopup.style.top = top + "px";
  descPopup.style.left = left + "px";
}
function closeAllDescPopups() {
  descPopup.classList.remove("open");
  activeDescBtn = null;
}
document.addEventListener("click", (e) => {
  if (!descPopup.contains(e.target) && !e.target.closest(".proj-desc-btn"))
    closeAllDescPopups();
});
window.addEventListener(
  "scroll",
  () => {
    if (activeDescBtn && descPopup.classList.contains("open"))
      positionPopup(activeDescBtn);
  },
  { passive: true },
);

/* =============================================
   17. SÉLECTEUR DE CV
============================================= */
(function () {
  const cvFiles = {
    frontend: "assets/cv/cv-frontend-developer.pdf",
    designer: "assets/cv/cv-product-designer.pdf",
  };
  function activateCvBtn(type) {
    document
      .querySelectorAll(".cv-sel-btn")
      .forEach((b) => b.classList.remove("active"));
    const btn = document.querySelector('[data-cv="' + type + '"]');
    if (btn) btn.classList.add("active");
  }
  document.querySelectorAll(".cv-sel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.cv) activateCvBtn(btn.dataset.cv);
    });
  });
  activateCvBtn("frontend");
})();

/* =============================================
   18. EASTER EGG CONSOLE
============================================= */
(function () {
  const s = {
    big: "font-size:18px;font-weight:bold;color:#8A9463;font-family:monospace;",
    name: "font-size:24px;font-weight:bold;color:#B87333;font-family:monospace;",
    sub: "font-size:12px;color:#C8C4B4;font-family:monospace;",
    link: "font-size:12px;color:#8A9463;font-family:monospace;text-decoration:underline;",
  };
  console.log("%c👋 Salut, développeur curieux !", s.big);
  console.log("%c  Sébastien Maurice", s.name);
  console.log("%c  Front-End Developer · Product Designer UX", s.sub);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  Tu inspectes le code ? Bonne curiosité !", s.sub);
  console.log("%c  Ce portfolio est construit avec amour 🌿", s.sub);
  console.log(
    "%c  HTML · CSS · JavaScript vanilla — zéro framework front",
    s.sub,
  );
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  📬 overseb75@gmail.com", s.link);
  console.log("%c  🐙 github.com/sebastienmaurice", s.link);
  console.log("%c  💼 linkedin.com/in/sebastien-maurice/", s.link);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log(
    "%c  Si tu cherches un dev curieux et passionné, on discute ? 😄",
    s.sub,
  );
})();
