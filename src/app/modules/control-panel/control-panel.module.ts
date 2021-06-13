import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlPanelRoutingModule } from './control-panel-routing.module';
import { SharedModule } from './_shared/shared.module';
import { MembersComponent } from './views/members/members.component';
import { PostsComponent } from './views/posts/posts.component';
import { ConnectionsComponent } from './views/connections/connections.component';
import { FeaturingComponent } from './views/featuring/featuring.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './views/profile/profile.component';
import { CommunityProfileComponent } from './views/community-profile/community-profile.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [
    CommunityProfileComponent,
    ConnectionsComponent,
    FeaturingComponent,
    MembersComponent,
    PostsComponent,
    ProfileComponent,
  ],
  imports: [
    CommonModule,
    ControlPanelRoutingModule,
    SharedModule,
    TranslateModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    JwBootstrapSwitchNg2Module,
    NgxSpinnerModule,
    NgbDropdownModule,
    TagInputModule,
    NgxMaskModule.forRoot(),
    HttpClientModule,
  ],
})
export class ControlPanelModule {}
