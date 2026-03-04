/* =============================================
   PORTFOLIO — Sébastien Maurice
   js/main.js — Toutes les interactions JavaScript
   
   Formé à O'Clock (Bootcamp Développeur Web & Mobile)
   
   Sections :
   1.  Curseur personnalisé + Spotlight
   2.  Canvas Particules
   3.  Onglets (Tabs)
   4.  Scroll helpers + Navbar
   5.  Menu mobile (Burger)
   6.  Reveal on Scroll
   7.  Card Tilt 3D
   8.  Hero Name Split Animation
   9.  Modales projet
   10. Blur Quote Effect (inspiré du CodePen CSS Blur Filter)
   11. Terminal Typewriter
   12. Compteur animé (CountUp)
   13. Slideshow images projets
   14. Mode Présentation Recruteur
   15. Easter Egg Console développeur
   
   🌿 Créé avec Amour — Caudry, France
============================================= */

/* =============================================
   1. CURSEUR PERSONNALISÉ + SPOTLIGHT
   
   On remplace le curseur natif du navigateur par deux éléments :
   - #cur  : le point central, suit la souris instantanément
   - #cring: l'anneau extérieur, lissé via interpolation linéaire (lerp)
   
   Lerp (Linear Interpolation) = technique d'animation fluide :
     rx += (cible - rx) * facteur
   Plus le facteur est petit (0.1), plus c'est lent et fluide.
   
   On utilise requestAnimationFrame pour boucler à ~60fps.
============================================= */
const cur = document.getElementById("cur");
const cring = document.getElementById("cring");
const spl = document.getElementById("spl");

let mx = 0,
  my = 0; // position souris brute
let rx = 0,
  ry = 0; // position anneau (lissée)
let mouseX = 0,
  mouseY = 0; // aussi utilisé par le système de particules

/* ── Suivi de la souris ── */
document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  // Curseur point : se place instantanément
  if (cur) {
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  }
  // Spotlight : on injecte la position dans des custom properties CSS
  // Le radial-gradient du .spotlight les utilise via var(--sx) et var(--sy)
  if (spl) {
    spl.style.setProperty("--sx", mx + "px");
    spl.style.setProperty("--sy", my + "px");
  }
  mouseX = mx;
  mouseY = my;
});

/* Feedback visuel au clic */
document.addEventListener("mousedown", () => cur && cur.classList.add("click"));
document.addEventListener(
  "mouseup",
  () => cur && cur.classList.remove("click"),
);

/* ── Boucle lerp pour l'anneau ── */
(function loop() {
  // Interpolation : on avance de 10% vers la cible à chaque frame
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (cring) {
    cring.style.left = rx + "px";
    cring.style.top = ry + "px";
  }
  requestAnimationFrame(loop);
})();

