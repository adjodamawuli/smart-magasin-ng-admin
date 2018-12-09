import { ClientComponent } from './client/client.component';
import { Routes } from '@angular/router';
import { CrudNgxTableComponent } from './crud-ngx-table/crud-ngx-table.component';

export const CrudsRoutes: Routes = [
  {
    // path: 'ngx-table',
    path: '',
    component: ClientComponent,
    data: { title: 'NgX Table', breadcrumb: 'NgX Table' }
  }
];
