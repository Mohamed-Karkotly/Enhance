import { AfterViewInit, Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-choose-community',
  templateUrl: './choose-community.component.html',
  styleUrls: ['./choose-community.component.scss'],
})
export class ChooseCommunityComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    document.body.classList.remove('bg-gradient');
  }
}
