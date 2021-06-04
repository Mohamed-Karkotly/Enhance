import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private _translateService: TranslateService) {}

  initLanguages() {
    this._translateService.setDefaultLang('en');
    this._translateService.addLangs(['en', 'ar']);
    this._translateService.use('en');
  }

  selectEnglish() {
    this._translateService.setDefaultLang('en');
    this._translateService.use('en');
  }

  selectArabic() {
    this._translateService.setDefaultLang('ar');
    this._translateService.use('ar');
  }
}
