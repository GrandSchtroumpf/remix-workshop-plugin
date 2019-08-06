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
  // public currentStep$ = this.select('currentStep');

  public getStepIndex(workshopId: string): number {
    console.log({workshopId});
    if (!this.getValue().workshops[workshopId]) {
      return -1;
    }
    return this.getValue().workshops[workshopId].length - 1;
  }

  public getStepContent(workshopId: string, index: number): string {
    return this.getValue().workshops[workshopId][index];
  }

  public hasStartedWorkshop(workshopId: string): boolean {
    return this.getStepIndex(workshopId) !== -1;
  }
}
