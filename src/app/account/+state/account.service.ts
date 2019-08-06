import { Injectable, Inject } from '@angular/core';
import { AccountStore } from './account.store';
import { AccountQuery } from './account.query';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { timer } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(
    @Inject(REMIX) private remix: RemixClient,
    private store: AccountStore,
    private query: AccountQuery,
  ) {
    this.remix.onload(async () => {
      const address = await this.remix.box.getUserAddress();
      this.store.update({ address });
      if (address) {
        await this.remix.box.openSpace();
        const result = await this.remix.box.getSpacePrivateValue('workshops');
        const workshops = JSON.parse(result || '{}');
        this.store.update({ workshops });
      }
    });

  }

  async signin() {
    this.store.setLoading(true);
    await this.remix.box.login();
    await this.remix.box.openSpace();
    const [address, workshops] = await Promise.all([
      this.remix.box.getUserAddress(),
      this.remix.box.getSpacePrivateValue('workshops')
    ]);
    this.store.update({
      address,
      workshops: JSON.parse(workshops || '{}'),
      loading: false
    });
  }

  async logout() {
    this.store.update({ address: null, workshops: {} });
  }

  startWorkshop(workshopId: string) {
    this.updateWorkshop(workshopId, 0, '');
  }

  updateWorkshop(workshopId: string, index: number, content: string) {
    const { workshops } = this.query.getValue();
    const workshop = Object.assign([], workshops[workshopId], { [index]: content });
    const updated = { ...workshops, [workshopId]: workshop };
    this.remix.box.setSpacePrivateValue('workshops', JSON.stringify(updated));
    this.store.update({ workshops: updated });
  }
}
