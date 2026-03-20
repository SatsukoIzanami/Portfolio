import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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

  loading = true;
  error = '';
  items: Project[] = [];

  ngOnInit(): void {
    this.portfolio.getProjects().subscribe({
      next: (list) => {
        this.items = list;
        this.loading = false;
      },
      error: (err: Error) => {
        this.loading = false;
        this.error = `Could not load projects: ${err.message}`;
      }
    });
  }

  imgSrc(p: Project): string {
    return this.portfolio.resolveAsset(p.img);
  }
}
