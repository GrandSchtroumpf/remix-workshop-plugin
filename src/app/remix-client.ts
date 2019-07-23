import { InjectionToken } from '@angular/core';
import { createIframeClient, PluginClient } from '@remixproject/plugin';


export const REMIX = new InjectionToken<PluginClient>('Remix client', {
  providedIn: 'root',
  factory:  () => createIframeClient()
});
