# Angular frontend (GitHub Pages + Render API)

The SPA lives in `frontend-angular/`

- **Local dev:** from repo root, `npm run dev:ng` (API on port **2000**, `ng serve` proxies `/api` and `/data`).
- **Production build:** `npm run build:ng` → output in `frontend-angular/dist/frontend-angular/browser/`.
- **GitHub Pages:** `index.html` uses `<base href="/Portfolio/">` and **hash routing** (`/#/`, `/#/projects`, …). Deploy by copying the **browser** build output into your Pages folder (e.g. `docs/`) and pushing.
- **Render API:** `frontend-angular/src/app/config/api-base.ts` points `github.io` traffic at `https://portfolio-awnu.onrender.com/api`. Project images are bundled from `public/images` into `/images/...` on the static site.
- **.NET API:** `Portfolio.Api/` is the ASP.NET Core + EF Core Postgres API. Render should use Docker runtime with root `Dockerfile` and env var `ConnectionStrings__PortfolioDb`.

Populate **`docs/`** for GitHub Pages after each release:

```bash
npm run build:ng
rm -rf docs/*
cp -r frontend-angular/dist/frontend-angular/browser/* docs/
```

Then commit and push `docs/`.
