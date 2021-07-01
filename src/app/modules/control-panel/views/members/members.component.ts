import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/models/entities/user.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  users: any[];
  communityId: number;
  loaded: boolean;
  dataSource = new MatTableDataSource();

  displayedColumns: string[];
  constructor(
    private _storageService: StorageService,
    private _cpService: ControlPanelService,
    private _spinner: NgxSpinnerService
  ) {
    this.displayedColumns = [
      'number',
      'image',
      'firstName',
      'lastName',
      'profession',
      'priority',
      'actions',
    ];
    this.users = [];
    this.communityId = this._storageService.getLocalObject('community').id;
  }

  ngOnInit(): void {
    this.getCommunity();
  }

  getCommunity() {
    this._spinner.show();
    this._cpService.getCommunityById(this.communityId).subscribe((res) => {
      this.users = res.users;
      this.dataSource = new MatTableDataSource(this.users);
      this.loaded = true;
      this._spinner.hide();
      console.warn(this.users);
    });
  }
}
