import { loadAboutData } from "./about-data.js";

class AboutBio extends HTMLElement {
    constructor(){ super(); this.attachShadow({mode:'open'}); }

    connectedCallback(){
        const root = this.shadowRoot;

        const style = document.createElement('style');
        style.textContent = `
            :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
            .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
              border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
            h2{margin:0 0 10px} p{margin:0;color:var(--muted,#9aa4b2)}
            .bio{display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:start}
            .bio img{width:96px;height:96px;object-fit:cover;border-radius:16px;border:1px solid var(--border,#1a2440)}
            @media (max-width:720px){.bio{grid-template-columns:1fr}.bio img{width:72px;height:72px}}
        `;

    const wrap = document.createElement('div'); wrap.className = 'wrap';
    const section = document.createElement('section'); section.className = 'section';
    const h2 = document.createElement('h2'); h2.textContent = 'About Me';
    const bio = document.createElement('div'); bio.className = 'bio'; bio.id = 'bio';

    section.append(h2, bio);
    wrap.appendChild(section);
    root.append(style, wrap);

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
        const h3 = document.createElement('h3'); h3.style.margin = '0 0 6px'; h3.textContent = b.headline || '';
        right.appendChild(h3);

        if (b.subline){
          const sub = document.createElement('div'); sub.textContent = b.subline; right.appendChild(sub);
        }
        if (b.body){
          const p = document.createElement('p'); p.style.marginTop = '10px'; p.textContent = b.body; right.appendChild(p);
        }
        target.appendChild(right);
    }
}
customElements.define('about-bio', AboutBio);

