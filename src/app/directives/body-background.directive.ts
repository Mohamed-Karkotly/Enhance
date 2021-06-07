import { AfterViewInit, Directive, OnDestroy } from '@angular/core';

@Directive({
  selector: '[BodyBackground]',
})
export class BodyBackgroundDirective implements AfterViewInit, OnDestroy {
  constructor() {}

  ngAfterViewInit() {
    document.querySelector('body').classList.add('bg-gradient');
  }
  ngOnDestroy(): void {
    document.querySelector('body').classList.remove('bg-gradient');
  }
}
