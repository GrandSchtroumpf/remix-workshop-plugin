import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { WorkshopStep, Workshop, createWorkshop, createWorkshopStep } from './+state';


////////////
/// STEP ///
////////////

function createStepControls(step: Partial<WorkshopStep>) {
  return {
    markdown: new FormControl(step.markdown),
    solidity: new FormControl(step.solidity),
    test: new FormControl(step.test),
  };
}

export class StepForm extends FormGroup {
  constructor(step: Partial<WorkshopStep> = {}) {
    const defaultStep = createWorkshopStep(step);
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

  addStep(step: Partial<WorkshopStep> = {}) {
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


