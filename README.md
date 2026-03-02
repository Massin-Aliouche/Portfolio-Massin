# Mon Portfolio — ALIOUCHE Massin

🌐 **Mon site** : [massinaliouche.com](https://massinaliouche.com)

[![GitHub Pages](https://img.shields.io/badge/Hébergé-GitHub%20Pages-blue)](https://massinaliouche.com)

---

## 📋 Présentation

Je m'appelle **ALIOUCHE Massin**, je suis étudiant en **BTS SIO option SISR** (Services Informatiques aux Organisations — Solutions d'Infrastructure, Systèmes et Réseaux) en alternance chez **Sodiaal**.

J'ai conçu ce portfolio pour présenter à mon jury mon parcours, mes compétences techniques, les projets que j'ai réalisés en formation et en entreprise, ainsi que ma veille technologique axée sur la **cybersécurité**, les **réseaux** et l'**administration systèmes**.

Le site est entièrement statique — pas de framework back-end, pas de base de données — et il est hébergé sur **GitHub Pages** avec un domaine personnalisé.

---

## 🗂️ Pages du site

| Fichier | Contenu |
|---------|---------|
| `index.html` | Page d'accueil : qui je suis, mon projet professionnel post-BTS, la certification CCNA que je vise |
| `alternance.html` | Mon alternance chez Sodiaal : missions, environnement technique, conformité RGPD |
| `projets.html` | Vue d'ensemble de mes 7 projets avec filtres par catégorie |
| `competence.html` | Tableau de compétences BTS SIO avec liens vers les projets correspondants |
| `vt.html` | Veille technologique : flux RSS en temps réel + articles sélectionnés |
| `cv.html` | Mon CV avec aperçu PDF zoomable et téléchargement direct |
| `mentions-legales.html` | Mentions légales |

### Pages détaillées des projets (`savoirplus/`)

| Fichier | Projet |
|---------|--------|
| `proxmox.html` | Infrastructure Proxmox VE — virtualisation, AD, DHCP, DNS, pfSense, sécurisation, RAID vs sauvegarde |
| `glpi.html` | Déploiement GLPI & OCS Inventory en entreprise |
| `gsb.html` | Projet GSB — gestion des frais (contexte fictif PPE) |
| `5projets.html` | Renouvellement du parc Sodiaal — masterisation, déploiement, difficultés |
| `josslan.html` | La JossLan — événement e-sport, infrastructure réseau |
| `hackathon.html` | Hackathon 2025 — analyse du besoin, conception, soutenance orale |
| `atelier-soude.html` | L'Atelier Soudé / Linux Populus — diagnostic matériel, reconditionnement, installation Linux |

---

## 🛠️ Stack technique

### Frontend
- **HTML5** sémantique
- **Tailwind CSS** via CDN — framework utilitaire
- **Alpine.js 3.14.3** — interactions légères (accordéons, filtres, menu mobile)
- **Font Awesome 6.5.1** — icônes
- **Google Fonts** — Orbitron, Space Mono, Inter

### Fonctionnalités
- **PDF.js 3.11.174** — rendu PDF sur canvas avec zoom (molette Ctrl, boutons +/−)
- **Flux RSS en temps réel** — 4 sources (CERT-FR, The Hacker News, AI News, Network World) via API rss2json
- **Articles manuels de veille** — illustrés par des SVG personnalisés
- **Design responsive** mobile-first
- **Thème néon cyberpunk** — palette de couleurs personnalisée (cyan, vert, violet, rose)

### Sécurité
- En-têtes HTTP de sécurité (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`)
- **SRI** (Subresource Integrity) sur les CDN critiques
- `rel="noopener noreferrer"` sur tous les liens externes
- Échappement HTML des données RSS côté client

### Hébergement & CI/CD
- **GitHub Pages** — déploiement automatique à chaque push sur `main` via GitHub Actions
- **Cloudflare Worker** — proxy CORS pour les flux RSS
- **Netlify** (configuration alternative incluse dans `netlify.toml`)
- **GitHub Actions** — workflows `deploy-pages.yml` et `fetch-rss.yml`

---

## 📁 Arborescence

```
├── index.html                 # Accueil, projet pro, certification
├── alternance.html            # Alternance Sodiaal + RGPD
├── projets.html               # Grille de projets avec filtres
├── competence.html            # Tableau de compétences BTS SIO
├── cv.html                    # CV PDF zoomable
├── vt.html                    # Veille technologique (RSS + articles)
├── mentions-legales.html      # Mentions légales
├── assets/
│   ├── css/custom.css         # Variables CSS, animations, thème néon
│   ├── js/main.js             # Script principal (anti-FOUC, interactions)
│   ├── images/                # Photos, logos, illustrations SVG
│   ├── data/rss.json          # Cache des flux RSS
│   └── files/                 # PDF et documents téléchargeables
├── savoirplus/                # 7 pages détaillées de projets
├── cloudflare-worker/         # Worker proxy RSS (worker.js + wrangler.toml)
├── scripts/                   # Scripts utilitaires (fetch RSS en Python / PowerShell)
├── .github/workflows/         # CI/CD GitHub Actions
├── CNAME                      # Domaine personnalisé massinaliouche.com
├── netlify.toml               # Configuration Netlify alternative
├── sitemap.xml                # Plan du site pour le SEO
├── robots.txt                 # Directives pour les robots
└── _headers                   # En-têtes de sécurité Netlify
```

---

## 🚀 Lancer le site en local

C'est un site statique, donc n'importe quel serveur HTTP suffit :

```bash
# Avec Python
python -m http.server 8000

# Avec Node.js
npx serve .
```

Puis ouvrir [http://localhost:8000](http://localhost:8000).

> **Note** : les flux RSS nécessitent le Cloudflare Worker pour fonctionner (proxy CORS). En local, seuls les articles manuels et le cache `rss.json` s'affichent.

---

## 📊 Ce que j'ai mis en place

### Projets techniques
- **Proxmox VE** — infrastructure complète (AD, DHCP, DNS, pfSense, GPO, politique de mot de passe, sauvegarde)
- **GLPI / OCS Inventory** — gestion de parc et inventaire automatisé
- **Renouvellement parc Sodiaal** — masterisation USB, déploiement IPv4/switch, coordination utilisateurs
- **La JossLan** — infrastructure réseau pour un événement e-sport
- **GSB** — application métier dans un contexte PPE fictif
- **Hackathon 2025** — analyse du besoin, conception d'architecture, soutenance orale
- **L'Atelier Soudé** — reconditionnement de PC, diagnostic matériel, installation Linux

### Veille technologique
- 4 flux RSS automatisés (cybersécurité, IA, réseaux)
- Articles manuels illustrés : Ransomware Medusa, Microsoft Copilot for Security, failles VMware ESXi, détournement BGP Juniper

### Mon projet professionnel
- Je vise un **Bachelor Administrateur Systèmes, Réseaux, Cloud & Cybersécurité** après le BTS
- Je prépare la certification **CCNA** (Cisco Certified Network Associate)

---

## 👤 Me contacter

**ALIOUCHE Massin**
- 📧 Email : [massin.aliouche@gmail.com](mailto:massin.aliouche@gmail.com)
- 💼 LinkedIn : [aliouche-massin](https://www.linkedin.com/in/aliouche-massin/)
- 🐙 GitHub : [Massin-Aliouche](https://github.com/Massin-Aliouche)

---

© 2026 ALIOUCHE Massin — BTS SIO SISR — Portfolio Cybersécurité & Infrastructure
