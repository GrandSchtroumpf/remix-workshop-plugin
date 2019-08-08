import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AccountStore, AccountState } from './account.store';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AccountQuery extends Query<AccountState> {

  constructor(protected store: AccountStore) {
    super(store);
  }

  get isLoggedIn() {
    return !!this.getValue().address;
  }

  get address() {
    return this.getValue().address;
  }

  public isLoggedIn$ = this.select('address').pipe(map(address => !!address));

  public getStepIndex(workshopId: string): number {
    if (!this.getValue().progress[workshopId]) {
      return -1;
    }
    return this.getValue().progress[workshopId].length - 1;
  }

  public getStepContent(workshopId: string, index: number): string {
    return this.getValue().progress[workshopId][index];
  }

  public hasStartedWorkshop(workshopId: string): boolean {
    return this.getStepIndex(workshopId) !== -1;
  }
}
