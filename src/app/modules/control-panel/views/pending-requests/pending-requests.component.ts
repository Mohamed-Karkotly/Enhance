import { Component, OnInit } from '@angular/core';
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
    private _storageService: StorageService
  ) {
    this.users = [];
    this.communityId = this._storageService.getLocalObject('community').id;
    console.warn(this.communityId);
  }

  ngOnInit(): void {
    this.getPendingRequests();
  }

  getPendingRequests() {
    this._cpService
      .getPendingRequests(this.communityId)
      .subscribe((requests: any[]) => {
        this.users = requests;
        console.warn(requests);
      });
  }
}
