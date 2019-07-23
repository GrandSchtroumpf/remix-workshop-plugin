import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Step } from './step.model';

export interface StepState extends EntityState<Step>, ActiveState<number> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'step' })
export class StepStore extends EntityStore<StepState> {

  constructor() {
    super();
  }

}

