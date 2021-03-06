
import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { AccountQuery, AccountService, AccountState } from '../+state';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  @Output() loggedIn = new EventEmitter();

  isLoggedIn$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  isOpeningSpace$: Observable<boolean>;
  error: string;

  constructor(private service: AccountService, private query: AccountQuery) { }

  ngOnInit() {
    this.isLoggedIn$ = this.query.isLoggedIn$;
    this.isLoading$ = this.query.selectLoading();
    this.isOpeningSpace$ = this.query.select('openingSpace');
  }

  login() {
    this.service.login()
      .then(_ => this.loggedIn.emit())
      .catch(err => this.error = err);
  }

  logout() {
    this.service.logout();
  }

}

