export interface Step {
  markdown: string;
  solidity: string;
  test: string;
}

/**
 * A factory function that creates Step
 */
export function createStep(params: Partial<Step> = {}) {
  return {
    description: '',
    markdown: '',
    solidity: '',
    test: '',
    ...params
  } as Step;
}
