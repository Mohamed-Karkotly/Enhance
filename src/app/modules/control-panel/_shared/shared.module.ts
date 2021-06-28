import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CpNavbarComponent } from './cp-navbar/cp-navbar.component';
import { CpSidebarComponent } from './cp-sidebar/cp-sidebar.component';
import { AngularMaterialModule } from 'src/app/angular-material/angular-material.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxInputSearchModule } from 'ngx-input-search';

const _shared = [CpNavbarComponent, CpSidebarComponent];
@NgModule({
  declarations: [..._shared],
  imports: [
    CommonModule,
    RouterModule,
    NgbModule,
    AngularMaterialModule,
    TranslateModule,
    FlexLayoutModule,
    NgxInputSearchModule,
  ],
  exports: [..._shared],
})
export class SharedModule {}
