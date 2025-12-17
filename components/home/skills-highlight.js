// components/home/skills-highlight.js

import { loadAboutData } from "../about/about-data.js";

class SkillsHighlight extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const section = document.createElement("section");
        section.className = "skills-highlight-section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "Skills";
        
        const grid = document.createElement("div");
        grid.className = "skills-highlight-grid";
        grid.id = "skills-grid";

        const cta = document.createElement("div");
        cta.className = "skills-highlight-cta";
        const link = document.createElement("a");
        link.href = "about.html";
        link.className = "skills-highlight-button";
        link.textContent = "View All Skills →";
        cta.appendChild(link);

        section.append(h2, grid, cta);
        this.appendChild(section);

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
        const grid = this.querySelector('#skills-grid');
        grid.textContent = '';

        if (!skills.length) {
            const p = document.createElement('p');
            p.className = 'skills-highlight-empty';
            p.textContent = 'No skills available.';
            grid.appendChild(p);
            return;
        }

        skills.forEach(skill => {
            const item = document.createElement('div');
            item.className = 'skills-highlight-item';

            const name = document.createElement('div');
            name.className = 'skills-highlight-name';
            name.textContent = skill.name;

            const level = document.createElement('div');
            level.className = 'skills-highlight-level';
            level.textContent = `${skill.value}/3`;

            const bar = document.createElement('div');
            bar.className = 'skills-highlight-bar';
            const fill = document.createElement('div');
            fill.className = 'skills-highlight-fill';
            const pct = (skill.value / 3) * 100;
            fill.style.width = `${pct}%`;
            bar.appendChild(fill);

            item.append(name, level, bar);
            grid.appendChild(item);
        });
    }
}

customElements.define("skills-highlight", SkillsHighlight);

