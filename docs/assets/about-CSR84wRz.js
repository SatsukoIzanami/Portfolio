import"./nav-bar-crAhWqTn.js";async function p(){const d=window.location.hostname.includes("github.io"),o=window.location.hostname.includes("onrender.com"),n=d?"https://portfolio-awnu.onrender.com/data/about.json":o?"/data/about.json":"http://localhost:2000/data/about.json";try{const e=await fetch(n,{cache:"no-cache"});if(!e.ok)throw new Error(`HTTP ${e.status}`);return await e.json()}catch(e){return console.error("Failed to load about.json:",e),null}}class b extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const o=this.shadowRoot,n=document.createElement("style");n.textContent=`
            :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
            .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
              border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
            h2{margin:0 0 10px} p{margin:0;color:var(--muted,#9aa4b2)}
            .bio{display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:start}
            .bio img{width:96px;height:96px;object-fit:cover;border-radius:16px;border:1px solid var(--border,#1a2440)}
            @media (max-width:720px){.bio{grid-template-columns:1fr}.bio img{width:72px;height:72px}}
        `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section";const s=document.createElement("h2");s.textContent="About Me";const a=document.createElement("div");a.className="bio",a.id="bio",t.append(s,a),e.appendChild(t),o.append(n,e),this._load(a)}async _load(o){const n=await p();if(!n)return;const e=n.bio||{};if(e.avatar){const a=document.createElement("img");a.alt="";const r="/Portfolio/";a.src=e.avatar.startsWith("http")?e.avatar:`${r}${e.avatar}`,o.appendChild(a)}const t=document.createElement("div"),s=document.createElement("h3");if(s.style.margin="0 0 6px",s.textContent=e.headline||"",t.appendChild(s),e.subline){const a=document.createElement("div");a.textContent=e.subline,t.appendChild(a)}if(e.body){const a=document.createElement("p");a.style.marginTop="10px",a.textContent=e.body,t.appendChild(a)}o.appendChild(t)}}customElements.define("about-bio",b);class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.min=Number(this.getAttribute("min-level")||0),this.data=[]}connectedCallback(){const o=this.shadowRoot,n=document.createElement("style");n.textContent=`
      :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
      .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
      h2{margin:0 0 10px} .skills{display:grid;gap:12px;margin:20px}
      .skill{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center}
      .bar{grid-column:1/-1;height:8px;background:#111a2c;border:1px solid #1a2540;border-radius:999px;overflow:hidden}
      .fill{height:100%;background:linear-gradient(90deg,#2f66c8,#60a5fa)}
    `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section";const s=document.createElement("h2");s.textContent="Skills";const a=document.createElement("div");a.id="skills",t.append(s,a),e.appendChild(t),o.append(n,e),this._load()}async _load(){const o=await p();o&&(this.data=o.skills&&o.skills.categories?o.skills.categories:[],this._render())}_render(){const o=this.shadowRoot.getElementById("skills");if(o.textContent="",!this.data.length){const n=document.createElement("p");n.style.color="var(--muted,#9aa4b2)",n.textContent="No skills listed.",o.appendChild(n);return}this.data.forEach(n=>{const e=document.createElement("div");e.style.margin="8px 0 2px",e.style.fontWeight="600",e.textContent=n.title||n.name||"Skills",o.appendChild(e);const t=document.createElement("div");t.className="skills",(n.items||[]).filter(s=>Number(s.value||0)>=this.min).forEach(s=>{const a=Math.max(0,Math.min(3,Number(s.value||0))),r=a/3*100,l=String(s.label||""),i=document.createElement("div");i.className="skill";const m=document.createElement("div");m.textContent=l;const c=document.createElement("div");c.textContent=`${a}/3`;const u=document.createElement("div");u.className="bar";const h=document.createElement("div");h.className="fill",h.style.width=`${r}%`,u.appendChild(h),i.append(m,c,u),t.appendChild(i)}),o.appendChild(t)})}}customElements.define("skills-list",g);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const o=this.shadowRoot,n=document.createElement("style");n.textContent=`
      :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
      .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
      h2{margin:0 0 10px}
      .endorsements{display:grid;gap:12px}
      blockquote{margin:0;color:#cfd5e2}
      .endorser{color:var(--muted,#9aa4b2);margin-top:5px;margin-bottom:15px}
    `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section";const s=document.createElement("h2");s.textContent="Endorsements";const a=document.createElement("div");a.id="endorsements",a.className="endorsements",t.append(s,a),e.appendChild(t),o.append(n,e),this._load(a)}async _load(o){const n=await p();if(!n)return;const e=n.endorsements||[];if(o.textContent="",!e.length){const t=document.createElement("p");t.style.color="var(--muted,#9aa4b2)",t.textContent="No endorsements yet.",o.appendChild(t);return}e.forEach(t=>{const s=document.createElement("div"),a=document.createElement("blockquote");String(t.quote||"").split(`
`).forEach((l,i)=>{i&&a.appendChild(document.createElement("br")),a.appendChild(document.createTextNode(l))});const r=document.createElement("div");r.className="endorser",r.textContent=`— ${t.name||"Anonymous"}${t.role?", "+t.role:""}`,s.append(a,r),o.appendChild(s)})}}customElements.define("endorsements-list",f);class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const o=this.shadowRoot,n=document.createElement("style");n.textContent=`
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
    `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section",t.id="card";const s=document.createElement("h2");s.textContent="Employment Timeline";const a=document.createElement("ul");a.id="timelineList",a.setAttribute("aria-label","Employment timeline"),t.append(s,a),e.appendChild(t),o.append(n,e),new IntersectionObserver(l=>{l.forEach(i=>{i.isIntersecting&&i.target.classList.add("show")})},{threshold:.12}).observe(t),this._load(a)}async _load(o){const n=await p();n&&this._render(o,Array.isArray(n.timeline)?n.timeline:[])}_render(o,n){o.textContent="",n.forEach(e=>{const t=document.createElement("li");t.tabIndex=0;const s=document.createElement("div");s.className="title";const a=`${e.start||""}${e.end?" — "+e.end:" — Present"}`;s.textContent=a;const r=document.createElement("div");r.className="details";const l=[e.role||"",e.company||""].filter(Boolean).join(" — ");if(l){const i=document.createElement("div");i.textContent=l,r.appendChild(i)}if(Array.isArray(e.bullets)&&e.bullets.length){const i=document.createElement("ul");i.className="bullets",e.bullets.forEach(m=>{const c=document.createElement("li");c.textContent=String(m),i.appendChild(c)}),r.appendChild(i)}t.append(s,r),o.appendChild(t)})}}customElements.define("employment-timeline",E);function v(){const d=document.querySelectorAll(".fade-section");if(d.length===0){requestAnimationFrame(()=>{const o=document.querySelectorAll(".fade-section");o.length>0&&x(o)});return}x(d)}function x(d){const o=new IntersectionObserver(n=>{n.forEach(e=>{e.isIntersecting&&e.target.classList.add("visible")})},{threshold:.15});d.forEach(n=>o.observe(n))}Promise.all([customElements.whenDefined("about-bio"),customElements.whenDefined("skills-list"),customElements.whenDefined("endorsements-list"),customElements.whenDefined("employment-timeline")]).then(()=>{requestAnimationFrame(()=>{v()})});
