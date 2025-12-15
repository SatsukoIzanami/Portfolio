// components/home/featured-endorsement.js

import { loadAboutData } from "../about/about-data.js";

class FeaturedEndorsement extends HTMLElement {
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
            .endorsement {
                padding: 20px;
                background: linear-gradient(180deg, #0a1224, #0f172a);
                border: 1px solid var(--border, #1a2440);
                border-radius: 12px;
            }
            blockquote {
                margin: 0 0 16px;
                color: #cfd5e2;
                font-size: 1.05rem;
                line-height: 1.6;
                font-style: italic;
            }
            .endorser {
                color: var(--muted, #9aa4b2);
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
        `;

        const section = document.createElement("section");
        section.className = "section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "What Others Say";
        
        const endorsement = document.createElement("div");
        endorsement.className = "endorsement";
        endorsement.id = "endorsement";

        const cta = document.createElement("div");
        cta.className = "cta";
        const link = document.createElement("a");
        link.href = "about.html";
        link.className = "button";
        link.textContent = "View All Endorsements →";
        cta.appendChild(link);

        section.append(h2, endorsement, cta);
        this.shadowRoot.append(style, section);

        this.load();
    }

    async load() {
        const data = await loadAboutData();
        if (!data) return;

        const endorsements = data.endorsements || [];
        if (!endorsements.length) return;

        // Show the first endorsement
        const featured = endorsements[0];
        const container = this.shadowRoot.getElementById('endorsement');
        container.textContent = '';

        const quote = document.createElement('blockquote');
        quote.textContent = featured.quote || '';

        const by = document.createElement('div');
        by.className = 'endorser';
        by.textContent = `— ${featured.name || 'Anonymous'}${featured.role ? ', ' + featured.role : ''}`;

        container.append(quote, by);
    }
}

customElements.define("featured-endorsement", FeaturedEndorsement);

