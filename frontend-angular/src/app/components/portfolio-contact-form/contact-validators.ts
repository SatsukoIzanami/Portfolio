import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function countWords(s: string): number {
  return (s.trim().match(/\b\w+\b/g) || []).length;
}

function countAlnum(s: string): number {
  return (s.match(/[A-Za-z0-9]/g) || []).length;
}

function hasRepeatingLettersThreePlus(s: string): boolean {
  const normalized = s.toLowerCase().replace(/[^a-z]/g, '');
  return /([a-z])\1{2,}/.test(normalized);
}

function hasRepeatingPhoneNumbers(s: string): boolean {
  let digits = s.replace(/\D/g, '');
  if (digits.length < 10) return false;
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  if (digits.length !== 10) return false;
  const area = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);
  const line = digits.slice(6);
  if (/(\d)\1{3,}/.test(area)) return true;
  if (/(\d)\1{3,}/.test(exchange)) return true;
  if (/(\d)\1{3,}/.test(line)) return true;
  return false;
}

export const contactSubjectValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const val = (control.value || '').trim();
  if (!val) return null;
  if (val.length < 4 || countAlnum(val) < 4) {
    return { contactError: 'Subject must be at least 4 characters (letters/numbers).' };
  }
  if (hasRepeatingLettersThreePlus(val)) {
    return { contactError: 'Subject cannot contain 3 or more consecutive repeating letters.' };
  }
  if (!/^[A-Za-z0-9 ]+$/.test(val)) {
    return { contactError: 'Subject may contain letters, numbers, and spaces only.' };
  }
  return null;
};

export const contactNameValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const val = (control.value || '').trim();
  if (!val) return null;
  if (val.length < 3) {
    return { contactError: 'Name must be at least 3 characters long.' };
  }
  if (!/^[A-Za-z][A-Za-z\- ]*$/.test(val) || /\d/.test(val)) {
    return { contactError: 'Name may contain letters, spaces, or hyphens only (no numbers).' };
  }
  if (hasRepeatingLettersThreePlus(val)) {
    return { contactError: 'Name cannot contain 3 or more consecutive repeating letters.' };
  }
  return null;
};

export const contactEmailValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const val = (control.value || '').trim();
  if (!val) return null;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) {
    return { contactError: 'Please enter a valid email address.' };
  }
  return null;
};

export const contactPhoneValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const phoneVal = (control.value || '').trim();
  if (!phoneVal) return null;
  const basicPattern = /^\s*(?:\+?1[.\-\s]?)?(?:\(?\d{3}\)?[.\-\s]?\d{3}[.\-\s]?\d{4})\s*$/;
  if (!basicPattern.test(phoneVal)) {
    return { contactError: 'Please enter a valid phone number (10 digits).' };
  }
  let digits = phoneVal.replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) {
    digits = digits.slice(1);
  }
  if (digits.length !== 10) {
    return { contactError: 'Phone number must have exactly 10 digits.' };
  }
  const area = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);
  const line = digits.slice(6);
  if (area[0] < '2' || area[0] > '9') {
    return { contactError: 'Area code must start with digits 2–9.' };
  }
  if (exchange[0] < '2' || exchange[0] > '9') {
    return { contactError: 'Phone number prefix must start with digits 2–9.' };
  }
  if (exchange === '000' || line === '0000') {
    return { contactError: 'Please enter a realistic phone number, not all zeros.' };
  }
  if (hasRepeatingPhoneNumbers(phoneVal)) {
    return {
      contactError:
        'Phone number cannot have more than 3 repeating digits in any section (area code, exchange, or line number).'
    };
  }
  return null;
};

export const contactMessageValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const val = control.value || '';
  if (!val.trim()) return null;
  if (!/^[A-Za-z0-9 ,.!?'"()\-\n\r]+$/.test(val)) {
    return { contactError: 'Message may contain letters, numbers, spaces, and common punctuation.' };
  }
  if (countAlnum(val) < 10) {
    return { contactError: 'Message must have at least 10 letters/numbers.' };
  }
  if (countWords(val) < 10) {
    return { contactError: 'Message must contain at least 10 words.' };
  }
  if (hasRepeatingLettersThreePlus(val)) {
    return { contactError: 'Message cannot contain 3 or more consecutive repeating letters.' };
  }
  return null;
};

export function contactFieldError(control: AbstractControl | null): string {
  if (!control || !control.errors || !(control.touched || control.dirty)) return '';
  const e = control.errors;
  if (e['contactError']) return String(e['contactError']);
  if (e['required']) return 'This field is required.';
  return '';
}
