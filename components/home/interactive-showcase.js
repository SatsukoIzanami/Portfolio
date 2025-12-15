// components/home/interactive-showcase.js

import { loadAboutData } from "../about/about-data.js";

class InteractiveShowcase extends HTMLElement {
    constructor() {
        super();
        this.currentSection = null;
        this.classPrefix = 'interactive-showcase-';
    }

    connectedCallback() {
        this.render();
        this.setupNavigation();
    }

    render() {
        const container = document.createElement("div");
        container.className = `${this.classPrefix}container`;

        const navList = document.createElement("div");
        navList.className = `${this.classPrefix}nav-list`;
        navList.id = `${this.classPrefix}nav-list`;

        const contentPanel = document.createElement("div");
        contentPanel.className = `${this.classPrefix}content-panel`;
        contentPanel.id = `${this.classPrefix}content-panel`;
        
        // Keep content visible when hovering over the panel
        contentPanel.addEventListener('mouseenter', () => {
            if (this.currentSection) {
                const navItems = this.querySelectorAll(`.${this.classPrefix}nav-item`);
                navItems.forEach(item => {
                    if (item.dataset.section === this.currentSection) {
                        item.classList.add('active');
                    }
                });
            }
        });

        // Default message
        const defaultMsg = document.createElement("div");
        defaultMsg.className = `${this.classPrefix}default-message`;
        defaultMsg.innerHTML = `
            <h3>👋 Welcome</h3>
            <p>Hover over an item on the left to explore</p>
        `;
        contentPanel.appendChild(defaultMsg);
        
        // Make the panel visible initially
        contentPanel.classList.add('visible');

        container.append(navList, contentPanel);
        this.appendChild(container);
    }

    setupNavigation() {
        const navItems = [
            { id: 'projects', title: 'Projects', desc: 'View my work' },
            { id: 'skills', title: 'Skills', desc: 'Technical abilities' },
            { id: 'about', title: 'About', desc: 'Learn about me' },
            { id: 'stats', title: 'Stats', desc: 'By the numbers' },
            { id: 'endorsement', title: 'Testimonials', desc: 'What others say' }
        ];

        const navList = this.querySelector(`#${this.classPrefix}nav-list`);
        navList.textContent = '';

        navItems.forEach(item => {
            const navItem = document.createElement('div');
            navItem.className = `${this.classPrefix}nav-item`;
            navItem.dataset.section = item.id;
            
            navItem.innerHTML = `
                <div class="${this.classPrefix}nav-item-title">${item.title}</div>
                <div class="${this.classPrefix}nav-item-desc">${item.desc}</div>
            `;

            navItem.addEventListener('mouseenter', () => {
                this.showSection(item.id);
            });
            navItem.addEventListener('click', () => {
                this.showSection(item.id);
            });

            navList.appendChild(navItem);
        });
    }

