import { Injectable, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ID } from '@datorama/akita';
import { StepStore } from './step.store';
import { Step } from './step.model';
import { REMIX } from 'src/app/remix-client';

@Injectable({ providedIn: 'root' })
export class StepService {

  constructor(
    @Inject(REMIX) private remix,
    private store: StepStore,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async get(index: number, step: Step) {
    return Promise.all([
      this.remix.call('contentImport', 'resolve', step.markdown),
      this.remix.call('contentImport', 'resolve', step.solidity),
      this.remix.call('contentImport', 'resolve', step.test),
    ]).then(([markdown, solidity, test]) => {
      this.store.upsert(index, {
        ...step,
        markdown: markdown.content,
        solidity: solidity.content,
        test: test.content
      });
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
