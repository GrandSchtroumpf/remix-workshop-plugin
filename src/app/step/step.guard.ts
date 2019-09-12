import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { StepService, StepStore } from './+state';
import { AccountQuery } from '../account/+state';
import { WorkshopQuery } from '../workshop/+state';

@Injectable({
  providedIn: 'root'
})
export class StepGuard implements CanActivate {

  constructor(
    private service: StepService,
    private store: StepStore,
    private accountQuery: AccountQuery,
    private workshopQuery: WorkshopQuery,
  ) {}

  async canActivate(next: ActivatedRouteSnapshot) {
    const { stepId } = next.params;
    const index = parseInt(stepId, 10);
    const workshop = this.workshopQuery.getActive();
    const currentStep = this.accountQuery.getStepIndex(workshop.id);
    console.log('Guard', index, currentStep);
    if (index > currentStep) {
      return false;
    } else {
      const step = workshop.steps[stepId];
      this.store.setActive(index);
      await this.service.get(stepId, step);
      return true;
    }
  }
}
