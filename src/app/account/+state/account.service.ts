import { Injectable, Inject } from '@angular/core';
import { AccountStore } from './account.store';
import { AccountQuery } from './account.query';
import { REMIX, RemixClient } from 'src/app/remix-client';
import { Workshop } from 'src/app/workshop/+state';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(
    @Inject(REMIX) private remix: RemixClient,
    private store: AccountStore,
    private query: AccountQuery,
  ) {
    this.remix.onload(async () => {
      const isLoggedIn = await this.remix.box.getUserAddress();
      if (isLoggedIn) {
        await this.remix.box.openSpace();
        const [address, workshops, templates] = await this.getStateFromBox();
        this.store.update({ address, workshops, templates });
      }
    });
  }

  getStateFromBox(): Promise<[string, Record<string, string[]>, Workshop[]]> {
    return Promise.all([
      this.remix.box.getUserAddress(),
      this.remix.box.getSpacePrivateValue('workshops'),
      this.remix.box.getSpacePublicValue('templates'),
    ]).then(([address, workshops, templates]) => [
      address,
      JSON.parse(workshops || '{}'),
      JSON.parse(templates || '[]'),
    ]);
  }

  async signin() {
    this.store.setLoading(true);
    await this.remix.box.login();
    await this.remix.box.openSpace();
    const [address, workshops, templates] = await this.getStateFromBox();
    this.store.update({
      address,
      workshops,
      templates,
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
