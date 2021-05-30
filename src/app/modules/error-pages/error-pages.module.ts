import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { Error404Component } from './views/error404/error404.component';
import { Error500Component } from './views/error500/error500.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [Error404Component, Error500Component],
  imports: [CommonModule, SharedModule, TranslateModule],
})
export class ErrorPagesModule {}
