/* =============================================
   PORTFOLIO — Sébastien Maurice
   js/main.js — v2.0 — 2026
============================================= */

/* =============================================
   0. EMAIL — Obfuscation anti-scraping
============================================= */
(function () {
  // Construit l'adresse à l'exécution sans jamais l'écrire en clair dans le DOM
  const u = "overseb75",
    d = "gmail",
    t = "com";
  window._eml = u + "@" + d + "." + t;
})();

function revealEmail(el) {
  el.href = "mailto:" + window._eml;
  el.textContent = window._eml;
  el.onclick = null; // plus besoin d'intercepter
}
function revealEmailBtn(el) {
  el.href = "mailto:" + window._eml;
  el.onclick = null;
  // Petite animation de confirmation
  const arr = el.querySelector(".arr");
  if (arr) arr.textContent = "✓";
  setTimeout(() => {
    if (arr) arr.textContent = "✉";
  }, 2000);
}

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
    tag: "Agence Web · Full-Stack collaboratif",
    desc: "Dev N'Dumber est une agence web communautaire créée par une équipe de 4 développeurs full stack. Inspirée de l'univers du film \"Dumb and Dumber\", l'agence adopte une identité fun et décalée incarnée par ses mascottes Git Dumber et Dev Lloyd.",
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
/* =============================================
   18. EASTER EGG CONSOLE — JUNIOR PIRATE VERSION
============================================= */
(function () {
  const s = {
    big: "font-size:18px;font-weight:bold;color:#8A9463;font-family:monospace;",
    name: "font-size:24px;font-weight:bold;color:#B87333;font-family:monospace;",
    sub: "font-size:12px;color:#C8C4B4;font-family:monospace;",
    link: "font-size:12px;color:#8A9463;font-family:monospace;text-decoration:underline;",
  };
  console.log("%c👋 Salut toi ! Petit dev en herbe ici !", s.big);
  console.log("%c  Sébastien Maurice", s.name);
  console.log("%c  Junior Full-Stack Developer · UX Explorer", s.sub);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  Tu explores le code ? Super curiosité !", s.sub);
  console.log("%c  J'apprends encore tous les jours 🌱", s.sub);
  console.log("%c  HTML · CSS · JS vanilla (oui, sans framework) 🚀", s.sub);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log(
    "%c  Un grand merci à mes collègues pirates de O’clock 🏴‍☠️ :",
    s.sub,
  );
  console.log(
    "%c  Anne-so, Ludo, Richard, Juju, Valou, Céd et tous les autres !",
    s.sub,
  );
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  📬 overseb75@gmail.com", s.link);
  console.log("%c  🐙 github.com/sebastienmaurice", s.link);
  console.log("%c  💼 linkedin.com/in/sebastien-maurice/", s.link);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log(
    "%c  Si tu veux échanger avec un dev motivé, on discute 😄",
    s.sub,
  );
})();

