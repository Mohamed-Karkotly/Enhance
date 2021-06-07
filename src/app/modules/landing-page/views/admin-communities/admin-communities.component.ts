import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-communities',
  templateUrl: './admin-communities.component.html',
  styleUrls: ['./admin-communities.component.scss'],
})
export class AdminCommunitiesComponent implements OnInit {
  b = true;
  constructor(private _router: Router) {}

  ngOnInit(): void {}

  getSelectedCommunity() {
    this._router.navigateByUrl('/control-panel');
  }
}
