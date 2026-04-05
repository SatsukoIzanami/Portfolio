import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { take } from 'rxjs';
import { AboutData } from '../../models/about-data';
import { Project } from '../../models/project';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-interactive-showcase',
  imports: [CommonModule, RouterLink, MatCardModule, MatProgressBarModule, MatButtonModule],
  templateUrl: './interactive-showcase.html',
  styleUrl: './interactive-showcase.css'
})
export class InteractiveShowcase implements OnInit {
  private readonly portfolio = inject(PortfolioDataService);

  readonly currentSection = signal<string | null>(null);

  readonly navItems = [
    { id: 'projects', title: 'Projects', desc: 'View my work' },
    { id: 'skills', title: 'Skills', desc: 'Technical abilities' },
    { id: 'about', title: 'About', desc: 'Learn about me' },
    { id: 'stats', title: 'Stats', desc: 'By the numbers' },
    { id: 'endorsement', title: 'Testimonials', desc: 'What others say' }
  ];

  aboutData = signal<AboutData | null>(null);
  projectsPreview = signal<Project[]>([]);
  projectsError = signal(false);
  stats = signal<{ projects: number; skills: number; years: number; grad: number }>({
    projects: 0,
    skills: 0,
    years: 0,
    grad: 2025
  });

  ngOnInit(): void {
    this.portfolio
      .getAboutData()
      .pipe(take(1))
      .subscribe((d) => this.aboutData.set(d));
  }

  showSection(id: string): void {
    this.currentSection.set(id);
    if (id === 'projects') {
      this.loadProjectsPreview();
    }
    if (id === 'stats') {
      this.loadStats();
    }
  }

  private loadProjectsPreview(): void {
    this.projectsError.set(false);
    this.portfolio
      .getProjects()
      .pipe(take(1))
      .subscribe({
        next: (list) => this.projectsPreview.set(list.slice(0, 3)),
        error: () => {
          this.projectsPreview.set([]);
          this.projectsError.set(true);
        }
      });
  }

  private loadStats(): void {
    const about = this.aboutData();
    let skillsCount = 0;
    if (about?.skills?.categories) {
      for (const cat of about.skills.categories) {
        skillsCount += (cat.items || []).length;
      }
    }
    let yearsExperience = 0;
    if (about?.timeline?.length) {
      const currentYear = new Date().getFullYear();
      const years = about.timeline.map((t) => parseInt(String(t.start), 10)).filter((n) => !Number.isNaN(n));
      if (years.length) {
        yearsExperience = currentYear - Math.min(...years);
      }
    }
    this.portfolio
      .getProjects()
      .pipe(take(1))
      .subscribe({
        next: (list) =>
          this.stats.set({
            projects: list.length,
            skills: skillsCount,
            years: yearsExperience,
            grad: 2025
          }),
        error: () =>
          this.stats.set({
            projects: 0,
            skills: skillsCount,
            years: yearsExperience,
            grad: 2025
          })
      });
  }

  topSkills(): { name: string; value: number; category: string }[] {
    const data = this.aboutData();
    if (!data?.skills?.categories) return [];
    const all: { name: string; value: number; category: string }[] = [];
    for (const cat of data.skills.categories) {
      for (const item of cat.items || []) {
        all.push({
          name: item.label,
          value: Number(item.value || 0),
          category: cat.title || cat.name || ''
        });
      }
    }
    return all
      .filter((s) => s.value >= 2)
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }

  bioPreview(): string {
    const body = this.aboutData()?.bio?.body || '';
    const textOnly = body.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    const parts = textOnly.split('.').filter(Boolean);
    const preview = parts.slice(0, 2).join('. ') + (parts.length > 2 ? '...' : '');
    return preview || 'Full-stack student developer passionate about clean code and accessible design.';
  }

  featuredEndorsement() {
    const list = this.aboutData()?.endorsements || [];
    return list.length ? list[0] : null;
  }

  assetUrl(path: string | undefined): string {
    return this.portfolio.resolveAsset(path);
  }
}
