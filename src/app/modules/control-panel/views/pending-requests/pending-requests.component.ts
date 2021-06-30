import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/entities/user.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.scss'],
})
export class PendingRequestsComponent implements OnInit {
  users: any[];
  communityId: number;
  constructor(
    private _cpService: ControlPanelService,
    private _storageService: StorageService,
    private _spinner: NgxSpinnerService
  ) {
    this.users = [];
    this.communityId = this._storageService.getLocalObject('community').id;
    console.warn(this.communityId);
  }

  ngOnInit(): void {
    this.getPendingRequests();
  }

  getPendingRequests() {
    this._spinner.show();
    this._cpService
      .getPendingRequests(this.communityId)
      .subscribe((requests: any[]) => {
        this.users = requests;
        this._spinner.hide();
      });
  }
}
