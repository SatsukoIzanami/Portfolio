import { CommonModule } from '@angular/common';
import { Component, HostListener, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterLink, RouterLinkActive, MatButtonModule],
  templateUrl: './portfolio-nav.html',
  styleUrl: './portfolio-nav.css'
})
export class PortfolioNav {
  readonly sheetOpen = signal(false);

  readonly links = [
    { path: '/', label: 'Home', exact: true },
    { path: '/projects', label: 'Projects', exact: false },
    { path: '/about', label: 'About', exact: false },
    { path: '/fun', label: 'Fun', exact: false },
    { path: '/contact', label: 'Contact', exact: false }
  ];

  toggleSheet(): void {
    this.sheetOpen.update((v) => !v);
  }

  closeSheet(): void {
    this.sheetOpen.set(false);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeSheet();
  }
}