    showSection(sectionId) {
        // Remove active class from all nav items
        const navItems = this.querySelectorAll(`.${this.classPrefix}nav-item`);
        navItems.forEach(item => {
            if (item.dataset.section === sectionId) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        this.currentSection = sectionId;
        this.renderSection(sectionId);
    }

    hideSection() {
        const navItems = this.querySelectorAll(`.${this.classPrefix}nav-item`);
        navItems.forEach(item => item.classList.remove('active'));
        
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        contentPanel.classList.remove('visible');
        
        setTimeout(() => {
            if (!this.currentSection) {
                const defaultMsg = document.createElement("div");
                defaultMsg.className = `${this.classPrefix}default-message`;
                defaultMsg.innerHTML = `
                    <h3>👋 Welcome</h3>
                    <p>Hover over an item on the left to explore</p>
                `;
                contentPanel.textContent = '';
                contentPanel.appendChild(defaultMsg);
            }
        }, 300);
    }

    async renderSection(sectionId) {
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        
        // Fade out first
        contentPanel.classList.remove('visible');
        
        // Wait for fade out, then update content
        await new Promise(resolve => setTimeout(resolve, 200));
        
        contentPanel.textContent = '';
        contentPanel.classList.add('visible');
        
        // Render content after panel becomes visible
        await new Promise(resolve => setTimeout(resolve, 100));
        
        switch(sectionId) {
            case 'projects':
                await this.renderProjects();
                break;
            case 'skills':
                await this.renderSkills();
                break;
            case 'about':
                await this.renderAbout();
                break;
            case 'stats':
                await this.renderStats();
                break;
            case 'endorsement':
                await this.renderEndorsement();
                break;
        }
    }

    async renderProjects() {
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        
        const h2 = document.createElement('h2');
        h2.className = `${this.classPrefix}content-item`;
        h2.textContent = 'Featured Projects';
        contentPanel.appendChild(h2);

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

            const grid = document.createElement('div');
            grid.className = `${this.classPrefix}projects-grid ${this.classPrefix}content-item`;

            items.slice(0, 3).forEach(p => {
                const card = document.createElement('article');
                card.className = `${this.classPrefix}project-card`;

                const img = document.createElement('img');
                img.className = `${this.classPrefix}project-media`;
                img.alt = (p?.name || "Project") + " thumbnail";
                if (p?.img) {
                    const base = import.meta.env.BASE_URL;
                    img.src = p.img.startsWith('http')
                        ? p.img
                        : `${base}${p.img}`;
                }

                const body = document.createElement('div');
                body.className = `${this.classPrefix}project-body`;

                const meta = document.createElement('div');
                meta.className = `${this.classPrefix}project-meta`;
                const chip = document.createElement('span');
                chip.className = `${this.classPrefix}project-chip`;
                chip.textContent = p?.year || "";
                meta.appendChild(chip);

                const title = document.createElement('h3');
                title.className = `${this.classPrefix}project-title`;
                title.textContent = p?.name || "Untitled Project";

                const desc = document.createElement('p');
                desc.className = `${this.classPrefix}project-desc`;
                desc.textContent = p?.desc || "";

                body.append(meta, title, desc);
                card.append(img, body);
                grid.appendChild(card);
            });

            const ctaContainer = document.createElement('div');
            ctaContainer.className = `${this.classPrefix}cta-container ${this.classPrefix}content-item`;
            const link = document.createElement('a');
            link.href = 'projects.html';
            link.className = `${this.classPrefix}cta-link`;
            link.textContent = 'View All Projects →';
            ctaContainer.appendChild(link);

            contentPanel.append(grid, ctaContainer);
        } catch (err) {
            const p = document.createElement('p');
            p.style.color = 'var(--muted, #9aa4b2)';
            p.textContent = 'Unable to load projects.';
            contentPanel.appendChild(p);
        }
    }

    async renderSkills() {
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        
        const h2 = document.createElement('h2');
        h2.className = `${this.classPrefix}content-item`;
        h2.textContent = 'Skills';
        contentPanel.appendChild(h2);

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

        const topSkills = allSkills
            .filter(s => s.value >= 2)
            .sort((a, b) => b.value - a.value)
            .slice(0, 6);

        const grid = document.createElement('div');
        grid.className = `${this.classPrefix}skills-grid ${this.classPrefix}content-item`;

        topSkills.forEach(skill => {
            const item = document.createElement('div');
            item.className = `${this.classPrefix}skill-item`;

            const name = document.createElement('div');
            name.className = `${this.classPrefix}skill-name`;
            name.textContent = skill.name;

            const level = document.createElement('div');
            level.className = `${this.classPrefix}skill-level`;
            level.textContent = `${skill.value}/3`;

            const bar = document.createElement('div');
            bar.className = `${this.classPrefix}skill-bar`;
            const fill = document.createElement('div');
            fill.className = `${this.classPrefix}skill-fill`;
            fill.style.width = `${(skill.value / 3) * 100}%`;
            bar.appendChild(fill);

            item.append(name, level, bar);
            grid.appendChild(item);
        });

        const ctaContainer = document.createElement('div');
        ctaContainer.className = `${this.classPrefix}cta-container ${this.classPrefix}content-item`;
        const link = document.createElement('a');
        link.href = 'about.html';
        link.className = `${this.classPrefix}cta-link`;
        link.textContent = 'View All Skills →';
        ctaContainer.appendChild(link);

        contentPanel.append(grid, ctaContainer);
    }

    async renderAbout() {
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        
        const h2 = document.createElement('h2');
        h2.className = `${this.classPrefix}content-item`;
        h2.textContent = 'About Me';
        contentPanel.appendChild(h2);

        const data = await loadAboutData();
        if (!data) return;

        const bio = data.bio || {};
        const content = document.createElement('div');
        content.className = `${this.classPrefix}about-content ${this.classPrefix}content-item`;

        if (bio.avatar) {
            const img = document.createElement('img');
            img.className = `${this.classPrefix}about-avatar`;
            img.alt = '';
            const base = import.meta.env.BASE_URL;
            img.src = bio.avatar.startsWith('http')
                ? bio.avatar
                : `${base}${bio.avatar}`;
            content.appendChild(img);
        }

        const text = document.createElement('div');
        text.className = `${this.classPrefix}about-text`;
        const bodyText = bio.body || '';
        const textOnly = bodyText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const preview = textOnly.split('.').slice(0, 2).join('.') + (textOnly.includes('.') ? '...' : '');
        text.textContent = preview || 'Full-stack student developer passionate about clean code and accessible design.';
        content.appendChild(text);

        const ctaContainer = document.createElement('div');
        ctaContainer.className = `${this.classPrefix}cta-container ${this.classPrefix}content-item`;
        const link = document.createElement('a');
        link.href = 'about.html';
        link.className = `${this.classPrefix}cta-link`;
        link.textContent = 'Learn More →';
        ctaContainer.appendChild(link);

        contentPanel.append(content, ctaContainer);
    }

    async renderStats() {
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        
        const h2 = document.createElement('h2');
        h2.className = `${this.classPrefix}content-item`;
        h2.textContent = 'By The Numbers';
        contentPanel.appendChild(h2);

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

        const aboutData = await loadAboutData();
        
        let skillsCount = 0;
        if (aboutData?.skills?.categories) {
            aboutData.skills.categories.forEach(cat => {
                skillsCount += (cat.items || []).length;
            });
        }

        let yearsExperience = 0;
        if (aboutData?.timeline) {
            const currentYear = new Date().getFullYear();
            const earliestStart = Math.min(...aboutData.timeline.map(t => parseInt(t.start) || currentYear));
            yearsExperience = currentYear - earliestStart;
        }

        const grid = document.createElement('div');
        grid.className = `${this.classPrefix}stats-grid ${this.classPrefix}content-item`;

        [
            { number: projectCount, label: "Projects" },
            { number: skillsCount, label: "Skills" },
            { number: yearsExperience, label: "Years Experience" },
            { number: 2025, label: "Graduation Year" }
        ].forEach(stat => {
            const item = document.createElement('div');
            item.className = `${this.classPrefix}stat-item`;

            const number = document.createElement('div');
            number.className = `${this.classPrefix}stat-number`;
            number.textContent = stat.number;

            const label = document.createElement('p');
            label.className = `${this.classPrefix}stat-label`;
            label.textContent = stat.label;

            item.append(number, label);
            grid.appendChild(item);
        });

        const ctaContainer = document.createElement('div');
        ctaContainer.className = `${this.classPrefix}cta-container ${this.classPrefix}content-item`;
        const link = document.createElement('a');
        link.href = 'about.html';
        link.className = `${this.classPrefix}cta-link`;
        link.textContent = 'View Full Profile →';
        ctaContainer.appendChild(link);

        contentPanel.append(grid, ctaContainer);
    }

    async renderEndorsement() {
        const contentPanel = this.querySelector(`#${this.classPrefix}content-panel`);
        
        const h2 = document.createElement('h2');
        h2.className = `${this.classPrefix}content-item`;
        h2.textContent = 'What Others Say';
        contentPanel.appendChild(h2);

        const data = await loadAboutData();
        if (!data) return;

        const endorsements = data.endorsements || [];
        if (!endorsements.length) {
            const p = document.createElement('p');
            p.style.color = 'var(--muted, #9aa4b2)';
            p.textContent = 'No endorsements available.';
            contentPanel.appendChild(p);
            return;
        }

        const featured = endorsements[0];
        const endorsementDiv = document.createElement('div');
        endorsementDiv.className = `${this.classPrefix}endorsement-content ${this.classPrefix}content-item`;

        const quote = document.createElement('blockquote');
        quote.textContent = featured.quote || '';

        const by = document.createElement('div');
        by.className = `${this.classPrefix}endorser`;
        by.textContent = `— ${featured.name || 'Anonymous'}${featured.role ? ', ' + featured.role : ''}`;

        endorsementDiv.append(quote, by);

        const ctaContainer = document.createElement('div');
        ctaContainer.className = `${this.classPrefix}cta-container ${this.classPrefix}content-item`;
        const link = document.createElement('a');
        link.href = 'about.html';
        link.className = `${this.classPrefix}cta-link`;
        link.textContent = 'View All Endorsements →';
        ctaContainer.appendChild(link);

        contentPanel.append(endorsementDiv, ctaContainer);
    }
}

customElements.define("interactive-showcase", InteractiveShowcase);