/* =============================================
   EASTER EGG — GIT DUMBER
   Déclenché au clic sur la card Dev N'Dumber
============================================= */
(function () {
  const MESSAGES = [
    {
      lines: [
        '<span class="gdb-cmd">$ git commit -m "first try"</span>',
        '<span class="gdb-err">⚠ Trop de fichiers modifiés… Ooops 😅</span>',
        '<span class="gdb-ok">✓ Commit envoyé… mes amis pirates de O’clock approuveraient 🏴‍☠️</span>',
      ],
      commit: 'a4f2c91 — "first try"',
    },
    {
      lines: [
        '<span class="gdb-cmd">$ git push origin main</span>',
        '<span class="gdb-err">Erreur : Permission refusée 😬</span>',
        "...",
        '<span class="gdb-cmd">$ git push --force</span>',
        '<span class="gdb-ok">✓ Bon, j’ai essayé, on verra bien 😅</span>',
      ],
      commit: 'b3e9d12 — "push attempt"',
    },
    {
      lines: [
        '<span class="gdb-cmd">$ npm install</span>',
        "added 1337 packages… wow 😳",
        '<span class="gdb-err">⚠ 666 vulnérabilités 😱</span>',
        '<span class="gdb-ok">✓ npm audit fix… ou presque 😅</span>',
      ],
      commit: 'c7a1b44 — "node_modules adventure"',
    },
    {
      lines: [
        "// TODO: comprendre ce code un jour",
        '<span class="gdb-err">← Toujours pas fait… 😅</span>',
        "",
        '<span class="gdb-ok">✓ Ça marche quand même 🙏</span>',
      ],
      commit: 'dead420 — "temp stuff"',
    },
    {
      lines: [
        '<span class="gdb-cmd">$ git log --oneline</span>',
        '"wip"',
        '"wip2"',
        '"maybe final wip"',
        '"ok là je crois que c’est bon"',
        '<span class="gdb-err">"dernier commit ?" 🤨</span>',
      ],
      commit: 'f00ba44 — "last commit maybe"',
    },
    {
      lines: [
        '<span class="gdb-cmd">$ git stash</span>',
        "Saved… quelque part 😅",
        "",
        '<span class="gdb-err">⚠ 3 stash oubliés 😬</span>',
        '<span class="gdb-ok">✓ Futures fonctionnalités </span>',
      ],
      commit: 'e2c8b91 — "stash mysteries"',
    },
    {
      lines: [
        '<span class="gdb-cmd">$ console.log("debug")</span>',
        '<span class="gdb-cmd">$ console.log("debug 2")</span>',
        '<span class="gdb-cmd">$ console.log("debug 3 ???")</span>',
        "",
        '<span class="gdb-err">→ Le bug était ailleurs… évidemment 😅</span>',
        '<span class="gdb-ok">✓ Merci à mes collègues pirates de O’clock : Anne-so, Ludo, Richard, Juju, Valou, Céd et tous les autres 🏴‍☠️</span>',
      ],
      commit: '0b5e3f7 — "debug adventures"',
    },
    {
      lines: [
        "Ça plante encore…",
        "Toujours pas compris pourquoi…",
        "",
        '<span class="gdb-ok">✓ Ah, un point-virgule manquait 😅</span>',
      ],
      commit: '1337c0d — "fix missing semicolon"',
    },
    {
      lines: [
        '<span class="gdb-cmd">$ console.log("debug")</span>',
        '<span class="gdb-cmd">$ console.log("debug 2")</span>',
        '<span class="gdb-cmd">$ console.log("debug 3 ???")</span>',
        "",
        '<span class="gdb-err">→ Le bug était ailleurs… évidemment 😅</span>',
      ],
      commit: '0b5e3f7 — "debug adventures"',
    },
  ];

  let gdVisible = false;
  let gdMsgIndex = -1;
  let gdHideTimer = null;

  // Choisir un message différent à chaque fois
  function pickMessage() {
    let next;
    do {
      next = Math.floor(Math.random() * MESSAGES.length);
    } while (next === gdMsgIndex);
    gdMsgIndex = next;
    return MESSAGES[next];
  }

  // Typewriter ligne par ligne
  function typeLines(el, lines, delay) {
    el.innerHTML = "";
    let lineIndex = 0;
    function nextLine() {
      if (lineIndex >= lines.length) return;
      const p = document.createElement("p");
      p.style.cssText = "margin:2px 0;opacity:0;transition:opacity .25s";
      p.innerHTML = lines[lineIndex];
      el.appendChild(p);
      requestAnimationFrame(() => {
        p.style.opacity = "1";
      });
      lineIndex++;
      if (lineIndex < lines.length) setTimeout(nextLine, delay);
    }
    nextLine();
  }

  window.triggerGitDumber = function () {
    const overlay = document.getElementById("gitDumberOverlay");
    const wrap = document.getElementById("gitDumberWrap");
    const msgEl = document.getElementById("gitDumberMsg");
    const commitEl = document.getElementById("gitDumberCommit");
    const img = overlay.querySelector(".gitdumber-img");

    // Déjà visible → shake + nouveau message
    if (gdVisible) {
      img.classList.remove("shake");
      void img.offsetWidth; // reflow
      img.classList.add("shake");
      const msg = pickMessage();
      typeLines(msgEl, msg.lines, 280);
      commitEl.textContent = msg.commit;
      if (gdHideTimer) clearTimeout(gdHideTimer);
      gdHideTimer = setTimeout(hideGitDumber, 9000);
      return;
    }

    // Première apparition
    gdVisible = true;
    const msg = pickMessage();
    overlay.classList.add("active");
    typeLines(msgEl, msg.lines, 300);
    commitEl.textContent = msg.commit;

    // Auto-hide après 9s
    if (gdHideTimer) clearTimeout(gdHideTimer);
    gdHideTimer = setTimeout(hideGitDumber, 9000);

    // Easter egg console bonus
    console.log(
      "%c🦊 Git Dumber a surgi du néant.",
      "font-size:14px;color:#B87333;font-family:monospace;font-weight:bold;",
    );
    console.log(
      '%c  git commit -m "easter egg discovered 🎉"',
      "font-size:12px;color:#8A9463;font-family:monospace;",
    );
  };

  window.hideGitDumber = function () {
    if (!gdVisible) return;
    const overlay = document.getElementById("gitDumberOverlay");
    overlay.classList.remove("active");
    gdVisible = false;
    if (gdHideTimer) {
      clearTimeout(gdHideTimer);
      gdHideTimer = null;
    }
  };

  // Fermer avec Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gdVisible) hideGitDumber();
  });
})();
/* =============================================================================
   MAIN-ADDITIONS.JS — Sébastien Maurice · Portfolio 2026
   À AJOUTER à la fin de js/main.js (après le bloc Easter Egg)

   Ce fichier contient deux fonctionnalités :
   1. La LIGHTBOX : agrandit une image au clic et permet de naviguer dans la galerie
   2. Les ONGLETS : affiche la bonne catégorie de mockups quand on clique un bouton

   Rappel O'Clock : on utilise une IIFE (Immediately Invoked Function Expression)
   pour encapsuler notre code et éviter de polluer le scope global.
   Syntaxe : (function() { ... })()
============================================================================= */

