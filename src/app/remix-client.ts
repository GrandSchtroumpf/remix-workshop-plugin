import { InjectionToken } from '@angular/core';
import { createIframeClient, PluginApi, IRemixApi, remixProfiles, boxProfile, IBox, ProfileMap, PluginClient } from '@remixproject/plugin';

interface IRemixIDE extends IRemixApi {
  box: IBox;
}

export type RemixIDE = Readonly<IRemixIDE>;

export type RemixClient = PluginClient<any, RemixIDE> & PluginApi<RemixIDE>;

export const REMIX = new InjectionToken<RemixClient>('Remix client', {
  providedIn: 'root',
  factory:  () => {
    const customApi: ProfileMap<RemixIDE> = Object.freeze({...remixProfiles, box: boxProfile });
    return createIframeClient({ customApi });
  }
});
