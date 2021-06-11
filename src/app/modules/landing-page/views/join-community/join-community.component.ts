import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-community',
  templateUrl: './join-community.component.html',
  styleUrls: ['./join-community.component.scss'],
})
export class JoinCommunityComponent implements OnInit {
  b = false;
  isSearching: boolean;
  constructor() {
    this.isSearching = false;
  }

  ngOnInit(): void {}

  searchCommunity($event: Event) {
    this.isSearching = true;
    let emittedCommunity = ($event.target as HTMLInputElement).value;
    console.warn(emittedCommunity);
  }
}
