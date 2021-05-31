import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
const _shared = [FooterComponent, NavbarComponent, SidebarComponent];
@NgModule({
  declarations: [..._shared],
  imports: [CommonModule, RouterModule, NgbModule],
  exports: [..._shared],
})
export class SharedModule {}
