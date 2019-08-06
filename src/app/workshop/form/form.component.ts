import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopForm } from '../workshop.form';
import { WorkshopService, Workshop } from '../+state';
import { Router } from '@angular/router';
import { AccountQuery } from 'src/app/account/+state';
import { ControlContainer, FormArray } from '@angular/forms';

@Component({
  selector: '[formGroup] workshop-form, [formGroupName] workshop-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class WorkshopFormComponent {

  constructor(private controlContainer: ControlContainer) {}

  get control(): WorkshopForm {
    return this.controlContainer.control as WorkshopForm;
  }
}
