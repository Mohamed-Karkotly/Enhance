import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReusableComponentsModule } from 'src/app/reusable-components/reusable-components.module';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LandingPageComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReusableComponentsModule,
    TranslateModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LandingPageModule {}
