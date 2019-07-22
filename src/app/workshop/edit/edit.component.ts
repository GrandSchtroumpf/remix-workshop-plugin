import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkshopQuery, Workshop, WorkshopService } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'workshop-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class WorkshopEditComponent implements OnInit {

  workshop$: Observable<Workshop>;

  constructor(
    private query: WorkshopQuery,
    private service: WorkshopService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.workshop$ = this.query.selectActive();
  }

  update(workshop: Workshop) {
    this.service.update(workshop);
    this.router.navigate(['/workshops/list']);
  }
}
