import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404Component } from '../../error-pages/views/error404/error404.component';
import { CommunityProfileComponent } from '../views/community-profile/community-profile.component';
import { MembersComponent } from '../views/members/members.component';
import { PendingRequestsComponent } from '../views/pending-requests/pending-requests.component';
import { PostsComponent } from '../views/posts/posts.component';
import { ProfileComponent } from '../views/profile/profile.component';
import { UserSettingsComponent } from '../views/user-settings/user-settings.component';
import { LayoutComponent } from './layout/layout.component';

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
            component: CommunityProfileComponent,
          },
          {
            path: 'profile',
            component: ProfileComponent,
          },
          {
            path: 'members',
            component: MembersComponent,
          },
          {
            path: 'pending-requests',
            component: PendingRequestsComponent,
          },
          {
            path: 'posts',
            component: PostsComponent,
          },
          {
            path: 'members/user-settings/:id',
            component: UserSettingsComponent,
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
