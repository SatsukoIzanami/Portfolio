import { CommonModule } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Project } from '../../models/project';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-projects-grid',
  imports: [CommonModule],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.css'
})
export class ProjectsGrid implements OnInit {
  private readonly portfolio = inject(PortfolioDataService);

  readonly loading = signal(true);
  readonly error = signal('');
  readonly items = signal<Project[]>([]);

  ngOnInit(): void {
    this.portfolio.getProjects().subscribe({
      next: (list) => {
        this.items.set(list);
        this.loading.set(false);
      },
      error: (err: Error) => {
        this.loading.set(false);
        this.error.set(`Could not load projects: ${err.message}`);
      }
    });
  }

  imgSrc(p: Project): string {
    return this.portfolio.resolveAsset(p.img);
  }
}
