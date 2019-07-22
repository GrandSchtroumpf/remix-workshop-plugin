import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AccountState {
  address: string;
  currentStep: {
    [workshopId: string]: number;
  };
}

export function createInitialState(): AccountState {
  return {
    address: undefined,
    currentStep: {}
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account' })
export class AccountStore extends Store<AccountState> {
  constructor() {
    super(createInitialState());
  }

  /** Update the current step of a workshop */
  updateCurrentStep(workshopId: string, step: number) {
    this.update(state => ({
      currentStep: { ...state.currentStep, [workshopId]: step }
    }));
  }
}
