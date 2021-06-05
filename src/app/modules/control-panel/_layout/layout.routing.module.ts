import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
