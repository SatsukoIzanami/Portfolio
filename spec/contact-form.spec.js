import '../components/contact/contact-form.js';

describe('Contact Form Web Component', () => {
    let formElement, shadow, form;

    beforeEach(() => {
        const oldForm = document.querySelector('contact-form');
        if (oldForm) oldForm.remove(); // safely remove only previous form
        formElement = document.createElement('contact-form');
        document.body.appendChild(formElement);
        shadow = formElement.shadowRoot;
        form = shadow.querySelector('form');
    });

    it('Should be defined as a custom element', () => {
        expect(customElements.get('contact-form')).toBeDefined();
    });

    it('Should render all required fields', () => {
        const names = ['subject', 'name', 'email', 'message'];
        names.forEach(n => {
            expect(shadow.querySelector(`[name="${n}"]`)).not.toBeNull();
        });
    });

    it('Should show errors for empty form submission', () => {
        form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));

        const errors = Array.from(shadow.querySelectorAll('.field-error'))
            .map(e => e.textContent)
            .filter(t => t.trim() !== '');

        expect(errors.length).toBeGreaterThan(0);
    });

    it('Should display a specific email error for invalid email', () => {
        shadow.querySelector('[name="subject"]').value = 'Test Subject';
        shadow.querySelector('[name="name"]').value = 'Testing';
        shadow.querySelector('[name="email"]').value = 'invalid';
        shadow.querySelector('[name="message"]').value = 'This should be valid';

        form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));

        const emailError = shadow.querySelector('#email-err').textContent;
        expect(emailError).toContain('valid email');
    });

    it('Should show success message on valid submission', () => {
        shadow.querySelector('[name="subject"]').value = 'This is a test';
        shadow.querySelector('[name="name"]').value = 'Testing';
        shadow.querySelector('[name="email"]').value = 'test@testing.com';
        shadow.querySelector('[name="message"]').value = 'This should be valid';

        form.dispatchEvent(new Event('submit', {bubbles: true, cancelable: true}));

        const msg = shadow.querySelector('.form-message').textContent.trim();
        expect(msg).toContain('Thank you');
    });

    it('Should clear form on reset', () => {
        shadow.querySelector('[name="subject"]').value = 'This is a test';
        shadow.querySelector('[name="name"]').value = 'Testing';
        shadow.querySelector('[name="email"]').value = 'test@testing.com';
        shadow.querySelector('[name="message"]').value = 'This should be valid';

        form.reset();

        expect(shadow.querySelector('[name="subject"]').value).toBe('');
        expect(shadow.querySelector('[name="name"]').value).toBe('');
        expect(shadow.querySelector('[name="email"]').value).toBe('');
        expect(shadow.querySelector('[name="message"]').value).toBe('');
    })
});
