import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { Workshop, createWorkshop, createStep } from './+state';
import { Step } from '../step/+state';


////////////
/// STEP ///
////////////

function createStepControls(step: Partial<Step>) {
  return {
    name: new FormControl(step.name),
    markdown: new FormControl(step.markdown),
    solidity: new FormControl(step.solidity),
    test: new FormControl(step.test),
  };
}

export class StepForm extends FormGroup {
  constructor(step: Partial<Step> = {}) {
    const defaultStep = createStep(step);
    const control = createStepControls(defaultStep);
    super(control);
  }
}



////////////////
/// WORKSHOP ///
////////////////

export function createWorkshopControls(workshop: Workshop) {
  const stepForms = workshop.steps.map(step => new StepForm(step));
  return {
    name: new FormControl(workshop.name),
    description: new FormControl(workshop.description),
    steps: new FormArray(stepForms),
  };
}

export class WorkshopForm extends FormGroup {
  constructor(workshop: Partial<Workshop> = {}) {
    const defaultWorkshop = createWorkshop(workshop);
    const workshopControls = createWorkshopControls(defaultWorkshop);
    super(workshopControls);
  }

  get steps(): FormArray {
    return this.get('steps') as FormArray;
  }

  addStep(step: Partial<Step> = {}) {
    const control = new StepForm(step);
    this.steps.push(control);
  }

  removeStep(index: number) {
    this.steps.removeAt(index);
  }

  patchValue(workshop: Partial<Workshop>) {
    super.patchValue(workshop);
    workshop.steps.forEach((step, i) => this.steps.setControl(i, new StepForm(step)));
  }
}


