import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { promises as fsp } from "fs";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 2000;

app.use(
    cors({
        origin: [
            "http://127.0.0.1:5500",
            "http://localhost:5500",
            "http://localhost:5173",
            "http://localhost:4200",
            "https://satsukoizanami.github.io"
        ]
    })
);

// Prefer Angular production build, then repo root (legacy static + /data).
const angularBrowserDistPath = path.join(
    __dirname,
    "../frontend-angular/dist/frontend-angular/browser"
);
const repoRoot = path.join(__dirname, "..");
const staticRoot = fs.existsSync(angularBrowserDistPath) ? angularBrowserDistPath : repoRoot;

if (fs.existsSync(angularBrowserDistPath)) {
    console.log(`Static: Angular build from ${angularBrowserDistPath}`);
} else {
    console.log(`Static: repo root ${repoRoot} (run npm run build:ng for SPA)`);
}

app.use(express.static(staticRoot));
// about.json and other JSON under /data (always from repo, even when SPA is Angular dist)
app.use("/data", express.static(path.join(repoRoot, "data")));

// api endpoint read
app.get("/api/projects", async (_request, result) => {
    try {
        const jsonPath = path.join(__dirname, "..", "data", "projects.json");
        const raw = await fsp.readFile(jsonPath, "utf-8");
        const data = JSON.parse(raw);
        result.json(data);
    } catch (err) {
        console.error("API Error:", err);
        result.status(500).json({ error: String(err?.message || err) });
    }
});

// SPA fallback (Angular) — do not swallow /api or /data
app.use((req, res, next) => {
    if (req.path.startsWith("/api") || req.path.startsWith("/data")) {
        return next();
    }
    const indexPath = path.join(staticRoot, "index.html");
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).send("Not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
