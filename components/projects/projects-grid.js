// components/projects-grid.js

class ProjectsGrid extends HTMLElement {
    constructor() {
        super();
        
        // DOM
        this.loadingEl = document.createElement("div");
        this.loadingEl.className = "projects-grid-status";
        this.loadingEl.textContent = "Loading projects...";

        this.gridEl = document.createElement("section");
        this.gridEl.className = "projects-grid-grid";
        this.gridEl.hidden = true;

        this.errorEl = document.createElement("div");
        this.errorEl.className = "projects-grid-status";
        this.errorEl.hidden = true;

        this.appendChild(this.loadingEl);
        this.appendChild(this.gridEl);
        this.appendChild(this.errorEl);

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
            pEl.className = "projects-grid-desc";
            pEl.textContent = "No projects found.";
            this.gridEl.appendChild(pEl);
            this.gridEl.hidden = false;
            return;
        }

        for (const p of items) {
            const cardEl = document.createElement('article');
            cardEl.className = "projects-grid-card";

            const imgEl = document.createElement('img');
            imgEl.className = "projects-grid-media";
            imgEl.alt = (p?.name || "Project") + " thumbnail";
            if (p?.img) {
                const base = import.meta.env.BASE_URL;
                imgEl.src = p.img.startsWith('http')
                    ? p.img
                    : `${base}${p.img}`;
            }

            const bodyEl = document.createElement('div');
            bodyEl.className = "projects-grid-body";

            const metaEl = document.createElement('div');
            metaEl.className = "projects-grid-meta";

            const chipEl = document.createElement('span');
            chipEl.className = "projects-grid-chip";
            chipEl.textContent = p?.year || "";

            metaEl.appendChild(chipEl);

            const titleEl = document.createElement('h3');
            titleEl.className = "projects-grid-title";
            titleEl.textContent = p?.name || "Untitled Project";

            const descEl = document.createElement('p');
            descEl.className = "projects-grid-desc";
            descEl.textContent = p?.desc || "";

            bodyEl.append(metaEl, titleEl, descEl);
            cardEl.append(imgEl, bodyEl);

            this.gridEl.appendChild(cardEl);
        }

        this.gridEl.hidden = false;
    }
}

customElements.define("projects-grid", ProjectsGrid);