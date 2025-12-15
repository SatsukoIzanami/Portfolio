class ContactForm extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		const wrap = document.createElement('div');
		wrap.className = 'contact-form-wrapper';

		const title = document.createElement('h2');
		title.textContent = 'Let’s talk about your project';

		const lede = document.createElement('p');
		lede.className = 'contact-form-lede';
		lede.textContent = 'Have a question, an idea, or a project in mind? Share a few details below—Jessica will follow up personally to talk through next steps.';

		const form = document.createElement('form');
		form.className = 'contact-form-form';
		form.noValidate = true;

		const field = (labelText, name, kind = 'input', attrs = {}) => {
			const row = document.createElement('div');
			row.className = 'contact-form-field';

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
			err.className = 'contact-form-field-error';
			err.id = `${name}-err`;
			err.setAttribute('aria-live', 'polite');
			ctrl.setAttribute('aria-describedby', err.id);

			row.append(label, ctrl, err);
			return row;
		};

		const alnumSpaces = '^[A-Za-z0-9 ]+$';
		const lettersSpacesHyphens = '^[A-Za-z][A-Za-z\\- ]*$';
		const emailPattern = '^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$';

		const fSubject = field('Subject*', 'subject', 'input', { type: 'text', pattern: alnumSpaces, maxlength: '80', placeholder: 'e.g., Portfolio Inquiry' });
		const fName = field('Name*', 'name', 'input', { type: 'text', pattern: lettersSpacesHyphens, maxlength: '60', placeholder: 'e.g., Jane Doe' });
		const fEmail = field('Email*', 'email', 'input', { type: 'email', pattern: emailPattern, maxlength: '120', placeholder: 'you@example.com' });
		const fPhone = field('Phone*', 'phone', 'input', { type: 'tel', maxlength: '20', placeholder: 'e.g., 715-600-3468' });
		const fMsg = field('Message*', 'message', 'textarea', { maxlength: '1000', placeholder: 'How can I help?' });

		const msgControl = fMsg.querySelector('textarea');
		const msgCounter = document.createElement('div');
		msgCounter.className = 'contact-form-msg-counter';
		msgCounter.textContent = 'Words: 0 / 10 minimum';
		fMsg.appendChild(msgCounter);

		const actions = document.createElement('div');
		actions.className = 'contact-form-actions';
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
		note.className = 'contact-form-note';
		note.textContent = 'Subject ≥ 4 chars. Name ≥ 2 letters. Email must be valid. Phone requires at least 10 numeric chars with valid area code. Message ≥ 10 words, and may include common punctuation.';

		const formMsg = document.createElement('div');
		formMsg.className = 'contact-form-message';
		formMsg.setAttribute('aria-live', 'polite');

		wrap.append(title, lede, form);
		form.append(fSubject, fName, fEmail, fPhone, fMsg, actions, note, formMsg);
		this.appendChild(wrap);

		const get = (name) => {
			const control = form.querySelector(`[name="${name}"]`);
			const row = control.closest('.contact-form-field');
			const err = row.querySelector('.contact-form-field-error');
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
					if (val.length < 2 || !/^[A-Za-z][A-Za-z\- ]*$/.test(val)) {
						msg = 'Name must start with a letter and be at least 2 characters.';
					}
				} else if (name === 'message') {
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
					const phoneVal = val.trim();

					// basic shape check (optional +1, 10 digits total)
					const basicPattern = /^\s*(?:\+?1[.\-\s]?)?(?:\(?\d{3}\)?[.\-\s]?\d{3}[.\-\s]?\d{4})\s*$/;
					if (!basicPattern.test(phoneVal)) {
						msg = 'Please enter a valid phone number (10 digits).';
					} else {
						let digits = phoneVal.replace(/\D/g, '');

						// strip leading 1 if present
						if (digits.length === 11 && digits.startsWith('1')) {
							digits = digits.slice(1);
						}

						if (digits.length !== 10) {
							msg = 'Phone number must have exactly 10 digits.';
						} else {
							const area = digits.slice(0, 3);
							const exchange = digits.slice(3, 6);
							const line = digits.slice(6);

							if (area[0] < '2' || area[0] > '9') {
								msg = 'Area code must start with digits 2–9.';
							} else if (exchange[0] < '2' || exchange[0] > '9') {
								msg = 'Phone number prefix must start with digits 2–9.';
							} else if (exchange === '000' || line === '0000') {
								msg = 'Please enter a realistic phone number, not all zeros.';
							} else if (/^(\d)\1{9}$/.test(digits)) {
								msg = 'Please enter a realistic phone number.';
							}
						}
					}
				}
			}

			setErr(name, msg);
			return !msg;
		};

		const validateForm = () => {
			let allGood = true;
			['subject', 'name', 'email', 'phone', 'message'].forEach((n) => {
				const good = validateField(n);
				if (!good) allGood = false;
			});
			return allGood;
		};

		msgControl.addEventListener('input', updateMessageCounter);

		['subject', 'name', 'email', 'phone', 'message'].forEach((n) => {
			const { control } = get(n);
			control.addEventListener('blur', () => validateField(n));
			control.addEventListener('input', () => validateField(n));
		});

		form.addEventListener('submit', (e) => {
			e.preventDefault();
			formMsg.className = 'contact-form-message';
			formMsg.textContent = '';

			if (!validateForm()) {
				formMsg.textContent = 'Please fix the highlighted fields and try again.';
				formMsg.classList.add('visible', 'error');
				const firstInvalid = form.querySelector('.contact-form-field.is-invalid input, .contact-form-field.is-invalid textarea');
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
				formMsg.className = 'contact-form-message';
				formMsg.textContent = '';
				updateMessageCounter();
				['subject', 'name', 'email', 'phone', 'message'].forEach((n) => setErr(n, ''));
			}, 0);
		});

		updateMessageCounter();
	}
}

customElements.define('contact-form', ContactForm);
