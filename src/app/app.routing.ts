import { SignupComponent } from './views/sessions/signup/signup.component';
import { Routes } from '@angular/router';
import { AdminLayoutComponent } from './shared/components/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './shared/components/layouts/auth-layout/auth-layout.component';
import { AuthGuard } from './shared/services/auth/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'sessions',
    pathMatch: 'full'
  },

  {
    path: '',
    component: SignupComponent,
    children: [
      {
        path: 'sessions',
        loadChildren: './views/sessions/sessions.module#SessionsModule',
        data: { title: 'Session'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'others',
        loadChildren: './views/others/others.module#OthersModule',
        data: { title: 'Others', breadcrumb: 'OTHERS'}
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'cruds',
        loadChildren: './views/cruds/cruds.module#CrudsModule',
        data: { title: 'cruds', breadcrumb: 'CRUDS'}
      }
    ]
  }
  ,
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];