(function () {
  /*
    LIGHTBOX — Variables de travail
    On stocke :
    - gdImages : le tableau de toutes les images de la catégorie active
      Chaque entrée = { src: 'chemin/image.jpg', label: 'Nom du projet' }
    - gdIndex : l'index de l'image actuellement affichée dans gdImages
  */
  let gdImages = [];
  let gdIndex = 0;

  /*
    On récupère les éléments HTML de la lightbox une seule fois au chargement.
    C'est une bonne pratique : on évite de faire un getElementById()
    à chaque ouverture de lightbox.
  */
  const overlay = document.getElementById("gdZoomOverlay");
  const img = document.getElementById("gdZoomImg");
  const caption = document.getElementById("gdZoomCaption");
  const counter = document.getElementById("gdZoomCounter");

  /*
    collectCategory(clickedItem)
    ----------------------------
    Quand l'utilisateur clique sur une image, cette fonction remonte
    dans le DOM pour trouver le conteneur parent (.gd-masonry ou .wd-bento)
    et récupère toutes les images qu'il contient.

    Pourquoi ? Pour pouvoir naviguer entre les images avec ← et →
    dans la même catégorie.

    Retourne un tableau d'objets : [{ src, label }, { src, label }, ...]
  */
  function collectCategory(clickedItem) {
    /*
      On cherche le parent selon le type de galerie :
      - .gd-masonry = galerie mockups (onglets catégories)
      - .wd-bento   = galerie webdesign (bento grid)
    */
    const container =
      clickedItem.closest(".gd-masonry") || clickedItem.closest(".wd-bento");

    /* Si on ne trouve pas de conteneur parent, on renvoie un tableau vide */
    if (!container) return [];

    /* On détermine le sélecteur d'item selon le type de conteneur */
    const isWdBento = container.classList.contains("wd-bento");
    const itemSel = isWdBento ? ".wd-bento-item" : ".gd-item";
    const labelSel = isWdBento ? ".wd-bento-label" : ".gd-label";

    /*
      querySelectorAll() retourne une NodeList (pas un tableau).
      Array.from() la convertit en vrai tableau pour pouvoir utiliser .map()
      map() = on transforme chaque élément en objet { src, label }
    */
    return Array.from(container.querySelectorAll(itemSel)).map(function (item) {
      return {
        src: item.querySelector("img").src,
        label: item.querySelector(labelSel)
          ? item.querySelector(labelSel).textContent
          : "",
      };
    });
  }

  /*
    updateZoom()
    ------------
    Met à jour l'image affichée dans la lightbox.
    Appelée à chaque fois qu'on change d'image (ouverture, suivant, précédent).
  */
  function updateZoom() {
    if (!gdImages.length) return; /* Sécurité : rien à afficher */

    /* On met à jour l'image, la légende et le compteur */
    img.src = gdImages[gdIndex].src;
    caption.textContent = gdImages[gdIndex].label;

    /* Le compteur n'est utile que s'il y a plusieurs images */
    counter.textContent =
      gdImages.length > 1 ? gdIndex + 1 + " / " + gdImages.length : "";

    /* On cache les boutons nav si une seule image dans la catégorie */
    const navVisible = gdImages.length > 1 ? "visible" : "hidden";
    document.getElementById("gdZoomPrev").style.visibility = navVisible;
    document.getElementById("gdZoomNext").style.visibility = navVisible;
  }

  /*
    window.openGdZoom(item)
    -----------------------
    Ouvre la lightbox avec l'image cliquée.
    Appelée dans le HTML via onclick="openGdZoom(this)"
    "this" = l'élément cliqué (le .gd-item ou .wd-bento-item)

    On met la fonction sur window pour la rendre accessible
    depuis les attributs onclick dans le HTML.
  */
  window.openGdZoom = function (item) {
    /* On collecte toutes les images de la même catégorie */
    const allImages = collectCategory(item);

    /* On trouve l'index de l'image cliquée dans le tableau */
    const clickedSrc = item.querySelector("img").src;
    gdImages = allImages;
    gdIndex = allImages.findIndex(function (i) {
      return i.src === clickedSrc;
    });

    /* Sécurité : si l'image n'est pas trouvée, on commence au début */
    if (gdIndex < 0) gdIndex = 0;

    /* On affiche l'image et on ouvre la lightbox */
    updateZoom();
    overlay.classList.add("open");

    /* On bloque le scroll de la page pendant que la lightbox est ouverte */
    document.body.style.overflow = "hidden";
  };

  /*
    window.closeGdZoom()
    --------------------
    Ferme la lightbox et restore le scroll de la page.
    Appelée par le bouton ✕ et par un clic sur le fond de la lightbox.
  */
  window.closeGdZoom = function () {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  /*
    window.gdZoomPrev(e) / window.gdZoomNext(e)
    -------------------------------------------
    Navigation entre images. L'opérateur % (modulo) crée une navigation
    "circulaire" : quand on dépasse la dernière image, on revient à la première.

    e.stopPropagation() empêche le clic de "remonter" jusqu'à l'overlay parent
    qui fermerait la lightbox.
  */
  window.gdZoomPrev = function (e) {
    if (e) e.stopPropagation();
    /* (index - 1 + total) % total = on revient à la fin si on est au début */
    gdIndex = (gdIndex - 1 + gdImages.length) % gdImages.length;
    updateZoom();
  };

  window.gdZoomNext = function (e) {
    if (e) e.stopPropagation();
    /* (index + 1) % total = on revient au début si on est à la fin */
    gdIndex = (gdIndex + 1) % gdImages.length;
    updateZoom();
  };

  /*
    NAVIGATION CLAVIER
    addEventListener sur document = on écoute les touches partout sur la page.
    On vérifie d'abord que la lightbox est ouverte (.contains('open'))
    avant d'agir, pour ne pas interférer avec le reste de la page.
  */
  document.addEventListener("keydown", function (e) {
    if (!overlay || !overlay.classList.contains("open")) return;

    if (e.key === "ArrowLeft") window.gdZoomPrev();
    if (e.key === "ArrowRight") window.gdZoomNext();
    if (e.key === "Escape") window.closeGdZoom();
  });

  /*
    NAVIGATION TACTILE (swipe sur mobile)
    On enregistre la position X du doigt au début du toucher (touchstart),
    puis on calcule le déplacement à la fin (touchend).
    Si le déplacement dépasse 50px, on change d'image.

    { passive: true } = indique au navigateur que l'événement ne bloquera
    pas le scroll, ce qui améliore les performances mobiles.
  */
  let touchStartX = 0;

  overlay &&
    overlay.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.touches[0].clientX;
      },
      { passive: true },
    );

  overlay &&
    overlay.addEventListener(
      "touchend",
      function (e) {
        const diff = touchStartX - e.changedTouches[0].clientX;

        /* On demande un swipe d'au moins 50px pour éviter les faux positifs */
        if (Math.abs(diff) > 50) {
          if (diff > 0) {
            window.gdZoomNext(); /* Swipe gauche = image suivante */
          } else {
            window.gdZoomPrev(); /* Swipe droite = image précédente */
          }
        }
      },
      { passive: true },
    );

  /*
    window.switchGdTab(tabId, btn)
    ------------------------------
    Gère le système d'onglets de la galerie "Mockups & Créations".
    Appelée dans le HTML via onclick="switchGdTab('logos', this)"

    Paramètres :
    - tabId : identifiant de la catégorie (ex: 'logos', 'flyers', 'cartes'...)
    - btn   : le bouton cliqué (pour lui ajouter la classe "active")

    Fonctionnement :
    1. On retire "active" de tous les panneaux et boutons
    2. On ajoute "active" uniquement sur le bon panneau et le bon bouton
  */
  window.switchGdTab = function (tabId, btn) {
    /* Étape 1 : on désactive tout */
    document.querySelectorAll(".gd-tab-panel").forEach(function (panel) {
      panel.classList.remove("active");
    });
    document.querySelectorAll(".gd-tab-btn").forEach(function (button) {
      button.classList.remove("active");
    });

    /* Étape 2 : on active le bon panneau */
    const panel = document.getElementById("gdpanel-" + tabId);
    if (panel) panel.classList.add("active");

    /* Étape 3 : on active le bouton cliqué */
    if (btn) btn.classList.add("active");
  };
})(); /* Fin de l'IIFE — le code s'exécute immédiatement au chargement */
