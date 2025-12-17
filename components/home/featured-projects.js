// components/home/featured-projects.js

class FeaturedProjects extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const section = document.createElement("section");
        section.className = "featured-projects-section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "Featured Projects";
        
        const grid = document.createElement("div");
        grid.className = "featured-projects-grid";
        grid.id = "projects-grid";

        const cta = document.createElement("div");
        cta.className = "featured-projects-cta";
        const link = document.createElement("a");
        link.href = "projects.html";
        link.className = "featured-projects-button";
        link.textContent = "View All Projects →";
        cta.appendChild(link);

        section.append(h2, grid, cta);
        this.appendChild(section);

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
            const grid = this.querySelector('#projects-grid');
            grid.innerHTML = '<p style="color: var(--muted, #9aa4b2);">Unable to load projects.</p>';
        }
    }

    render(items) {
        const grid = this.querySelector('#projects-grid');
        grid.textContent = '';

        if (!items.length) {
            const p = document.createElement('p');
            p.className = 'featured-projects-empty';
            p.textContent = 'No projects available.';
            grid.appendChild(p);
            return;
        }

        for (const p of items) {
            const card = document.createElement('article');
            card.className = 'featured-projects-card';

            const img = document.createElement('img');
            img.className = 'featured-projects-media';
            img.alt = (p?.name || "Project") + " thumbnail";
            if (p?.img) {
                const base = import.meta.env.BASE_URL;
                img.src = p.img.startsWith('http')
                    ? p.img
                    : `${base}${p.img}`;
            }

            const body = document.createElement('div');
            body.className = 'featured-projects-body';

            const meta = document.createElement('div');
            meta.className = 'featured-projects-meta';

            const chip = document.createElement('span');
            chip.className = 'featured-projects-chip';
            chip.textContent = p?.year || "";

            meta.appendChild(chip);

            const title = document.createElement('h3');
            title.className = 'featured-projects-title';
            title.textContent = p?.name || "Untitled Project";

            const desc = document.createElement('p');
            desc.className = 'featured-projects-desc';
            desc.textContent = p?.desc || "";

            body.append(meta, title, desc);
            card.append(img, body);
            grid.appendChild(card);
        }
    }
}

customElements.define("featured-projects", FeaturedProjects);

