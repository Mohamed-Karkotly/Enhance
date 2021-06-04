import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidenavService } from 'src/app/services/sidenav.service';
import { MenuItem } from 'src/app/interfaces/menu.interface';

@Component({
  selector: 'app-cp-sidebar',
  templateUrl: './cp-sidebar.component.html',
  styleUrls: ['./cp-sidebar.component.scss'],
})
export class CpSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;

  menuItems: MenuItem[] = [
    {
      path: '',
      title: '',
    },
    {
      path: '',
      title: '',
    },
  ];
  constructor(private sidenavService: SidenavService, private observer: BreakpointObserver) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sidenavService.setSidenav(this.sidenav);
    this.observeSidenav();
  }

  observeSidenav() {
    this.observer.observe(['(max-width: 992px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
      }
    });
  }
}
