import"./nav-bar-Di05nDYh.js";import"./scroll-effects-DtVxABr3.js";class q extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.currentQuestion=0,this.score=0,this.answered=!1,this.questions=[{question:"What does HTML stand for?",options:["HyperText Markup Language","High Tech Modern Language","Home Tool Markup Language","Hyperlink and Text Markup Language"],correct:0},{question:"Which of these is NOT a JavaScript framework?",options:["React","Vue","Angular","Java"],correct:3},{question:"What does CSS stand for?",options:["Computer Style Sheets","Creative Style System","Cascading Style Sheets","Colorful Style Sheets"],correct:2},{question:"Which HTML tag is used for the largest heading?",options:["<h6>","<h1>","<head>","<heading>"],correct:1},{question:"What is the purpose of the 'alt' attribute in an img tag?",options:["To set the image alignment","To provide alternative text for accessibility","To set the image size","To link the image to another page"],correct:1}]}connectedCallback(){this.shadowRoot.hasChildNodes()||this.render()}render(){const r=document.createElement("style");r.textContent=`
      :host {
        display: block;
      }
      
      .quiz-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      h2 {
        margin: 0 0 16px;
        color: var(--text, #e5e7eb);
        font-size: clamp(20px, 3vw, 26px);
      }

      .question-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .question-text {
        font-size: 1.1rem;
        color: var(--text, #e5e7eb);
        margin: 0;
        line-height: 1.5;
      }

      .options {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-top: 8px;
      }

      .option {
        padding: 12px 16px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        cursor: pointer;
        transition: all 0.2s ease;
        text-align: left;
        font-size: 0.95rem;
      }

      .option:hover:not(:disabled) {
        border-color: #2a4478;
        background: #0f172a;
        transform: translateX(4px);
      }

      .option:disabled {
        cursor: not-allowed;
        opacity: 0.7;
      }

      .option.correct {
        background: rgba(34, 197, 94, 0.15);
        border-color: #22c55e;
        color: #22c55e;
      }

      .option.incorrect {
        background: rgba(239, 68, 68, 0.15);
        border-color: #ef4444;
        color: #ef4444;
      }

      .controls {
        display: flex;
        gap: 12px;
        align-items: center;
        justify-content: space-between;
        margin-top: 8px;
      }

      .button {
        padding: 10px 18px;
        border-radius: 999px;
        border: 1px solid #1b2a4a;
        background: #0a1224;
        color: #d7dbe6;
        font-size: var(--size-sm);
        cursor: pointer;
        transition: border-color 0.18s ease, transform 0.18s ease;
      }

      .button:hover:not(:disabled) {
        border-color: #2a4478;
      }

      .button:active:not(:disabled) {
        transform: translateY(1px);
      }

      .button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .button.primary {
        background: linear-gradient(135deg, var(--brand, #6ee7f5) 0%, var(--brand-2, #7aa2ff) 100%);
        border-color: transparent;
        color: #0b1220;
        font-weight: 500;
      }

      .button.primary:hover:not(:disabled) {
        opacity: 0.9;
      }

      .progress {
        color: var(--muted, #9aa4b2);
        font-size: 0.9rem;
      }

      .results {
        text-align: center;
        padding: 24px 0;
      }

      .score-display {
        font-size: 2rem;
        font-weight: 600;
        margin: 16px 0;
        background: linear-gradient(135deg, var(--brand, #6ee7f5), var(--brand-2, #7aa2ff));
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }

      .score-text {
        color: var(--muted, #9aa4b2);
        margin-bottom: 20px;
      }
    `;const s=document.createElement("div");if(s.className="quiz-container",this.currentQuestion<this.questions.length){const e=this.questions[this.currentQuestion],t=document.createElement("div");t.className="question-container";const o=document.createElement("h3");o.className="question-text",o.textContent=e.question;const a=document.createElement("div");a.className="options",e.options.forEach((m,d)=>{const l=document.createElement("button");l.className="option",l.textContent=m,l.dataset.index=d,l.addEventListener("click",()=>this.selectAnswer(d)),a.appendChild(l)});const n=document.createElement("div");n.className="controls";const i=document.createElement("span");i.className="progress",i.textContent=`Question ${this.currentQuestion+1} of ${this.questions.length}`;const c=document.createElement("button");c.className="button primary",c.textContent=this.currentQuestion===this.questions.length-1?"Finish":"Next",c.disabled=!0,c.addEventListener("click",()=>this.nextQuestion()),n.append(i,c),t.append(o,a,n),s.appendChild(t),this.nextButton=c,this.options=Array.from(a.querySelectorAll(".option"))}else{const e=document.createElement("div");e.className="results";const t=document.createElement("h2");t.textContent="Quiz Complete!";const o=document.createElement("div");o.className="score-display",o.textContent=`${this.score} / ${this.questions.length}`;const a=document.createElement("p");a.className="score-text";const n=this.score/this.questions.length*100;n===100?a.textContent="Perfect score! 🎉":n>=80?a.textContent="Great job! 🌟":n>=60?a.textContent="Good effort! 👍":a.textContent="Keep practicing! 💪";const i=document.createElement("button");i.className="button primary",i.textContent="Try Again",i.addEventListener("click",()=>this.restart()),e.append(t,o,a,i),s.appendChild(e)}this.shadowRoot.append(r,s)}selectAnswer(r){if(this.answered)return;this.answered=!0;const e=this.questions[this.currentQuestion].correct;this.options.forEach((t,o)=>{t.disabled=!0,o===e?t.classList.add("correct"):o===r&&o!==e||o===r&&o!==e&&t.classList.add("incorrect")}),r===e&&this.score++,this.nextButton.disabled=!1}nextQuestion(){if(this.answered){for(this.currentQuestion++,this.answered=!1;this.shadowRoot.firstChild;)this.shadowRoot.removeChild(this.shadowRoot.firstChild);this.render()}}restart(){for(this.currentQuestion=0,this.score=0,this.answered=!1;this.shadowRoot.firstChild;)this.shadowRoot.removeChild(this.shadowRoot.firstChild);this.render()}}customElements.define("quiz-game",q);class z extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shift=3}connectedCallback(){this.shadowRoot.hasChildNodes()||this.render()}render(){const r=document.createElement("style");r.textContent=`
      :host {
        display: block;
      }

      .encoder-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      h2 {
        margin: 0 0 16px;
        color: var(--text, #e5e7eb);
        font-size: clamp(20px, 3vw, 26px);
      }

      .description {
        color: var(--muted, #9aa4b2);
        margin: 0 0 20px;
        line-height: 1.6;
        font-size: 0.95rem;
      }

      .shift-control {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 8px;
      }

      .shift-control label {
        color: var(--text, #e5e7eb);
        font-size: 0.95rem;
        white-space: nowrap;
      }

      .shift-input {
        flex: 1;
        padding: 8px 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 8px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        font-size: 0.95rem;
        max-width: 100px;
      }

      .shift-input:focus {
        outline: none;
        border-color: var(--brand, #6ee7f5);
      }

      .shift-note {
        color: var(--muted, #9aa4b2);
        font-size: 0.85rem;
        margin: 0 0 20px;
      }

      .input-group {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .input-group label {
        color: var(--text, #e5e7eb);
        font-size: 0.95rem;
        font-weight: 500;
      }

      textarea {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        font-family: var(--font-sans, monospace);
        font-size: 0.95rem;
        line-height: 1.5;
        resize: vertical;
      }

      textarea:focus {
        outline: none;
        border-color: var(--brand, #6ee7f5);
      }

      textarea::placeholder {
        color: var(--muted, #9aa4b2);
      }

      .button-group {
        display: flex;
        gap: 12px;
        flex-wrap: wrap;
      }

      .button {
        padding: 10px 18px;
        border-radius: 999px;
        border: 1px solid #1b2a4a;
        background: #0a1224;
        color: #d7dbe6;
        font-size: var(--size-sm);
        cursor: pointer;
        transition: border-color 0.18s ease, transform 0.18s ease;
        white-space: nowrap;
      }

      .button:hover {
        border-color: #2a4478;
      }

      .button:active {
        transform: translateY(1px);
      }

      .button.primary {
        background: linear-gradient(135deg, var(--brand, #6ee7f5) 0%, var(--brand-2, #7aa2ff) 100%);
        border-color: transparent;
        color: #0b1220;
        font-weight: 500;
        flex: 1;
        min-width: 120px;
      }

      .button.primary:hover {
        opacity: 0.9;
      }

      .button.secondary {
        background: transparent;
        border-color: var(--brand-2, #7aa2ff);
        color: var(--brand-2, #7aa2ff);
        flex: 1;
        min-width: 120px;
      }

      .button.secondary:hover {
        background: rgba(122, 162, 255, 0.1);
      }

      .output-group {
        margin-top: 8px;
      }

      .output-display {
        width: 100%;
        min-height: 120px;
        padding: 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: #0a1224;
        color: var(--text, #e5e7eb);
        font-family: var(--font-sans, monospace);
        font-size: 0.95rem;
        line-height: 1.5;
        white-space: pre-wrap;
        word-wrap: break-word;
        overflow-y: auto;
      }

      .output-placeholder {
        color: var(--muted, #9aa4b2);
        font-style: italic;
      }

      .info-box {
        padding: 12px;
        border: 1px solid var(--border, #1a2440);
        border-radius: 10px;
        background: rgba(122, 162, 255, 0.05);
        color: var(--muted, #9aa4b2);
        font-size: 0.9rem;
        line-height: 1.5;
        margin-top: 16px;
      }

      .info-box strong {
        color: var(--brand, #6ee7f5);
      }
    `;const s=document.createElement("div");s.className="encoder-container";const e=document.createElement("h2");e.textContent="Message Encoder/Decoder";const t=document.createElement("p");t.className="description",t.textContent="Encrypt or decrypt messages using a Caesar cipher. Each letter is shifted by a number of positions in the alphabet.";const o=document.createElement("div");o.className="shift-control";const a=document.createElement("label");a.setAttribute("for","shift-input"),a.textContent="Shift Amount:";const n=document.createElement("input");n.type="number",n.id="shift-input",n.className="shift-input",n.min="1",n.max="25",n.value=this.shift,n.addEventListener("input",u=>{const v=parseInt(u.target.value);v>=1&&v<=25&&(this.shift=v)}),o.append(a,n);const i=document.createElement("p");i.className="shift-note",i.textContent="💡 Tip: Use the same shift amount to encode and decode your message.";const c=document.createElement("div");c.className="input-group";const m=document.createElement("label");m.setAttribute("for","message-input"),m.textContent="Your Message:";const d=document.createElement("textarea");d.id="message-input",d.placeholder="Enter your message here...",d.setAttribute("rows","5"),c.append(m,d);const l=document.createElement("div");l.className="output-group";const C=document.createElement("label");C.textContent="Result:";const p=document.createElement("div");p.className="output-display output-placeholder",p.textContent="Encoded or decoded message will appear here...",l.append(C,p);const x=document.createElement("div");x.className="button-group";const h=document.createElement("button");h.className="button primary",h.textContent="🔐 Encode",h.addEventListener("click",()=>{const u=d.value;u&&(p.classList.remove("output-placeholder"),p.textContent=this.encode(u))});const b=document.createElement("button");b.className="button secondary",b.textContent="🔓 Decode",b.addEventListener("click",()=>{const u=d.value;u&&(p.classList.remove("output-placeholder"),p.textContent=this.decode(u))});const f=document.createElement("button");f.className="button",f.textContent="Clear",f.addEventListener("click",()=>{d.value="",p.classList.add("output-placeholder"),p.textContent="Encoded or decoded message will appear here..."}),x.append(h,b,f);const g=document.createElement("div");g.className="info-box";const w=document.createElement("strong");w.textContent="How it works: ";const E=document.createTextNode("The Caesar cipher shifts each letter by the shift amount. "),k=document.createTextNode('For example, with a shift of 3, "A" becomes "D", "B" becomes "E", and so on. '),N=document.createTextNode("Numbers, spaces, and punctuation remain unchanged.");g.append(w,E,k,N),s.append(e,t,o,i,c,x,l,g),this.shadowRoot.append(r,s)}encode(r){return this.caesarCipher(r,this.shift)}decode(r){return this.caesarCipher(r,-this.shift)}caesarCipher(r,s){return r.split("").map(e=>{if(e>="A"&&e<="Z"){const t=((e.charCodeAt(0)-65+s)%26+26)%26;return String.fromCharCode(t+65)}else if(e>="a"&&e<="z"){const t=((e.charCodeAt(0)-97+s)%26+26)%26;return String.fromCharCode(t+97)}return e}).join("")}}customElements.define("message-encoder",z);
