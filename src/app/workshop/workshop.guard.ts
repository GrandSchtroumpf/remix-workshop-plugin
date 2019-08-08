import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, UrlTree, Router } from '@angular/router';
import { WorkshopStore, WorkshopQuery } from './+state';
import { AccountQuery } from '../account/+state';
import { StepStore } from '../step/+state';

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
    private store: WorkshopStore,
    private query: WorkshopQuery,
    private accountQuery: AccountQuery,
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean {
    this.store.setActive(next.params.workshopId);
    const workshop = this.query.getActive();
    const account = this.accountQuery.getValue().address;
    return workshop.author === account;
  }
}



@Injectable({ providedIn: 'root' })
export class StartedWorkshopGuard implements CanActivate {

  constructor(
    private accountQuery: AccountQuery,
    private workshopQuery: WorkshopQuery,
    private stepStore: StepStore,
    private router: Router
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean | UrlTree {
    const {workshopId} = next.params;
    const hasStarted = this.accountQuery.hasStartedWorkshop(workshopId);
    const workshop = this.workshopQuery.getEntity(workshopId);
    this.stepStore.set(workshop.steps.map((step, id) => ({...step, id})));
    return hasStarted
      ? true
      : this.router.parseUrl(`/workshops/${workshopId}/view`);
  }
}
