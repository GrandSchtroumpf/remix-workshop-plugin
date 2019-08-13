import { Injectable, Inject } from '@angular/core';
import { WorkshopStore } from './workshop.store';
import { Workshop } from './workshop.model';
import { WorkshopQuery } from './workshop.query';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { AccountQuery } from 'src/app/account/+state';

@Injectable({ providedIn: 'root' })
export class WorkshopService {

  constructor(
    @Inject(REMIX) private remix: RemixClient,
    private accountQuery: AccountQuery,
    private store: WorkshopStore,
    private query: WorkshopQuery,
  ) {}

  async get(id: string) {
    this.store.setActive(id);
    return true;  // to change with 3box
  }

  async getOwned() {
    const fromBox = await this.remix.box.getSpacePublicValue('workshops');
    const workshops = JSON.parse(fromBox || '[]');
    this.store.upsertMany(workshops);
  }

  update(workshop: Workshop) {
    if (this.accountQuery.isLoggedIn) {
      this.store.update(workshop.id, workshop);
      const toBox = JSON.stringify(this.query.owned);
      this.remix.box.setSpacePublicValue('workshops', toBox);
    }
  }

  create(workshop: Workshop) {
    if (this.accountQuery.isLoggedIn) {
      this.store.add({ ...workshop, author: this.accountQuery.address });
      const toBox = JSON.stringify(this.query.owned);
      this.remix.box.setSpacePublicValue('workshops', toBox);
    }
  }
}
