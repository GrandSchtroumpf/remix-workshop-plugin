import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopQuery, WorkshopService } from '../+state';
import { WorkshopForm } from '../workshop.form';

@Component({
  selector: 'workshop-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class WorkshopEditComponent implements OnInit {
  public form = new WorkshopForm();

  constructor(
    private query: WorkshopQuery,
    private service: WorkshopService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.form.patchValue(this.query.getActive());
  }

  update() {
    const workshop = this.form.value;
    this.service.update(workshop);
    this.router.navigate(['/workshops/list']);
  }
}
