import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';

const ReusableComponents = [
  NavbarComponent,
  FooterComponent,
  ModalComponent,
  SocialMediaComponent,
];
@NgModule({
  declarations: [...ReusableComponents],
  imports: [CommonModule, TranslateModule, FlexLayoutModule, RouterModule],
  exports: [...ReusableComponents],
})
export class ReusableComponentsModule {}
