import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Step, StepQuery, StepService } from '../+state';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'step-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class StepViewComponent implements OnInit {

  step$: Observable<Step>;

  constructor(
    private query: StepQuery,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.step$ = this.query.selectActive();
  }

  next() {
    const current = this.query.getActiveId();
    const isLast = this.query.getCount() === current + 1;
    const path = isLast ? ['../../view'] : ['..', current + 1];
    this.router.navigate(path, { relativeTo: this.route });
  }

}
