import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workshop, WorkshopQuery, WorkshopService } from 'src/app/workshop/+state';
import { Observable, Subscription } from 'rxjs';
import { RemixWorkshopContract } from 'src/app/contracts/contract';
import { AccountQuery } from '../+state';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public workshops$: Observable<Workshop[]>;
  public isTutor$: Observable<boolean>;

  constructor(
    private contract: RemixWorkshopContract,
    private workshopService: WorkshopService,
    private workshopQuery: WorkshopQuery,
    private query: AccountQuery,
  ) { }

  ngOnInit() {
    this.subscriptions = [
      this.contract.onRegistration().subscribe(),
      this.contract.onUnregistration().subscribe(),
    ];
    this.workshopService.getOwned();
    this.workshops$ = this.workshopQuery.owned$;
    this.isTutor$ = this.query.select('isTutor');
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  register() {
    this.contract.register();
  }

  unregister() {
    this.contract.unregister();
  }
}
