import * as Rellax from 'rellax/rellax.min';

export class RellaxService {
  rellax: any;
  constructor() {
    this.initRellaxAnimation();
  }

  initRellaxAnimation() {
    this.rellax = new Rellax('.rellax');
  }

  destroyRellaxAnimation() {
    this.rellax.destroy();
  }
}
