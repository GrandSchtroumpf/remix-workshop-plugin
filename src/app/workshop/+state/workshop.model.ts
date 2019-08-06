import { Step } from 'src/app/step/+state';

export interface Workshop {
  id: string;
  name: string;
  description: string;
  author: string;
  steps: Step[];
}

export interface Metadata {
  id: string;
  name: string;
  description: string;
  author: string;
  stepIds: string[];
}

/**
 * A factory function that creates Workshop
 */
export function createWorkshop(params: Partial<Workshop> = {}) {
  return {
    name: '',
    description: '',
    author: '',
    steps: [],
    ...params
  } as Workshop;
}

export function createStep(params: Partial<Step> = {}) {
  return {
    markdown: '',
    solidity: '',
    test: '',
    ...params
  } as Step;
}
