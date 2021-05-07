import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _title: Title
  ) {}

  changeTitle(): void {
    const tabTitle = this._title.getTitle();
    this._router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let child = this._activatedRoute.firstChild;
          while (child.firstChild) {
            child = child.firstChild;
          }
          if (child.snapshot.data['title']) {
            return child.snapshot.data['title'];
          }
          return tabTitle;
        })
      )
      .subscribe((title: string) => {
        this._title.setTitle(title);
      });
  }
}
