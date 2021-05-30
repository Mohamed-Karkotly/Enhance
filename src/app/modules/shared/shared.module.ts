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

const Shared = [
  NavbarComponent,
  FooterComponent,
  ModalComponent,
  SocialMediaComponent,
];
@NgModule({
  declarations: [...Shared],
  imports: [
    CommonModule,
    TranslateModule,
    FlexLayoutModule,
    RouterModule,
    ImageCropperModule,
  ],
  exports: [...Shared],
})
export class SharedModule {}
