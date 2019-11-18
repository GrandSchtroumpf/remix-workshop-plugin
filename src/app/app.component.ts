import { Component, OnInit } from '@angular/core';
import { AccountQuery } from './account/+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <main>
      <router-outlet></router-outlet>
      <app-toaster></app-toaster>
    </main>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <ul class="nav">
        <li class="nav-item">
          <a class="nav-link" routerLink="/workshops/list" routerLinkActive="active">Workshops</a>
        </li>
        <li class="nav-item" *ngIf="address$ | async">
          <a class="nav-link" routerLink="/account/profile" routerLinkActive="active">Activity</a>
        </li>
      </ul>
      <app-login></app-login>
    </nav>
  `,
  styles: [`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    main {
      flex: 1;
    }
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    ul .nav-link {
      vertical-align: middle;
      padding: 0 20px 0 0;
      transition: font-size 0.3s ease-in-out;
    }
    ul .nav-link.active {
      color: var(--success);
    }
  `]
})
export class AppComponent implements OnInit {
  public address$: Observable<string>;
  constructor(private account: AccountQuery) {}

  ngOnInit() {
    this.address$ = this.account.select('address');
  }
}
