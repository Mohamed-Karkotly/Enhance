import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout.routing.module';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from '../_shared/shared.module';
import { SharedModule as AppSharedModule} from 'src/app/modules/shared/shared.module'

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, LayoutRoutingModule, SharedModule, AppSharedModule],
})
export class LayoutModule {}
