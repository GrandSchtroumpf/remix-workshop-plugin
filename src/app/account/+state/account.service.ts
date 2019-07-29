import { Injectable } from '@angular/core';
import { AccountStore } from './account.store';
import { guid } from '@datorama/akita';

@Injectable({ providedIn: 'root' })
export class AccountService {

  constructor(private store: AccountStore) {}

  async signin() {
    this.store.setLoading(true);
    await this.store.update({ address: guid() }); // To update with real auth
    this.store.setLoading(false);
  }

  async logout() {
    this.store.update({ address: null });
  }

  startWorkshop(workshopId: string) {
    this.store.updateWorkshop(workshopId, 0, '');
    // this.store.updateCurrentStep(workshopId, {index: 0, content: ''});
  }

  updateWorkshop(workshopId: string, index: number, content: string) {
    this.store.updateWorkshop(workshopId, index, content);
  }
}
