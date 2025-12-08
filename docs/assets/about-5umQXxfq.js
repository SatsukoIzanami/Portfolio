import"./nav-bar-crAhWqTn.js";async function p(){const d=window.location.hostname.includes("github.io"),a=window.location.hostname.includes("onrender.com"),n=d?"https://portfolio-awnu.onrender.com/data/about.json":a?"/data/about.json":"http://localhost:2000/data/about.json";try{const e=await fetch(n,{cache:"no-cache"});if(!e.ok)throw new Error(`HTTP ${e.status}`);return await e.json()}catch(e){return console.error("Failed to load about.json:",e),null}}class g extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const a=this.shadowRoot,n=document.createElement("style");n.textContent=`
            :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
            .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
              border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
            h2{margin:0 0 10px} p{margin:0;color:var(--muted,#9aa4b2)}
            .bio{display:grid;grid-template-columns:96px 1fr;gap:16px;align-items:start}
            .bio img{width:96px;height:96px;object-fit:cover;border-radius:16px;border:1px solid var(--border,#1a2440)}
            @media (max-width:720px){.bio{grid-template-columns:1fr}.bio img{width:72px;height:72px}}
        `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section";const s=document.createElement("h2");s.textContent="About Me";const o=document.createElement("div");o.className="bio",o.id="bio",t.append(s,o),e.appendChild(t),a.append(n,e),this._load(o)}async _load(a){const n=await p();if(!n)return;const e=n.bio||{};if(e.avatar){const o=document.createElement("img");o.alt="";const r="/Portfolio/";o.src=e.avatar.startsWith("http")?e.avatar:`${r}${e.avatar}`,a.appendChild(o)}const t=document.createElement("div"),s=document.createElement("h3");if(s.style.margin="0 0 6px",s.textContent=e.headline||"",t.appendChild(s),e.subline){const o=document.createElement("div");o.textContent=e.subline,t.appendChild(o)}if(e.body){const o=document.createElement("p");o.style.marginTop="10px",o.textContent=e.body,t.appendChild(o)}a.appendChild(t)}}customElements.define("about-bio",g);class f extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.min=Number(this.getAttribute("min-level")||0),this.data=[]}connectedCallback(){const a=this.shadowRoot,n=document.createElement("style");n.textContent=`
      :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
      .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
      h2{margin:0 0 10px} .skills{display:grid;gap:12px;margin:20px}
      .skill{display:grid;grid-template-columns:1fr auto;gap:10px;align-items:center}
      .bar{grid-column:1/-1;height:8px;background:#111a2c;border:1px solid #1a2540;border-radius:999px;overflow:hidden}
      .fill{height:100%;background:linear-gradient(90deg,#2f66c8,#60a5fa)}
    `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section";const s=document.createElement("h2");s.textContent="Skills";const o=document.createElement("div");o.id="skills",t.append(s,o),e.appendChild(t),a.append(n,e),this._load()}async _load(){const a=await p();a&&(this.data=a.skills&&a.skills.categories?a.skills.categories:[],this._render())}_render(){const a=this.shadowRoot.getElementById("skills");if(a.textContent="",!this.data.length){const n=document.createElement("p");n.style.color="var(--muted,#9aa4b2)",n.textContent="No skills listed.",a.appendChild(n);return}this.data.forEach(n=>{const e=document.createElement("div");e.style.margin="8px 0 2px",e.style.fontWeight="600",e.textContent=n.title||n.name||"Skills",a.appendChild(e);const t=document.createElement("div");t.className="skills",(n.items||[]).filter(s=>Number(s.value||0)>=this.min).forEach(s=>{const o=Math.max(0,Math.min(3,Number(s.value||0))),r=o/3*100,l=String(s.label||""),i=document.createElement("div");i.className="skill";const m=document.createElement("div");m.textContent=l;const c=document.createElement("div");c.textContent=`${o}/3`;const u=document.createElement("div");u.className="bar";const h=document.createElement("div");h.className="fill",h.style.width=`${r}%`,u.appendChild(h),i.append(m,c,u),t.appendChild(i)}),a.appendChild(t)})}}customElements.define("skills-list",f);class E extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const a=this.shadowRoot,n=document.createElement("style");n.textContent=`
      :host{display:block}.wrap{max-width:1100px;margin:0 auto;padding:24px}
      .section{margin:18px 0;padding:18px 20px;background:linear-gradient(180deg,var(--surface,#0f172a),var(--elev,#111a2e));
        border:1px solid var(--border,#1a2440);border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.45)}
      h2{margin:0 0 10px}
      .endorsements{display:grid;gap:12px}
      blockquote{margin:0;color:#cfd5e2}
      .endorser{color:var(--muted,#9aa4b2);margin-top:5px;margin-bottom:15px}
    `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section";const s=document.createElement("h2");s.textContent="Endorsements";const o=document.createElement("div");o.id="endorsements",o.className="endorsements",t.append(s,o),e.appendChild(t),a.append(n,e),this._load(o)}async _load(a){const n=await p();if(!n)return;const e=n.endorsements||[];if(a.textContent="",!e.length){const t=document.createElement("p");t.style.color="var(--muted,#9aa4b2)",t.textContent="No endorsements yet.",a.appendChild(t);return}e.forEach(t=>{const s=document.createElement("div"),o=document.createElement("blockquote");String(t.quote||"").split(`
`).forEach((l,i)=>{i&&o.appendChild(document.createElement("br")),o.appendChild(document.createTextNode(l))});const r=document.createElement("div");r.className="endorser",r.textContent=`— ${t.name||"Anonymous"}${t.role?", "+t.role:""}`,s.append(o,r),a.appendChild(s)})}}customElements.define("endorsements-list",E);class v extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const a=this.shadowRoot,n=document.createElement("style");n.textContent=`
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
    `;const e=document.createElement("div");e.className="wrap";const t=document.createElement("section");t.className="section",t.id="card";const s=document.createElement("h2");s.textContent="Employment Timeline";const o=document.createElement("ul");o.id="timelineList",o.setAttribute("aria-label","Employment timeline"),t.append(s,o),e.appendChild(t),a.append(n,e),new IntersectionObserver(l=>{l.forEach(i=>{i.isIntersecting&&i.target.classList.add("show")})},{threshold:.12}).observe(t),this._load(o)}async _load(a){const n=await p();n&&this._render(a,Array.isArray(n.timeline)?n.timeline:[])}_render(a,n){a.textContent="",n.forEach(e=>{const t=document.createElement("li");t.tabIndex=0;const s=document.createElement("div");s.className="title";const o=`${e.start||""}${e.end?" — "+e.end:" — Present"}`;s.textContent=o;const r=document.createElement("div");r.className="details";const l=[e.role||"",e.company||""].filter(Boolean).join(" — ");if(l){const i=document.createElement("div");i.textContent=l,r.appendChild(i)}if(Array.isArray(e.bullets)&&e.bullets.length){const i=document.createElement("ul");i.className="bullets",e.bullets.forEach(m=>{const c=document.createElement("li");c.textContent=String(m),i.appendChild(c)}),r.appendChild(i)}t.append(s,r),a.appendChild(t)})}}customElements.define("employment-timeline",v);function x(){const d=document.querySelectorAll(".fade-section");if(d.length===0){setTimeout(x,100);return}const a=new IntersectionObserver(n=>{n.forEach(e=>{e.isIntersecting&&(e.target.classList.add("visible"),a.unobserve(e.target))})},{threshold:.1,rootMargin:"0px 0px -20px 0px"});d.forEach(n=>{n.classList.remove("visible");const e=n.getBoundingClientRect(),t=window.innerHeight||document.documentElement.clientHeight;e.top<t&&e.bottom>0?setTimeout(()=>{n.classList.add("visible")},50):a.observe(n)})}function w(){document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{b()}):b()}function b(){Promise.all([customElements.whenDefined("about-bio"),customElements.whenDefined("skills-list"),customElements.whenDefined("endorsements-list"),customElements.whenDefined("employment-timeline")]).then(()=>{setTimeout(x,150)}).catch(()=>{setTimeout(x,300)})}w();
