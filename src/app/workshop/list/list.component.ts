import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop, WorkshopQuery } from '../+state';
import { AccountQuery } from 'src/app/account/+state';
import { slideInY } from '../../animations';
import { trigger, transition, query as queryChild, stagger } from '@angular/animations';

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

  workshops$: Observable<Workshop[]>;

  constructor(private query: WorkshopQuery, private accountQuery: AccountQuery) { }

  ngOnInit() {
    this.workshops$ = this.query.selectAll();
  }

  trackByFn(index: number, workshop: Workshop) {
    return workshop.id;
  }

  isOwner(workshop: Workshop) {
    return workshop.author === this.accountQuery.getValue().address;
  }

}
