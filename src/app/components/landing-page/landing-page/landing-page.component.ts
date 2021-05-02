import { Component, OnInit } from '@angular/core';
import { RellaxService } from 'src/app/classes/rellax';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent implements OnInit {
  rellax: RellaxService;
  data: Date = new Date();
  focus;
  focus1;

  constructor() {
  }

  ngOnInit() {
    this.rellax = new RellaxService();
  }
  ngOnDestroy() {
    this.rellax.destroyRellaxAnimation();
  }
}
