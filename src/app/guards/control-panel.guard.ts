import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ControlPanelGuard implements CanActivate {
  constructor(
    private _storageService: StorageService,
    private router: Router
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.isStored()) {
      return true;
    }
    this.router.navigateByUrl('/auth/login');
    return false;
  }

  isStored(): boolean {
    let isStored = this._storageService.getLocalObject('community');
    return isStored;
  }
}
