import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Workshop, WorkshopQuery } from '../+state';
import { ActivatedRoute, Router } from '@angular/router';
import { map} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AccountService, AccountQuery } from 'src/app/account/+state';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { slideInY } from 'src/app/animations';

const slideIn = trigger('slideIn', [
  transition(':enter', [
    queryChild('a', [stagger(30, slideInY)])
  ])
]);
@Component({
  selector: 'workshop-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn]
})
export class WorkshopViewComponent implements OnInit {
  arrowIcon = faArrowLeft;
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
      map(id => this.accountQuery.getStepIndex(id) + 1),  // Need +1 to make *ngIf works
    );
  }

  start() {
    const id = this.query.getActiveId();
    this.accountService.startWorkshop(id);
    this.router.navigate(['../steps/0'], { relativeTo: this.routes });
  }
}
