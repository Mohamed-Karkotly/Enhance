import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { LandingPageComponent } from './modules/landing-page/landing-page/landing-page.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    pathMatch: 'full',
    data: {
      title: 'Enhance',
    },
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./modules/landing-page/landing-page.module').then(
            (m) => m.LandingPageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
