/* =============================================
   PORTFOLIO — Sébastien Maurice
   js/main.js — v4.0 — 2026
   
   VERSION ÉPURÉE — sans canvas particles, sans terminal typewriter,
   sans spotlight. Ce qu'il reste est intentionnel.
   
   ╔═══════════════════════════════════════════╗
   ║  ORGANISATION                             ║
   ║  0. Email obfusqué                        ║
   ║  1. Curseur custom                        ║
   ║  2. Navbar scroll                         ║
   ║  3. Menu mobile (burger)                  ║
   ║  4. Scroll vers sections (gs)             ║
   ║  5. Animations reveal au scroll           ║
   ║  6. Card tilt 3D                          ║
   ║  7. Compteur animé                        ║
   ║  8. Slideshow images                      ║
   ║  9. Lightbox photo profil                 ║
   ║  10. Lightbox galerie graphisme           ║
   ║  11. Onglets galerie (switchGdTab)        ║
   ║  12. Modales projets                      ║
   ║  13. Popups description projet            ║
   ║  14. Sélecteur CV                         ║
   ║  15. Easter egg Git Dumber                ║
   ║  16. Easter egg console                   ║
   ╚═══════════════════════════════════════════╝
============================================= */

/* =============================================
   0. EMAIL — Obfuscation anti-scraping
   On reconstruit l'adresse en JS au runtime.
   L'email n'est jamais présent en clair dans le HTML.
============================================= */
(function () {
  const u = "overseb75", d = "gmail", t = "com";
  window._eml = u + "@" + d + "." + t;
})();

function revealEmail(el) {
  el.href = "mailto:" + window._eml;
  el.textContent = window._eml;
  el.onclick = null;
}
function revealEmailBtn(el) {
  el.href = "mailto:" + window._eml;
  el.onclick = null;
  const arr = el.querySelector(".arr");
  if (arr) arr.textContent = "✓";
  setTimeout(() => { if (arr) arr.textContent = "✉"; }, 2000);
}

/* =============================================
   1. CURSEUR PERSONNALISÉ
   
   Deux éléments superposés :
   - #cur : point central, suit la souris exactement
   - #cring : anneau extérieur avec lerp (lag naturel)
   
   Interpolation linéaire (lerp) :
   rx += (mx - rx) * 0.1
   → À chaque frame, rx se rapproche de mx de 10%.
   → Résultat : easing exponentiel — converge sans rebond.
============================================= */
const cur = document.getElementById("cur");
const cring = document.getElementById("cring");
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener("mousemove", (e) => {
  mx = e.clientX;
  my = e.clientY;
  if (cur) {
    cur.style.left = mx + "px";
    cur.style.top = my + "px";
  }
});
document.addEventListener("mousedown", () => cur && cur.classList.add("click"));
document.addEventListener("mouseup", () => cur && cur.classList.remove("click"));

(function loop() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  if (cring) {
    cring.style.left = rx + "px";
    cring.style.top = ry + "px";
  }
  requestAnimationFrame(loop);
})();

document.querySelectorAll(
  "a,button,.card,.pill,.sk-card,.toolp,.tech-item,.stat,.proj-hero-card,.proj-card,.lab-card,.cv-sel-btn,.proj-desc-btn,.wd-bento-item,.gd-item,.hero-photo-wrap"
).forEach((el) => {
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
   2. NAVBAR + SCROLL
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
      "--nav-h", nav.getBoundingClientRect().height + "px"
    );
  }
}, { passive: true });

(function () {
  const nav = document.getElementById("nav");
  if (nav) {
    document.documentElement.style.setProperty(
      "--nav-h", nav.getBoundingClientRect().height + "px"
    );
  }
})();

/* =============================================
   3. MENU MOBILE (BURGER)
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
    if (spans[2]) spans[2].style.transform = "rotate(-45deg) translate(5px,-5px)";
  } else {
    spans.forEach((s) => { s.style.transform = ""; s.style.opacity = ""; });
  }
}
function cm() {
  if (menuOpen) tm();
}

/* =============================================
   4. REVEAL ON SCROLL
   
   Les éléments .rv démarrent invisibles et apparaissent
   quand ils entrent dans le viewport (50px de marge).
============================================= */
function rvl() {
  document.querySelectorAll(".rv:not(.vis),.rv-stagger:not(.vis)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 50) el.classList.add("vis");
  });
}
window.addEventListener("scroll", rvl, { passive: true });
setTimeout(rvl, 150);

