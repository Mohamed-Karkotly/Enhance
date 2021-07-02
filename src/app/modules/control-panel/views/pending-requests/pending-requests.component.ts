import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { subscribeOn } from 'rxjs/operators';
import { User } from 'src/app/models/entities/user.interface';
import { StorageService } from 'src/app/services/storage.service';
import { ToastService } from 'src/app/services/toast.service';
import { ControlPanelService } from '../../control-panel.service';

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.scss'],
})
export class PendingRequestsComponent implements OnInit {
  users: any[];
  communityId: number;
  loaded: boolean;
  constructor(
    private _cpService: ControlPanelService,
    private _storageService: StorageService,
    private _spinner: NgxSpinnerService,
    private _toast: ToastService
  ) {
    this.users = [];
    this.communityId = this._storageService.getLocalObject('community').id;
    this.loaded = false;
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
        this.loaded = true;
      });
  }

  acceptJoin(user: any) {
    const index = this.users.indexOf(user);
    this._spinner.show();
    this._cpService.postJoinState(user.id, 'accept').subscribe(
      () => {
        this._toast.showSuccess('toastr.done', 'toastr.userAccepted');
        this.users.splice(index, 1);
      },
      (err) => {
        console.error(err);
      }
    );
  }

  declineJoin(user: any) {
    const index = this.users.indexOf(user);
    this._spinner.show();
    this._cpService.postJoinState(user.id, 'decline').subscribe(
      (res) => {
        this._toast.showSuccess('toastr.done', 'toastr.userDeclined');
        this.users.splice(index, 1);
      },
      (err) => {
        console.error(err);
      }
    );
  }
}
