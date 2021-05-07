import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth/auth.guard';
import { Error404Component } from './components//error-pages/error404/error404.component';
import { LandingPageComponent } from './components/landing-page/landing-page/landing-page.component';

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
          import('./components/landing-page/landing-page.module').then(
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
