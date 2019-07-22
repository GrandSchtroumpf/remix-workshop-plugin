import { Component } from '@angular/core';
import { AccountService, AccountQuery } from '../+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'account-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {

  public loading$: Observable<boolean>;

  constructor(
    private service: AccountService,
    private query: AccountQuery,
  ) { }

  signin() {
    this.loading$ = this.query.selectLoading();
    this.service.signin();
  }

}
