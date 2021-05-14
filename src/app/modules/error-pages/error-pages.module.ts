import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReusableComponentsModule } from 'src/app/reusable-components/reusable-components.module';
import { Error404Component } from './views/error404/error404.component';
import { Error500Component } from './views/error500/error500.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [Error404Component, Error500Component],
  imports: [CommonModule, ReusableComponentsModule, TranslateModule],
})
export class ErrorPagesModule {}
