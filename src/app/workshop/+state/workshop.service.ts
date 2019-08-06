import { Injectable, Inject } from '@angular/core';
import { WorkshopStore } from './workshop.store';
import { Workshop } from './workshop.model';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { AccountQuery, AccountStore } from 'src/app/account/+state';

@Injectable({ providedIn: 'root' })
export class WorkshopService {

  constructor(
    @Inject(REMIX) private remix: RemixClient,
    private accountQuery: AccountQuery,
    private accountStore: AccountStore,
    private store: WorkshopStore,
  ) {}

  async get(id: string) {
    this.store.setActive(id);
    return true;  // to change with 3box
  }

  update(workshop: Workshop) {
    this.store.update(workshop.id, workshop);
  }

  async create(workshop: Workshop) {
    const templates = [ ...this.accountQuery.getValue().templates, workshop ];
    if (this.accountQuery.isLoggedIn) {
      await this.remix.box.setSpacePublicValue('templates', JSON.stringify(templates));
    }
    return this.accountStore.update({ templates });
  }
}
