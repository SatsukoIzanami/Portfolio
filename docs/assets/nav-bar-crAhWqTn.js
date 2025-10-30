(function(){const c=document.createElement("link").relList;if(c&&c.supports&&c.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const i of t.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&l(i)}).observe(document,{childList:!0,subtree:!0});function d(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function l(e){if(e.ep)return;e.ep=!0;const t=d(e);fetch(e.href,t)}})();class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const c=this.shadowRoot,d=document.createElement("style");d.textContent=`
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
        `;const l=document.createElement("header"),e=document.createElement("div");e.className="wrap";const t=document.createElement("a");t.className="brand",t.href="index.html",t.textContent="JL • Portfolio";const i=document.createElement("nav");i.setAttribute("aria-label","Primary");const b=[{href:"index.html",file:"index.html",text:"Home"},{href:"projects.html",file:"projects.html",text:"Projects"},{href:"about.html",file:"about.html",text:"About"},{href:"contact.html",file:"contact.html",text:"Contact"}],x=b.map(({href:a,file:s,text:h})=>{const r=document.createElement("a");return r.href=a,r.dataset.file=s,r.textContent=h,r});i.append(...x);const o=document.createElement("button");o.className="burger",o.setAttribute("aria-label","Menu"),o.setAttribute("aria-expanded","false");const f=document.createElement("span");f.className="lines",o.appendChild(f),e.append(t,i,o),l.appendChild(e);const n=document.createElement("div");n.className="sheet",n.setAttribute("aria-hidden","true");const p=document.createElement("div");p.className="panel",p.setAttribute("role","menu");const m=b.map(({href:a,file:s,text:h})=>{const r=document.createElement("a");return r.href=a,r.dataset.file=s,r.textContent=h,r.setAttribute("role","menuitem"),r});p.append(...m),n.appendChild(p),c.append(d,l,n);const v=()=>{const a=location.pathname.split("/").pop();return a&&a.length?a:"index.html"};(()=>{const a=v();[...x,...m].forEach(s=>{s.classList.toggle("active",s.dataset.file===a)})})();const u=()=>{n.classList.remove("show"),o.setAttribute("aria-expanded","false")},y=()=>{n.classList.add("show"),o.setAttribute("aria-expanded","true")};o.addEventListener("click",()=>{n.classList.contains("show")?u():y()}),n.addEventListener("click",a=>{a.target===n&&u()}),m.forEach(a=>a.addEventListener("click",u)),this.addEventListener("keydown",a=>{a.key==="Escape"&&u()})}}customElements.define("app-nav",E);
