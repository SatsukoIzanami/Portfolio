import"./nav-bar-crAhWqTn.js";class P extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const y=this.shadowRoot,E=document.createElement("style");E.textContent=`
      :host { 
        --label-w: 140px;
        --field-w: 440px; 
        --gap: 14px; 
        --err: #ffb4a3; 
        color: var(--text, #e5e7eb); 
        font: 14px/1.4 system-ui, sans-serif; 
        display:block; 
        }
      .wrap { 
        background: var(--surface,#0f172a); 
        border:1px solid var(--border,#1a2440); 
        border-radius:16px; padding:18px; 
        max-width: 740px; 
        }
      h2 { 
        margin:0 0 12px 0; 
        font-size: 30px; 
        }
      form { 
      display:grid; 
      row-gap: var(--gap); 
      }
      .field { 
      display:grid; 
      grid-template-columns: var(--label-w) minmax(0, var(--field-w)); 
      column-gap: var(--gap); 
      align-items:center; 
      }
      label { font-weight:600; }
      input, 
      textarea {
        width: 100%; 
        padding: 10px 12px; 
        border-radius: 10px; 
        border: 1px solid var(--border,#1a2440);
        background:#0b1223; 
        color: inherit; 
        box-sizing: border-box;
      }
      textarea { resize: vertical; min-height: 120px; }
      .field-error { 
      grid-column: 2 / 3; 
      color: var(--err); 
      font-size: 12px; 
      min-height: 1.2em; 
      }
      .is-invalid input, .is-invalid textarea { border-color: #b23a3a; }
      .actions { display:flex; gap:10px; }
      .btn { 
        padding: 10px 14px; 
        border-radius: 10px; 
        border: 1px solid var(--border,#1a2440); 
        background:#143061; 
        color: #fff; 
        cursor:pointer; 
        }
      .btn.ghost { background: transparent; color: inherit; }
      .note { font-size: 12px; color:#93a0b4; margin-top: 6px; }
      .form-message { margin-top: 6px; min-height:1.2em; }
      @media (max-width: 640px) {
        .field { grid-template-columns: 1fr; row-gap: 6px; }
        .field-error { grid-column: 1 / -1; }
      }
    `,y.appendChild(E);const f=document.createElement("div");f.className="wrap";const w=document.createElement("h2");w.textContent="Contact Me";const l=document.createElement("form");l.noValidate=!0;const u=(e,t,a="input",s={})=>{const r=document.createElement("div");r.className="field";const n=document.createElement("label");n.htmlFor=t,n.textContent=e;const c=document.createElement(a);c.name=t,c.id=t,Object.entries(s).forEach(([j,d])=>{d===!0||d===""?c.setAttribute(j,""):d!==!1&&d!=null&&c.setAttribute(j,String(d))});const m=document.createElement("div");return m.className="field-error",m.id=`${t}-err`,m.setAttribute("aria-live","polite"),c.setAttribute("aria-describedby",m.id),r.append(n,c,m),r},N="^[A-Za-z0-9 ]+$",A="^[A-Za-z][A-Za-z -]*$",M="^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",S=u("Subject*","subject","input",{type:"text",pattern:N,maxlength:"80",placeholder:"e.g., Portfolio Inquiry"}),z=u("Name*","name","input",{type:"text",pattern:A,maxlength:"60",placeholder:"e.g., Jane Doe"}),L=u("Email*","email","input",{type:"email",pattern:M,maxlength:"120",placeholder:"you@example.com"}),k=u("Message*","message","textarea",{maxlength:"1000",placeholder:"How can I help?"}),g=document.createElement("div");g.className="actions";const p=document.createElement("button");p.className="btn",p.type="submit",p.textContent="Send";const b=document.createElement("button");b.className="btn ghost",b.type="reset",b.textContent="Reset",g.append(p,b);const x=document.createElement("div");x.className="note",x.textContent="Subject ≥ 4 chars (letters/numbers). Name ≥ 2 letters (letters only). Message ≥ 10 chars (letters/numbers).";const i=document.createElement("div");i.className="form-message",i.setAttribute("aria-live","polite"),l.append(S,z,L,k,g,x,i),f.append(w,l),y.appendChild(f);const o=e=>{const t=l.querySelector(`[name="${e}"]`),a=t.closest(".field"),s=a.querySelector(".field-error");return{control:t,row:a,err:s}},h=(e,t)=>{const{control:a,row:s,err:r}=o(e);a&&(t?(s.classList.add("is-invalid"),a.setAttribute("aria-invalid","true"),r.textContent=t):(s.classList.remove("is-invalid"),a.removeAttribute("aria-invalid"),r.textContent=""))},$=e=>(e.match(/[A-Za-z]/g)||[]).length,C=e=>(e.match(/[A-Za-z0-9]/g)||[]).length,v=e=>{const{control:t}=o(e);if(!t)return!0;t.tagName.toLowerCase()!=="textarea"&&(t.value=t.value.trim());let a="";const s=t.validity,r={subject:"Subject",name:"Name",email:"Email",message:"Message"};if(s.typeMismatch&&t.type==="email"?a="Please enter a valid email address.":s.patternMismatch&&(e==="subject"||e==="message"?a=`${r[e]} may contain letters, numbers, and spaces only.`:e==="name"?a="Name may contain letters, spaces, or hyphens only.":e==="email"&&(a="Please enter a valid email address.")),!a){const n=t.value;e==="subject"?C(n)<4&&(a="Subject must have at least 4 letters/numbers."):e==="name"?$(n)<2&&(a="Name must have at least 2 letters."):e==="message"?/^[A-Za-z0-9 \n\r]+$/.test(n)?C(n)<10&&(a="Message must have at least 10 letters/numbers."):a="Message may contain letters, numbers, and spaces only.":e==="email"&&(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(n)||(a="Please enter a valid email address."))}return h(e,a),!a},Z=()=>{const e=["subject","name","email","message"];let t=null,a=!0;return e.forEach(s=>{const r=v(s);!r&&!t&&(t=o(s).control),a=a&&r}),!a&&t&&(t.focus(),t.scrollIntoView({block:"center",behavior:"smooth"})),a};["subject","name","email","message"].forEach(e=>{const{control:t}=o(e);t.addEventListener("blur",()=>v(e)),t.addEventListener("input",()=>{v(e)&&h(e,"")})}),l.addEventListener("submit",e=>{e.preventDefault(),i.textContent="",Z()&&(o("subject").control.value,o("name").control.value,o("email").control.value,o("message").control.value,l.reset(),i.textContent="Thank you! Your message has been sent.",setTimeout(()=>i.textContent="",3e3))}),l.addEventListener("reset",()=>{["subject","name","email","message"].forEach(e=>h(e,"")),i.textContent=""})}}customElements.define("contact-form",P);
