// components/home/about-preview.js

import { loadAboutData } from "../about/about-data.js";

class AboutPreview extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const section = document.createElement("section");
        section.className = "about-preview-section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "About Me";
        
        const content = document.createElement("div");
        content.className = "about-preview-content";
        content.id = "content";

        const cta = document.createElement("div");
        cta.className = "about-preview-cta";
        const link = document.createElement("a");
        link.href = "about.html";
        link.className = "about-preview-button";
        link.textContent = "Learn More →";
        cta.appendChild(link);

        section.append(h2, content, cta);
        this.appendChild(section);

        this.load();
    }

    async load() {
        const data = await loadAboutData();
        if (!data) return;

        const bio = data.bio || {};
        const content = this.querySelector('#content');
        content.textContent = '';

        // Avatar
        if (bio.avatar) {
            const img = document.createElement('img');
            img.className = 'about-preview-avatar';
            img.alt = '';
            const base = import.meta.env.BASE_URL;
            img.src = bio.avatar.startsWith('http')
                ? bio.avatar
                : `${base}${bio.avatar}`;
            content.appendChild(img);
        }

        // Text content
        const text = document.createElement('div');
        text.className = 'about-preview-text';

        // Get first paragraph of bio body for preview
        const bodyText = bio.body || '';
        // Remove HTML tags and get first sentence or two
        const textOnly = bodyText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const preview = textOnly.split('.').slice(0, 2).join('.') + (textOnly.includes('.') ? '...' : '');

        const previewEl = document.createElement('p');
        previewEl.className = 'about-preview-preview';
        previewEl.textContent = preview || 'Full-stack student developer passionate about clean code and accessible design.';

        text.appendChild(previewEl);
        content.appendChild(text);
    }
}

customElements.define("about-preview", AboutPreview);

