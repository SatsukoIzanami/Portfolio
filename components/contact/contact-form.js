class ContactForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const root = this.shadowRoot;

    // ----- styles -----
    const style = document.createElement('style');
    style.textContent = `
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
    `;
    root.appendChild(style);

    // ----- structure -----
    const wrap = document.createElement('div'); wrap.className = 'wrap';
    const title = document.createElement('h2'); title.textContent = 'Contact Me';
    const form = document.createElement('form'); form.noValidate = true;

    // helper to make rows consistently
    const field = (labelText, name, tag = 'input', attrs = {}) => {
      const row = document.createElement('div'); row.className = 'field';

      const label = document.createElement('label');
      label.htmlFor = name; label.textContent = labelText;

      const ctrl = document.createElement(tag);
      ctrl.name = name; 
      ctrl.id = name;
      Object.entries(attrs).forEach(([k,v]) => {
        if (v === true || v === '') ctrl.setAttribute(k,'');
        else if (v !== false && v != null) ctrl.setAttribute(k, String(v));
      });

      const err = document.createElement('div');
      err.className = 'field-error'; err.id = `${name}-err`; 
      err.setAttribute('aria-live','polite');
      ctrl.setAttribute('aria-describedby', err.id);

      row.append(label, ctrl, err);
      return row;
    };

    const alnumSpaces = '^[A-Za-z0-9 ]+$';                  // Subject allowed chars
    const lettersSpacesHyphens = '^[A-Za-z][A-Za-z -]*$';   // Name allowed chars (letters, spaces, hyphens)
    const emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
    const phonePattern = '^(\\+?1[\\s.-]?)?(\\(?\\d{3}\\)?[\\s.-]?)?\\d{3}[\\s.-]?\\d{4}$';

    const fSubject = field('Subject*', 'subject', 'input',  { type:'text', pattern: alnumSpaces,          maxlength:'80',  placeholder:'e.g., Portfolio Inquiry' });
    const fName    = field('Name*',    'name',    'input',  { type:'text', pattern: lettersSpacesHyphens, maxlength:'60',  placeholder:'e.g., Jane Doe' });
    const fEmail   = field('Email*',   'email',   'input',  { type:'email',pattern: emailPattern,         maxlength:'120', placeholder:'you@example.com' });
    const fPhone   = field('Phone*',   'phone',   'input',  { type:'tel',  pattern: phonePattern,        maxlength:'20',  placeholder:'e.g., 715-600-3468' });
    const fMsg     = field('Message*', 'message', 'textarea', { maxlength:'1000', placeholder:'How can I help?' });

    // live word counter for message
    const msgControl = fMsg.querySelector('textarea');
    const msgCounter = document.createElement('div');
    msgCounter.className = 'msg-counter';
    msgCounter.textContent = 'Words: 0 / 10 minimum';
    fMsg.appendChild(msgCounter);

    const actions  = document.createElement('div'); actions.className = 'actions';
    const submit   = document.createElement('button'); submit.className='btn';        submit.type='submit'; submit.textContent='Send';
    const reset    = document.createElement('button'); reset.className='btn ghost';  reset.type='reset';   reset.textContent='Reset';
    actions.append(submit, reset);

    const note = document.createElement('div'); note.className='note';
    note.textContent = 'Subject ≥ 4 chars. Name ≥ 2 letters. Phone: valid 10-digit number. Message ≥ 10 alphanumeric chars, ≥ 10 words, and may include common punctuation.';

    const formMsg = document.createElement('div'); formMsg.className = 'form-message'; formMsg.setAttribute('aria-live','polite');

    form.append(fSubject, fName, fEmail, fPhone, fMsg, actions, note, formMsg);
    wrap.append(title, form);
    root.appendChild(wrap);

    // validation helpers
    const get = (name) => {
      const control = form.querySelector(`[name="${name}"]`);
      const row = control.closest('.field');
      const err = row.querySelector('.field-error');
      return { control, row, err };
    };
    const setErr = (name, msg) => {
      const { control, row, err } = get(name);
      if (!control) return;
      if (msg) {
        row.classList.add('is-invalid');
        control.setAttribute('aria-invalid','true');
        err.textContent = msg;
      } else {
        row.classList.remove('is-invalid');
        control.removeAttribute('aria-invalid');
        err.textContent = '';
      }
    };

    const countLetters = (s) => (s.match(/[A-Za-z]/g) || []).length;
    const countAlnum   = (s) => (s.match(/[A-Za-z0-9]/g) || []).length;
    const countDigits  = (s) => (s.match(/[0-9]/g) || []).length;
    const countWords   = (s) => (s.trim().match(/\b\w+\b/g) || []).length;

    const updateMessageCounter = () => {
      const val = msgControl.value || '';
      const words = countWords(val);
      msgCounter.textContent = `Words: ${words} / 10 minimum`;
    };

    const validateField = (name) => {
      const { control } = get(name);
      if (!control) return true;

      if (control.tagName.toLowerCase() !== 'textarea') {
        control.value = control.value.trim();
      }

      let msg = '';
      const v = control.validity;

      const labelMap = { subject:'Subject', name:'Name', email:'Email', phone:'Phone', message:'Message' };

      if (v.typeMismatch && control.type === 'email') {
        msg = 'Please enter a valid email address.';
      } else if (v.patternMismatch) {
        if (name === 'subject') {
          msg = `${labelMap[name]} may contain letters, numbers, and spaces only.`;
        } else if (name === 'name') {
          msg = 'Name may contain letters, spaces, or hyphens only.';
        } else if (name === 'email') {
          msg = 'Please enter a valid email address.';
        } else if (name === 'phone') {
          msg = 'Please enter a valid phone number (e.g., 715-600-3468).';
        }
      }

      if (!msg) {
        const val = control.value;

        if (name === 'subject') {
          if (countAlnum(val) < 4) msg = 'Subject must have at least 4 letters/numbers.';
        } else if (name === 'name') {
          if (countLetters(val) < 2) msg = 'Name must have at least 2 letters.';
        } else if (name === 'message') {
          // ✅ allow common punctuation in message
          if (!/^[A-Za-z0-9 ,.!?'"()\-\n\r]+$/.test(val)) {
            msg = 'Message may contain letters, numbers, spaces, and common punctuation.';
          } else if (countAlnum(val) < 10) {
            msg = 'Message must have at least 10 letters/numbers.';
          } else if (countWords(val) < 10) {
            msg = 'Message must contain at least 10 words.';
          }
        } else if (name === 'email') {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
            msg = 'Please enter a valid email address.';
          }
        } else if (name === 'phone') {
          const digits = countDigits(val);
          if (digits < 10) {
            msg = 'Phone number must have at least 10 digits.';
          }
        }
      }

      setErr(name, msg);
      return !msg;
    };

    const validateForm = () => {
      const fields = ['subject','name','email','phone','message'];
      let firstBad = null, ok = true;
      fields.forEach(n => {
        const good = validateField(n);
        if (!good && !firstBad) firstBad = get(n).control;
        ok = ok && good;
      });
      if (!ok && firstBad) {
        firstBad.focus();
        firstBad.scrollIntoView({ block:'center', behavior:'smooth' });
      }
      return ok;
    };

    // live validation + message word counter
    ['subject','name','email','phone','message'].forEach(n => {
      const { control } = get(n);
      control.addEventListener('blur', () => {
        validateField(n);
        if (n === 'message') updateMessageCounter();
      });
      control.addEventListener('input', () => {
        if (validateField(n)) setErr(n, '');
        if (n === 'message') updateMessageCounter();
      });
    });

    // initialize counter on load
    updateMessageCounter();

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.textContent = '';
      if (!validateForm()) return;

      const data = {
        subject: get('subject').control.value,
        name:    get('name').control.value,
        email:   get('email').control.value,
        phone:   get('phone').control.value,
        message: get('message').control.value
      };

      form.reset();
      updateMessageCounter();
      formMsg.textContent = 'Thank you! Your message has been sent.';
      setTimeout(() => (formMsg.textContent = ''), 3000);
    });

    form.addEventListener('reset', () => {
      ['subject','name','email','phone','message'].forEach(n => setErr(n, ''));
      formMsg.textContent = '';
      updateMessageCounter();
    });
  }
}

customElements.define('contact-form', ContactForm);
