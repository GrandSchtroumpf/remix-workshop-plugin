import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Step, StepQuery } from '../+state';

@Component({
  selector: 'step-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class StepViewComponent implements OnInit {

  step$: Observable<Step>;

  constructor(private query: StepQuery) { }

  ngOnInit() {
    this.step$ = this.query.selectActive();
  }

}
