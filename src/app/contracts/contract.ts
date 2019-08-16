import { Injectable } from '@angular/core';
import { Contract } from '@ethersproject/contracts';
import { MetaMaskProvider } from '../provider';
import { ABI } from './abi';
import { environment } from 'src/environments/environment';
import { AccountStore, AccountQuery } from '../account/+state';
import { fromEvent } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RemixWorkshopContract extends Contract {
  constructor(
    private metamask: MetaMaskProvider,
    private store: AccountStore,
    private query: AccountQuery,
  ) {
    super(environment.address, ABI, metamask.getSigner());
  }

  onRegistration() {
    this.isTutor(this.query.address).then(isTutor => this.store.update({ isTutor }));
    return fromEvent<[string]>(this, 'Registration').pipe(
      filter(([address]) => this.query.address === address),
      tap(_ => this.store.update({ isTutor: true }))
    );
  }

  onUnregistration() {
    return fromEvent<[string]>(this, 'Unregistration').pipe(
      filter(([address]) => this.query.getValue().address === address),
      tap(_ => this.store.update({ isTutor: false }))
    );
  }

  async register() {
    await this.metamask.enable();
    return this.functions.register();
  }

  async unregister() {
    await this.metamask.enable();
    return this.functions.unregister();
  }

  async isTutor(address: string): Promise<boolean> {
    await this.metamask.enable();
    return this.functions.isTutor(address);
  }

  async getSize(): Promise<number> {
    await this.metamask.enable();
    return this.functions.getSize();
  }

  async getTutors(): Promise<string[]> {
    await this.metamask.enable();
    return this.functions.getTutors();
  }

}
