import { Injectable, Inject } from '@angular/core';
import { ID } from '@datorama/akita';
import { StepStore } from './step.store';
import { Step } from './step.model';
import { WorkshopStep } from 'src/app/workshop/+state';
import { combineLatest } from 'rxjs';
import { take } from 'rxjs/operators';
import { REMIX } from 'src/app/remix-client';

@Injectable({ providedIn: 'root' })
export class StepService {

  constructor(@Inject(REMIX) private remix, private store: StepStore) {}

  async get(index: number, step: WorkshopStep) {
    const file = await this.remix.call('fileManager', 'getFile', 'browser/ballot.sol');
    console.log({file});
    return Promise.all([
      this.remix.call('contentImport', 'resolve', step.markdown),
      this.remix.call('contentImport', 'resolve', step.solidity),
      this.remix.call('contentImport', 'resolve', step.test),
    ]).then(([markdown, solidity, test]) => {
      this.update(index, { markdown, solidity, test });
    });
  }

  add(step: Step) {
    this.store.add(step);
  }

  update(id: number, step: Partial<Step>) {
    this.store.update(id, step);
  }

  remove(id: ID) {
    this.store.remove(id);
  }
}
