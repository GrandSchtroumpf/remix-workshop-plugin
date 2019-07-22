import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { StepService, StepQuery, StepStore } from './+state';
import { WorkshopQuery } from '../workshop/+state';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {

  constructor(
    private service: StepService,
    private store: StepStore,
    private query: StepQuery,
    private workshopQuery: WorkshopQuery,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    const { stepId } = next.params;
    const step = this.workshopQuery.getActive().steps[stepId];
    this.store.setActive(stepId);
    if (this.query.getEntity(next.params.stepId)) {
      return true;
    }
    this.service.get(stepId, step);
  }
}
