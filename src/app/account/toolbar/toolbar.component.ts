import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AccountQuery, AccountService } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();

  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  error: string;

  constructor(private service: AccountService, private query: AccountQuery) { }

  ngOnInit() {
    this.isLoggedIn$ = this.query.isLoggedIn$;
    this.isLoading$ = this.query.selectLoading();
  }

  login() {
    this.service.signin()
      .then(_ => this.loggedIn.emit())
      .catch(err => this.error = err);
  }

  logout() {
    this.service.logout();
  }
}
