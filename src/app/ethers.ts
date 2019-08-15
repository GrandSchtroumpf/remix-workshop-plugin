import { InjectionToken } from '@angular/core';
import { Web3Provider } from '@ethersproject/providers';


export const PROVIDER = new InjectionToken<Web3Provider>('Ethereum provider', {
  providedIn: 'root',
  factory: () => {
    const provider = (window as any).ethereum;
    return new Web3Provider(provider);
  }
});