/* =============================================
   5. CARD TILT 3D
   
   Effet parallax 3D au survol. La condition Math.abs(dx) < 1.8
   évite de tortiller la card quand la souris est loin.
============================================= */
document.addEventListener("mousemove", (e) => {
  document.querySelectorAll(".card,.proj-hero-card,.proj-card,.lab-card").forEach((card) => {
    const r = card.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const dx = (e.clientX - cx) / (r.width / 2), dy = (e.clientY - cy) / (r.height / 2);
    if (Math.abs(dx) < 1.8 && Math.abs(dy) < 1.8) {
      card.style.transform = `perspective(1000px) rotateY(${dx * 4}deg) rotateX(${-dy * 4}deg) translateY(-6px)`;
      card.style.boxShadow = `${-dx * 8}px ${dy * 8 + 24}px 64px rgba(27,25,20,.6)`;
    } else {
      card.style.transform = "";
      card.style.boxShadow = "";
    }
  });
});

/* =============================================
   6. COMPTEUR ANIMÉ
   
   Les chiffres s'animent quand ils entrent dans le viewport.
   dataset.counted = "1" : flag pour ne pas relancer l'animation.
============================================= */
function countUp() {
  document.querySelectorAll(".stat-v").forEach((el) => {
    if (el.dataset.counted) return;
    const match = el.textContent.match(/\d+/);
    if (!match) return;
    const target = parseInt(match[0]), suffix = el.textContent.replace(/\d+/, "");
    el.dataset.counted = "1";
    let current = 0;
    const dur = 1200, steps = 60, inc = target / steps;
    const tid = setInterval(() => {
      current = Math.min(current + inc, target);
      el.textContent = Math.floor(current) + suffix;
      if (current >= target) clearInterval(tid);
    }, dur / steps);
  });
}
window.addEventListener("scroll", () => {
  document.querySelectorAll(".stat").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 40) countUp();
  });
}, { passive: true });

