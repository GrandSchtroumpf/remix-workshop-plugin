import { Component } from '@angular/core';
import { AccountQuery } from 'src/app/account/+state';
import { WorkshopService, Workshop } from '../+state';
import { Router } from '@angular/router';

@Component({
  selector: 'workshop-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class WorkshopCreateComponent {
  constructor(
    private service: WorkshopService,
    private accountQuery: AccountQuery,
    private router: Router
  ) {}

  create(workshop: Workshop) {
    const author = this.accountQuery.getValue().address;
    this.service.create({ ...workshop, author });
    this.router.navigate(['/workshops/list']);
  }
}
