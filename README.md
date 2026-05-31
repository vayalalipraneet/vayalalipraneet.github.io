# Praneet Vayalali — Portfolio

Personal portfolio site, deployed at <https://vayalalipraneet.github.io>.

## Files

- `index.html` — entry point
- `portfolio-min.jsx` — React app (transpiled in-browser via Babel)
- `tweaks-panel.jsx` — design-tweaks panel (drag-handle UI for live customization)
- `styles-min.css` — design system + section styles
- `data.js` — biography, experience, publications, awards, skills (single source of truth)
- `images/` — photos and placeholders referenced by the page
- `praneet_vayalali_resume.pdf` — downloaded by the "Download CV" button

## Local preview

The site is static — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

then visit <http://localhost:8000>.

## Deploy

GitHub Pages serves from `main` by default. To preview a redesign on a dev branch first:

```bash
git checkout -b dev
git add -A
git commit -m "Redesign portfolio"
git push -u origin dev
```

Then in repo Settings → Pages, temporarily switch the source to `dev` to verify, then merge to `main` when ready.

## Edit content

All copy lives in `data.js`. Updating a publication, project, or skill is a one-line edit there — no need to touch the JSX.
