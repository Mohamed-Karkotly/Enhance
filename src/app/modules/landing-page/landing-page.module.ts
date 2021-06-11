import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page.routing.module';
import { HomeComponent } from './views/home/home.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChooseCommunityComponent } from './views/choose-community/choose-community.component';
import { ParticipatedCommunitiesComponent } from './views/participated-communities/participated-communities.component';
import { AdminCommunitiesComponent } from './views/admin-communities/admin-communities.component';
import { CreateCommunityComponent } from './views/create-community/create-community.component';
import { JoinCommunityComponent } from './views/join-community/join-community.component';
import { TagInputModule } from 'ngx-chips';
import { NgxInputSearchModule } from 'ngx-input-search';

@NgModule({
  declarations: [
    HomeComponent,
    ChooseCommunityComponent,
    ParticipatedCommunitiesComponent,
    AdminCommunitiesComponent,
    CreateCommunityComponent,
    JoinCommunityComponent,
  ],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    SharedModule,
    TranslateModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    NgxSpinnerModule,
    NgbModule,
    TagInputModule,
    NgxInputSearchModule
  ],
})
export class LandingPageModule {}
