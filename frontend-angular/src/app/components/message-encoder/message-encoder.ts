import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-message-encoder',
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './message-encoder.html',
  styleUrl: './message-encoder.css'
})
export class MessageEncoder {
  shiftAmount = 3;
  message = '';
  output = signal('');
  placeholderOutput = signal(true);

  encode(): void {
    if (!this.message.trim()) return;
    this.placeholderOutput.set(false);
    this.output.set(this.caesar(this.message, this.shiftAmount));
  }

  decode(): void {
    if (!this.message.trim()) return;
    this.placeholderOutput.set(false);
    this.output.set(this.caesar(this.message, -this.shiftAmount));
  }

  clear(): void {
    this.message = '';
    this.output.set('');
    this.placeholderOutput.set(true);
  }

  private caesar(text: string, shift: number): string {
    return text
      .split('')
      .map((char) => {
        if (char >= 'A' && char <= 'Z') {
          const shifted = ((char.charCodeAt(0) - 65 + shift) % 26 + 26) % 26;
          return String.fromCharCode(shifted + 65);
        }
        if (char >= 'a' && char <= 'z') {
          const shifted = ((char.charCodeAt(0) - 97 + shift) % 26 + 26) % 26;
          return String.fromCharCode(shifted + 97);
        }
        return char;
      })
      .join('');
  }
}
