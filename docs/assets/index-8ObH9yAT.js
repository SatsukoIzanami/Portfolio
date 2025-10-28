(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();class y extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const t=this.shadowRoot,a=document.createElement("style");a.textContent=`
            :host { --nav-h: calc(56px + env(safe-area-inset-top)); }

            /* make the nav bar visible + sticky */
            header {
                position: sticky;
                top: 0;
                z-index: 50;
                border-bottom: 1px solid var(--border, #1a2440);
                background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
            }

            /* layout wrapper */
            .wrap {
                max-width: 1100px;
                margin: 0 auto;
                padding: 12px 24px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
            }

            /* brand link */
                .brand {
                display:flex; align-items:center; gap:10px;
                font-weight:600; letter-spacing:.2px; color:var(--text, #e5e7eb);
                text-decoration:none;
            }

            /* the primary <nav> contains anchors directly */
            nav {
                display:flex; align-items:center; gap:14px;
            }

            nav a {
                color: var(--text, #e5e7eb);
                text-decoration:none;
                padding:8px 10px;
                border-radius:10px;
                border:1px solid transparent;
            }

            nav a:hover { border-color:#2a4478; }

            /* set .active in JS → style it */
            nav a.active { border-color:#25355c; background:#0a1224; }

            /* burger button */
            .burger {
                display:none;
                border:1px solid var(--border, #1a2440);
                background:#0a1224;
                color:var(--text, #e5e7eb);
                border-radius: 10px;
                padding:8px 10px;
                cursor:pointer;
            }

            .burger .lines {
                display:inline-block; width:18px; height:2px; background: currentColor;
                box-shadow: 0 6px 0 currentColor, 0 -6px 0 currentColor;
            }

            /* mobile sheet + panel */
            .sheet {
                position: fixed; inset: 0; display: none;
                background: rgba(0,0,0,.45);
            }

            .sheet.show { display:block; }

            .panel {
                position: absolute; right: 0; top: 0;
                top: var(--nav-h);
                height: calc(100% - var(--nav-h));
                width: 260px; height: 100%;
                background: linear-gradient(180deg, var(--surface, #0f172a), var(--elev, #111a2e));
                border-left: 1px solid var(--border, #1a2440);
                padding: 16px;
                display:flex; flex-direction:column; gap:10px;
            }

            .panel a {
                color: var(--text, #e5e7eb);
                text-decoration:none;
                padding:10px 12px;
                border-radius:10px; border:1px solid transparent;
            }

            .panel a.active { border-color:#25355c; background:#0a1224; }

            @media (max-width: 720px){
                .burger { display:inline-flex; align-items:center; }
                nav { display: none; }
            }
        `;const i=document.createElement("header"),e=document.createElement("div");e.className="wrap";const r=document.createElement("a");r.className="brand",r.href="index.html",r.textContent="JL • Portfolio";const s=document.createElement("nav");s.setAttribute("aria-label","Primary");const c=[{href:"index.html",file:"index.html",text:"Home"},{href:"projects.html",file:"projects.html",text:"Projects"},{href:"about.html",file:"about.html",text:"About"},{href:"contact.html",file:"contact.html",text:"Contact"}],p=c.map(({href:o,file:h,text:x})=>{const d=document.createElement("a");return d.href=o,d.dataset.file=h,d.textContent=x,d});s.append(...p);const n=document.createElement("button");n.className="burger",n.setAttribute("aria-label","Menu"),n.setAttribute("aria-expanded","false");const b=document.createElement("span");b.className="lines",n.appendChild(b),e.append(r,s,n),i.appendChild(e);const l=document.createElement("div");l.className="sheet",l.setAttribute("aria-hidden","true");const m=document.createElement("div");m.className="panel",m.setAttribute("role","menu");const g=c.map(({href:o,file:h,text:x})=>{const d=document.createElement("a");return d.href=o,d.dataset.file=h,d.textContent=x,d.setAttribute("role","menuitem"),d});m.append(...g),l.appendChild(m),t.append(a,i,l);const E=()=>{const o=location.pathname.split("/").pop();return o&&o.length?o:"index.html"};(()=>{const o=E();[...p,...g].forEach(h=>{h.classList.toggle("active",h.dataset.file===o)})})();const u=()=>{l.classList.remove("show"),n.setAttribute("aria-expanded","false")},v=()=>{l.classList.add("show"),n.setAttribute("aria-expanded","true")};n.addEventListener("click",()=>{l.classList.contains("show")?u():v()}),l.addEventListener("click",o=>{o.target===l&&u()}),g.forEach(o=>o.addEventListener("click",u)),this.addEventListener("keydown",o=>{o.key==="Escape"&&u()})}}customElements.define("app-nav",y);class w extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"});const t=document.createElement("style");t.textContent=`
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
        `,this.loadingEl=document.createElement("div"),this.loadingEl.className="status",this.loadingEl.textContent="Loading projects...",this.gridEl=document.createElement("section"),this.gridEl.className="projects-grid",this.gridEl.hidden=!0,this.errorEl=document.createElement("div"),this.errorEl.className="status",this.errorEl.hidden=!0,this.shadowRoot.append(t,this.loadingEl,this.gridEl,this.errorEl),this.apiUrl="http://localhost:2000/api/projects"}connectedCallback(){this.load()}async load(){this._setLoading(!0);try{const t=await fetch(this.apiUrl,{headers:{Accept:"application/json"}});if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json(),i=Array.isArray(a.projects)?a.projects:[];this.render(i),this._setLoading(!1)}catch(t){this._setLoading(!1),this._showError(`Could not load projects: ${t.message}`)}}_setLoading(t){if(this.loadingEl.hidden=!t,t)for(this.errorEl.hidden=!0,this.gridEl.hidden=!0;this.gridEl.firstChild;)this.gridEl.removeChild(this.gridEl.firstChild)}_showError(t){this.errorEl.textContent=t,this.errorEl.hidden=!1,this.gridEl.hidden=!0}render(t){for(;this.gridEl.firstChild;)this.gridEl.removeChild(this.gridEl.firstChild);if(!t.length){const a=document.createElement("p");a.className="desc",a.textContent="No projects found.",this.gridEl.appendChild(a),this.gridEl.hidden=!1;return}for(const a of t){const i=document.createElement("article");i.className="card";const e=document.createElement("img");e.className="media",e.alt=(a?.name||"Project")+" thumbnail",a?.img&&(e.src=a.img);const r=document.createElement("div");r.className="body";const s=document.createElement("div");s.className="meta";const c=document.createElement("span");c.className="chip",c.textContent=a?.year||"",s.appendChild(c);const p=document.createElement("h3");p.className="title",p.textContent=a?.name||"Untitled Project";const n=document.createElement("p");n.className="desc",n.textContent=a?.desc||"",r.append(s,p,n),i.append(e,r),this.gridEl.appendChild(i)}this.gridEl.hidden=!1}}customElements.define("projects-grid",w);
