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
@NgModule({
  declarations: [HomeComponent],
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
  ],
})
export class LandingPageModule {}
