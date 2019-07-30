import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop, WorkshopQuery } from '../+state';
import { AccountQuery } from 'src/app/account/+state';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { slideInY } from '../../animations';
import { trigger, transition, query as queryChild, stagger, style } from '@angular/animations';
import { tap } from 'rxjs/operators';

const slideIn = trigger('slideIn', [
  transition(':enter', [
    queryChild('li', [stagger(30, slideInY)], { optional: true })
  ])
]);

@Component({
  selector: 'workshop-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [slideIn]
})
export class WorkshopListComponent implements OnInit {

  faEdit = faEdit;
  faEye = faEye;
  workshops$: Observable<Workshop[]>;

  constructor(private query: WorkshopQuery, private accountQuery: AccountQuery) { }

  ngOnInit() {
    this.workshops$ = this.query.selectAll().pipe(
      tap(result => console.log({result}))
    );
  }

  trackByFn(index: number, workshop: Workshop) {
    return workshop.id;
  }

  isOwner(workshop: Workshop) {
    return workshop.author === this.accountQuery.getValue().address;
  }

}
