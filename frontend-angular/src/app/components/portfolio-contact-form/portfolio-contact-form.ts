import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { map, startWith } from 'rxjs';
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
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './portfolio-contact-form.html',
  styleUrl: './portfolio-contact-form.css'
})
export class PortfolioContactForm {
  private readonly fb = inject(FormBuilder);
  private readonly snackBar = inject(MatSnackBar);

  readonly contactFieldError = contactFieldError;

  readonly form = this.fb.group({
    subject: ['', [Validators.required, contactSubjectValidator]],
    name: ['', [Validators.required, contactNameValidator]],
    email: ['', [Validators.required, contactEmailValidator]],
    phone: ['', [Validators.required, contactPhoneValidator]],
    message: ['', [Validators.required, contactMessageValidator]]
  });

  readonly messageWordCount = toSignal(
    this.form.controls.message.valueChanges.pipe(
      startWith(this.form.controls.message.value ?? ''),
      map((value) => countWords(value ?? ''))
    ),
    { initialValue: 0 }
  );

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.snackBar.open('Please fix the highlighted fields and try again.', 'Close', {
        duration: 3500
      });
      return;
    }
    const data = this.form.getRawValue();
    console.log('Contact form submission:', data);
    this.snackBar.open('Thank you! Your message has been sent (demo only).', 'Close', {
      duration: 3500
    });
    this.form.reset();
  }
}
