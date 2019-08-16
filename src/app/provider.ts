import { Injectable } from '@angular/core';
import { Web3Provider } from '@ethersproject/providers';

@Injectable({ providedIn: 'root' })
export class MetaMaskProvider extends Web3Provider {
  enabled = false;

  constructor() {
    super((window as any).ethereum);
  }

  async enable() {
    if (!this.enabled) {
      const [address] = await (window as any).ethereum.enable();
      this.enabled = !!address;
    }
  }
}
