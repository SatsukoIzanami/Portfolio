import { loadAboutData } from "./about-data.js";

class EmploymentTimeline extends HTMLElement {
  constructor(){ super(); this.attachShadow({mode:'open'}); }

  connectedCallback(){
    const root = this.shadowRoot;

    const style = document.createElement('style');
    style.textContent = `
      :host{display:block}
      .wrap{max-width:1100px; margin:0 auto; padding:24px}
      .section{
        margin:18px 0; padding:18px 20px;
        background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);
        border-radius:16px;
        box-shadow:0 10px 30px rgba(0,0,0,.45);
        opacity:0; transform:translateY(12px);
        transition:.45s ease opacity, .45s ease transform;
      }
      .section.show{opacity:1; transform:none}
      h2{margin:0 0 10px}
      p{margin:0; color:var(--muted,#9aa4b2)}

      ul{list-style:none; padding:0; margin:0}
      li{margin:10px 0; cursor:pointer; outline:none}
      .title{font-weight:600; color:var(--text,#e5e7eb)}
      .details{
        margin-top:8px; color:var(--muted,#9aa4b2); font-size:.95rem;
        max-height:0; opacity:0; overflow:hidden;
        transition:max-height .35s ease, opacity .25s ease;
      }
      li:hover .details,
      li:focus-within .details { max-height:420px; opacity:1; }
      .when{color:var(--muted,#9aa4b2); font-size:.95rem}
      ul.bullets{margin:6px 0 0; padding-left:18px; color:var(--muted,#9aa4b2)}
    `;

    const wrap = document.createElement('div'); wrap.className = 'wrap';
    const section = document.createElement('section'); section.className = 'section'; section.id = 'card';
    const h2 = document.createElement('h2'); h2.textContent = 'Employment Timeline';
    const ul = document.createElement('ul'); ul.id = 'timelineList'; ul.setAttribute('aria-label','Employment timeline');

    section.append(h2, ul);
    wrap.appendChild(section);
    root.append(style, wrap);

    const io = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.12 });
    io.observe(section);

    this._load(ul);
  }

  async _load(listEl){
    const data = await loadAboutData();
    if (!data) return;
    this._render(listEl, Array.isArray(data.timeline) ? data.timeline : []);
  }

  _render(listEl, jobs){
    listEl.textContent = '';

    jobs.forEach(j => {
      const li = document.createElement('li'); li.tabIndex = 0;

      const title = document.createElement('div'); title.className = 'title';
      // "start — end"
      const when = `${j.start || ''}${j.end ? ' — ' + j.end : ' — Present'}`;
      title.textContent = when;

      const details = document.createElement('div'); details.className = 'details';

      const roleCo = [j.role || '', j.company || ''].filter(Boolean).join(' — ');
      if (roleCo){
        const rc = document.createElement('div'); rc.textContent = roleCo; details.appendChild(rc);
      }

      if (Array.isArray(j.bullets) && j.bullets.length){
        const bullets = document.createElement('ul'); bullets.className = 'bullets';
        j.bullets.forEach(b => {
          const liB = document.createElement('li');
          liB.textContent = String(b);
          bullets.appendChild(liB);
        });
        details.appendChild(bullets);
      }

      li.append(title, details);
      listEl.appendChild(li);
    });
  }
}
customElements.define('employment-timeline', EmploymentTimeline);
