import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./views/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: 'mangas',
    loadComponent: () =>
      import('./views/mangas/mangas.component').then((m) => m.MangasComponent),
    canActivate: [authGuard],
  },
  {
    path: 'animes',
    loadComponent: () =>
      import('./views/animes/animes.component').then((m) => m.AnimesComponent),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./views/login/login.component').then((m) => m.LoginComponent),
  },
];
