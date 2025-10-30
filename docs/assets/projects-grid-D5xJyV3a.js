class c extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=`
        :host{ display:block }
        .projects-grid{
            display:grid; gap:20px;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            margin-top:16px;}
        .card{
            background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
            border: 1px solid var(--border, #1a2440);
            border-radius: var(--radius, 16px);
            box-shadow: var(--shadow, 0 10px 30px rgba(0,0,0,.45));
            overflow:hidden; transition: transform .18s, border-color .18s;}
        .card:hover{ transform: translateY(-2px); border-color:#25355c; }
        .media{
            width:100%; aspect-ratio:16/10; object-fit:cover; display:block;
            border-bottom:1px solid var(--border, #1a2440); background:#0a1224;}
        .body{ padding:14px 14px 16px; }
        .meta{ display:flex; align-items:center; gap:8px; color:var(--muted,#9aa4b2); font-size:.9rem; margin-bottom:6px;}
        .chip{
            font-size:.8rem; padding:4px 8px; border-radius:999px;
            border:1px solid var(--border,#1a2440); background:#0a1224; color:#cdd3df;}
        .title{ font-size:1.1rem; margin:0 0 4px; color:var(--text,#e5e7eb) }
        .desc{ margin:0; color:var(--muted,#9aa4b2); line-height:1.45 }
        .status{ color:var(--muted,#9aa4b2); padding:8px 0; }
        `,this.loadingEl=document.createElement("div"),this.loadingEl.className="status",this.loadingEl.textContent="Loading projects...",this.gridEl=document.createElement("section"),this.gridEl.className="projects-grid",this.gridEl.hidden=!0,this.errorEl=document.createElement("div"),this.errorEl.className="status",this.errorEl.hidden=!0,this.shadowRoot.append(t,this.loadingEl,this.gridEl,this.errorEl);const e=window.location.hostname.includes("github.io"),r=window.location.hostname.includes("onrender.com");this.apiUrl=e?"https://portfolio-awnu.onrender.com/api/projects":r?"/api/projects":"http://localhost:2000/api/projects"}connectedCallback(){this.load()}async load(){this._setLoading(!0);try{const t=await fetch(this.apiUrl,{headers:{Accept:"application/json"}});if(!t.ok)throw new Error(`HTTP ${t.status}`);const e=await t.json(),r=Array.isArray(e.projects)?e.projects:[];this.render(r),this._setLoading(!1)}catch(t){this._setLoading(!1),this._showError(`Could not load projects: ${t.message}`)}}_setLoading(t){if(this.loadingEl.hidden=!t,t)for(this.errorEl.hidden=!0,this.gridEl.hidden=!0;this.gridEl.firstChild;)this.gridEl.removeChild(this.gridEl.firstChild)}_showError(t){this.errorEl.textContent=t,this.errorEl.hidden=!1,this.gridEl.hidden=!0}render(t){for(;this.gridEl.firstChild;)this.gridEl.removeChild(this.gridEl.firstChild);if(!t.length){const e=document.createElement("p");e.className="desc",e.textContent="No projects found.",this.gridEl.appendChild(e),this.gridEl.hidden=!1;return}for(const e of t){const r=document.createElement("article");r.className="card";const i=document.createElement("img");if(i.className="media",i.alt=(e?.name||"Project")+" thumbnail",e?.img){const l="/Portfolio/";i.src=e.img.startsWith("http")?e.img:`${l}${e.img}`}const o=document.createElement("div");o.className="body";const s=document.createElement("div");s.className="meta";const a=document.createElement("span");a.className="chip",a.textContent=e?.year||"",s.appendChild(a);const d=document.createElement("h3");d.className="title",d.textContent=e?.name||"Untitled Project";const n=document.createElement("p");n.className="desc",n.textContent=e?.desc||"",o.append(s,d,n),r.append(i,o),this.gridEl.appendChild(r)}this.gridEl.hidden=!1}}customElements.define("projects-grid",c);