/* ── Hover : grossissement du curseur sur les éléments interactifs ── */
// querySelectorAll retourne une NodeList, forEach permet d'itérer dessus
document
  .querySelectorAll(
    "a, button, .card, .pill, .sk-card, .gal-it, .toolp, .tech-item, .stat, .dc, .wow-skill-card, .cv-sel-btn",
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
   
   Le <canvas> HTML5 est un rectangle sur lequel on dessine
   en JavaScript via le contexte 2D (ctx).
   
   Architecture du système :
   - Classe Pt  : un point/particule avec position, vitesse, couleur
   - conn()     : trace les lignes entre particules proches (constellation)
   - animP()    : boucle principale — efface + redessine à chaque frame
   
   Physique appliquée :
   - Pythagore pour calculer la distance (√(dx²+dy²))
   - Trigonométrie (atan2) pour l'angle de fuite depuis la souris
   - Friction (vitesse *= 0.99) pour un mouvement naturel
============================================= */
const canvas = document.getElementById("pc");
const ctx = canvas ? canvas.getContext("2d") : null;

let W,
  H,
  pts = [];
const MOUSE_RADIUS = 160; // zone d'influence de la souris
const MOUSE_FORCE = 1.8; // intensité de la répulsion

/* Redimensionnement du canvas selon la fenêtre */
function rsz() {
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
if (canvas) {
  rsz();
  window.addEventListener("resize", rsz);
}

/* Classe Pt — représente une particule */
class Pt {
  constructor() {
    this.res();
  }

  /* Réinitialise la particule (position et paramètres aléatoires) */
  res() {
    this.x = Math.random() * W;
    this.y = Math.random() * H;
    this.ox = this.x;
    this.oy = this.y; // position d'origine
    // Vitesse initiale lente — effet de dérive paisible
    this.vx = (Math.random() - 0.5) * 0.28;
    this.vy = (Math.random() - 0.5) * 0.28;
    this.r = Math.random() * 1.5 + 0.3; // rayon : 0.3 à 1.8px
    this.baseAlpha = Math.random() * 0.35 + 0.06;
    this.a = this.baseAlpha;
    // Couleurs du moodboard : olive, amber, sand, cream
    const c = ["#8A9463", "#B87333", "#C8C4B4", "#5C6340", "#EDE9DC"];
    this.c = c[Math.floor(Math.random() * c.length)];
    // Durée de vie en frames avant réinitialisation
    this.life = 0;
    this.ml = Math.random() * 500 + 250;
  }

  /* Mise à jour physique — appelée à chaque frame */
  upd() {
    // Distance à la souris — Pythagore !
    const dx = this.x - mouseX;
    const dy = this.y - mouseY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < MOUSE_RADIUS) {
      // Répulsion proportionnelle à la proximité
      const force = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
      const angle = Math.atan2(dy, dx); // trigonométrie — angle de fuite
      this.vx += Math.cos(angle) * force * 0.06;
      this.vy += Math.sin(angle) * force * 0.06;
      // S'éclaircit quand proche de la souris
      this.a = Math.min(1, this.baseAlpha + (1 - dist / MOUSE_RADIUS) * 0.6);
    } else {
      // Retour progressif à l'alpha de base (ease)
      this.a += (this.baseAlpha - this.a) * 0.04;
    }

    // Vitesse max pour éviter l'emballement
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > 2.5) {
      this.vx *= 2.5 / spd;
      this.vy *= 2.5 / spd;
    }

    // Friction naturelle
    this.vx *= 0.99;
    this.vy *= 0.99;
    this.x += this.vx;
    this.y += this.vy;
    this.life++;

    // Réinitialisation si hors écran ou trop vieille
    if (
      this.x < -10 ||
      this.x > W + 10 ||
      this.y < -10 ||
      this.y > H + 10 ||
      this.life > this.ml
    ) {
      this.res();
    }
  }

  /* Dessin sur le canvas */
  drw() {
    // Fade-in (60 premières frames) et fade-out (60 dernières)
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

/* Crée 130 particules au démarrage */
if (ctx) {
  for (let i = 0; i < 130; i++) pts.push(new Pt());
}

/* Trace les lignes de connexion entre particules proches */
function conn() {
  const md = 130; // distance max de connexion
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[i].x - pts[j].x;
      const dy = pts[i].y - pts[j].y;
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

/* Boucle principale d'animation — le "render loop" */
function animP() {
  if (!ctx) return;
  ctx.clearRect(0, 0, W, H); // efface le canvas avant de redessiner
  conn(); // lignes derrière les points
  pts.forEach((p) => {
    p.upd();
    p.drw();
  });
  ctx.globalAlpha = 1; // reset opacité globale
  requestAnimationFrame(animP);
}
if (ctx) animP();

/* =============================================
   3. ONGLETS (TABS)
   
   Pattern classique : on masque tous les panneaux
   et on affiche seulement celui correspondant au bouton cliqué.
   
   classList.add() / classList.remove() — manipulation DOM de base.
   Les transitions sont gérées par CSS (animation fadeSlide).
============================================= */
function st(id) {
  // Désactive tous les boutons et panneaux
  document
    .querySelectorAll(".tab-btn")
    .forEach((b) => b.classList.remove("active"));
  document
    .querySelectorAll(".tab-pane")
    .forEach((p) => p.classList.remove("active"));
  // Active le bouton et le panneau correspondants
  const btn = document.querySelector('[data-tab="' + id + '"]');
  const panel = document.getElementById("panel-" + id);
  if (btn) btn.classList.add("active");
  if (panel) panel.classList.add("active");
  // Re-déclenche les animations reveal après changement d'onglet
  setTimeout(rvl, 60);
}

/* =============================================
   4. SCROLL HELPERS + NAVBAR
   
   scrollIntoView() = méthode native du navigateur.
   L'option {behavior:'smooth'} active le scroll fluide CSS.
   
   La navbar change d'apparence après 60px de scroll
   grâce à la classe 'scrolled' et backdrop-filter en CSS.
============================================= */
function gs(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

window.addEventListener("scroll", () => {
  const nav = document.getElementById("nav");
  if (nav) nav.classList.toggle("scrolled", window.scrollY > 60);
});

/* =============================================
   5. MENU MOBILE (BURGER)
   
   Toggle booléen simple — on inverse true/false.
   La classe CSS 'open' gère l'affichage via opacity et pointer-events.
   Le burger se transforme en croix via des rotations CSS inline.
============================================= */
let menuOpen = false;

function tm() {
  menuOpen = !menuOpen;
  const mnav = document.getElementById("mnav");
  if (mnav) mnav.classList.toggle("open", menuOpen);
  // Animer le burger → croix
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
  if (menuOpen) tm(); // ferme le menu mobile
}

/* =============================================
   6. REVEAL ON SCROLL
   
   Technique getBoundingClientRect() :
   retourne la position de l'élément par rapport à la fenêtre.
   Si .top < window.innerHeight - 50, l'élément est visible.
   
   On ajoute la classe 'vis' → CSS déclenche l'animation d'entrée.
   {passive:true} sur le listener = optimisation scroll performance.
============================================= */
function rvl() {
  document
    .querySelectorAll(".rv:not(.vis), .rv-stagger:not(.vis)")
    .forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 50) {
        el.classList.add("vis");
      }
    });
}
window.addEventListener("scroll", rvl, { passive: true });
setTimeout(rvl, 150); // premier reveal au chargement

/* =============================================
   7. CARD TILT 3D
   
   Effect parallaxe : quand la souris survole une card,
   on calcule sa position relative dans la card (normalisée -1 à 1)
   et on applique une rotation 3D CSS proportionnelle.
   
   perspective() + rotateX/Y = profondeur CSS 3D.
   Template literals ES6 (`${val}`) pour construire le transform.
============================================= */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".card").forEach((card) => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    // Valeur normalisée entre -1 et 1
    const dx = (e.clientX - cx) / (r.width / 2);
    const dy = (e.clientY - cy) / (r.height / 2);
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
   
   Technique : on découpe le texte en caractères (<span class="char">)
   et on applique un animation-delay croissant à chaque lettre.
   Résultat : apparition lettre par lettre en cascade.
   
   split('') sur une chaîne → tableau de caractères
   map() + join('') → reconstruction en HTML
   Destructuration avec l'index i pour le délai
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
   
   Ouverture/fermeture via classe CSS 'open'.
   
   Délégation d'événements sur le fond (closeModal) :
   on vérifie e.target === e.currentTarget pour ne fermer
   que si on clique sur le fond, pas sur la modale elle-même.
   
   Accessibilité : fermeture avec la touche Échap.
   body.style.overflow = 'hidden' empêche le scroll du fond.
============================================= */
function openModal(id) {
  const modal = document.getElementById("modal-" + id);
  if (!modal) return;
  document.body.style.overflow = "hidden"; // bloque le scroll
  modal.classList.add("open");
  // Démarre le slideshow de la modale si présent
  const ss = modal.querySelector(".modal-slideshow");
  if (ss) startSlideshow(ss);
}

function closeModal(e, id) {
  // On ne ferme que si on clique sur le fond gris (pas sur la modale)
  if (e && e.target !== e.currentTarget) return;
  const targets = id
    ? [document.getElementById("modal-" + id)]
    : document.querySelectorAll(".proj-modal-bg.open");
  targets.forEach((m) => {
    if (m) m.classList.remove("open");
  });
  document.body.style.overflow = ""; // réactive le scroll
}

// Fermeture avec Échap — accessibilité
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal(null);
});

