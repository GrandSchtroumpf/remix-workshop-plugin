import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkshopStore, WorkshopState } from './workshop.store';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccountQuery } from 'src/app/account/+state';

@Injectable({ providedIn: 'root' })
export class WorkshopQuery extends QueryEntity<WorkshopState> {

  constructor(protected store: WorkshopStore, private accountQuery: AccountQuery) {
    super(store);
  }

  steps$ = this.selectActive().pipe(map(workshop => workshop.steps));

  activeStep$ = combineLatest([
    this.selectActive(),
    this.accountQuery.currentStep$
  ]).pipe(
    map(([workshop, currentStep]) => workshop.steps[currentStep[workshop.id]])
  );
}
