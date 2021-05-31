import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { LayoutComponent } from './_layout/layout.component';
import { SharedModule } from './_shared/shared.module';
import { MembersComponent } from './views/members/members.component';
import { PostsComponent } from './views/posts/posts.component';
import { ConnectionsComponent } from './views/connections/connections.component';
import { FeaturingComponent } from './views/featuring/featuring.component';

@NgModule({
  declarations: [
    LayoutComponent,
    MembersComponent,
    PostsComponent,
    ConnectionsComponent,
    FeaturingComponent,
  ],
  imports: [CommonModule, ControlPanelRoutingModule, SharedModule],
})
export class ControlPanelModule {}
