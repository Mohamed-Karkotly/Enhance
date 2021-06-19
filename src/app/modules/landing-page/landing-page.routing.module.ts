import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DownloadAppComponent } from './views/download-app/download-app.component';
import { HomeComponent } from './views/home/home.component';

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
    path: 'download-app',
    component: DownloadAppComponent,
    data: {
      title: 'Download Enhance',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageRoutingModule {}
