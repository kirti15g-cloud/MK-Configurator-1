# MillerKnoll Product Configurator

This repository contains a static product configurator web app built with HTML, CSS, and JavaScript.

## Files

- `index.html` — main page
- `style.css` — app styling
- `script.js` — UI interaction logic
- `viewer.js` — Sketchfab viewer integration
- `images/` — product finish preview assets

## Publish to GitHub Pages

### 1. Create a GitHub repository

Create a new repository on GitHub and note its HTTPS URL.

### 2. Add a remote and push

```powershell
cd "e:\Configurator with AI\MK-Configurator"
git remote add origin <repository-url>
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

On GitHub, open the repository settings and enable GitHub Pages from the `main` branch root.

### 4. Deploy automatically

A GitHub Actions workflow is included at `.github/workflows/pages.yml`. After pushing to `main`, the workflow will publish the contents of this repository to GitHub Pages.

## Notes

- This project uses the Sketchfab Viewer API to render a 3D model.
- `viewer.js` currently includes a placeholder URL for texture loading. Update it with valid asset URLs before publishing.
- There is no GitHub remote configured in the repository yet, so publishing requires setting one up.
