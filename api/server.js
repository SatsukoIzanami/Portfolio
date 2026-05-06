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
            "https://satsukoizanami.github.io"
        ]
    })
);

// Prefer React production build, else repo root (legacy static + /data).
const reactDistPath = path.join(__dirname, "../frontend-react/dist");
const repoRoot = path.join(__dirname, "..");
const staticRoot = fs.existsSync(reactDistPath) ? reactDistPath : repoRoot;

if (fs.existsSync(reactDistPath)) {
    console.log(`Static: React build from ${reactDistPath}`);
} else {
    console.log(`Static: repo root ${repoRoot} (run npm run build:react for SPA)`);
}

app.use(express.static(staticRoot));
// about.json and other JSON under /data (always from repo)
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

app.get("/api/about", async (_request, result) => {
    try {
        const jsonPath = path.join(__dirname, "..", "data", "about.json");
        const raw = await fsp.readFile(jsonPath, "utf-8");
        const data = JSON.parse(raw);
        result.json(data);
    } catch (err) {
        console.error("API Error:", err);
        result.status(500).json({ error: String(err?.message || err) });
    }
});

// SPA fallback — do not swallow /api or /data
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
