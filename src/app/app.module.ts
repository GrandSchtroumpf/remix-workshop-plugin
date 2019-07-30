import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { BootstrapModule } from './bootstrap.module';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BootstrapModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'workshops', pathMatch: 'full' },
      {
        path: 'workshops',
        loadChildren: () => import('./workshop/workshop.module').then(m => m.WorkshopModule)
      },
    ]),
    environment.production
      ? []
      : [ AkitaNgDevtools.forRoot() ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
