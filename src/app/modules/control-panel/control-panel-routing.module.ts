import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../error-pages/views/error404/error404.component';

const routes: Routes = [
  {
    path: 'control-panel',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('src/app/modules/control-panel/_layout/layout.module').then(
            (m) => m.LayoutModule
          ),
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
export class ControlPanelRoutingModule {}
