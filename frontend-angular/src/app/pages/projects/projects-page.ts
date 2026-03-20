import { Component } from '@angular/core';
import { ProjectsGrid } from '../../components/projects-grid/projects-grid';

@Component({
  selector: 'app-projects-page',
  imports: [ProjectsGrid],
  templateUrl: './projects-page.html',
  styleUrl: './projects-page.css'
})
export class ProjectsPage {}
