import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { WorkshopStore, WorkshopQuery } from './+state';
import { AccountQuery } from '../account/+state';

@Injectable({ providedIn: 'root' })
export class ActiveWorkshopGuard implements CanActivate {

  constructor(private store: WorkshopStore) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    this.store.setActive(next.params.workshopId);
    return true;
  }
}

@Injectable({ providedIn: 'root' })
export class EditWorkshopGuard implements CanActivate {

  constructor(
    private query: WorkshopQuery,
    private accountQuery: AccountQuery,
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const step = this.query.getActive();
    const account = this.accountQuery.getValue().address;
    return step.author === account;
  }
}



@Injectable({ providedIn: 'root' })
export class StartedWorkshopGuard implements CanActivate {

  constructor(
    private accountQuery: AccountQuery,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean | UrlTree {
    const {workshopId} = next.params;
    const hasStarted = this.accountQuery.hasStatedWorkshop(workshopId);
    console.log(hasStarted);
    return hasStarted
      ? true
      : this.router.parseUrl(`/workshops/${workshopId}/view`);
  }
}
