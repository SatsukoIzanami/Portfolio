// components/home/featured-projects.js

class FeaturedProjects extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
    }

    connectedCallback() {
        const style = document.createElement("style");
        style.textContent = `
            :host { display: block; }
            .section {
                margin: 32px 0;
                padding: 24px;
                background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
                border: 1px solid var(--border, #1a2440);
                border-radius: var(--radius, 16px);
                box-shadow: var(--shadow, 0 10px 30px rgba(0,0,0,.45));
            }
            h2 {
                margin: 0 0 20px;
                font-size: clamp(22px, 3.8vw, 32px);
            }
            .projects-grid {
                display: grid;
                gap: 20px;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            }
            .card {
                background: linear-gradient(180deg, #0a1224, #0f172a);
                border: 1px solid var(--border, #1a2440);
                border-radius: 12px;
                overflow: hidden;
                transition: transform .18s, border-color .18s;
            }
            .card:hover {
                transform: translateY(-2px);
                border-color: #25355c;
            }
            .media {
                width: 100%;
                aspect-ratio: 16/10;
                object-fit: cover;
                display: block;
                border-bottom: 1px solid var(--border, #1a2440);
                background: #0a1224;
            }
            .body {
                padding: 16px;
            }
            .meta {
                display: flex;
                align-items: center;
                gap: 8px;
                color: var(--muted, #9aa4b2);
                font-size: .9rem;
                margin-bottom: 8px;
            }
            .chip {
                font-size: .8rem;
                padding: 4px 8px;
                border-radius: 999px;
                border: 1px solid var(--border, #1a2440);
                background: #0a1224;
                color: #cdd3df;
            }
            .title {
                font-size: 1.1rem;
                margin: 0 0 6px;
                color: var(--text, #e5e7eb);
            }
            .desc {
                margin: 0;
                color: var(--muted, #9aa4b2);
                line-height: 1.45;
                font-size: .95rem;
            }
            .cta {
                margin-top: 20px;
                text-align: center;
            }
            .button {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 14px;
                border-radius: 999px;
                border: 1px solid #1b2a4a;
                background: #0a1224;
                color: #d7dbe6;
                font-size: var(--size-sm, .9rem);
                cursor: pointer;
                transition: border-color .18s ease;
            }
            .button:hover {
                border-color: #2a4478;
                text-decoration: none;
            }
            @media (max-width: 640px) {
                .projects-grid {
                    grid-template-columns: 1fr;
                }
            }
        `;

        const section = document.createElement("section");
        section.className = "section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "Featured Projects";
        
        const grid = document.createElement("div");
        grid.className = "projects-grid";
        grid.id = "projects-grid";

        const cta = document.createElement("div");
        cta.className = "cta";
        const link = document.createElement("a");
        link.href = "projects.html";
        link.className = "button";
        link.textContent = "View All Projects →";
        cta.appendChild(link);

        section.append(h2, grid, cta);
        this.shadowRoot.append(style, section);

        this.load();
    }

    async load() {
        const isGitHubPages = window.location.hostname.includes('github.io');
        const isRender = window.location.hostname.includes('onrender.com');
        
        const apiUrl = isGitHubPages
            ? 'https://portfolio-awnu.onrender.com/api/projects'
            : isRender
            ? '/api/projects'
            : 'http://localhost:2000/api/projects';

        try {
            const result = await fetch(apiUrl, {headers: {"Accept": "application/json"}});
            if (!result.ok) throw new Error(`HTTP ${result.status}`);
            const data = await result.json();
            const items = Array.isArray(data.projects) ? data.projects : [];
            // Show only first 3 projects
            this.render(items.slice(0, 3));
        } catch (err) {
            console.error('Failed to load projects:', err);
            const grid = this.shadowRoot.getElementById('projects-grid');
            grid.innerHTML = '<p style="color: var(--muted, #9aa4b2);">Unable to load projects.</p>';
        }
    }

    render(items) {
        const grid = this.shadowRoot.getElementById('projects-grid');
        grid.textContent = '';

        if (!items.length) {
            const p = document.createElement('p');
            p.style.color = 'var(--muted, #9aa4b2)';
            p.textContent = 'No projects available.';
            grid.appendChild(p);
            return;
        }

        for (const p of items) {
            const card = document.createElement('article');
            card.className = 'card';

            const img = document.createElement('img');
            img.className = 'media';
            img.alt = (p?.name || "Project") + " thumbnail";
            if (p?.img) {
                const base = import.meta.env.BASE_URL;
                img.src = p.img.startsWith('http')
                    ? p.img
                    : `${base}${p.img}`;
            }

            const body = document.createElement('div');
            body.className = 'body';

            const meta = document.createElement('div');
            meta.className = 'meta';

            const chip = document.createElement('span');
            chip.className = 'chip';
            chip.textContent = p?.year || "";

            meta.appendChild(chip);

            const title = document.createElement('h3');
            title.className = 'title';
            title.textContent = p?.name || "Untitled Project";

            const desc = document.createElement('p');
            desc.className = 'desc';
            desc.textContent = p?.desc || "";

            body.append(meta, title, desc);
            card.append(img, body);
            grid.appendChild(card);
        }
    }
}

customElements.define("featured-projects", FeaturedProjects);

