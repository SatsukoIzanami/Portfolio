import { loadAboutData } from "./about-data.js";

class SkillsList extends HTMLElement{
constructor(){
  super();
  this.attachShadow({mode:'open'});
  this.min = Number(this.getAttribute('min-level') || 0); // one-time read
  this.data = [];
}
  
   connectedCallback(){
    const root = this.shadowRoot;

    const style = document.createElement('style');
    style.textContent = `
      :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
      .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
      h2{margin:0 0 10px} .skills{display:grid;gap:12px;margin:20px}
      .skill{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center}
      .bar{grid-column:1/-1;height:8px;background:#111a2c;border:1px solid #1a2540;border-radius:999px;overflow:hidden}
      .fill{height:100%;background:linear-gradient(90deg,#2f66c8,#60a5fa)}
    `;

    const wrap = document.createElement('div'); wrap.className = 'wrap';
    const section = document.createElement('section'); section.className = 'section';
    const h2 = document.createElement('h2'); h2.textContent = 'Skills';
    const holder = document.createElement('div'); holder.id = 'skills';

    section.append(h2, holder);
    wrap.appendChild(section);
    root.append(style, wrap);

    this._load();
  }

  async _load(){
    const data = await loadAboutData();
    if (!data) return;

    this.data = (data.skills && data.skills.categories) ? data.skills.categories : [];
    this._render();
  }

  _render(){
    const holder = this.shadowRoot.getElementById('skills');
    holder.textContent = '';

    if (!this.data.length){
      const p = document.createElement('p'); p.style.color = 'var(--muted,#9aa4b2)'; p.textContent = 'No skills listed.';
      holder.appendChild(p);
      return;
    }

    this.data.forEach(cat=>{
      const title = document.createElement('div');
      title.style.margin = '8px 0 2px';
      title.style.fontWeight = '600';
      title.textContent = cat.title || cat.name || 'Skills';
      holder.appendChild(title);

      const grid = document.createElement('div'); grid.className = 'skills';

      (cat.items || [])
        .filter(it => Number(it.value || 0) >= this.min)
        .forEach(it => {
          const v = Math.max(0, Math.min(3, Number(it.value || 0)));
          const pct = (v/3) * 100;
          const label = String(it.label || '');

          const row = document.createElement('div'); row.className = 'skill';

          const l = document.createElement('div'); l.textContent = label;
          const r = document.createElement('div'); r.textContent = `${v}/3`;

          const bar = document.createElement('div'); bar.className = 'bar';
          const fill = document.createElement('div'); fill.className = 'fill'; fill.style.width = `${pct}%`;
          bar.appendChild(fill);

          row.append(l, r, bar);
          grid.appendChild(row);
        });

      holder.appendChild(grid);
    });
  }
}
customElements.define('skills-list', SkillsList);
