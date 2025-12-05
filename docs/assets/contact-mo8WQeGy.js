import"./nav-bar-crAhWqTn.js";class W extends HTMLElement{constructor(){super();const N=this.attachShadow({mode:"open"});N.innerHTML=`
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
		`;const x=document.createElement("div");x.className="wrapper";const k=document.createElement("h2");k.textContent="Let’s talk about your project";const v=document.createElement("p");v.className="lede",v.textContent="Have a question, an idea, or a project in mind? Share a few details below—Jessica will follow up personally to talk through next steps.";const l=document.createElement("form");l.noValidate=!0;const p=(e,a,t="input",n={})=>{const m=document.createElement("div");m.className="field";const r=document.createElement("label");r.htmlFor=a,r.textContent=e;const i=document.createElement(t==="textarea"?"textarea":"input");i.name=a,i.id=a,Object.entries(n).forEach(([s,d])=>{d===!0||d===""?i.setAttribute(s,""):d!==!1&&d!=null&&i.setAttribute(s,String(d))});const u=document.createElement("div");return u.className="field-error",u.id=`${a}-err`,u.setAttribute("aria-live","polite"),i.setAttribute("aria-describedby",u.id),m.append(r,i,u),m},A="^[A-Za-z0-9 ]+$",L="^[A-Za-z][A-Za-z\\- ]*$",$="^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$",q=p("Subject*","subject","input",{type:"text",pattern:A,maxlength:"80",placeholder:"e.g., Portfolio Inquiry"}),Z=p("Name*","name","input",{type:"text",pattern:L,maxlength:"60",placeholder:"e.g., Jane Doe"}),F=p("Email*","email","input",{type:"email",pattern:$,maxlength:"120",placeholder:"you@example.com"}),H=p("Phone*","phone","input",{type:"tel",maxlength:"20",placeholder:"e.g., 715-600-3468"}),w=p("Message*","message","textarea",{maxlength:"1000",placeholder:"How can I help?"}),P=w.querySelector("textarea"),b=document.createElement("div");b.className="msg-counter",b.textContent="Words: 0 / 10 minimum",w.appendChild(b);const y=document.createElement("div");y.className="actions";const g=document.createElement("button");g.className="btn",g.type="submit",g.textContent="Send";const f=document.createElement("button");f.className="btn ghost",f.type="reset",f.textContent="Reset",y.append(g,f);const E=document.createElement("div");E.className="note",E.textContent="Subject ≥ 4 chars. Name ≥ 2 letters. Email must be valid. Phone requires at least 10 numeric chars with valid area code. Message ≥ 10 words, and may include common punctuation.";const o=document.createElement("div");o.className="form-message",o.setAttribute("aria-live","polite"),x.append(k,v,l),l.append(q,Z,F,H,w,y,E,o),N.appendChild(x);const c=e=>{const a=l.querySelector(`[name="${e}"]`),t=a.closest(".field"),n=t.querySelector(".field-error");return{control:a,row:t,err:n}},C=(e,a)=>{const{control:t,row:n,err:m}=c(e);t&&(a?(n.classList.add("is-invalid"),m.textContent=a):(n.classList.remove("is-invalid"),m.textContent=""))},S=e=>(e.match(/[A-Za-z0-9]/g)||[]).length,M=e=>(e.trim().match(/\b\w+\b/g)||[]).length,h=()=>{const e=P.value||"",a=M(e);b.textContent=`Words: ${a} / 10 minimum`},j=e=>{const{control:a}=c(e);if(!a)return!0;a.tagName.toLowerCase()!=="textarea"&&(a.value=a.value.trim());let t="";const n=a.validity,m={subject:"Subject",name:"Name",email:"Email",phone:"Phone",message:"Message"};if(n.typeMismatch&&a.type==="email"?t="Please enter a valid email address.":n.patternMismatch&&(e==="subject"?t=`${m[e]} may contain letters, numbers, and spaces only.`:e==="name"?t="Name may contain letters, spaces, or hyphens only.":e==="email"&&(t="Please enter a valid email address.")),!t){const r=a.value;if(e==="subject")(r.length<4||S(r)<4)&&(t="Subject must be at least 4 characters (letters/numbers).");else if(e==="name")(r.length<2||!/^[A-Za-z][A-Za-z\- ]*$/.test(r))&&(t="Name must start with a letter and be at least 2 characters.");else if(e==="message")/^[A-Za-z0-9 ,.!?'"()\-\n\r]+$/.test(r)?S(r)<10?t="Message must have at least 10 letters/numbers.":M(r)<10&&(t="Message must contain at least 10 words."):t="Message may contain letters, numbers, spaces, and common punctuation.";else if(e==="email")/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(r)||(t="Please enter a valid email address.");else if(e==="phone"){const i=r.trim();if(!/^\s*(?:\+?1[.\-\s]?)?(?:\(?\d{3}\)?[.\-\s]?\d{3}[.\-\s]?\d{4})\s*$/.test(i))t="Please enter a valid phone number (10 digits).";else{let s=i.replace(/\D/g,"");if(s.length===11&&s.startsWith("1")&&(s=s.slice(1)),s.length!==10)t="Phone number must have exactly 10 digits.";else{const d=s.slice(0,3),z=s.slice(3,6),T=s.slice(6);d[0]<"2"||d[0]>"9"?t="Area code must start with digits 2–9.":z[0]<"2"||z[0]>"9"?t="Phone number prefix must start with digits 2–9.":z==="000"||T==="0000"?t="Please enter a realistic phone number, not all zeros.":/^(\d)\1{9}$/.test(s)&&(t="Please enter a realistic phone number.")}}}}return C(e,t),!t},I=()=>{let e=!0;return["subject","name","email","phone","message"].forEach(a=>{j(a)||(e=!1)}),e};P.addEventListener("input",h),["subject","name","email","phone","message"].forEach(e=>{const{control:a}=c(e);a.addEventListener("blur",()=>j(e)),a.addEventListener("input",()=>j(e))}),l.addEventListener("submit",e=>{if(e.preventDefault(),o.className="form-message",o.textContent="",!I()){o.textContent="Please fix the highlighted fields and try again.",o.classList.add("visible","error");const t=l.querySelector(".field.is-invalid input, .field.is-invalid textarea");t&&t.focus();return}const a={subject:c("subject").control.value,name:c("name").control.value,email:c("email").control.value,phone:c("phone").control.value,message:c("message").control.value};console.log("Contact form submission:",a),o.textContent="Thank you! Your message has been sent (demo only – no email was actually sent).",o.classList.add("visible","success"),l.reset(),h(),["subject","name","email","phone","message"].forEach(t=>C(t,""))}),l.addEventListener("reset",()=>{setTimeout(()=>{o.className="form-message",o.textContent="",h(),["subject","name","email","phone","message"].forEach(e=>C(e,""))},0)}),h()}}customElements.define("contact-form",W);
