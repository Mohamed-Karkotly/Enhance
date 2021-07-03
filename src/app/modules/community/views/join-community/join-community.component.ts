import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Category } from 'src/app/models/entities/category.interface';
import { Community } from 'src/app/models/entities/community.interface';
import { SharedService } from 'src/app/modules/shared/shared.service';
import { ErrorHandlerService } from 'src/app/services/error-handler.service';
import { ToastService } from 'src/app/services/toast.service';
import { CommunityService } from '../../community.service';

@Component({
  selector: 'app-join-community',
  templateUrl: './join-community.component.html',
  styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
  isMatched: boolean;
  isSearching: boolean;
  isEmptyResult: boolean;
  isSearchByName: boolean;
  isSearchByCategory: boolean;
  chosenOption: string;
  categoriesButtonContent: string;
  categories: Category[];
  communities: Community[];
  constructor(
    private _spinner: NgxSpinnerService,
    private _communityService: CommunityService,
    private _sharedService: SharedService,
    private _toast: ToastService,
    private _errorService: ErrorHandlerService
  ) {
    this.isMatched = false;
    this.isSearching = false;
    this.isSearchByName = true;
    this.categoriesButtonContent = 'Choose Category';
    this.communities = [];
    this.categories = [];
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this._spinner.show();
    this._sharedService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      this._spinner.hide();
    });
  }

  searchCommunityByName($event: Event) {
    this.communities = [];
    this.isSearching = true;
    let emittedCommunity = ($event.target as HTMLInputElement).value;
    this._communityService
      .getCommunitiesByName(emittedCommunity)
      .subscribe((communities: Community[]) => {
        this.communities = communities;
        this.isSearching = false;
        if (communities.length != 0) {
          this.isMatched = true;
          this.isEmptyResult = false;
        } else {
          this.isMatched = false;
          this.isEmptyResult = true;
        }
      });
  }

  searchCommunityByCategory(category: Category) {
    this.communities = [];
    this.categoriesButtonContent = category.name;
    this.isSearching = true;
    this._communityService
      .getCommunitiesByCategory(category.id)
      .subscribe((communities: Community[]) => {
        this.communities = communities;
        this.isSearching = false;
        if (communities.length != 0) {
          this.isMatched = true;
          this.isEmptyResult = false;
        } else {
          this.isMatched = false;
          this.isEmptyResult = true;
        }
      });
  }

  joinSelectedCommunity(communityId: number) {
    this._spinner.show();
    this._communityService.postJoinCommunity(communityId).subscribe(
      (res) => {
        this._toast.showSuccess('toastr.done', 'toastr.communityJoined');
      },
      (err) => {
        if (this._errorService.handleError(err)) {
          return;
        }
        console.error(err);
      }
    );
  }

  clearSearchResults() {
    this.isSearching = false;
    this.isMatched = false;
    this.isEmptyResult = false;
    this.communities = [];
  }

  reset() {
    this.communities = [];
    this.isSearching = false;
    this.isMatched = false;
    this.isEmptyResult = false;
  }
}
