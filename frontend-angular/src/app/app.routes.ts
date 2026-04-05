import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home-page').then((m) => m.HomePage),
    title: 'Home — JL Portfolio'
  },
  {
    path: 'projects',
    loadComponent: () => import('./pages/projects/projects-page').then((m) => m.ProjectsPage),
    title: 'Projects — JL Portfolio'
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about-page').then((m) => m.AboutPage),
    title: 'About — JL Portfolio'
  },
  {
    path: 'fun',
    loadComponent: () => import('./pages/fun/fun-page').then((m) => m.FunPage),
    title: 'Fun — JL Portfolio'
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact-page').then((m) => m.ContactPage),
    title: 'Contact — JL Portfolio'
  },
  { path: '**', redirectTo: '' }
];
