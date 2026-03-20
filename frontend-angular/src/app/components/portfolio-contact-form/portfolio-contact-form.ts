import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  contactEmailValidator,
  contactFieldError,
  contactMessageValidator,
  contactNameValidator,
  contactPhoneValidator,
  contactSubjectValidator,
  countWords
} from './contact-validators';

@Component({
  selector: 'app-portfolio-contact-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './portfolio-contact-form.html',
  styleUrl: './portfolio-contact-form.css'
})
export class PortfolioContactForm {
  private readonly fb = inject(FormBuilder);

  readonly contactFieldError = contactFieldError;

  readonly form = this.fb.group({
    subject: ['', [Validators.required, contactSubjectValidator]],
    name: ['', [Validators.required, contactNameValidator]],
    email: ['', [Validators.required, contactEmailValidator]],
    phone: ['', [Validators.required, contactPhoneValidator]],
    message: ['', [Validators.required, contactMessageValidator]]
  });

  submitted = false;
  formMessage = '';
  formSuccess = false;

  wordCount(): number {
    const v = this.form.get('message')?.value || '';
    return countWords(v);
  }

  submit(): void {
    this.formMessage = '';
    this.formSuccess = false;
    if (this.form.invalid) {
      this.submitted = true;
      this.form.markAllAsTouched();
      this.formMessage = 'Please fix the highlighted fields and try again.';
      return;
    }
    this.submitted = false;
    const data = this.form.getRawValue();
    console.log('Contact form submission:', data);
    this.formMessage =
      'Thank you! Your message has been sent (demo only – no email was actually sent).';
    this.formSuccess = true;
    this.form.reset();
    this.submitted = false;
  }
}
