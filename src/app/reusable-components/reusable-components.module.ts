import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { ModalComponent } from './modal/modal.component';
import { SocialMediaComponent } from './social-media/social-media.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterModule } from '@angular/router';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ImageCropperModule } from 'ngx-image-cropper';

const ReusableComponents = [
  NavbarComponent,
  FooterComponent,
  ModalComponent,
  SocialMediaComponent,
  ImageCropperComponent,
];
@NgModule({
  declarations: [...ReusableComponents],
  imports: [CommonModule, TranslateModule, FlexLayoutModule, RouterModule, ImageCropperModule],
  exports: [...ReusableComponents],
})
export class ReusableComponentsModule {}
