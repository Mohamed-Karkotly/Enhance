import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { SidenavService } from 'src/app/services/sidenav.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cp-sidebar',
  templateUrl: './cp-sidebar.component.html',
  styleUrls: ['./cp-sidebar.component.scss'],
})
export class CpSidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('sidenav') public sidenav: MatSidenav;
  communityId: any;
  communityName: string;
  categoryName: string;
  coverImage: string;
  loaded: boolean;
  constructor(
    private _sidenavService: SidenavService,
    private _observer: BreakpointObserver,
    private _communicationService: CommunicationService
  ) {}

  ngOnInit(): void {
    this._communicationService.getData().subscribe((res) => {
      this.recieveCommunity(res);
      this.loaded = true;
    });
  }

  ngAfterViewInit(): void {
    this._sidenavService.setSidenav(this.sidenav);
    this.observeSidenav();
  }

  observeSidenav() {
    this._observer.observe(['(max-width: 992px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
      }
    });
  }

  recieveCommunity(community: any) {
    this.communityId = community.id;
    this.communityName = community.label;
    this.coverImage = community.coverImage;
    this.categoryName = community.category.name;
  }
}
