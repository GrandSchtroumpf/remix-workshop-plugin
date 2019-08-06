import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

interface CurrentStep {
  index: number;
  content: string;
}

export interface AccountState {
  address: string;
  workshops: {
    [workshopId: string]: string[];
  };
  loading: boolean;
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account' })
export class AccountStore extends Store<AccountState> {
  constructor() {
    super({ workshops: {} });
  }

  updateWorkshop(workshopId: string, index: number, content: string) {
    this.update((state) => {
      const workshop = [...(state.workshops[workshopId] || [])];
      const result = workshop.length === 0
        ? [content]
        : Object.assign(workshop, {[index]: content});
      return { workshops: {...state.workshops, [workshopId]: result} };
    });
  }

  /** Update the current step of a workshop */
  // updateCurrentStep(workshopId: string, step: CurrentStep) {
  //   this.update(state => ({
  //     currentStep: { ...state.currentStep, [workshopId]: step }
  //   }));
  // }
}
