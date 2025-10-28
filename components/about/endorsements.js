class EndorsementsList extends HTMLElement{
  constructor(){ super(); this.attachShadow({mode:'open'}); }

  connectedCallback(){
    const root = this.shadowRoot;

    const style = document.createElement('style');
    style.textContent = `
      :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
      .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
      h2{margin:0 0 10px}
      .endorsements{display:grid;gap:12px}
      blockquote{margin:0;color:#cfd5e2}
      .endorser{color:var(--muted,#9aa4b2);margin-top:5px;margin-bottom:15px}
    `;

    const wrap = document.createElement('div'); wrap.className = 'wrap';
    const section = document.createElement('section'); section.className = 'section';
    const h2 = document.createElement('h2'); h2.textContent = 'Endorsements';
    const list = document.createElement('div'); list.id = 'endorsements'; list.className = 'endorsements';

    section.append(h2, list);
    wrap.appendChild(section);
    root.append(style, wrap);

    this._load(list);
  }

  async _load(target){
    let data = { endorsements: [] };
    try{ data = await fetch('data/about.json',{cache:'no-cache'}).then(r=>r.json()); }catch{}
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

      const by = document.createElement('div'); by.className = 'endorser';
      by.textContent = `— ${en.name || 'Anonymous'}${en.role ? ', ' + en.role : ''}`;

      wrap.append(quote, by);
      target.appendChild(wrap);
    });
  }
}
customElements.define('endorsements-list', EndorsementsList);
