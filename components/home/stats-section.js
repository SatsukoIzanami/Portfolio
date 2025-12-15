// components/home/stats-section.js

import { loadAboutData } from "../about/about-data.js";

class StatsSection extends HTMLElement {
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
                margin: 0 0 24px;
                font-size: clamp(22px, 3.8vw, 32px);
                text-align: center;
            }
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                gap: 20px;
            }
            .stat-item {
                text-align: center;
                padding: 20px;
                background: linear-gradient(180deg, #0a1224, #0f172a);
                border: 1px solid var(--border, #1a2440);
                border-radius: 12px;
            }
            .stat-number {
                font-size: 2.5rem;
                font-weight: 700;
                color: var(--brand, #6ee7f5);
                margin: 0 0 8px;
                line-height: 1;
            }
            .stat-label {
                font-size: .95rem;
                color: var(--muted, #9aa4b2);
                margin: 0;
            }
            @media (max-width: 640px) {
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                .stat-number {
                    font-size: 2rem;
                }
            }
        `;

        const section = document.createElement("section");
        section.className = "section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "By The Numbers";
        
        const grid = document.createElement("div");
        grid.className = "stats-grid";
        grid.id = "stats-grid";

        section.append(h2, grid);
        this.shadowRoot.append(style, section);

        this.load();
    }

    async load() {
        // Load projects count
        const isGitHubPages = window.location.hostname.includes('github.io');
        const isRender = window.location.hostname.includes('onrender.com');
        
        const apiUrl = isGitHubPages
            ? 'https://portfolio-awnu.onrender.com/api/projects'
            : isRender
            ? '/api/projects'
            : 'http://localhost:2000/api/projects';

        let projectCount = 0;
        try {
            const result = await fetch(apiUrl, {headers: {"Accept": "application/json"}});
            if (result.ok) {
                const data = await result.json();
                projectCount = Array.isArray(data.projects) ? data.projects.length : 0;
            }
        } catch (err) {
            console.error('Failed to load projects count:', err);
        }

        // Load about data for skills count
        const aboutData = await loadAboutData();
        
        let skillsCount = 0;
        if (aboutData?.skills?.categories) {
            aboutData.skills.categories.forEach(cat => {
                skillsCount += (cat.items || []).length;
            });
        }

        // Calculate years of experience (from timeline)
        let yearsExperience = 0;
        if (aboutData?.timeline) {
            const currentYear = new Date().getFullYear();
            const earliestStart = Math.min(...aboutData.timeline.map(t => parseInt(t.start) || currentYear));
            yearsExperience = currentYear - earliestStart;
        }

        this.render([
            { number: projectCount, label: "Projects" },
            { number: skillsCount, label: "Skills" },
            { number: yearsExperience, label: "Years Experience" },
            { number: 2025, label: "Graduation Year" }
        ]);
    }

    render(stats) {
        const grid = this.shadowRoot.getElementById('stats-grid');
        grid.textContent = '';

        stats.forEach(stat => {
            const item = document.createElement('div');
            item.className = 'stat-item';

            const number = document.createElement('div');
            number.className = 'stat-number';
            number.textContent = stat.number;

            const label = document.createElement('p');
            label.className = 'stat-label';
            label.textContent = stat.label;

            item.append(number, label);
            grid.appendChild(item);
        });
    }
}

customElements.define("stats-section", StatsSection);

