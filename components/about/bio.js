import { loadAboutData } from "./about-data.js";

class AboutBio extends HTMLElement {
    constructor(){ super(); }

    connectedCallback(){
        const wrap = document.createElement('div');
        wrap.className = 'about-bio-wrap';
        const section = document.createElement('section');
        section.className = 'about-bio-section';
        const h2 = document.createElement('h2');
        h2.textContent = 'About Me';
        const bio = document.createElement('div');
        bio.className = 'about-bio-bio';
        bio.id = 'bio';

        section.append(h2, bio);
        wrap.appendChild(section);
        this.appendChild(wrap);

        this._load(bio);
    }

    async _load(target){
        const data = await loadAboutData();
        if (!data) return;
          
        const b = data.bio || {};

        if (b.avatar){
            const img = document.createElement('img');
            img.alt = '';

            const base = import.meta.env.BASE_URL;
            img.src = b.avatar.startsWith('http')
                ? b.avatar
                : `${base}${b.avatar}`;

            target.appendChild(img);
        }

        const right = document.createElement('div');
        const h3 = document.createElement('h3');
        h3.textContent = b.headline || '';
        right.appendChild(h3);

        if (b.subline){
          const sub = document.createElement('div');
          sub.textContent = b.subline;
          right.appendChild(sub);
        }
        if (b.body){
          const p = document.createElement('p');
          p.textContent = b.body;
          right.appendChild(p);
        }
        target.appendChild(right);
    }
}
customElements.define('about-bio', AboutBio);

