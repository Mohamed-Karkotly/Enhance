import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/entities/user.interface';
import { CommunicationService } from 'src/app/services/communication.service';
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
    private _modalService: NgbModal,
    private _communicationService: CommunicationService
  ) {
    this.isSearching = false;
  }

  ngOnInit(): void {
    this.user = this._storageService.getLocalObject('user');
    this._communicationService.getUserData().subscribe((res) => {
      this.user.profileImage = res.profileImage;
    });
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  getIsSidenavOpened() {
    return this.sidenav.sidenavOpened;
  }

  deleteUser() {
    this._storageService.clear();
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
