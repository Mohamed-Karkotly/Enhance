import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { TranslationService } from 'src/app/services/translation.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() login?: boolean;
  @Input() signUp?: boolean;
  @Input() logo?: boolean;
  private toggleButton: any;
  private sidebarVisible: boolean;
  public location: Location;
  constructor(
    private element: ElementRef,
    private _translationService: TranslationService
  ) {
    this.sidebarVisible = false;
  }

  ngOnInit() {
    const navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
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
}
