import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../error-pages/views/error404/error404.component';
import { LoginComponent } from './views/login/login.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        component: LoginComponent,
        data: {
          title: 'Enhance - Sign in',
        },
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        data: {
          title: 'Enhance - Sign up',
        },
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
export class LandingPageRoutingModule {}
