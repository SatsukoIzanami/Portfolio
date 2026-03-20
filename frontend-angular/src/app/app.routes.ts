import { Routes } from '@angular/router';
import { AboutPage } from './pages/about/about-page';
import { ContactPage } from './pages/contact/contact-page';
import { FunPage } from './pages/fun/fun-page';
import { HomePage } from './pages/home/home-page';
import { ProjectsPage } from './pages/projects/projects-page';

export const routes: Routes = [
  { path: '', component: HomePage, title: 'Home — JL Portfolio' },
  { path: 'projects', component: ProjectsPage, title: 'Projects — JL Portfolio' },
  { path: 'about', component: AboutPage, title: 'About — JL Portfolio' },
  { path: 'fun', component: FunPage, title: 'Fun — JL Portfolio' },
  { path: 'contact', component: ContactPage, title: 'Contact — JL Portfolio' },
  { path: '**', redirectTo: '' }
];
