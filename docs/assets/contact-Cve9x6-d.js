import"./nav-bar-crAhWqTn.js";class W extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"})}connectedCallback(){const C=this.shadowRoot,N=document.createElement("style");N.textContent=`
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
      .msg-counter {
        grid-column: 2 / 3;
        font-size: 12px;
        color: #9ca3af;
        margin-top: 4px;
      }
      .form-message { margin-top: 6px; min-height:1.2em; }
      @media (max-width: 640px) {
        .field { grid-template-columns: 1fr; row-gap: 6px; }
        .field-error { grid-column: 1 / -1; }
        .msg-counter { grid-column: 1 / -1; }
      }
    `,C.appendChild(N);const b=document.createElement("div");b.className="wrap";const j=document.createElement("h2");j.textContent="Contact Me";const i=document.createElement("form");i.noValidate=!0;const m=(e,t,a="input",s={})=>{const n=document.createElement("div");n.className="field";const o=document.createElement("label");o.htmlFor=t,o.textContent=e;const c=document.createElement(a);c.name=t,c.id=t,Object.entries(s).forEach(([S,p])=>{p===!0||p===""?c.setAttribute(S,""):p!==!1&&p!=null&&c.setAttribute(S,String(p))});const u=document.createElement("div");return u.className="field-error",u.id=`${t}-err`,u.setAttribute("aria-live","polite"),c.setAttribute("aria-describedby",u.id),n.append(o,c,u),n},z="^[A-Za-z0-9 ]+$",P="^[A-Za-z][A-Za-z -]*$",$="^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",L="^(\\+?1[\\s.-]?)?(\\(?\\d{3}\\)?[\\s.-]?)?\\d{3}[\\s.-]?\\d{4}$",k=m("Subject*","subject","input",{type:"text",pattern:z,maxlength:"80",placeholder:"e.g., Portfolio Inquiry"}),Z=m("Name*","name","input",{type:"text",pattern:P,maxlength:"60",placeholder:"e.g., Jane Doe"}),q=m("Email*","email","input",{type:"email",pattern:$,maxlength:"120",placeholder:"you@example.com"}),F=m("Phone*","phone","input",{type:"tel",pattern:L,maxlength:"20",placeholder:"e.g., 715-600-3468"}),x=m("Message*","message","textarea",{maxlength:"1000",placeholder:"How can I help?"}),D=x.querySelector("textarea"),g=document.createElement("div");g.className="msg-counter",g.textContent="Words: 0 / 10 minimum",x.appendChild(g);const v=document.createElement("div");v.className="actions";const f=document.createElement("button");f.className="btn",f.type="submit",f.textContent="Send";const h=document.createElement("button");h.className="btn ghost",h.type="reset",h.textContent="Reset",v.append(f,h);const y=document.createElement("div");y.className="note",y.textContent="Subject ≥ 4 chars. Name ≥ 2 letters. Phone: valid 10-digit number. Message ≥ 10 alphanumeric chars and ≥ 10 words.";const l=document.createElement("div");l.className="form-message",l.setAttribute("aria-live","polite"),i.append(k,Z,q,F,x,v,y,l),b.append(j,i),C.appendChild(b);const r=e=>{const t=i.querySelector(`[name="${e}"]`),a=t.closest(".field"),s=a.querySelector(".field-error");return{control:t,row:a,err:s}},E=(e,t)=>{const{control:a,row:s,err:n}=r(e);a&&(t?(s.classList.add("is-invalid"),a.setAttribute("aria-invalid","true"),n.textContent=t):(s.classList.remove("is-invalid"),a.removeAttribute("aria-invalid"),n.textContent=""))},H=e=>(e.match(/[A-Za-z]/g)||[]).length,A=e=>(e.match(/[A-Za-z0-9]/g)||[]).length,I=e=>(e.match(/[0-9]/g)||[]).length,M=e=>(e.trim().match(/\b\w+\b/g)||[]).length,d=()=>{const e=D.value||"",t=M(e);g.textContent=`Words: ${t} / 10 minimum`},w=e=>{const{control:t}=r(e);if(!t)return!0;t.tagName.toLowerCase()!=="textarea"&&(t.value=t.value.trim());let a="";const s=t.validity,n={subject:"Subject",name:"Name",email:"Email",phone:"Phone",message:"Message"};if(s.typeMismatch&&t.type==="email"?a="Please enter a valid email address.":s.patternMismatch&&(e==="subject"||e==="message"?a=`${n[e]} may contain letters, numbers, and spaces only.`:e==="name"?a="Name may contain letters, spaces, or hyphens only.":e==="email"?a="Please enter a valid email address.":e==="phone"&&(a="Please enter a valid phone number (e.g., 715-600-3468).")),!a){const o=t.value;e==="subject"?A(o)<4&&(a="Subject must have at least 4 letters/numbers."):e==="name"?H(o)<2&&(a="Name must have at least 2 letters."):e==="message"?/^[A-Za-z0-9 \n\r]+$/.test(o)?A(o)<10?a="Message must have at least 10 letters/numbers.":M(o)<10&&(a="Message must contain at least 10 words."):a="Message may contain letters, numbers, and spaces only.":e==="email"?/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(o)||(a="Please enter a valid email address."):e==="phone"&&I(o)<10&&(a="Phone number must have at least 10 digits.")}return E(e,a),!a},T=()=>{const e=["subject","name","email","phone","message"];let t=null,a=!0;return e.forEach(s=>{const n=w(s);!n&&!t&&(t=r(s).control),a=a&&n}),!a&&t&&(t.focus(),t.scrollIntoView({block:"center",behavior:"smooth"})),a};["subject","name","email","phone","message"].forEach(e=>{const{control:t}=r(e);t.addEventListener("blur",()=>{w(e),e==="message"&&d()}),t.addEventListener("input",()=>{w(e)&&E(e,""),e==="message"&&d()})}),d(),i.addEventListener("submit",e=>{e.preventDefault(),l.textContent="",T()&&(r("subject").control.value,r("name").control.value,r("email").control.value,r("phone").control.value,r("message").control.value,i.reset(),d(),l.textContent="Thank you! Your message has been sent.",setTimeout(()=>l.textContent="",3e3))}),i.addEventListener("reset",()=>{["subject","name","email","phone","message"].forEach(e=>E(e,"")),l.textContent="",d()})}}customElements.define("contact-form",W);
