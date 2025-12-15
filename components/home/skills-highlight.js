// components/home/skills-highlight.js

import { loadAboutData } from "../about/about-data.js";

class SkillsHighlight extends HTMLElement {
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
            .skills-grid {
                display: grid;
                gap: 16px;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            }
            .skill-item {
                padding: 16px;
                background: linear-gradient(180deg, #0a1224, #0f172a);
                border: 1px solid var(--border, #1a2440);
                border-radius: 12px;
                text-align: center;
            }
            .skill-name {
                font-size: 1rem;
                margin: 0 0 8px;
                color: var(--text, #e5e7eb);
            }
            .skill-level {
                font-size: .85rem;
                color: var(--muted, #9aa4b2);
            }
            .skill-bar {
                height: 6px;
                background: #111a2c;
                border: 1px solid #1a2540;
                border-radius: 999px;
                overflow: hidden;
                margin-top: 8px;
            }
            .skill-fill {
                height: 100%;
                background: linear-gradient(90deg, #2f66c8, #60a5fa);
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
                .skills-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
            }
        `;

        const section = document.createElement("section");
        section.className = "section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "Skills";
        
        const grid = document.createElement("div");
        grid.className = "skills-grid";
        grid.id = "skills-grid";

        const cta = document.createElement("div");
        cta.className = "cta";
        const link = document.createElement("a");
        link.href = "about.html";
        link.className = "button";
        link.textContent = "View All Skills →";
        cta.appendChild(link);

        section.append(h2, grid, cta);
        this.shadowRoot.append(style, section);

        this.load();
    }

    async load() {
        const data = await loadAboutData();
        if (!data) return;

        const allSkills = [];
        (data.skills?.categories || []).forEach(cat => {
            (cat.items || []).forEach(item => {
                allSkills.push({
                    name: item.label,
                    value: Number(item.value || 0),
                    category: cat.title || cat.name
                });
            });
        });

        // Sort by value (highest first) and take top 6
        const topSkills = allSkills
            .filter(s => s.value >= 2) // Only show skills with level 2 or higher
            .sort((a, b) => b.value - a.value)
            .slice(0, 6);

        this.render(topSkills);
    }

    render(skills) {
        const grid = this.shadowRoot.getElementById('skills-grid');
        grid.textContent = '';

        if (!skills.length) {
            const p = document.createElement('p');
            p.style.color = 'var(--muted, #9aa4b2)';
            p.textContent = 'No skills available.';
            grid.appendChild(p);
            return;
        }

        skills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skill-item';

            const name = document.createElement('div');
            name.className = 'skill-name';
            name.textContent = skill.name;

            const level = document.createElement('div');
            level.className = 'skill-level';
            level.textContent = `${skill.value}/3`;

            const bar = document.createElement('div');
            bar.className = 'skill-bar';
            const fill = document.createElement('div');
            fill.className = 'skill-fill';
            const pct = (skill.value / 3) * 100;
            fill.style.width = `${pct}%`;
            bar.appendChild(fill);

            item.append(name, level, bar);
            grid.appendChild(item);
        });
    }
}

customElements.define("skills-highlight", SkillsHighlight);

