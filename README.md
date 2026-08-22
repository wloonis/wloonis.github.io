# wloonis.github.io — Animal Counter

Site statique (GitHub Pages) pour le projet **Animal Counter** (comptage de porcs
sur NVIDIA Jetson Orin Nano / K3s).

URL de publication : **https://wloonis.github.io** (GitHub Pages, branche
`main` / racine). Aucun build — HTML + CSS purs.

## Contenu

- `index.html` — page unique (hero, aperçu, architecture, fonctionnalités,
  companion, validation, galerie, liens).
- `assets/style.css` — styles (thème sombre, responsive).
- `assets/photos/` — emplacement pour les captures d'écran / photos (vides).
- `assets/videos/` — emplacement pour les vidéos (vides).

## Ajouter un média plus tard

Des **emplacements pointillés** (`.media-placeholder`) sont déjà en place dans
`index.html` pour chaque média à venir. Chaque emplacement contient un
commentaire HTML avec le markup exact à utiliser.

1. Déposez le fichier dans `assets/photos/` ou `assets/videos/` (les dossiers
   existent déjà).
2. Dans `index.html`, remplacez le bloc `.media-placeholder` correspondant par
   la balise `<img>` ou `<video>` indiquée dans le commentaire.

### Photo

```html
<img src="assets/photos/ma-photo.jpg" alt="description" />
```

### Vidéo

```html
<video controls preload="metadata" poster="assets/photos/mon-poster.png">
  <source src="assets/videos/ma-video.mp4" type="video/mp4" />
</video>
```

> 💡 Pour les vidéos, un `poster` (image de prévisualisation) donne un rendu
> propre avant la lecture ; mettez-le dans `assets/photos/`.

### Emplacements prévus (IDs dans index.html)

| ID | Type | Fichier attendu |
|----|------|-----------------|
| `ph-app-screenshot` | photo | `assets/photos/app-settings-maskzones.png` |
| `ph-validation-video` | vidéo | `assets/videos/validation-counting.mp4` |
| galerie photo 1 | photo | `assets/photos/frame-counting.jpg` |
| galerie photo 2 | photo | `assets/photos/mask-zones-overlay.jpg` |
| galerie vidéo 1 | vidéo | `assets/videos/clip-pigs-crossing.mp4` |
| galerie vidéo 2 | vidéo | `assets/videos/clip-multi-species.mp4` |
| galerie photo 3 / vidéo 3 | libres | `assets/photos/` · `assets/videos/` |

## Activer GitHub Pages

Le repo `wloonis.github.io` est un *user Pages site* : il se publie
automatiquement à `https://wloonis.github.io` quand la branche `main` est
servie depuis la racine. Vérifiez/activez :

- **Settings → Pages → Source = `Deploy from a branch` → Branch = `main` /
  `(root)`**.

La première publication prend ~1 min après le push.

## Mise à jour

Éditez `index.html` + `assets/style.css` puis :

```bash
git add -A && git commit -m "site: <message>" && git push
```

---

Sources : [animal-counter](https://github.com/wloonis/animal-counter) ·
[animal-counter-companion](https://github.com/wloonis/animal-counter-companion)