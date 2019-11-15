import { Component, OnInit, OnDestroy } from '@angular/core';
import { Workshop, WorkshopQuery, WorkshopService } from 'src/app/workshop/+state';
import { Observable, Subscription } from 'rxjs';
import { RemixWorkshopContract } from 'src/app/contracts/contract';
import { AccountQuery } from '../+state';
import { FormControl } from '@angular/forms';
import { GithubService } from 'src/app/github.service';
import { guid } from '@datorama/akita';

type Tab = 'taken' | 'created' | 'create';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  public subscriptions: Subscription[];
  public workshops$: Observable<Workshop[]>;
  public isTutor$: Observable<boolean>;
  public importMode = false;
  public importForm = new FormControl('');
  public tab: Tab = 'taken';

  constructor(
    private contract: RemixWorkshopContract,
    private workshopService: WorkshopService,
    private workshopQuery: WorkshopQuery,
    private query: AccountQuery,
    private github: GithubService,
  ) { }

  ngOnInit() {
    this.subscriptions = [
      this.contract.onRegistration().subscribe(),
      this.contract.onUnregistration().subscribe(),
    ];
    this.workshopService.getOwned();  // Get values from 3box
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

  remove(id: string) {
    this.workshopService.remove(id);
  }

  sync() {
    this.github.get(this.importForm.value)
      .subscribe((workshops) => {
        const author = this.query.address;
        const owned = this.workshopQuery.getAll().filter(w => w.author === author);
        const result = workshops.map(workshop => {
          const exist = owned.find(({ name }) => workshop.name === name);
          const id = exist ? exist.id : guid();
          return { ...workshop, author, id } as Workshop;
        });
        this.workshopService.create(result);
      });
  }
}
