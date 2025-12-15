import { loadAboutData } from "./about-data.js";

class EndorsementsList extends HTMLElement{
  constructor(){ super(); }

  connectedCallback(){
    const wrap = document.createElement('div');
    wrap.className = 'endorsements-wrap';
    const section = document.createElement('section');
    section.className = 'endorsements-section';
    const h2 = document.createElement('h2');
    h2.textContent = 'Endorsements';
    const list = document.createElement('div');
    list.id = 'endorsements';
    list.className = 'endorsements-list';

    section.append(h2, list);
    wrap.appendChild(section);
    this.appendChild(wrap);

    this._load(list);
  }

  async _load(target){
    const data = await loadAboutData();
    if (!data) return;
    const items = data.endorsements || [];

    target.textContent = '';
    if (!items.length){
      const p = document.createElement('p'); p.style.color = 'var(--muted,#9aa4b2)'; p.textContent = 'No endorsements yet.';
      target.appendChild(p);
      return;
    }

    items.forEach(en => {
      const wrap = document.createElement('div');

      const quote = document.createElement('blockquote');
      // preserve line breaks safely
      String(en.quote || '').split('\n').forEach((line,i) => {
        if (i) quote.appendChild(document.createElement('br'));
        quote.appendChild(document.createTextNode(line));
      });

      const by = document.createElement('div');
      by.className = 'endorsements-endorser';
      by.textContent = `— ${en.name || 'Anonymous'}${en.role ? ', ' + en.role : ''}`;

      wrap.append(quote, by);
      target.appendChild(wrap);
    });
  }
}
customElements.define('endorsements-list', EndorsementsList);
