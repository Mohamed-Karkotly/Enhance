import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseCommunityComponent } from './views/choose-community/choose-community.component';

const routes: Routes = [
  {
    path: 'communities',
    component: ChooseCommunityComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
