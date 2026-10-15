# Marsa School — marsa.school
Interactive bilingual (AR RTL / FR) maths lessons for the Mauritanian scientific Baccalauréat. Independent project, **not official ministry content**.

Static site, no build step, no dependencies. Run locally: `cd public && python3 -m http.server` then open http://localhost:8000.

## Add a lesson
Create `public/js/lessons/<id>.js` calling `LESSONS.push({id, icon, title, summary, steps, widget(el,T), quiz})` (copy an existing one), then add a `<script>` tag in `public/index.html`.

## Deploy (Cloudflare)
`npx wrangler deploy` (uses `wrangler.jsonc`, serves `public/` as Workers static assets). Custom domain: add `marsa.school` in Workers → Settings → Domains (zone must be on Cloudflare).
