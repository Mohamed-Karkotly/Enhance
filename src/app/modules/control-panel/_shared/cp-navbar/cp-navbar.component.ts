import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/interfaces/menu.interface';
import { SidenavService } from 'src/app/services/sidenav.service';

@Component({
  selector: 'app-cp-navbar',
  templateUrl: './cp-navbar.component.html',
  styleUrls: ['./cp-navbar.component.scss'],
})
export class CpNavbarComponent implements OnInit {
  constructor(private sidenav: SidenavService) {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  getIsSidenavOpened() {
    return this.sidenav.sidenavOpened;
  }
}