/* =============================================
   7. SLIDESHOW IMAGES PROJETS
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
        dot.addEventListener("click", (e) => { e.stopPropagation(); goToSlide(container, idx); });
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
  if (tid) { clearInterval(tid); slideshowTimers.delete(container); }
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
   8. LIGHTBOX PHOTO PROFIL
============================================= */
function openPhotoZoom() {
  const overlay = document.getElementById("photoZoomOverlay");
  if (overlay) { overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
}
function closePhotoZoom() {
  const overlay = document.getElementById("photoZoomOverlay");
  if (overlay) { overlay.classList.remove("open"); document.body.style.overflow = ""; }
}

/* Click sur la photo hero → zoom -->*/
const heroPhoto = document.querySelector(".hero-photo");
if (heroPhoto) heroPhoto.addEventListener("click", openPhotoZoom);

/* =============================================
   9. MODALES PROJETS
   
   Fermeture intelligente : on vérifie que c'est bien
   le fond qui a été cliqué, pas la modale elle-même.
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
  targets.forEach((m) => { if (m) m.classList.remove("open"); });
  document.body.style.overflow = "";
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal(null);
    closeGdZoom();
    closeAllDescPopups();
    closePhotoZoom();
    if (typeof hideGitDumber === 'function') hideGitDumber();
  }
});

/* =============================================
   10. LIGHTBOX GALERIE GRAPHISME
   
   Navigation circulaire via % (modulo).
   Support clavier (ArrowLeft/Right) et swipe tactile.
============================================= */
(function () {
  let gdImages = [], gdIndex = 0;
  const overlay = document.getElementById("gdZoomOverlay");
  const img = document.getElementById("gdZoomImg");
  const caption = document.getElementById("gdZoomCaption");
  const counter = document.getElementById("gdZoomCounter");

  function collectCategory(clickedItem) {
    const container = clickedItem.closest(".gd-bento-panel") || clickedItem.closest(".wd-bento");
    if (!container) return [];
    const isWdBento = container.classList.contains("wd-bento");
    const itemSel = isWdBento ? ".wd-bento-item" : ".gd-item";
    const labelSel = isWdBento ? ".wd-bento-label" : ".gd-label";
    return Array.from(container.querySelectorAll(itemSel)).map(function (item) {
      return {
        src: item.querySelector("img").src,
        label: item.querySelector(labelSel) ? item.querySelector(labelSel).textContent : ""
      };
    });
  }

  function updateZoom() {
    if (!gdImages.length) return;
    img.src = gdImages[gdIndex].src;
    caption.textContent = gdImages[gdIndex].label;
    counter.textContent = gdImages.length > 1 ? (gdIndex + 1) + " / " + gdImages.length : "";
    const navVisible = gdImages.length > 1 ? "visible" : "hidden";
    document.getElementById("gdZoomPrev").style.visibility = navVisible;
    document.getElementById("gdZoomNext").style.visibility = navVisible;
  }

  window.openGdZoom = function (item) {
    const allImages = collectCategory(item);
    const clickedSrc = item.querySelector("img").src;
    gdImages = allImages;
    gdIndex = allImages.findIndex(function (i) { return i.src === clickedSrc; });
    if (gdIndex < 0) gdIndex = 0;
    updateZoom();
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  };

  window.closeGdZoom = function () {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
  };

  window.gdZoomPrev = function (e) {
    if (e) e.stopPropagation();
    gdIndex = (gdIndex - 1 + gdImages.length) % gdImages.length;
    updateZoom();
  };

  window.gdZoomNext = function (e) {
    if (e) e.stopPropagation();
    gdIndex = (gdIndex + 1) % gdImages.length;
    updateZoom();
  };

  document.addEventListener("keydown", function (e) {
    if (!overlay || !overlay.classList.contains("open")) return;
    if (e.key === "ArrowLeft") window.gdZoomPrev();
    if (e.key === "ArrowRight") window.gdZoomNext();
  });

  let touchStartX = 0;
  overlay && overlay.addEventListener("touchstart", function (e) {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  overlay && overlay.addEventListener("touchend", function (e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? window.gdZoomNext() : window.gdZoomPrev(); }
  }, { passive: true });
})();

/* =============================================
   11. ONGLETS GALERIE GRAPHISME
============================================= */
window.switchGdTab = function (tabId, btn) {
  document.querySelectorAll(".gd-tab-panel").forEach(function (panel) { panel.classList.remove("active"); });
  document.querySelectorAll(".gd-tab-btn").forEach(function (button) { button.classList.remove("active"); });
  const panel = document.getElementById("gdpanel-" + tabId);
  if (panel) panel.classList.add("active");
  if (btn) btn.classList.add("active");
};

/* =============================================
   12. POPUPS DESCRIPTION PROJET
============================================= */
const projectDescriptions = {
  "cine-delices": {
    title: "Ciné <em>Délices</em>",
    tag: "Projet O'Clock · Films & Gastronomie",
    desc: "L'idée est née pendant la formation O'Clock : associer un film culte à une recette inspirée de son univers. Avant d'écrire la moindre ligne de code, j'ai conçu le design system complet sous Figma — palette or/noir/rouge, typographies Cinzel + Playfair Display, composants UI. SPA Svelte, appels API TMDB avec gestion des erreurs et fallbacks d'images, carrousels interactifs et badges animés en CSS pur.",
    features: ["Design system Figma complet avant le code","SPA Svelte avec routing côté client","Fiches films via API TMDB + gestion des erreurs","Badges animés et carrousels CSS/JS natifs","Palette or/noir/rouge — typographies cinématographiques","Responsive mobile-first, testé sur iOS et Android"],
    chips: [{ label: "Svelte", cls: "fe" },{ label: "HTML5", cls: "fe" },{ label: "CSS3", cls: "fe" },{ label: "JavaScript ES6+", cls: "fe" },{ label: "Node.js", cls: "be" },{ label: "Express", cls: "be" },{ label: "PostgreSQL", cls: "tool" },{ label: "API TMDB", cls: "tool" },{ label: "Figma", cls: "tool" }]
  },
  "dev-ndumber": {
    title: "Dev <em>N'Dumber</em>",
    tag: "Projet O'Clock · Full-Stack collaboratif",
    desc: "Projet de fin de formation à 4 développeurs. J'ai pris en charge le lead front-end : charte graphique complète, design des mascottes Git Dumber & Dev Lloyd, et structuration des vues HTML/CSS. Première vraie expérience Git en équipe — branches feature, code review en PR, merge conflicts résolus en live.",
    features: ["Lead front-end : charte + intégration HTML/CSS","Design des mascottes Git Dumber & Dev Lloyd","Workflow Git collaboratif : branches, PR, code review","Architecture MVC full-stack à 4 développeurs","Animations CSS et composants UI responsives","Livraison en 2 semaines avec méthodologie Agile"],
    chips: [{ label: "HTML5", cls: "fe" },{ label: "CSS3", cls: "fe" },{ label: "JavaScript ES6+", cls: "fe" },{ label: "Node.js", cls: "be" },{ label: "Express", cls: "be" },{ label: "PostgreSQL", cls: "tool" },{ label: "Git / GitHub", cls: "tool" }]
  },
  "presents-angel": {
    title: "Les Présents <em>d'Ange'L</em>",
    tag: "Mission freelance · E-commerce bijoux",
    desc: "La cliente avait un site fonctionnel mais des frictions UX à corriger. J'ai ciblé les frictions une à une : hiérarchie visuelle, bouton panier repositionné, galerie produit retravaillée.",
    features: ["Audit UX complet : identification des frictions de conversion","Refonte fiches produit : hiérarchie visuelle et lisibilité","Repositionnement CTA et bouton panier","Correction responsive mobile","Cohérence de marque harmonisée","Retour cliente positif à la mise en ligne"],
    chips: [{ label: "HTML5", cls: "fe" },{ label: "CSS3", cls: "fe" },{ label: "JavaScript", cls: "fe" },{ label: "Responsive Design", cls: "tool" }]
  },
  palimpseste: {
    title: "Palimpseste <em>Urbain</em>",
    tag: "Architecture · Culture · WordPress",
    desc: "Refonte d'un site WordPress pour une structure spécialisée en architecture et patrimoine urbain. Plusieurs directions de webdesign proposées avant validation client, migration vers OVH, intégration Elementor. Structure pensée pour l'autonomie client.",
    features: ["Plusieurs directions de webdesign proposées","Migration vers hébergement OVH","Intégration complète avec Elementor","Structure pensée pour l'autonomie client","Optimisation SEO on-page","Site responsive livré dans les délais"],
    chips: [{ label: "WordPress", cls: "fe" },{ label: "Elementor", cls: "fe" },{ label: "SEO", cls: "tool" },{ label: "OVH Migration", cls: "tool" }]
  },
  "petit-chateau": {
    title: "Petit Château <em>Vercourt</em>",
    tag: "Tourisme · Hébergement · WordPress",
    desc: "Site vitrine pour un gîte de charme. Client non-technique qui voulait gérer ses tarifs lui-même. Divi pour la flexibilité du back-office, SEO local ciblé, optimisation images pour connexions rurales.",
    features: ["Design élégant adapté au tourisme rural","Back-office simplifié pour gestion en autonomie","SEO local ciblé : mots-clés + Google My Business","Optimisation images pour connexions limitées","Système de réservation intégré","Avis client 5 étoiles"],
    chips: [{ label: "WordPress", cls: "fe" },{ label: "Divi", cls: "fe" },{ label: "WooCommerce", cls: "fe" },{ label: "SEO Local", cls: "tool" }]
  },
  gsti62: {
    title: "<em>GSTI62</em>",
    tag: "Industrie · B2B · Migration Wix → WordPress",
    desc: "Deux entités industrielles, un seul site à construire depuis zéro. Migration complète depuis Wix, fusion des deux structures, création du webdesign sur mesure et système de devis WooCommerce. Formation client au back-office WordPress.",
    features: ["Migration complète Wix → WordPress","Fusion de deux entités en un seul site cohérent","Webdesign sur mesure orienté B2B","Système de devis en ligne WooCommerce","Formation client au back-office WordPress","Avis client 5 étoiles"],
    chips: [{ label: "WordPress", cls: "fe" },{ label: "Elementor", cls: "fe" },{ label: "WooCommerce", cls: "fe" },{ label: "Migration Wix", cls: "tool" }]
  },
  alternativ: {
    title: "Alternativ' <em>Uniforme</em>",
    tag: "E-commerce · Vêtements professionnels",
    desc: "Gestion et développement des sites web d'une entreprise spécialisée en vêtements professionnels. Création et maintenance WordPress et e-commerce avec personnalisation produit sur mesure.",
    features: ["Sites vitrines WordPress","Gestion e-commerce WooCommerce","Personnalisation produit sur mesure","Optimisation SEO complète","Maintenance et support continu"],
    chips: [{ label: "WordPress", cls: "fe" },{ label: "WooCommerce", cls: "fe" },{ label: "PrestaShop", cls: "fe" },{ label: "SEO", cls: "tool" }]
  },
  eloustick: {
    title: "<em>Eloustick</em>",
    tag: "Agence · Digital · PrestaShop & WordPress",
    desc: "Mon agence de communication digitale, fondée en 2009. Pendant 6 ans, j'ai accompagné des PME locales sur leurs sites WordPress et boutiques PrestaShop. E-réputation 5/5 sur Google maintenue pendant 10 ans.",
    features: ["Sites vitrine WordPress sur mesure pour PME locales","Boutiques PrestaShop personnalisées","Identité visuelle et branding complet","Stratégie de communication digitale","SEO on-page et optimisation performances","E-réputation 5/5 Google maintenue 10 ans"],
    chips: [{ label: "WordPress", cls: "fe" },{ label: "PrestaShop", cls: "fe" },{ label: "Branding", cls: "tool" },{ label: "SEO", cls: "tool" }]
  },
  geonomia: {
    title: "<em>Geonomia</em>",
    tag: "Environnement · Bureau d'études B2B",
    desc: "Site pour un bureau d'études spécialisé en ingénierie environnementale. Le défi : rendre des sujets techniques accessibles à un prospect non-expert. Hiérarchie des contenus, appels à l'action et design épuré pour positionnement B2B crédible.",
    features: ["Design épuré pour positionnement B2B","Hiérarchisation des expertises techniques","Appels à l'action orientés prise de contact","SEO local et performances optimisées","Avis client 5 étoiles"],
    chips: [{ label: "WordPress", cls: "fe" },{ label: "Elementor", cls: "fe" },{ label: "Performance", cls: "tool" },{ label: "SEO", cls: "tool" }]
  }
};

const descPopup = document.getElementById("projDescPopup");
let activeDescBtn = null;

function buildPopupHTML(data) {
  const chips = data.chips.map((c) => `<span class="proj-desc-popup-chip ${c.cls}">${c.label}</span>`).join("");
  const feats = data.features.map((f) => `<li>${f}</li>`).join("");
  return `<div class="proj-desc-popup-header"><div class="proj-desc-popup-title">${data.title}</div><button class="proj-desc-popup-close" onclick="closeAllDescPopups()">✕</button></div><div class="proj-desc-popup-tag">${data.tag}</div><div class="proj-desc-popup-body">${data.desc}</div><ul class="proj-desc-popup-features">${feats}</ul><div class="proj-desc-popup-chips">${chips}</div>`;
}

function openDescPopup(btn, projectId) {
  const data = projectDescriptions[projectId];
  if (!data) return;
  if (activeDescBtn === btn && descPopup.classList.contains("open")) {
    closeAllDescPopups(); return;
  }
  activeDescBtn = btn;
  descPopup.innerHTML = buildPopupHTML(data);
  descPopup.classList.add("open");
  positionPopup(btn);
}

function positionPopup(btn) {
  const rect = btn.getBoundingClientRect();
  const pW = 440, pH = 380, vw = window.innerWidth, vh = window.innerHeight;
  let top = rect.bottom + 10, left = rect.left;
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
  if (!descPopup.contains(e.target) && !e.target.closest(".proj-desc-btn")) closeAllDescPopups();
});
window.addEventListener("scroll", () => {
  if (activeDescBtn && descPopup.classList.contains("open")) positionPopup(activeDescBtn);
}, { passive: true });

/* =============================================
   13. SÉLECTEUR DE CV
============================================= */
(function () {
  function activateCvBtn(type) {
    document.querySelectorAll(".cv-sel-btn").forEach((b) => b.classList.remove("active"));
    const btn = document.querySelector('[data-cv="' + type + '"]');
    if (btn) btn.classList.add("active");
  }
  document.querySelectorAll(".cv-sel-btn").forEach((btn) => {
    btn.addEventListener("click", () => { if (btn.dataset.cv) activateCvBtn(btn.dataset.cv); });
  });
  activateCvBtn("frontend");
})();

/* =============================================
   14. EASTER EGG CONSOLE
============================================= */
(function () {
  const s = {
    big: "font-size:18px;font-weight:bold;color:#8A9463;font-family:monospace;",
    name: "font-size:24px;font-weight:bold;color:#B87333;font-family:monospace;",
    sub: "font-size:12px;color:#C8C4B4;font-family:monospace;",
    link: "font-size:12px;color:#8A9463;font-family:monospace;text-decoration:underline;"
  };
  console.log("%c👋 Salut toi ! Petit dev en herbe ici !", s.big);
  console.log("%c  Sébastien Maurice", s.name);
  console.log("%c  Junior Full-Stack Developer · UX Explorer", s.sub);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  Tu explores le code ? Super curiosité !", s.sub);
  console.log("%c  J'apprends encore tous les jours 🌱", s.sub);
  console.log("%c  HTML · CSS · JS vanilla (oui, sans framework) 🚀", s.sub);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  Un grand merci à mes collègues pirates de O'clock 🏴‍☠️ :", s.sub);
  console.log("%c  Anne-so, Ludo, Richard, Juju, Valou, Céd et tous les autres !", s.sub);
  console.log("%c  ──────────────────────────────────────────", s.sub);
  console.log("%c  📬 overseb75@gmail.com", s.link);
  console.log("%c  🐙 github.com/sebastienmaurice", s.link);
  console.log("%c  💼 linkedin.com/in/sebastien-maurice/", s.link);
})();

/* =============================================
   15. EASTER EGG — GIT DUMBER
   Déclenché au clic sur la card Dev N'Dumber.
   Conservation intégrale du code original.
============================================= */
(function () {
  const MESSAGES = [
    { lines: ['<span class="gdb-cmd">$ git commit -m "first try"</span>', '<span class="gdb-err">⚠ Trop de fichiers modifiés… Ooops 😅</span>', '<span class="gdb-ok">✓ Commit envoyé… mes amis pirates de O\'clock approuveraient 🏴‍☠️</span>'], commit: 'a4f2c91 — "first try"' },
    { lines: ['<span class="gdb-cmd">$ git push origin main</span>', '<span class="gdb-err">⚠ Erreur : Permission refusée 😬</span>', '<span class="gdb-cmd">$ git push --force</span>', '<span class="gdb-ok">✓ Bon, j\'ai essayé, on verra bien 😅</span>'], commit: 'b3e9d12 — "push attempt"' },
    { lines: ['<span class="gdb-cmd">$ npm install</span>', '<span class="gdb-ok">added 1337 packages… wow 😳</span>', '<span class="gdb-err">⚠ 666 vulnérabilités 😱</span>', '<span class="gdb-ok">✓ npm audit fix… ou presque 😅</span>'], commit: 'c7a1b44 — "node_modules adventure"' },
    { lines: ['<span class="gdb-fun">// TODO: comprendre ce code un jour</span>', '<span class="gdb-err">← Toujours pas fait… 😅</span>', '', '<span class="gdb-ok">✓ Ça marche quand même 🙏</span>'], commit: 'dead420 — "temp stuff"' },
    { lines: ['<span class="gdb-cmd">$ git log --oneline</span>', '<span class="gdb-fun">"final"</span>', '<span class="gdb-fun">"final 2"</span>', '<span class="gdb-fun">"maybe final 3"</span>', '<span class="gdb-fun">"ok là je crois que c\'est bon"</span>', '<span class="gdb-err">"dernier commit ? pas sur..." 🤨</span>'], commit: 'f00ba44 — "last commit maybe"' },
    { lines: ['<span class="gdb-cmd">$ git stash</span>', '<span class="gdb-ok">Saved… quelque part 😅</span>', '', '<span class="gdb-err">⚠ 3 stash oubliés 😬</span>', '<span class="gdb-ok">✓ Futures fonctionnalités 🚀</span>'], commit: 'e2c8b91 — "stash mysteries"' },
    { lines: ['<span class="gdb-err">⚠️ 404 – Page introuvable !</span>', '<span class="gdb-ok">✓ Heureusement, Ludo va te faire ça bien 🧙‍♂️✨</span>', '<span class="gdb-fun">💡 Pas de panique, visuellement ça va déchirer !</span>'], commit: 'dead404 — "404 back Ludo"' },
    { lines: ['<span class="gdb-err">⚠ Ça plante encore…</span>', '<span class="gdb-err">Toujours pas compris pourquoi…</span>', '', '<span class="gdb-ok">✓ Ah, un point-virgule manquait 😅</span>'], commit: '1337c0d — "fix missing semicolon"' },
    { lines: ['<span class="gdb-cmd">$ git commit -m "projet presque fini"</span>', '<span class="gdb-fun">⚠ Anne-so dort devant son écran avec ses oreilles de chat sur le nez 😵</span>', '<span class="gdb-ok">✓ Mais le projet avance ! Courage 💪</span>'], commit: 'deadzzz — "anne-so night coding"' },
    { lines: ['<span class="gdb-cmd">$ git merge front-branch</span>', '<span class="gdb-err">⚠ Cédric râle : "ce site pue le front !" 😤</span>', '<span class="gdb-ok">✓ Mais on progresse quand même 💻🚀</span>', '<span class="gdb-fun">😉 Petit clin d\'œil à Cédric, mon backeux préféré ! 🏴‍☠️</span>'], commit: 'rageback — "cedric front rant"' }
  ];

  let gdVisible = false, gdMsgIndex = -1, gdHideTimer = null;

  function pickMessage() {
    let next;
    do { next = Math.floor(Math.random() * MESSAGES.length); } while (next === gdMsgIndex);
    gdMsgIndex = next;
    return MESSAGES[next];
  }

  function typeLines(el, lines, delay) {
    el.innerHTML = "";
    let lineIndex = 0;
    function nextLine() {
      if (lineIndex >= lines.length) return;
      const p = document.createElement("p");
      p.style.cssText = "margin:2px 0;opacity:0;transition:opacity .25s";
      p.innerHTML = lines[lineIndex];
      el.appendChild(p);
      requestAnimationFrame(() => { p.style.opacity = "1"; });
      lineIndex++;
      if (lineIndex < lines.length) setTimeout(nextLine, delay);
    }
    nextLine();
  }

  window.triggerGitDumber = function () {
    const overlay = document.getElementById("gitDumberOverlay");
    const msgEl = document.getElementById("gitDumberMsg");
    const commitEl = document.getElementById("gitDumberCommit");
    const img = overlay.querySelector(".gitdumber-img");
    if (gdVisible) {
      img.classList.remove("shake");
      void img.offsetWidth;
      img.classList.add("shake");
      const msg = pickMessage();
      typeLines(msgEl, msg.lines, 280);
      commitEl.textContent = msg.commit;
      if (gdHideTimer) clearTimeout(gdHideTimer);
      gdHideTimer = setTimeout(hideGitDumber, 9000);
      return;
    }
    gdVisible = true;
    const msg = pickMessage();
    overlay.classList.add("active");
    typeLines(msgEl, msg.lines, 300);
    commitEl.textContent = msg.commit;
    if (gdHideTimer) clearTimeout(gdHideTimer);
    gdHideTimer = setTimeout(hideGitDumber, 9000);
    console.log("%c🦊 Git Dumber a surgi du néant.", "font-size:14px;color:#B87333;font-family:monospace;font-weight:bold;");
    console.log('%c  git commit -m "easter egg discovered 🎉"', "font-size:12px;color:#8A9463;font-family:monospace;");
  };

  window.hideGitDumber = function () {
    if (!gdVisible) return;
    const overlay = document.getElementById("gitDumberOverlay");
    overlay.classList.remove("active");
    gdVisible = false;
    if (gdHideTimer) { clearTimeout(gdHideTimer); gdHideTimer = null; }
  };

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && gdVisible) hideGitDumber();
  });
})();
