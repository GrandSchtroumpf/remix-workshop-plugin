import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Step, StepQuery, StepService } from '../+state';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'step-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class StepViewComponent implements OnInit {

  faArrowUp = faArrowUp;
  step$: Observable<Step>;

  constructor(
    private service: StepService,
    private query: StepQuery,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.step$ = this.query.selectActive().pipe(
      tap(step => this.service.displaySolidity(step))
    );
  }

  next() {
    const current = this.query.getActiveId();
    const isLast = this.query.getCount() === current + 1;
    const path = isLast ? ['../../view'] : ['..', current + 1];
    this.router.navigate(path, { relativeTo: this.route });
  }

}
