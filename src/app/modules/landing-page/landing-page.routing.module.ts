import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChooseCommunityComponent } from './views/choose-community/choose-community.component';
import { CreateCommunityComponent } from './views/create-community/create-community.component';
import { HomeComponent } from './views/home/home.component';
import { JoinCommunityComponent } from './views/join-community/join-community.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
    data: {
      title: 'Enhance',
    },
  },
  {
    path: 'communities',
    component: ChooseCommunityComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Communities',
    },
  },
  {
    path: 'create-community',
    component: CreateCommunityComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Create Community',
    },
  },
  {
    path: 'join-community',
    component: JoinCommunityComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Join Community',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