// Hover sur les boutons de modale
document
  .querySelectorAll(".proj-modal-btn, .proj-modal-close, .feat-card, .dc")
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
   10. BLUR QUOTE EFFECT
   
   Inspiré du CodePen "Quote Effect using a CSS Blur Filter".
   
   Chaque mot est un <span> avec des data-attributes :
   - data-duration : durée de la transition CSS (en secondes)
   - data-delay    : délai avant que le mot apparaît
   - data-blur     : valeur du flou de départ (en pixels)
   
   On applique dynamiquement via style.transition et style.filter
   les valeurs lues depuis les data-attributes — sans bibliothèque !
   
   IIFE (Immediately Invoked Function Expression) :
   (() => { ... })()
   Encapsule les variables pour ne pas polluer le scope global.
   C'est une bonne pratique JS issue du cours O'Clock.
============================================= */
(() => {
  const quoteEl = document.getElementById("blurQuote");
  if (!quoteEl) return;

  const words = quoteEl.querySelectorAll(".bw");
  const cite = quoteEl.querySelector("cite");
  if (!words.length) return;

  let isAnimating = false;
  let restartTimeout = null;

  /* Lance l'animation complète de la citation */
  function animate() {
    if (isAnimating) return;
    isAnimating = true;

    let maxDelay = 0;
    let maxDuration = 0;

    words.forEach((word) => {
      // Lecture des data-attributes pour personnaliser chaque mot
      const duration = parseFloat(word.dataset.duration) || 1.2;
      const delay = parseFloat(word.dataset.delay) || 0.2;
      const blur = parseFloat(word.dataset.blur) || 4;

      maxDelay = Math.max(delay, maxDelay);
      maxDuration = Math.max(duration, maxDuration);

      // On pose d'abord le flou
      word.style.filter = `blur(${blur}px)`;
      word.style.opacity = "0";
      // Puis on anime vers 0px de flou avec la durée et le délai propres au mot
      word.style.transition = `filter ${duration}s ease-in ${delay}s, opacity ${duration}s ease-in ${delay}s`;

      // Micro setTimeout pour que le navigateur enregistre l'état initial
      setTimeout(() => {
        word.classList.add("animate");
        word.style.filter = "blur(0px)";
        word.style.opacity = "1";
      }, 30);
    });

    // Apparition de la signature avec le délai max
    if (cite) {
      cite.style.transition = `opacity ${maxDuration}s ease-in ${maxDelay}s`;
      setTimeout(() => cite.classList.add("animate"), 30);
    }

    // Pause après la fin, puis boucle
    const totalTime = (maxDelay + maxDuration) * 1000;
    restartTimeout = setTimeout(() => {
      const pauseBeforeReset = 3500;
      // Fade-out de tous les mots
      words.forEach((word) => {
        word.style.transition = `filter 0.8s ease-out, opacity 0.8s ease-out`;
        word.classList.remove("animate");
        word.style.filter = `blur(${word.dataset.blur || 4}px)`;
        word.style.opacity = "0";
      });
      if (cite) {
        cite.style.transition = "opacity 0.8s ease-out";
        cite.classList.remove("animate");
      }
      // Puis relance
      setTimeout(() => {
        isAnimating = false;
        animate();
      }, pauseBeforeReset);
    }, totalTime + 500);
  }

  /* Relance l'animation au clic */
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

  /* Déclenche quand la section est visible */
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setTimeout(animate, 400);
          obs.disconnect(); // on observe une seule fois
        }
      });
    },
    { threshold: 0.5 },
  );

  const sec = document.getElementById("quote-sec");
  if (sec) obs.observe(sec);
  else animate(); // fallback si pas de section
})();

