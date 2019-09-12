import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Workshop, WorkshopQuery, WorkshopService } from '../+state';
import { AccountQuery } from 'src/app/account/+state';
import { slideInY } from '../../ui/animations';
import { trigger, transition, query as queryChild, stagger } from '@angular/animations';
import { MetaMaskProvider } from 'src/app/provider';

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
  loggedIn$: Observable<boolean>;
  network: string;

  constructor(
    private service: WorkshopService,
    private query: WorkshopQuery,
    private accountQuery: AccountQuery,
    private provider: MetaMaskProvider,
  ) {}

  async ngOnInit() {
    this.loggedIn$ = this.accountQuery.isLoggedIn$;
    this.service.getAll();
    this.workshops$ = this.query.selectAll();
    const { name } = await this.provider.getNetwork();
    this.network = name;
  }

  trackByFn(index: number, workshop: Workshop) {
    return workshop.id;
  }

  isOwner(workshop: Workshop) {
    return workshop.author === this.accountQuery.getValue().address;
  }

  sync() {
    this.service.getAll();
  }
}
