// components/home/featured-endorsement.js

import { loadAboutData } from "../about/about-data.js";

class FeaturedEndorsement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const section = document.createElement("section");
        section.className = "featured-endorsement-section";
        
        const h2 = document.createElement("h2");
        h2.textContent = "What Others Say";
        
        const endorsement = document.createElement("div");
        endorsement.className = "featured-endorsement-content";
        endorsement.id = "endorsement";

        const cta = document.createElement("div");
        cta.className = "featured-endorsement-cta";
        const link = document.createElement("a");
        link.href = "about.html";
        link.className = "featured-endorsement-button";
        link.textContent = "View All Endorsements →";
        cta.appendChild(link);

        section.append(h2, endorsement, cta);
        this.appendChild(section);

        this.load();
    }

    async load() {
        const data = await loadAboutData();
        if (!data) return;

        const endorsements = data.endorsements || [];
        if (!endorsements.length) return;

        // Show the first endorsement
        const featured = endorsements[0];
        const container = this.querySelector('#endorsement');
        container.textContent = '';

        const quote = document.createElement('blockquote');
        quote.textContent = featured.quote || '';

        const by = document.createElement('div');
        by.className = 'featured-endorsement-endorser';
        by.textContent = `— ${featured.name || 'Anonymous'}${featured.role ? ', ' + featured.role : ''}`;

        container.append(quote, by);
    }
}

customElements.define("featured-endorsement", FeaturedEndorsement);

