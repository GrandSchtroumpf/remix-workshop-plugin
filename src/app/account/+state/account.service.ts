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
      // Listen on spaceOpened event
      this.remix.box.on('spaceOpened', () => this.onSpaceOpened());
      // Listen on loggedOut event
      this.remix.box.on('loggedOut', () => this.logout());
    });
  }

  private async onLoggedIn() {
    try {
      console.log('LoggedIn with 3Box. Opening Space');
      this.store.update({ loading: true, openingSpace: true });
      const isOpen = await this.remix.box.openSpace();
      if (!isOpen) {
        this.store.update({ loading: false, openingSpace: false });
      }
    } catch (err) {
      this.store.update({ loading: false, openingSpace: false });
      console.error(err);
    }
  }

  private async onSpaceOpened() {
    try {
      console.log('Space Opened with 3Box. Getting the state');
      const [ address, progress ] = await this.getStateFromBox();
      this.store.update({ address, progress, loading: false, openingSpace: false  });
    } catch (err) {
      this.store.update({ loading: false, openingSpace: false });
      console.error(err);
    }
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
    try {
      this.store.update({ loading: true, openingSpace: false });
      const enabled = await this.remix.box.isEnabled();
      if (enabled) {  // If already enable, open space
        return this.onLoggedIn();
      }
      const isLoggedIn = await this.remix.box.login();
      if (isLoggedIn) {
        this.store.setLoading(false);
      }
    } catch (err) {
      this.store.setLoading(false);
      throw err;
    }
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
