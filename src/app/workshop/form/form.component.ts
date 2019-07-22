import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WorkshopForm } from '../workshop.form';
import { WorkshopService, Workshop } from '../+state';
import { Router } from '@angular/router';
import { AccountQuery } from 'src/app/account/+state';

@Component({
  selector: 'workshop-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class WorkshopFormComponent {
  public form = new WorkshopForm();

  @Input() set workshop(workshop: Workshop) {
    this.form.patchValue(workshop);
  }
  @Output() update = new EventEmitter<Workshop>();

  constructor(
    private service: WorkshopService,
    private accountQuery: AccountQuery,
    private router: Router
  ) {}

  create() {
    const author = this.accountQuery.getValue().address;
    this.service.create({...this.form.value, author});
    this.router.navigate(['/workshops/list']);
  }
}
