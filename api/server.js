import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs/promises";
import cors from "cors";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 2000;

app.use(cors({ 
    origin: [
        "http://127.0.0.1:5500", "http://localhost:5500", "http://localhost:5173"] }));

// serve static site
app.use(express.static(path.join(__dirname, "..")));

// api endpoint read
app.get("/api/projects", async (_request, result) => {
    try {
        const jsonPath = path.join(__dirname, "..", "data", "projects.json");
        console.log("READ:", jsonPath);
        const raw = await fs.readFile(jsonPath, "utf-8");
        const data = JSON.parse(raw);
        result.json(data);
    } catch (err) {
        console.error("API Error:", err);
        result.status(500).json({ error: String(err?.message || error) });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});