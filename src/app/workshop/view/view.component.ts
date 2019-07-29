import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Workshop, WorkshopQuery } from '../+state';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService, AccountQuery } from 'src/app/account/+state';

@Component({
  selector: 'workshop-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkshopViewComponent implements OnInit {
  workshop$: Observable<Workshop>;
  currentIndex$: Observable<number>;

  constructor(
    private query: WorkshopQuery,
    private accountService: AccountService,
    private accountQuery: AccountQuery,
    private router: Router,
    private routes: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.workshop$ = this.query.selectActive();
    this.currentIndex$ = this.query.selectActiveId().pipe(
      map(id => this.accountQuery.getStepIndex(id))
    );
  }

  start() {
    const id = this.query.getActiveId();
    this.accountService.startWorkshop(id);
    this.router.navigate(['../steps/0'], { relativeTo: this.routes });
  }
}
