import { Injectable, Inject } from '@angular/core';
import { BaseProvider } from '@ethersproject/providers';
import { Contract } from '@ethersproject/contracts';
import { PROVIDER } from '../ethers';
import { ABI } from './abi';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class RemixWorkshopContract extends Contract {
  constructor(@Inject(PROVIDER) provider: BaseProvider) {
    super(environment.address, ABI, provider);
  }

  register() {
    return this.functions.register();
  }

  unregister() {
    return this.functions.unregister();
  }

  isTutor(address: string): Promise<boolean> {
    return this.functions.isTutor(address);
  }

  getSize(): Promise<number> {
    return this.functions.getSize();
  }

  getTutors(): Promise<string[]> {
    return this.functions.getTutors();
  }

}
