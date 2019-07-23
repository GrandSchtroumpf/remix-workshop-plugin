export interface Step {
  name: string;
  markdown: string;
  solidity: string;
  test: string;
}

/**
 * A factory function that creates Step
 */
export function createStep(params: Partial<Step> = {}) {
  return {
    name: '',
    markdown: '',
    solidity: '',
    test: '',
    ...params
  } as Step;
}
