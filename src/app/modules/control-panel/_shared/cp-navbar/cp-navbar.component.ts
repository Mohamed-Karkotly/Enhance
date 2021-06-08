import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/services/sidenav.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cp-navbar',
  templateUrl: './cp-navbar.component.html',
  styleUrls: ['./cp-navbar.component.scss'],
})
export class CpNavbarComponent implements OnInit {
  constructor(
    private _router: Router,
    private sidenav: SidenavService,
    private _storageService: StorageService
  ) {}

  ngOnInit(): void {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  getIsSidenavOpened() {
    return this.sidenav.sidenavOpened;
  }

  deleteUser() {
    this._storageService.removeLocalObject('user');
    this._storageService.removeToken();
    this._router.navigateByUrl('/auth/login');
  }
}
