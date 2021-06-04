import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable()
export class SidenavService {
  private sidenav: MatSidenav;
  sidenavOpened: boolean;
  constructor() {
    this.sidenavOpened = true;
  }

  public setSidenav(sidenav: MatSidenav) {
    this.sidenav = sidenav;
  }

  public open() {
    this.sidenavOpened = true;
    return this.sidenav.open();
  }

  public close() {
    this.sidenavOpened = false;
    return this.sidenav.close();
  }

  public toggle(): void {
    this.sidenavOpened = !this.sidenavOpened;
    this.sidenav.toggle();
  }
}
