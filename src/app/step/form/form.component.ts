import { Component } from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'step-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class StepFormComponent {

  constructor(private controlContainer: ControlContainer) { }

  get control() {
    return this.controlContainer.control;
  }
}
