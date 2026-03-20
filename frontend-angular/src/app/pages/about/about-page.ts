import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { take } from 'rxjs';
import { AboutData } from '../../models/about-data';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-about-page',
  imports: [CommonModule],
  templateUrl: './about-page.html',
  styleUrl: './about-page.css'
})
export class AboutPage implements OnInit {
  private readonly portfolio = inject(PortfolioDataService);
  private readonly sanitizer = inject(DomSanitizer);

  data = signal<AboutData | null>(null);
  safeBio = signal<SafeHtml | null>(null);
  loading = signal(true);

  ngOnInit(): void {
    this.portfolio
      .getAboutData()
      .pipe(take(1))
      .subscribe((d) => {
        this.loading.set(false);
        this.data.set(d);
        const body = d?.bio?.body || '';
        this.safeBio.set(
          body ? this.sanitizer.bypassSecurityTrustHtml(body) : null
        );
      });
  }

  avatarUrl(): string {
    const a = this.data()?.bio?.avatar;
    return a ? this.portfolio.resolveAsset(a) : '';
  }

  skillsCategories() {
    return this.data()?.skills?.categories ?? [];
  }

  endorsements() {
    return this.data()?.endorsements ?? [];
  }

  timeline() {
    return this.data()?.timeline ?? [];
  }

  num(v: unknown): number {
    return Number(v || 0);
  }

  joinRoleCompany(role: string | undefined, company: string | undefined): string {
    return [role, company].filter(Boolean).join(' — ');
  }
}
