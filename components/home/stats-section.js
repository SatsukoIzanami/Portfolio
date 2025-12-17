// components/home/stats-section.js

import { loadAboutData } from "../about/about-data.js";

class StatsSection extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const section = document.createElement("section");
        section.className = "stats-section-section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "By The Numbers";
        
        const grid = document.createElement("div");
        grid.className = "stats-section-grid";
        grid.id = "stats-grid";

        section.append(h2, grid);
        this.appendChild(section);

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
        const grid = this.querySelector('#stats-grid');
        grid.textContent = '';

        stats.forEach(stat => {
            const item = document.createElement('div');
            item.className = 'stats-section-item';

            const number = document.createElement('div');
            number.className = 'stats-section-number';
            number.textContent = stat.number;

            const label = document.createElement('p');
            label.className = 'stats-section-label';
            label.textContent = stat.label;

            item.append(number, label);
            grid.appendChild(item);
        });
    }
}

customElements.define("stats-section", StatsSection);

