import { Component } from '@angular/core';
import { AccountQuery } from 'src/app/account/+state';
import { WorkshopService, Workshop } from '../+state';
import { Router } from '@angular/router';
import { WorkshopForm } from '../workshop.form';
import { guid } from '@datorama/akita';

@Component({
  selector: 'workshop-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class WorkshopCreateComponent {
  public form = new WorkshopForm();

  constructor(
    private service: WorkshopService,
    private accountQuery: AccountQuery,
    private router: Router
  ) {}

  create() {
    const workshop = { id: guid(), ...this.form.value };
    const author = this.accountQuery.getValue().address;
    this.service.create({ ...workshop, author });
    this.router.navigate(['/workshops/list']);
  }
}
