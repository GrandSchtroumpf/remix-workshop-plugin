import { Component, OnInit } from '@angular/core';
import { AccountQuery } from '../+state';
import { Workshop } from 'src/app/workshop/+state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public templates$: Observable<Workshop[]>;

  constructor(
    private query: AccountQuery
  ) { }

  ngOnInit() {
    this.templates$ = this.query.select('templates');
  }

}
