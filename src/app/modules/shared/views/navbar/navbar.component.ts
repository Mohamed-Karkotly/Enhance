import { Location } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TranslationService } from 'src/app/services/translation.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() showLogo?: boolean;
  @Input() inCommunities?: boolean;
  showLogin: boolean;
  showSignUp: boolean;
  showLogout: boolean;
  showCommunity: boolean;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public location: Location;
  constructor(
    private element: ElementRef,
    private _router: Router,
    private _location: Location,
    private _translationService: TranslationService,
    private _storageService: StorageService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    this.subscribeToken();
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
  }

  subscribeToken() {
    this._storageService.watchStorage().subscribe((tokenExist: boolean) => {
      if (tokenExist) {
        this.showLogin = false;
        this.showSignUp = false;
        this.showLogout = true;
        this.showCommunity = true;
      } else {
        this.showLogin = true;
        this.showSignUp = true;
        this.showLogout = false;
        this.showCommunity = false;
      }
    });
  }
  openSidenav() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);
    html.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  closeSidenav() {
    const html = document.getElementsByTagName('html')[0];
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  }

  toggleSidenav() {
    if (!this.sidebarVisible) {
      this.openSidenav();
    } else {
      this.closeSidenav();
    }
  }

  chooseEnglish() {
    this._translationService.selectEnglish();
  }

  chooseArabic() {
    this._translationService.selectArabic();
  }

  goBack() {
    this._location.back();
  }

  deleteUser() {
    this._storageService.removeToken();
    this._storageService.clear();
    this._router.navigateByUrl('/auth/login');
  }
}
