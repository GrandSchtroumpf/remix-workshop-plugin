import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { AccountQuery } from './+state';

@Injectable({ providedIn: 'root' })
export class AccountGuard implements CanLoad {

  constructor(private query: AccountQuery, private router: Router) {}

  canLoad() {
    if (this.query.isLoggedIn) {
      return true;
    } else {
      this.router.navigate(['workshops']);
      return false;
    }
  }
}
