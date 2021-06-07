import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../../error-pages/views/error404/error404.component';
import { ProfileComponent } from '../views/profile/profile.component';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LayoutComponent,
        data: {
          title: 'Enhance - Control Panel',
        },
        children: [
          {
            path: '',
            component: ProfileComponent,
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    component: Error404Component,
    data: {
      title: 'Lost in 404 Galaxy',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
