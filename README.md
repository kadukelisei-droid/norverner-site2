# Nor Verner Website

A responsive dark-theme web novel site scaffold for norverner.com.

## What is included

- `index.html` — single-page layout with sections for home, chapters, characters, power system, world, gallery, and Discord.
- `assets/css/style.css` — dark modern styling with responsive support.
- `assets/js/app.js` — renders chapters, characters, gallery, and updates.
- `data/` — JSON content files for chapters, characters, gallery, and updates.

## How to update content

Update the JSON files in `data/`:

- `data/chapters.json`
- `data/characters.json`
- `data/gallery.json`
- `data/updates.json`

Then reload `index.html` from a local server environment to see the changes. The site also includes a dedicated chapter reader at `chapter.html?id=1`.

## GitHub Pages deploy

1. Push all files to your GitHub repo.
2. In repository Settings -> Pages, choose branch `main` and folder `/ (root)`.
3. Add `CNAME` with your domain `norverner.com`.
4. Set DNS for your domain:
   - `A` records to GitHub Pages IPs: `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - or a `CNAME` to `kadukelisei-droid.github.io` if your registrar supports it.

After DNS propagation, your site should work at `https://norverner.com`.

## Recommended local preview

Use a simple static server such as:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000` in your browser.

## Next steps

- Add chapter pages or chapter viewer logic.
- Replace placeholder images with original artwork.
- Update the Discord link with your actual invite.
- Add SEO metadata and structured data for better search results.
