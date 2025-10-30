// components/projects-grid.js

class ProjectsGrid extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});

        
        // style
        const styleEl = document.createElement("style");
        styleEl.textContent = `
        :host{ display:block }
        .projects-grid{
            display:grid; gap:20px;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            margin-top:16px;}
        .card{
            background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
            border: 1px solid var(--border, #1a2440);
            border-radius: var(--radius, 16px);
            box-shadow: var(--shadow, 0 10px 30px rgba(0,0,0,.45));
            overflow:hidden; transition: transform .18s, border-color .18s;}
        .card:hover{ transform: translateY(-2px); border-color:#25355c; }
        .media{
            width:100%; aspect-ratio:16/10; object-fit:cover; display:block;
            border-bottom:1px solid var(--border, #1a2440); background:#0a1224;}
        .body{ padding:14px 14px 16px; }
        .meta{ display:flex; align-items:center; gap:8px; color:var(--muted,#9aa4b2); font-size:.9rem; margin-bottom:6px;}
        .chip{
            font-size:.8rem; padding:4px 8px; border-radius:999px;
            border:1px solid var(--border,#1a2440); background:#0a1224; color:#cdd3df;}
        .title{ font-size:1.1rem; margin:0 0 4px; color:var(--text,#e5e7eb) }
        .desc{ margin:0; color:var(--muted,#9aa4b2); line-height:1.45 }
        .status{ color:var(--muted,#9aa4b2); padding:8px 0; }
        `;
    
        // DOM
        this.loadingEl = document.createElement("div");
        this.loadingEl.className = "status";
        this.loadingEl.textContent = "Loading projects...";

        this.gridEl = document.createElement("section");
        this.gridEl.className = "projects-grid";
        this.gridEl.hidden = true;

        this.errorEl = document.createElement("div");
        this.errorEl.className = "status";
        this.errorEl.hidden = true;

        this.shadowRoot.append(styleEl, this.loadingEl, this.gridEl, this.errorEl);

        // Detect correct API endpoint depending on environment
        const isGitHubPages = window.location.hostname.includes('github.io');
        const isRender = window.location.hostname.includes('onrender.com');

        // Use Render API when on GitHub Pages, otherwise use local proxy
        this.apiUrl = isGitHubPages
        ? 'https://portfolio-awnu.onrender.com/api/projects'
        : isRender
            ? '/api/projects'
            : 'http://localhost:2000/api/projects';
    }

    connectedCallback() {
        this.load();
    }

    async load() {
        this._setLoading(true);
        try {
            const result = await fetch(this.apiUrl, {headers: {"Accept": "application/json"}});
            if (!result.ok) throw new Error(`HTTP ${result.status}`);
            const data = await result.json();
            const items = Array.isArray(data.projects) ? data.projects : [];
            this.render(items);
            this._setLoading(false);
        } catch (err) {
            this._setLoading(false);
            this._showError(`Could not load projects: ${err.message}`);
        }
    }

    _setLoading(on) {
        this.loadingEl.hidden = !on;
        if (on) {
            this.errorEl.hidden = true;
            this.gridEl.hidden = true;
            while (this.gridEl.firstChild) this.gridEl.removeChild(this.gridEl.firstChild);
        }
    }

    _showError(msg) {
        this.errorEl.textContent = msg;
        this.errorEl.hidden = false;
        this.gridEl.hidden = true;
    }

    render(items) {
        while (this.gridEl.firstChild) this.gridEl.removeChild(this.gridEl.firstChild);

        if (!items.length) {
            const pEl = document.createElement('p');
            pEl.className = "desc";
            pEl.textContent = "No projects found.";
            this.gridEl.appendChild(pEl);
            this.gridEl.hidden = false;
            return;
        }

        for (const p of items) {
            const cardEl = document.createElement('article');
            cardEl.className = "card";

            const imgEl = document.createElement('img');
            imgEl.className = "media";
            imgEl.alt = (p?.name || "Project") + " thumbnail";
            if (p?.img) {
                const base = import.meta.env.BASE_URL;
                imgEl.src = p.img.startsWith('http')
                    ? p.img
                    : `${base}${p.img}`;
            }

            const bodyEl = document.createElement('div');
            bodyEl.className = "body";

            const metaEl = document.createElement('div');
            metaEl.className = "meta";

            const chipEl = document.createElement('span');
            chipEl.className = "chip";
            chipEl.textContent = p?.year || "";

            metaEl.appendChild(chipEl);

            const titleEl = document.createElement('h3');
            titleEl.className = "title";
            titleEl.textContent = p?.name || "Untitled Project";

            const descEl = document.createElement('p');
            descEl.className = "desc";
            descEl.textContent = p?.desc || "";

            bodyEl.append(metaEl, titleEl, descEl);
            cardEl.append(imgEl, bodyEl);

            this.gridEl.appendChild(cardEl);
        }

        this.gridEl.hidden = false;
    }
}

customElements.define("projects-grid", ProjectsGrid);