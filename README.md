# Portfolio - ALIOUCHE Massin

🌐 **Site en ligne** : [massinaliouche.com](https://massinaliouche.com)

[![GitHub Pages](https://img.shields.io/badge/Deployed-GitHub%20Pages-blue)](https://massinaliouche.com)

---

## 📋 Description

Portfolio professionnel d'ALIOUCHE Massin, étudiant en **BTS SIO SISR** (Services Informatiques aux Organisations - Solutions d'Infrastructure, Systèmes et Réseaux) en alternance chez **Sodiaal**.

Ce site présente mon parcours, mes compétences, mes projets réalisés et ma veille technologique dans les domaines de la cybersécurité et de l'administration systèmes.

---

## 🗂️ Structure du site

| Page | Description |
|------|-------------|
| `index.html` | Page d'accueil avec présentation personnelle |
| `alternance.html` | Présentation de mon entreprise d'alternance (Sodiaal) |
| `projets.html` | Liste des projets réalisés en formation et en entreprise |
| `competence.html` | Tableau de compétences BTS SIO avec liens vers les projets |
| `vt.html` | Veille technologique avec flux RSS en temps réel |
| `cv.html` | CV avec aperçu PDF zoomable et téléchargement |
| `mentions-legales.html` | Mentions légales du site |

### Pages détaillées des projets (`savoirplus/`)

- `proxmox.html` - Infrastructure Proxmox VE complète
- `josslan.html` - Projet JossLan Esport
- `glpi.html` - Déploiement GLPI/OCS Inventory
- `gsb.html` - Projet GSB (Gestion des Frais)
- `hackathon.html` - Participation au Hackathon
- `5projets.html` - Présentation des 5 projets principaux
- `atelier-soude.html` - Projet Atelier des Soudes

---

## 🛠️ Technologies utilisées

### Frontend
- **HTML5** - Structure sémantique
- **Tailwind CSS** (CDN) - Framework CSS utilitaire
- **Alpine.js 3.14.3** - Framework JavaScript léger
- **Font Awesome 6.5.1** - Icônes
- **Google Fonts** - Orbitron, Space Mono, Inter

### Fonctionnalités
- **PDF.js 3.11.174** - Rendu PDF canvas avec zoom
- **Flux RSS** - Agrégation via API rss2json
- **Responsive Design** - Mobile-first
- **Thème personnalisé** - Palette néon cyberpunk

### Sécurité
- Headers de sécurité (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- SRI (Subresource Integrity) sur les CDN critiques
- `rel="noopener noreferrer"` sur tous les liens externes
- Échappement HTML des données RSS

### Hébergement
- **GitHub Pages** - Déploiement automatique
- **Netlify** (optionnel) - Configuration incluse
- **Cloudflare Worker** - Proxy RSS CORS

---

## 📁 Arborescence

```
├── index.html                 # Page d'accueil
├── alternance.html            # Page alternance
├── projets.html               # Page projets
├── competence.html            # Page compétences
├── cv.html                    # Page CV
├── vt.html                    # Page veille technologique
├── mentions-legales.html      # Mentions légales
├── assets/
│   ├── css/
│   │   └── custom.css         # Styles personnalisés
│   ├── js/
│   │   └── main.js            # JavaScript principal
│   ├── images/                # Images du site
│   └── files/                 # PDF et documents
├── savoirplus/                # Pages détaillées des projets
├── cloudflare-worker/         # Worker proxy RSS
├── scripts/                   # Scripts utilitaires
├── .github/workflows/         # CI/CD GitHub Actions
├── netlify.toml               # Configuration Netlify
├── sitemap.xml                # Plan du site
├── robots.txt                 # Directives robots
└── _headers                   # Headers Netlify
```

---

## 🚀 Déploiement

### GitHub Pages (actuel)
Le site est automatiquement déployé via GitHub Actions à chaque push sur `main`.

### Netlify (alternatif)
1. Connecter le repo à Netlify
2. La configuration `netlify.toml` est déjà présente
3. Déploiement automatique avec previews par branche

---

## 📊 Fonctionnalités principales

### Aperçu CV avec zoom
- Rendu PDF via PDF.js sur canvas
- Contrôles de zoom (+/- et molette Ctrl)
- Navigation scrollable

### Veille technologique
- 4 flux RSS en temps réel :
  - CERT-FR (alertes sécurité)
  - The Hacker News (cybersécurité)
  - AI News (intelligence artificielle)
  - Network World (réseaux & IT)
- Articles sélectionnés manuellement

### Tableau de compétences
- Iframe intégré avec ajustement automatique de hauteur
- Liens vers les projets correspondants
- Export HTML disponible

---

## 📝 Notes de développement

### Google Analytics
Les pages contiennent un placeholder `G-XXXXXXXXXX` pour Google Analytics. Remplacer par votre ID réel ou supprimer si non utilisé.

### Images Open Graph
Le fichier `og-image.png` est référencé mais doit être créé pour un partage optimal sur les réseaux sociaux. Taille recommandée : 1200x630px.

---

## 👤 Auteur

**ALIOUCHE Massin**
- 📧 Email : massin.aliouche@gmail.com
- 💼 LinkedIn : [aliouche-massin](https://www.linkedin.com/in/aliouche-massin/)
- 🐙 GitHub : [Massin-Aliouche](https://github.com/Massin-Aliouche)

---

© 2026 ALIOUCHE Massin | BTS SIO SISR | Portfolio Tech/Cybersécurité
