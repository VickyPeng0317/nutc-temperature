import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { StoreService } from '../services/store.service';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private storeService: StoreService,
    private router: Router,
  ) {
  }

  canActivate() {
    const canActivate = !!this.storeService.getUserAccount();
    if (canActivate) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
