import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, of } from 'rxjs';
import { getPortfolioApiBase, getPortfolioDataBaseUrl, resolvePortfolioAssetUrl } from '../config/api-base';
import { AboutData } from '../models/about-data';
import { Project, ProjectsResponse } from '../models/project';

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  private readonly http = inject(HttpClient);

  private apiUrl(path: string): string {
    const base = getPortfolioApiBase().replace(/\/$/, '');
    return `${base}${path.startsWith('/') ? path : `/${path}`}`;
  }

  private aboutJsonUrl(): string {
    const origin = getPortfolioDataBaseUrl();
    if (origin) {
      return `${origin}/data/about.json`;
    }
    return '/data/about.json';
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<ProjectsResponse>(this.apiUrl('/projects')).pipe(
      map((data) => (Array.isArray(data?.projects) ? data.projects : []))
    );
  }

  getAboutData(): Observable<AboutData | null> {
    return this.http.get<AboutData>(this.aboutJsonUrl()).pipe(
      map((d) => d ?? null),
      catchError(() => of(null))
    );
  }

  resolveAsset(path: string | undefined): string {
    return path ? resolvePortfolioAssetUrl(path) : '';
  }
}
