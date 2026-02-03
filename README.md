# Portfolio - Massin Aliouche

🌐 **Site déployé** : [massinaliouche.com](https://massinaliouche.com)

---

## Documentation rapide

### Thèmes & palettes

- Un **toggle** (soleil/lune) dans l'en-tête bascule entre le thème sombre par défaut et un thème **Bright**. La préférence est sauvegardée dans `localStorage`.
- J'ai ajouté deux **presets de palettes** : **Pastel** et **Vibrant**. Tu peux les choisir via le sélecteur de palettes dans l'en-tête (icônes couleurs). La sélection est persistée dans `localStorage`.
- Techniques : les thèmes/palettes appliquent des variables CSS au `:root` via des classes (`theme-bright`, `theme-pastel`, `theme-vibrant`).

### Déploiement

- Le site est déjà configuré pour GitHub Pages via `.github/workflows/deploy-pages.yml` (publish à chaque push sur `main`).
- Pour **Netlify** : ajout d'un fichier `netlify.toml` (présent dans le dépôt) ; tu peux utiliser un bouton **Deploy to Netlify** (manuellement depuis l'UI Netlify) pour créer un site avec previews branch par branch.
