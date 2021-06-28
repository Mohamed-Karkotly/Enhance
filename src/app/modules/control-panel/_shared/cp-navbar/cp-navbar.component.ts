import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/entities/user.interface';
import { SidenavService } from 'src/app/services/sidenav.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cp-navbar',
  templateUrl: './cp-navbar.component.html',
  styleUrls: ['./cp-navbar.component.scss'],
})
export class CpNavbarComponent implements OnInit {
  isSearching: boolean;
  user: User;
  constructor(
    private _router: Router,
    private sidenav: SidenavService,
    private _storageService: StorageService,
    private _modalService: NgbModal
  ) {
    this.isSearching = false;
  }

  ngOnInit(): void {
    this.user = this._storageService.getLocalObject('user');
  }

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

  removeCommunity() {
    this._storageService.removeLocalObject('community');
    this._router.navigateByUrl('/communities');
  }

  addMember() {}

  openModal(content: string) {
    this._modalService.open(content, {
      centered: true,
    });
  }

  searchMember(event: any) {
    console.warn((event.target as HTMLInputElement).value);
    this.isSearching = true;
  }
}
