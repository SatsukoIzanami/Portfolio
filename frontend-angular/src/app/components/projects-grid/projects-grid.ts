import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { catchError, map, of, shareReplay, startWith } from 'rxjs';
import { Project } from '../../models/project';
import { PortfolioDataService } from '../../services/portfolio-data.service';

@Component({
  selector: 'app-projects-grid',
  imports: [CommonModule, MatCardModule],
  templateUrl: './projects-grid.html',
  styleUrl: './projects-grid.css'
})
export class ProjectsGrid {
  private readonly portfolio = inject(PortfolioDataService);

  readonly error = signal('');
  readonly items$ = this.portfolio.getProjects().pipe(
    map((list) => {
      this.error.set('');
      return list;
    }),
    catchError((err: Error) => {
      this.error.set(`Could not load projects: ${err.message}`);
      return of<Project[]>([]);
    }),
    shareReplay(1)
  );
  readonly items = toSignal(this.items$, { initialValue: [] });
  readonly loading = toSignal(this.items$.pipe(map(() => false), startWith(true)), { initialValue: true });

  imgSrc(p: Project): string {
    return this.portfolio.resolveAsset(p.img);
  }
}
