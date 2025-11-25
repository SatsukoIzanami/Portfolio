class ContactForm extends HTMLElement {
  constructor() {
    super();
    const root = this.attachShadow({ mode: 'open' });

    root.innerHTML = `
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
    `;

    const wrap = document.createElement('div');
    wrap.className = 'wrapper';

    const title = document.createElement('h2');
    title.textContent = 'Let’s talk about your project';

    const lede = document.createElement('p');
    lede.className = 'lede';
    lede.textContent = 'Have a question, an idea, or a project in mind? Share a few details below—Jessica will follow up personally to talk through next steps.';

    const form = document.createElement('form');
    form.noValidate = true;

    const field = (labelText, name, kind = 'input', attrs = {}) => {
      const row = document.createElement('div');
      row.className = 'field';

      const label = document.createElement('label');
      label.htmlFor = name;
      label.textContent = labelText;

      const ctrl = document.createElement(kind === 'textarea' ? 'textarea' : 'input');
      ctrl.name = name;
      ctrl.id = name;

      Object.entries(attrs).forEach(([k, v]) => {
        if (v === true || v === '') ctrl.setAttribute(k, '');
        else if (v !== false && v != null) ctrl.setAttribute(k, String(v));
      });

      const err = document.createElement('div');
      err.className = 'field-error';
      err.id = `${name}-err`;
      err.setAttribute('aria-live', 'polite');
      ctrl.setAttribute('aria-describedby', err.id);

      row.append(label, ctrl, err);
      return row;
    };

    const alnumSpaces = '^[A-Za-z0-9 ]+$';                  // Subject allowed chars
    const lettersSpacesHyphens = '^[A-Za-z][A-Za-z -]*$';   // Name allowed chars (letters, spaces, hyphens)
    const emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';
    const phoneRegex = /^(?:\+1[-.\s]?)?\(?[2-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;

    const fSubject = field('Subject*', 'subject', 'input', { type: 'text', pattern: alnumSpaces, maxlength: '80', placeholder: 'e.g., Portfolio Inquiry' });
    const fName = field('Name*', 'name', 'input', { type: 'text', pattern: lettersSpacesHyphens, maxlength: '60', placeholder: 'e.g., Jane Doe' });
    const fEmail = field('Email*', 'email', 'input', { type: 'email', pattern: emailPattern, maxlength: '120', placeholder: 'you@example.com' });
    const fPhone = field('Phone*', 'phone', 'input', { type: 'tel', maxlength: '20', placeholder: 'e.g., 715-600-3468' });
    const fMsg = field('Message*', 'message', 'textarea', { maxlength: '1000', placeholder: 'How can I help?' });

    // live word counter for message
    const msgControl = fMsg.querySelector('textarea');
    const msgCounter = document.createElement('div');
    msgCounter.className = 'msg-counter';
    msgCounter.textContent = 'Words: 0 / 10 minimum';
    fMsg.appendChild(msgCounter);

    const actions = document.createElement('div');
    actions.className = 'actions';
    const submit = document.createElement('button');
    submit.className = 'btn';
    submit.type = 'submit';
    submit.textContent = 'Send';
    const reset = document.createElement('button');
    reset.className = 'btn ghost';
    reset.type = 'reset';
    reset.textContent = 'Reset';
    actions.append(submit, reset);

    const note = document.createElement('div');
    note.className = 'note';
    note.textContent = 'Subject ≥ 4 chars. Name ≥ 2 letters. Email must be valid. Phone requires at least 10 numeric chars with valid area code. Message ≥ 10 words, and may include common punctuation.';

    const formMsg = document.createElement('div');
    formMsg.className = 'form-message';
    formMsg.setAttribute('aria-live', 'polite');

    wrap.append(title, lede, form);
    form.append(fSubject, fName, fEmail, fPhone, fMsg, actions, note, formMsg);
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
        err.textContent = msg;
      } else {
        row.classList.remove('is-invalid');
        err.textContent = '';
      }
    };

    const countAlnum = (s) => (s.match(/[A-Za-z0-9]/g) || []).length;
    const countDigits = (s) => (s.match(/[0-9]/g) || []).length;
    const countWords = (s) => (s.trim().match(/\b\w+\b/g) || []).length;

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

      const labelMap = { subject: 'Subject', name: 'Name', email: 'Email', phone: 'Phone', message: 'Message' };

      if (v.typeMismatch && control.type === 'email') {
        msg = 'Please enter a valid email address.';
      } else if (v.patternMismatch) {
        if (name === 'subject') {
          msg = `${labelMap[name]} may contain letters, numbers, and spaces only.`;
        } else if (name === 'name') {
          msg = 'Name may contain letters, spaces, or hyphens only.';
        } else if (name === 'email') {
          msg = 'Please enter a valid email address.';
        }
      }

      if (!msg) {
        const val = control.value;

        if (name === 'subject') {
          if (val.length < 4 || countAlnum(val) < 4) {
            msg = 'Subject must be at least 4 characters (letters/numbers).';
          }
        } else if (name === 'name') {
          if (val.length < 2 || !/^[A-Za-z][A-Za-z -]*$/.test(val)) {
            msg = 'Name must start with a letter and be at least 2 characters.';
          }
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
          } else if (!phoneRegex.test(val)) {
            msg = 'Please enter a valid phone number (e.g., 715-600-3468).';
          }
        }
      }

      setErr(name, msg);
      return !msg;
    };

    const validateForm = () => {
      let allGood = true;
      const fields = ['subject', 'name', 'email', 'phone', 'message'];
      fields.forEach((n) => {
        const good = validateField(n);
        if (!good) allGood = false;
      });
      return allGood;
    };

    msgControl.addEventListener('input', updateMessageCounter);

    ['subject', 'name', 'email', 'phone', 'message'].forEach((n) => {
      const { control } = get(n);
      control.addEventListener('blur', () => validateField(n));
      control.addEventListener('input', () => {
        validateField(n);
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      formMsg.className = 'form-message';
      formMsg.textContent = '';

      if (!validateForm()) {
        formMsg.textContent = 'Please fix the highlighted fields and try again.';
        formMsg.classList.add('visible', 'error');
        const firstInvalid = form.querySelector('.field.is-invalid input, .field.is-invalid textarea');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      const data = {
        subject: get('subject').control.value,
        name: get('name').control.value,
        email: get('email').control.value,
        phone: get('phone').control.value,
        message: get('message').control.value,
      };

      console.log('Contact form submission:', data);

      formMsg.textContent = 'Thank you! Your message has been sent (demo only – no email was actually sent).';
      formMsg.classList.add('visible', 'success');
      form.reset();
      updateMessageCounter();
      ['subject', 'name', 'email', 'phone', 'message'].forEach((n) => setErr(n, ''));
    });

    form.addEventListener('reset', () => {
      setTimeout(() => {
        formMsg.className = 'form-message';
        formMsg.textContent = '';
        updateMessageCounter();
        ['subject', 'name', 'email', 'phone', 'message'].forEach((n) => setErr(n, ''));
      }, 0);
    });

    updateMessageCounter();
  }
}

customElements.define('contact-form', ContactForm);
