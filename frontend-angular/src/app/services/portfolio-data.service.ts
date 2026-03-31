import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { getPortfolioApiBase, resolvePortfolioAssetUrl } from '../config/api-base';
import { AboutData } from '../models/about-data';
import { Project, ProjectsResponse } from '../models/project';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private readonly http = inject(HttpClient);

  private apiUrl(path: string): string {
    const base = getPortfolioApiBase().replace(/\/$/, '');
    return `${base}${path.startsWith('/') ? path : `/${path}`}`;
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<ProjectsResponse | Project[]>(this.apiUrl('/projects')).pipe(
      map((data) => {
        if (Array.isArray(data)) return data;
        if (data && Array.isArray((data as ProjectsResponse).projects)) {
          return (data as ProjectsResponse).projects;
        }
        return [];
      })
    );
  }

  getAboutData(): Observable<AboutData | null> {
    return this.http.get<AboutData>(this.apiUrl('/about')).pipe(
      map((d) => d ?? null),
      catchError(() => of(null))
    );
  }

  resolveAsset(path: string | undefined): string {
    return path ? resolvePortfolioAssetUrl(path) : '';
  }
}
