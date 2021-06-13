import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-join-community',
  templateUrl: './join-community.component.html',
  styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
  isMatched = false;
  isSearching: boolean;
  constructor(private _spinner: NgxSpinnerService) {
    this.isSearching = false;
  }

  ngOnInit(): void {
    this._spinner.show();
  }

  searchCommunity($event: Event) {
    this.isSearching = true;
    let emittedCommunity = ($event.target as HTMLInputElement).value;
    console.warn(emittedCommunity);
  }
}
