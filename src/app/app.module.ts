import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { BootstrapModule } from './bootstrap.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BootstrapModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'workshops', pathMatch: 'full' },
      {
        path: 'workshops',
        loadChildren: () => import('./workshop/workshop.module').then(m => m.WorkshopModule)
      },
    ]),
    environment.production
      ? AkitaNgRouterStoreModule.forRoot()
      : [ AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot() ]
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
