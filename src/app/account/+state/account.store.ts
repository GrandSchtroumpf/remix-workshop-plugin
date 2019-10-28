import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AccountState {
  address: string;
  progress: Record<string, string[]>;
  loading: boolean;
  openingSpace: boolean;
  isTutor: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account' })
export class AccountStore extends Store<AccountState> {
  constructor() {
    super({ address: null, progress: {} });
  }
}
