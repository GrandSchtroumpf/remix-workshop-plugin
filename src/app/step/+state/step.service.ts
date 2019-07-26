import { Injectable, Inject } from '@angular/core';
import { ID } from '@datorama/akita';
import { StepStore } from './step.store';
import { Step } from './step.model';
import { REMIX } from 'src/app/remix-client';
import { PluginClient } from '@remixproject/plugin';

/** Create the path for the file manager based on a step */
function getFilePath(step: Step, type: 'test' | 'solidity'): string {
  let fileName = '';
  if (step.fileName) {
    fileName = step.fileName;
  } else {
    const lastSegment = step[type].split('/').pop();
    if (lastSegment.split('.').pop() === 'sol') {
      fileName = lastSegment;
    } else {
      fileName = step.name.split(' ').join('-').toLocaleLowerCase();
    }
  }
  const name = step.fileName.split('.')[0];
  return type === 'test' ? `browser/${name}_test.sol` : `browser/${name}.sol`;
}

@Injectable({ providedIn: 'root' })
export class StepService {

  constructor(
    @Inject(REMIX) private remix: PluginClient,
    private store: StepStore
  ) {}

  async get(index: number, step: Step) {
    const [markdown, solidity, test] = await Promise.all([
      this.remix.call('contentImport', 'resolve', step.markdown),
      this.remix.call('contentImport', 'resolve', step.solidity),
      this.remix.call('contentImport', 'resolve', step.test),
    ]);
    this.store.upsert(index, {
      ...step,
      markdown: markdown.content,
      solidity: solidity.content,
      test: test.content
    });
    this.store.setLoading(false);
  }

  async displaySolidity(step: Step) {
    const path = getFilePath(step, 'solidity');
    await this.remix.call('fileManager', 'setFile', path, step.solidity);
    await this.remix.call('fileManager', 'switchFile', path);
  }

  async testStep(step: Step) {
    try {
      this.store.update({ success: false });
      this.store.setLoading(true);
      const path = getFilePath(step, 'test');
      await this.remix.call('fileManager', 'setFile', path, step.test);
      const result = await this.remix.call('solidityUnitTesting', 'testFromPath', path);
      // const result = await this.remix.call('solidityUnitTesting', 'testFromSource', step.test);
      console.log(result);
      result.totalFailing === 0
        ? this.store.update({ success: true })
        : this.store.setError(result.errors);
      this.store.setLoading(false);
    } catch (err) {
      this.store.setLoading(false);
      console.log(err);
    }
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
