# Portfolio — Sébastien Maurice
## Front-End Developer & Product Designer UX

---

## 📁 Structure des fichiers

```
portfolio/
├── index.html              ← Page principale
├── css/
│   └── style.css           ← Tous les styles CSS
├── js/
│   └── main.js             ← Tout le JavaScript
└── assets/
    ├── img/
    │   ├── seb.png                          ← Photo de profil
    │   ├── cinedelices-homepage.jpg         ← Ciné Délices — Accueil
    │   ├── cinedelices-mood.jpg             ← Ciné Délices — Ambiance
    │   ├── cinedelices-recipe-detail-1.jpg  ← Ciné Délices — Recette détail
    │   ├── cinedelices-recipe-page.jpg      ← Ciné Délices — Page recettes
    │   ├── devndumber-1.jpg                 ← Dev N'Dumber — Vue 1
    │   ├── devndumber-2.jpg                 ← Dev N'Dumber — Vue 2
    │   └── devndumber-3.jpg                 ← Dev N'Dumber — Vue 3
    └── cv/
        ├── cv-frontend-developer.pdf        ← CV Front-End Developer UX
        └── cv-product-designer.pdf          ← CV Product Designer UX
```

---

## ✅ Fonctionnalités

### 1. Téléchargement de CV (2 versions)
- Bouton **⚡ Front-End Developer** → `assets/cv/cv-frontend-developer.pdf`
- Bouton **🎨 Product Designer** → `assets/cv/cv-product-designer.pdf`
- Disponible dans le hero ET dans le tab CV
- **⚠️ Placez vos fichiers PDF dans `assets/cv/` avant de déployer**

### 2. Organic Banner
- Section `#organic` positionnée **juste au-dessus du footer**

### 3. Contact visible sans cliquer
- Email + téléphone dans la **navbar** (desktop)
- Email + téléphone dans le **footer**
- **⚠️ Remplacez `+33 6 XX XX XX XX` par votre vrai numéro**

### 4. Mode Présentation Recruteur
- Bouton flottant en bas à droite
- Masque les détails techniques (stack, chips, code)
- Met en valeur les projets et descriptions

### 5. Blur Quote Effect
- Citation animée mot par mot avec filtre CSS blur
- Chaque mot a sa propre durée/délai/valeur de flou (`data-*`)
- Boucle automatique + re-déclenche au clic

### 6. Slideshow images projets
- **Ciné Délices** : 4 images en rotation automatique (3s)
- **Dev N'Dumber** : 3 images en rotation automatique
- Pause au survol, reprise en quittant
- Indicateurs dots cliquables

---

## 🚀 Déploiement GitHub Pages

```bash
git init
git add .
git commit -m "feat: portfolio Sébastien Maurice 2026"
git remote add origin https://github.com/sebastienmaurice/portfolio.git
git push -u origin main
```

Puis dans Settings → Pages → Source: `main` branch

---

## 🌿 Tech Stack

- HTML5 sémantique
- CSS3 (custom properties, grid, flexbox, animations, blur)
- JavaScript ES6+ vanilla — zéro framework front
- Canvas 2D (particules interactives)
- IntersectionObserver (reveal scroll)
- CSS 3D Transforms (card tilt)

---

*Créé avec amour — Caudry, France*
