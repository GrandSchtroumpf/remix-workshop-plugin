import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { WorkshopStore, WorkshopState } from './workshop.store';
import { Workshop } from './workshop.model';
import { map } from 'rxjs/operators';
import { AccountQuery } from 'src/app/account/+state';

@Injectable({ providedIn: 'root' })
export class WorkshopQuery extends QueryEntity<WorkshopState> {

  activeStep$ = this.selectActive().pipe(
    map((workshop) => {
      const stepIndex = this.accountQuery.getStepIndex(workshop.id);
      return workshop.steps[stepIndex];
    })
  );

  constructor(protected store: WorkshopStore, private accountQuery: AccountQuery) {
    super(store);
  }

  steps$ = this.selectActive().pipe(map(workshop => workshop.steps));
  owned$ = this.selectAll({ filterBy: workshop => this.isOwned(workshop) });
  taken$ = this.selectAll({ filterBy: workshop => this.isTaken(workshop) });

  get owned() {
    return this.getAll({ filterBy: entity => this.isOwned(entity) });
  }

  private isOwned(workshop: Workshop): boolean {
    return workshop.author === this.accountQuery.address;
  }

  private isTaken(workshop: Workshop): boolean {
    return !!this.accountQuery.getValue().progress[workshop.id];
  }

}
