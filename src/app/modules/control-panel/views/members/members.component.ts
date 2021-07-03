import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  deletedMemberFirstName: string;
  deletedMemberLastName: string;
  deletedMemberIndex: number;
  deletedMemberUserCommunityId: number;
  constructor(
    private _storageService: StorageService,
    private _cpService: ControlPanelService,
    private _spinner: NgxSpinnerService,
    private _modalService: NgbModal
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
      this.users = this.getUniqueArr(res.users);
      this.dataSource = new MatTableDataSource(this.users);
      this.loaded = true;
      this._spinner.hide();
    });
  }

  getUniqueArr(array: Array<any>) {
    const mapObj = {};
    array.forEach((element) => {
      mapObj[element.id] = element;
    });
    return Object.values(mapObj);
  }

  openDeleteMemberModal(user: any, index: number, content: any) {
    this.deletedMemberFirstName = user.first_name;
    this.deletedMemberLastName = user.last_name;
    this.deletedMemberIndex = index;
    this.deletedMemberUserCommunityId = user.settings.id;
    this._modalService.open(content, {
      centered: true,
    });
  }
  deleteMember() {
    this._spinner.show();
    this._cpService
      .deleteMember(`${this.deletedMemberUserCommunityId}`)
      .subscribe(
        () => {
          this.users.splice(this.deletedMemberIndex, 1);
          this.dataSource = new MatTableDataSource(this.users);
          this._spinner.hide();
        },
        (err) => {
          console.error(err);
          this._spinner.hide();
        }
      );
  }
}
