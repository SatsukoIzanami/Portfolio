import { loadAboutData } from "./about-data.js";

class SkillsList extends HTMLElement{
constructor(){
  super();
  this.min = Number(this.getAttribute('min-level') || 0); // one-time read
  this.data = [];
}
  
   connectedCallback(){
    const wrap = document.createElement('div');
    wrap.className = 'skills-wrap';
    const section = document.createElement('section');
    section.className = 'skills-section';
    const h2 = document.createElement('h2');
    h2.textContent = 'Skills';
    const holder = document.createElement('div');
    holder.id = 'skills';

    section.append(h2, holder);
    wrap.appendChild(section);
    this.appendChild(wrap);

    this._load();
  }

  async _load(){
    const data = await loadAboutData();
    if (!data) return;

    this.data = (data.skills && data.skills.categories) ? data.skills.categories : [];
    this._render();
  }

  _render(){
    const holder = this.querySelector('#skills');
    holder.textContent = '';

    if (!this.data.length){
      const p = document.createElement('p');
      p.className = 'skills-empty';
      p.textContent = 'No skills listed.';
      holder.appendChild(p);
      return;
    }

    this.data.forEach(cat=>{
      const title = document.createElement('div');
      title.className = 'skills-category-title';
      title.textContent = cat.title || cat.name || 'Skills';
      holder.appendChild(title);

      const grid = document.createElement('div');
      grid.className = 'skills-grid';

      (cat.items || [])
        .filter(it => Number(it.value || 0) >= this.min)
        .forEach(it => {
          const v = Math.max(0, Math.min(3, Number(it.value || 0)));
          const pct = (v/3) * 100;
          const label = String(it.label || '');

          const row = document.createElement('div');
          row.className = 'skills-skill';

          const l = document.createElement('div');
          l.textContent = label;
          const r = document.createElement('div');
          r.textContent = `${v}/3`;

          const bar = document.createElement('div');
          bar.className = 'skills-bar';
          const fill = document.createElement('div');
          fill.className = 'skills-fill';
          fill.style.width = `${pct}%`;
          bar.appendChild(fill);

          row.append(l, r, bar);
          grid.appendChild(row);
        });

      holder.appendChild(grid);
    });
  }
}
customElements.define('skills-list', SkillsList);
