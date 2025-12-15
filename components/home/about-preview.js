// components/home/about-preview.js

import { loadAboutData } from "../about/about-data.js";

class AboutPreview extends HTMLElement {
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
            .content {
                display: grid;
                grid-template-columns: 120px 1fr;
                gap: 20px;
                align-items: start;
            }
            .avatar {
                width: 120px;
                height: 120px;
                object-fit: cover;
                border-radius: 16px;
                border: 1px solid var(--border, #1a2440);
            }
            .text {
                flex: 1;
            }
            h2 {
                margin: 0 0 12px;
                font-size: clamp(22px, 3.8vw, 32px);
            }
            .preview {
                color: var(--muted, #9aa4b2);
                line-height: 1.6;
                margin: 0 0 16px;
            }
            .cta {
                margin-top: 16px;
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
                .content {
                    grid-template-columns: 1fr;
                }
                .avatar {
                    width: 80px;
                    height: 80px;
                    justify-self: start;
                }
            }
        `;

        const section = document.createElement("section");
        section.className = "section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "About Me";
        
        const content = document.createElement("div");
        content.className = "content";
        content.id = "content";

        const cta = document.createElement("div");
        cta.className = "cta";
        const link = document.createElement("a");
        link.href = "about.html";
        link.className = "button";
        link.textContent = "Learn More →";
        cta.appendChild(link);

        section.append(h2, content, cta);
        this.shadowRoot.append(style, section);

        this.load();
    }

    async load() {
        const data = await loadAboutData();
        if (!data) return;

        const bio = data.bio || {};
        const content = this.shadowRoot.getElementById('content');
        content.textContent = '';

        // Avatar
        if (bio.avatar) {
            const img = document.createElement('img');
            img.className = 'avatar';
            img.alt = '';
            const base = import.meta.env.BASE_URL;
            img.src = bio.avatar.startsWith('http')
                ? bio.avatar
                : `${base}${bio.avatar}`;
            content.appendChild(img);
        }

        // Text content
        const text = document.createElement('div');
        text.className = 'text';

        // Get first paragraph of bio body for preview
        const bodyText = bio.body || '';
        // Remove HTML tags and get first sentence or two
        const textOnly = bodyText.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const preview = textOnly.split('.').slice(0, 2).join('.') + (textOnly.includes('.') ? '...' : '');

        const previewEl = document.createElement('p');
        previewEl.className = 'preview';
        previewEl.textContent = preview || 'Full-stack student developer passionate about clean code and accessible design.';

        text.appendChild(previewEl);
        content.appendChild(text);
    }
}

customElements.define("about-preview", AboutPreview);

