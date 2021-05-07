import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TitleService } from './services/title.service';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private _titleService: TitleService,
    private _translationService: TranslationService
  ) {
    this._translationService.initLanguages();
    this._titleService.changeTitle();
  }
  ngOnInit() {}
}
