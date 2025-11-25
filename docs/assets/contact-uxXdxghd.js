import"./nav-bar-crAhWqTn.js";class Y extends HTMLElement{constructor(){super();const j=this.attachShadow({mode:"open"});j.innerHTML=`
      <style>
        :host {
          --bg: #040814;
          --fg: #f9fafb;
          --accent: #38bdf8;
          --accent-soft: rgba(56, 189, 248, 0.1);
          --error: #f97373;
          --border: rgba(148, 163, 184, 0.5);
          --border-focus: #38bdf8;
          --field-bg: rgba(15, 23, 42, 0.7);
          --gap: clamp(0.5rem, 1vw, 1rem);
          --radius: 0.75rem;
          --shadow-soft: 0 18px 45px rgba(15, 23, 42, 0.7);
          --field-w: 520px;

          display: block;
          font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
          color: var(--fg);
        }

        .wrapper {
          max-width: min(960px, 100%);
          margin: 0 auto;
          padding: clamp(1.5rem, 3vw, 2.5rem);
          border-radius: 1.5rem;
          background:
            radial-gradient(circle at top left, rgba(56, 189, 248, 0.18), transparent 55%),
            radial-gradient(circle at bottom right, rgba(129, 140, 248, 0.15), transparent 55%),
            linear-gradient(145deg, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.98));
          box-shadow: var(--shadow-soft);
          border: 1px solid rgba(148, 163, 184, 0.6);
          backdrop-filter: blur(18px);
          box-sizing: border-box;
        }

        h2 {
          margin: 0 0 0.5rem;
          font-size: clamp(1.4rem, 2.3vw, 1.8rem);
          font-weight: 650;
          letter-spacing: 0.02em;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        h2::before {
          content: "";
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 999px;
          background: radial-gradient(circle at 30% 30%, #e0f2fe, #38bdf8);
          box-shadow: 0 0 18px rgba(56, 189, 248, 0.8);
        }

        p.lede {
          margin: 0 0 1.5rem;
          color: #cbd5f5;
          font-size: 0.95rem;
          line-height: 1.5;
          max-width: 46rem;
        }

        form {
          margin: 0;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(0, var(--field-w)));
          column-gap: var(--gap);
          row-gap: clamp(0.75rem, 2vw, 1rem);
        }

        .field {
          display: grid;
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: auto auto auto;
          gap: 0.35rem;
        }

        label {
          font-size: 0.82rem;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9ca3af;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }

        label span.hint {
          font-size: 0.72rem;
          text-transform: none;
          letter-spacing: 0;
          color: #6b7280;
        }

        input,
        textarea {
          font: inherit;
          color: var(--fg);
          background-color: var(--field-bg);
          border-radius: calc(var(--radius) - 0.25rem);
          border: 1px solid var(--border);
          padding: 0.6rem 0.75rem;
          outline: none;
          transition:
            border-color 0.15s ease,
            box-shadow 0.15s ease,
            background-color 0.15s ease,
            transform 0.08s ease;
          box-sizing: border-box;
        }

        input::placeholder,
        textarea::placeholder {
          color: #6b7280;
        }

        input:focus,
        textarea:focus {
          border-color: var(--border-focus);
          box-shadow: 0 0 0 1px rgba(56, 189, 248, 0.7);
          background-color: rgba(15, 23, 42, 0.95);
          transform: translateY(-1px);
        }

        textarea {
          min-height: 140px;
          resize: vertical;
          line-height: 1.5;
        }

        .field-error {
          min-height: 1.1rem;
          font-size: 0.8rem;
          color: var(--error);
        }

        .field.is-invalid input,
        .field.is-invalid textarea {
          border-color: var(--error);
          box-shadow: 0 0 0 1px rgba(248, 113, 113, 0.9);
        }

        .msg-counter {
          font-size: 0.78rem;
          color: #9ca3af;
          margin-top: 0.25rem;
        }

        .actions {
          grid-column: 1 / -1;
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          align-items: center;
          margin-top: 0.5rem;
        }

        button {
          font: inherit;
          border-radius: 999px;
          border: 1px solid transparent;
          padding: 0.55rem 1.3rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          transition:
            background-color 0.15s ease,
            border-color 0.15s ease,
            box-shadow 0.15s ease,
            transform 0.08s ease;
        }

        button.btn {
          background: radial-gradient(circle at top left, #38bdf8, #0ea5e9);
          color: #0b1220;
          box-shadow: 0 12px 30px rgba(56, 189, 248, 0.45);
        }

        button.btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 14px 35px rgba(56, 189, 248, 0.6);
        }

        button.btn:active {
          transform: translateY(0);
          box-shadow: 0 8px 24px rgba(56, 189, 248, 0.5);
        }

        button.ghost {
          background: transparent;
          border-color: rgba(148, 163, 184, 0.7);
          color: #e5e7eb;
        }

        button.ghost:hover {
          background-color: rgba(15, 23, 42, 0.9);
        }

        .note {
          grid-column: 1 / -1;
          margin-top: 0.5rem;
          font-size: 0.8rem;
          color: #9ca3af;
          padding: 0.6rem 0.75rem;
          border-radius: calc(var(--radius) - 0.25rem);
          background-color: var(--accent-soft);
          border: 1px dashed rgba(56, 189, 248, 0.6);
        }

        .form-message {
          grid-column: 1 / -1;
          margin-top: 0.5rem;
          font-size: 0.85rem;
          padding: 0.6rem 0.75rem;
          border-radius: calc(var(--radius) - 0.25rem);
          display: none;
        }

        .form-message.visible {
          display: block;
        }

        .form-message.success {
          background-color: rgba(22, 163, 74, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.7);
          color: #bbf7d0;
        }

        .form-message.error {
          background-color: rgba(248, 113, 113, 0.12);
          border: 1px solid rgba(248, 113, 113, 0.7);
          color: #fee2e2;
        }

        @media (max-width: 640px) {
          .wrapper {
            border-radius: 1.1rem;
            padding: 1.25rem;
          }

          form {
            row-gap: 0.85rem;
          }

          .actions {
            flex-direction: column;
            align-items: stretch;
          }

          .actions button {
            width: 100%;
            justify-content: center;
          }
        }
      </style>
    `;const h=document.createElement("div");h.className="wrapper";const N=document.createElement("h2");N.textContent="Let’s talk about your project";const x=document.createElement("p");x.className="lede",x.textContent="Have a question, an idea, or a project in mind? Share a few details below—Jessica will follow up personally to talk through next steps.";const n=document.createElement("form");n.noValidate=!0;const m=(e,a,t="input",s={})=>{const l=document.createElement("div");l.className="field";const r=document.createElement("label");r.htmlFor=a,r.textContent=e;const c=document.createElement(t==="textarea"?"textarea":"input");c.name=a,c.id=a,Object.entries(s).forEach(([M,u])=>{u===!0||u===""?c.setAttribute(M,""):u!==!1&&u!=null&&c.setAttribute(M,String(u))});const d=document.createElement("div");return d.className="field-error",d.id=`${a}-err`,d.setAttribute("aria-live","polite"),c.setAttribute("aria-describedby",d.id),l.append(r,c,d),l},A="^[A-Za-z0-9 ]+$",L="^[A-Za-z][A-Za-z -]*$",P="^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",$=/^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/,q=m("Subject*","subject","input",{type:"text",pattern:A,maxlength:"80",placeholder:"e.g., Portfolio Inquiry"}),Z=m("Name*","name","input",{type:"text",pattern:L,maxlength:"60",placeholder:"e.g., Jane Doe"}),F=m("Email*","email","input",{type:"email",pattern:P,maxlength:"120",placeholder:"you@example.com"}),H=m("Phone*","phone","input",{type:"tel",maxlength:"20",placeholder:"e.g., 715-600-3468"}),v=m("Message*","message","textarea",{maxlength:"1000",placeholder:"How can I help?"}),k=v.querySelector("textarea"),p=document.createElement("div");p.className="msg-counter",p.textContent="Words: 0 / 10 minimum",v.appendChild(p);const w=document.createElement("div");w.className="actions";const g=document.createElement("button");g.className="btn",g.type="submit",g.textContent="Send";const b=document.createElement("button");b.className="btn ghost",b.type="reset",b.textContent="Reset",w.append(g,b);const y=document.createElement("div");y.className="note",y.textContent="Subject ≥ 4 chars. Name ≥ 2 letters. Email must be valid. Phone requires at least 10 numeric chars with valid area code. Message ≥ 10 words, and may include common punctuation.";const o=document.createElement("div");o.className="form-message",o.setAttribute("aria-live","polite"),h.append(N,x,n),n.append(q,Z,F,H,v,w,y,o),j.appendChild(h);const i=e=>{const a=n.querySelector(`[name="${e}"]`),t=a.closest(".field"),s=t.querySelector(".field-error");return{control:a,row:t,err:s}},E=(e,a)=>{const{control:t,row:s,err:l}=i(e);t&&(a?(s.classList.add("is-invalid"),l.textContent=a):(s.classList.remove("is-invalid"),l.textContent=""))},z=e=>(e.match(/[A-Za-z0-9]/g)||[]).length,I=e=>(e.match(/[0-9]/g)||[]).length,S=e=>(e.trim().match(/\b\w+\b/g)||[]).length,f=()=>{const e=k.value||"",a=S(e);p.textContent=`Words: ${a} / 10 minimum`},C=e=>{const{control:a}=i(e);if(!a)return!0;a.tagName.toLowerCase()!=="textarea"&&(a.value=a.value.trim());let t="";const s=a.validity,l={subject:"Subject",name:"Name",email:"Email",phone:"Phone",message:"Message"};if(s.typeMismatch&&a.type==="email"?t="Please enter a valid email address.":s.patternMismatch&&(e==="subject"?t=`${l[e]} may contain letters, numbers, and spaces only.`:e==="name"?t="Name may contain letters, spaces, or hyphens only.":e==="email"&&(t="Please enter a valid email address.")),!t){const r=a.value;e==="subject"?(r.length<4||z(r)<4)&&(t="Subject must be at least 4 characters (letters/numbers)."):e==="name"?(r.length<2||!/^[A-Za-z][A-Za-z -]*$/.test(r))&&(t="Name must start with a letter and be at least 2 characters."):e==="message"?/^[A-Za-z0-9 ,.!?'"()\-\n\r]+$/.test(r)?z(r)<10?t="Message must have at least 10 letters/numbers.":S(r)<10&&(t="Message must contain at least 10 words."):t="Message may contain letters, numbers, spaces, and common punctuation.":e==="email"?/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r)||(t="Please enter a valid email address."):e==="phone"&&(I(r)<10?t="Phone number must have at least 10 digits.":$.test(r)||(t="Please enter a valid phone number (e.g., 715-600-3468)."))}return E(e,t),!t},T=()=>{let e=!0;return["subject","name","email","phone","message"].forEach(t=>{C(t)||(e=!1)}),e};k.addEventListener("input",f),["subject","name","email","phone","message"].forEach(e=>{const{control:a}=i(e);a.addEventListener("blur",()=>C(e)),a.addEventListener("input",()=>{C(e)})}),n.addEventListener("submit",e=>{if(e.preventDefault(),o.className="form-message",o.textContent="",!T()){o.textContent="Please fix the highlighted fields and try again.",o.classList.add("visible","error");const t=n.querySelector(".field.is-invalid input, .field.is-invalid textarea");t&&t.focus();return}const a={subject:i("subject").control.value,name:i("name").control.value,email:i("email").control.value,phone:i("phone").control.value,message:i("message").control.value};console.log("Contact form submission:",a),o.textContent="Thank you! Your message has been sent (demo only – no email was actually sent).",o.classList.add("visible","success"),n.reset(),f(),["subject","name","email","phone","message"].forEach(t=>E(t,""))}),n.addEventListener("reset",()=>{setTimeout(()=>{o.className="form-message",o.textContent="",f(),["subject","name","email","phone","message"].forEach(e=>E(e,""))},0)}),f()}}customElements.define("contact-form",Y);