/* =============================================
   11. TERMINAL TYPEWRITER
   
   Animation "machine à écrire" pour le terminal du hero.
   Technique : récursion asynchrone avec setTimeout.
   
   Une fonction type() s'appelle elle-même avec un délai variable
   pour simuler la frappe humaine (vitesse irrégulière).
   
   Les lignes sont des objets {cls, txt} :
   - cls : classes CSS pour la coloration syntaxique
   - txt : contenu de la ligne
============================================= */
(function () {
  const el = document.getElementById("termBody");
  if (!el) return;

  // Curseur clignotant
  const cursor = document.createElement("span");
  cursor.className = "term-cursor";

  // Lignes du "code" affiché dans le terminal
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
    if (lineIndex >= lines.length) {
      return setTimeout(start, 4500); // pause puis repart
    }
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
      // Vitesse de frappe variable pour l'effet naturel
      let speed = 55 + Math.random() * 35;
      if (lineIndex === 0) speed = 90; // plus lent sur la première ligne
      timer = setTimeout(type, speed);
    } else {
      // Pause dramatique après l'erreur
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
   12. COMPTEUR ANIMÉ (CountUp)
   
   Effet "chiffres qui montent" — très apprécié sur les portfolios.
   
   setInterval() + incrémentation progressive jusqu'à la cible.
   On extrait le nombre du texte avec une regex :
   /\d+/ → cherche un ou plusieurs chiffres consécutifs.
   
   dataset.counted évite de recompter si déjà animé.
============================================= */
function countUp() {
  document.querySelectorAll(".stat-v").forEach((el) => {
    if (el.dataset.counted) return; // déjà animé
    const match = el.textContent.match(/\d+/); // regex : extrait le nombre
    if (!match) return;
    const target = parseInt(match[0]);
    const suffix = el.textContent.replace(/\d+/, ""); // garde le "+" etc.
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
   
   Défilement doux des images pour Ciné Délices et Dev N'Dumber.
   
   Principe :
   - Chaque projet a plusieurs <img> dans un conteneur .dc-slideshow
   - On affiche l'une après l'autre en alternant la classe 'active'
   - Transition CSS opacity 1.2s pour le fondu enchaîné
   - On utilise setInterval() pour le timer automatique
   
   On utilise un Map() pour stocker les timers de chaque slideshow
   et les stopper/redémarrer indépendamment.
============================================= */
const slideshowTimers = new Map(); // stocke les intervalles par élément

function initSlideshows() {
  document.querySelectorAll(".dc-slideshow").forEach((container) => {
    const slides = container.querySelectorAll(".slide");
    if (slides.length < 2) return; // rien à faire si une seule image

    // Initialise le premier slide
    slides[0].classList.add("active");

    // Crée les indicateurs (dots) s'ils n'existent pas
    if (!container.querySelector(".slide-dots")) {
      const dotsWrap = document.createElement("div");
      dotsWrap.className = "slide-dots";
      slides.forEach((_, idx) => {
        const dot = document.createElement("div");
        dot.className = "slide-dot" + (idx === 0 ? " active" : "");
        // Clic sur un dot → va directement à ce slide
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

/* Démarre le timer automatique d'un slideshow */
function startSlideshow(container) {
  stopSlideshow(container); // stoppe le précédent timer si existant
  let current = 0;
  const slides = container.querySelectorAll(".slide");
  if (slides.length < 2) return;
  const tid = setInterval(() => {
    current = (current + 1) % slides.length;
    goToSlide(container, current);
  }, 3000); // changement toutes les 3 secondes
  slideshowTimers.set(container, tid);
}

/* Stoppe le timer d'un slideshow */
function stopSlideshow(container) {
  const tid = slideshowTimers.get(container);
  if (tid) {
    clearInterval(tid);
    slideshowTimers.delete(container);
  }
}

/* Va directement à un slide précis */
function goToSlide(container, idx) {
  const slides = container.querySelectorAll(".slide");
  const dots = container.querySelectorAll(".slide-dot");
  slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  dots.forEach((d, i) => d.classList.toggle("active", i === idx));
}

// Lance les slideshows au chargement
initSlideshows();

// Pause sur hover — UX : l'utilisateur peut regarder une image tranquillement
document.querySelectorAll(".dc-slideshow").forEach((container) => {
  container.addEventListener("mouseenter", () => stopSlideshow(container));
  container.addEventListener("mouseleave", () => startSlideshow(container));
});

/* =============================================
   14. MODE PRÉSENTATION RECRUTEUR
   
   Un bouton flottant permet de basculer dans un mode
   "épuré" qui masque les détails techniques (stack, chips…)
   pour ne montrer que les projets et les résultats.
   
   Technique : toggle de la classe 'recruiter-mode' sur <body>.
   Le CSS associé (.recruiter-mode ...) masque les éléments techniques.
   
   localStorage permet de se souvenir du mode entre les pages —
   ici on remet à zéro à chaque chargement pour rester prudent.
============================================= */
const recruiterToggle = document.getElementById("recruiterToggle");

function toggleRecruiterMode() {
  const isActive = document.body.classList.toggle("recruiter-mode");
  // Met à jour le label du bouton
  const label = document.getElementById("rt-label");
  if (label) label.textContent = isActive ? "Mode Expert" : "Mode Recruteur";
  const dot = document.querySelector(".rt-dot");
  // Le CSS gère déjà la couleur du dot via body.recruiter-mode .rt-dot
}

if (recruiterToggle) {
  recruiterToggle.addEventListener("click", toggleRecruiterMode);
}

/* =============================================
   15. EASTER EGG CONSOLE DÉVELOPPEUR
   
   Un message stylisé dans la console du navigateur —
   les développeurs qui regardent le code source adorent ça !
   
   %c dans console.log() permet d'appliquer du CSS à la sortie console.
   On alterne les styles pour un effet visuel marqué.
============================================= */
(function () {
  const styles = {
    big: "font-size:18px;font-weight:bold;color:#8A9463;font-family:monospace;",
    name: "font-size:24px;font-weight:bold;color:#B87333;font-family:monospace;",
    sub: "font-size:12px;color:#C8C4B4;font-family:monospace;",
    link: "font-size:12px;color:#8A9463;font-family:monospace;text-decoration:underline;",
    reset: "",
  };
  console.log("%c👋 Salut, développeur curieux !", styles.big);
  console.log("%c  Sébastien Maurice", styles.name);
  console.log("%c  Front-End Developer · Product Designer UX", styles.sub);
  console.log("%c  ──────────────────────────────────────────", styles.sub);
  console.log("%c  Tu inspectes le code ? Bonne curiosité !", styles.sub);
  console.log("%c  Ce portfolio est construit avec amour 🌿", styles.sub);
  console.log(
    "%c  HTML · CSS · JavaScript vanilla — zéro framework front",
    styles.sub,
  );
  console.log(
    "%c  Particules canvas, blur quote, curseur personnalisé...",
    styles.sub,
  );
  console.log("%c  ──────────────────────────────────────────", styles.sub);
  console.log("%c  📬 contact@sebastienmaurice.fr", styles.link);
  console.log("%c  🐙 github.com/sebastienmaurice", styles.link);
  console.log("%c  💼 linkedin.com/in/sebastien-maurice/", styles.link);
  console.log("%c  ──────────────────────────────────────────", styles.sub);
  console.log(
    "%c  Si tu cherches un dev curieux et passionné, on discute ? 😄",
    styles.sub,
  );
})();

/* =============================================
   SÉLECTEUR DE CV
   
   Deux CVs disponibles :
   - CV Front-End Developer UX-Focused    → cv-frontend.pdf
   - CV Product Designer UX Designer      → cv-product-designer.pdf
   
   Le bouton actif reçoit la classe 'active' pour le feedback visuel.
   Le lien de téléchargement change selon la sélection.
   
   Note : placez vos fichiers PDF dans assets/cv/
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
    // Met à jour tous les liens de téléchargement CV
    document.querySelectorAll(".cv-download-link").forEach((link) => {
      link.href = cvFiles[type];
      link.download = cvFiles[type].split("/").pop();
    });
  }

  document.querySelectorAll(".cv-sel-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.cv;
      if (type) activateCvBtn(type);
    });
  });

  // Sélectionne Front-End par défaut
  activateCvBtn("frontend");
})();
