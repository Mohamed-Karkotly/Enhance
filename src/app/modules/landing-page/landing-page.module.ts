import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReusableComponentsModule } from 'src/app/reusable-components/reusable-components.module';

@NgModule({
  declarations: [LandingPageComponent, LoginComponent, SignUpComponent],
  imports: [
    CommonModule,
    LandingPageRoutingModule,
    ReusableComponentsModule,
    TranslateModule,
  ],
})
export class LandingPageModule {}
