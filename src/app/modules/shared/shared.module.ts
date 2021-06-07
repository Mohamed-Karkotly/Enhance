import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './views/navbar/navbar.component';
import { FooterComponent } from './views/footer/footer.component';
import { ModalComponent } from './views/modal/modal.component';
import { SocialMediaComponent } from './views/social-media/social-media.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { BodyBackgroundDirective } from 'src/app/directives/body-background.directive';

const Shared = [
  NavbarComponent,
  FooterComponent,
  ModalComponent,
  SocialMediaComponent,
  BodyBackgroundDirective
];
@NgModule({
  declarations: [...Shared],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    RouterModule,
    ImageCropperModule,
    NgbDropdownModule,
  ],
  exports: [...Shared],
})
export class SharedModule {}
