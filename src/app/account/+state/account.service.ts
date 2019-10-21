import { Injectable, Inject } from '@angular/core';
import { AccountStore } from './account.store';
import { AccountQuery } from './account.query';
import { REMIX, RemixClient } from 'src/app/remix-client';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(
    @Inject(REMIX) private remix: RemixClient,
    private store: AccountStore,
    private query: AccountQuery,
  ) {
    this.remix.onload(async () => {
      // Set initial state
      const isLoggedIn = await this.remix.box.getUserAddress();
      isLoggedIn
        ? this.onLoggedIn()
        : this.store.update({ address: null });
      // Listen on loggedIn event
      this.remix.box.on('loggedIn', () => this.onLoggedIn());
      // Listen on loggedOut event
      this.remix.box.on('loggedOut', () => this.store.update({ address: null }));
    });
  }

  private async onLoggedIn() {
    const isOpen = await this.remix.box.openSpace();
    if (!isOpen) {
      throw new Error('Could not open space');
    }
    const [address, progress ] = await this.getStateFromBox();
    this.store.update({ address, progress  });
  }

  private getStateFromBox(): Promise<[string, Record<string, string[]>]> {
    return Promise.all([
      this.remix.box.getUserAddress(),
      this.remix.box.getSpacePrivateValue('progress'),
    ]).then(([address, progress ]) => [
      address,
      JSON.parse(progress || '{}'),
    ]);
  }

  async login() {
    this.store.setLoading(true);
    try {
      await this.remix.box.login();
      await this.onLoggedIn();
    } catch (err) {
      throw err;
    }
    this.store.setLoading(false);
  }

  async logout() {
    this.store.update({ address: null, progress: {} });
  }

  startWorkshop(workshopId: string) {
    this.updateWorkshop(workshopId, 0, '');
  }

  updateWorkshop(workshopId: string, index: number, content: string) {
    const { progress } = this.query.getValue();
    const workshop = Object.assign([], progress[workshopId], { [index]: content });
    const updated = { ...progress, [workshopId]: workshop };
    this.remix.box.setSpacePrivateValue('progress', JSON.stringify(updated));
    this.store.update({ progress: updated });
  }
}
