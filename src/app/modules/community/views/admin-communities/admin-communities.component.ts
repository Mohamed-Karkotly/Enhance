import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { Community } from 'src/app/models/entities/community.interface';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ToastService } from 'src/app/services/toast.service';
import { CommunityService } from '../../community.service';

@Component({
  selector: 'app-admin-communities',
  templateUrl: './admin-communities.component.html',
  styleUrls: ['./admin-communities.component.scss'],
})
export class AdminCommunitiesComponent implements OnInit {
  loaded: boolean;
  communities: Community[];
  constructor(
    private _router: Router,
    private _communityService: CommunityService,
    private _modalService: NgbModal,
    private _spinner: NgxSpinnerService,
    private _toast: ToastService,
    private _errorService: ErrorHandlerService
  ) {
    this.loaded = false;
    this.communities = [];
  }

  ngOnInit(): void {
    this.getCommunities();
  }

  getCommunities() {
    this._spinner.show();
    this._communityService.getOwnedCommunities().subscribe(
      (communities: Community[]) => {
        this.communities = communities;
        this.loaded = true;
        this._spinner.hide();
      },
      (err) => {
        this.loaded = true;
        console.warn(err);
        this._spinner.hide();
      }
    );
  }

  deleteCommunity(communityId: number) {
    this._spinner.show();
    let index = this.communities.findIndex(
      (community) => community.id == communityId
    );
    this._communityService.deleteCommunity(communityId).subscribe(
      (res) => {
        this._spinner.hide();
        this.communities.splice(index, 1);
        this._toast.showSuccess('toastr.done', 'toastr.communityDeleted');
      },
      (err) => {
        if (this._errorService.handleError(err)) {
          return;
        }
        this._spinner.hide();
        console.error(err);
      }
    );
  }

  openModal(content: string) {
    this._modalService.open(content, {
      centered: true,
    });
  }
}
