import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/entities/user.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ControlPanelService } from '../../control-panel.service';
@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit, AfterViewInit {
  users: any[] = [];
  communityId: number;
  loaded: boolean;
  displayedColumns: string[] = ['image', 'firstName', 'lastName', 'priority'];
  dataSource = new MatTableDataSource(this.users);
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private _storageService: StorageService,
    private _cpService: ControlPanelService,
    private _spinner: NgxSpinnerService
  ) {
    this.communityId = this._storageService.getLocalObject('community').id;
  }

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    this._spinner.show();
    this._cpService.getCommunityById(this.communityId).subscribe((res) => {
      this.users = res.users;
      this.loaded = true;
      this._spinner.hide();
      console.warn(res);
    });
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
