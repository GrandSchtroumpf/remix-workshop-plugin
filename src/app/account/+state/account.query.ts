import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AccountStore, AccountState } from './account.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountQuery extends Query<AccountState> {

  constructor(protected store: AccountStore) {
    super(store);
  }

  public isLoggedIn$ = this.select('address').pipe(map(uid => !!uid));
  public currentStep$ = this.select('currentStep');

  public getStepIndex(workshopId: string): number {
    const stepIndex = this.getValue().currentStep[workshopId];
    return stepIndex > -1 ? stepIndex : -1;
  }

  public hasStatedWorkshop(workshopId: string): boolean {
    return this.getStepIndex(workshopId) !== -1;
  }
}
