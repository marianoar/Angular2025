import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard.component'),
    children: [
      {
        path: 'change-detection',
        title: 'Change detection',
        loadComponent: () =>
          import(
            './dashboard/pages/change-detection/change-detection.component'
          ),
      },
      {
        path: 'control-flow',
        title: 'Control flow',
        loadComponent: () =>
          import('./dashboard/pages/control-flow/control-flow.component'),
      },
      {
        path: 'defer-options',
        title: 'Defer options',
        loadComponent: () =>
          import('./dashboard/pages/defer-options/defer-options.component'),
      },
      {
        path: 'defer-views',
        title: 'Defer views',
        loadComponent: () =>
          import('./dashboard/pages/defer-views/defer-views.component'),
      },
      {
        path: 'user/:id',
        title: 'User',
        loadComponent: () => import('./dashboard/pages/user/user.component'),
      },
      {
        path: 'users-list',
        title: 'Users list',
        loadComponent: () => import('./dashboard/pages/users/users.component'),
      },
      {
        path: 'view-transition',
        title: 'View transition',
        loadComponent: () =>
          import('./dashboard/pages/view-transition/view-transition.component'),
      },
      {
        path: 'view-transition2',
        title: 'View transition2',
        loadComponent: () =>
          import(
            './dashboard/pages/view-transition/view-transition2.component'
          ),
      },
      {
        path: '',
        redirectTo: 'control-flow',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
];
